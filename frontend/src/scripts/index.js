import resultRenderer from "./render-result.js";
import loading from "./loading.js";
import "../index.css";

const API_BASE_URL = "https://rapidtube.onrender.com/api";

const fetchMetaContent = async url => {
  try {
    const response = await fetch(`${API_BASE_URL}/meta?url=${url}`);
    if (!response.ok) {
      throw new Error("Failed to fetch content info");
    }
    return await response.json();
  } catch (error) {
    throw Error(error.message);
  }
};

const downloadContent = (url, format) => {
  window.location.href = `${API_BASE_URL}/download?url=${url}&format=${format}`;
};

const renderError = error => {
  const mainSection = document.querySelector("#main-logic");
  mainSection.innerHTML = `
    <div class="error-container p-4 bg-red-100/10 border border-red-200/20 rounded-xl">
      <p class="text-red-500">${error.message}</p>
    </div>
  `;
};

const handleSubmit = async url => {
  if (!url) return;

  try {
    loading();
    const data = await fetchMetaContent(url);
    resultRenderer(url, data.data);
  } catch (error) {
    renderError(error);
    console.log(error);
  }
};

const setupEventListeners = () => {
  const submitButton = document.getElementById("submit-button");
  const inputBox = document.getElementById("rapidtube-input-box");

  submitButton.addEventListener("click", () => {
    const url = inputBox.value.trim();
    handleSubmit(url);
  });
};

// Initial setup
window.addEventListener("DOMContentLoaded", event => {
  fetch(`${API_BASE_URL}/status`);
  setupEventListeners();
});

export { downloadContent, renderError };
