const mainLogicElement = document.getElementById("main-logic");
import { downloadContent } from "./index.js";

function renderResult(url, data) {
  const thumbnails = data.thumbnails || [];
  const sortedThumbnails = [...thumbnails].sort(
    (a, b) => b.width * b.height - a.width * a.height,
  );

  const thumbnailSrcSet = sortedThumbnails
    .map(
      thumb =>
        `<source 
          srcset="${thumb.url}"
          media="(min-width: ${thumb.width}px)"
          width="${thumb.width}"
          height="${thumb.height}"
        >`,
    )
    .join("");

  const formatOptions = (data) => {
    if (!data?.formats?.length) {
      return '<option value="">No formats available</option>';
    };
    
    if(data.info.shortVideo){
      return `<option value="best" class="disabled">Best Quality (Default)</option>`;
    };
    data.formats
        .map(format => {
          return `<option value="${format.format_id}">${quality}</option>`;
          })
        .join("");
  };

  const duration = data.info?.duration
    ? `${Math.floor(data.info.duration / 60)}:${String(Math.floor(data.info.duration % 60)).padStart(2, '0')}`
    : "";

  const innerHtml = `
    <section class="result-rendered w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div class="thumbnail-container relative aspect-video group">
        <picture class="w-full h-full">
          ${thumbnailSrcSet}
          <img 
            src="${sortedThumbnails[0]?.url || ""}" 
            alt="${data.info?.title || "Video thumbnail"}"
            width="${sortedThumbnails[0]?.width}"
            height="${sortedThumbnails[0]?.height}"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="eager">
        </picture>
        
        ${duration ? 
        `<div class="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-sm font-medium backdrop-blur-sm">
            ${duration}
          </div>` : ""
        }
      </div>
      
      <div class="meta-container p-6 space-y-4">
        <div class="info-container">
          <h2 class="title text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:line-clamp-none transition-all duration-300">
            ${data.info?.title || "Untitled"}
          </h2>
        </div>
        
        <div class="formats-dropdown-container">
          <label for="formats-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Format
          </label>
          <div class="relative">
            <select 
              class="w-full px-4 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none cursor-pointer transition-colors duration-200"
              id="formats-select">
              ${formatOptions(data)}
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>
        
        <button
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          id="download-button">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          <span>Download</span>
        </button>
      </div>
    </section>
  `;

  mainLogicElement.innerHTML = innerHtml;

  const downloadButton = document.getElementById("download-button");
  downloadButton.addEventListener("click", handleDownload);

  function handleDownload(e) {
    e.preventDefault();
    const formatElement = document.getElementById("formats-select");
    const format = formatElement.value;
    downloadContent(url, format);
  }
}

export default renderResult;