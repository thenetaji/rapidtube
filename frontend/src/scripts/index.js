import resultRenderer from "./render-result.js";
import loading from "./loading.js";
import "../index.css";

const API_BASE_URL = "https://rapidtube.onrender.com/api";

export default class RapidTube {
  constructor(url) {
    this.url = url;
  }
  checkPlatform(url) {
    switch (true) {
      case /youtube\.com|youtu\.be/i.test(url):
        return "youtube";
      case /instagram\.com|instagr\.am/i.test(url):
        return "instagram";
      case /facebook\.com|fb\.com|fb\.watch/i.test(url):
        return "facebook";
      case /twitter\.com|x\.com/i.test(url):
        return "twitter";
      default:
        throw new Error("URL type not supported");
    }
  }
  showLoading() {
    loading();
  }
  renderResult(data) {
    resultRenderer(this.url, data.data);
  }
  async fetchMetaContent() {
    try {
      const platform = this.checkPlatform(this.url);
      const response = await fetch(
        `${API_BASE_URL}/meta?url=${this.url}`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch content info");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw Error(error.message);
    }
  }
  downloadContent(url, format) {
    const downloadUrl = `${API_BASE_URL}/download?url=${url}&format=${format}`;
    window.location.href = downloadUrl;
  }
}

// Initial call
window.addEventListener("DOMContentLoaded", () => {
  fetch(`${API_BASE_URL}/status`);
  initiateApp();
});

function initiateApp() {
  const submitButton = document.getElementById("submit-button");
  const inputBox = document.getElementById("input-box");

  submitButton.addEventListener("click", async () => {
    const url = inputBox.value.trim();
    const app = new RapidTube(url);
    if (url) {
      try {
        app.showLoading();
        const data = await app.fetchMetaContent(url);
        app.renderResult(data);
      } catch (error) {
        const mainSection = document.querySelector("#main-logic");
        mainSection.innerHTML = `
          <div class="error-container p-4 bg-red-100/10 border border-red-200/20 rounded-xl">
            <p class="text-red-500">${error.message}</p>
          </div>
        `;
      }
    }
  });
}
