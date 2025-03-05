const mainLogicElement = document.getElementById("main-logic");

function loading() {
  mainLogicElement.innerHTML = `    <section class="loading-section p-4">
      <div class="flex justify-center items-center space-x-2 w-full h-full">
        <span class="sr-only">Loading...</span>
        <span class="rounded-full bg-cyan-500 w-8 h-8 animate-pulse [animation-delay:0s]"></span>
        <span class="rounded-full bg-cyan-500 w-8 h-8 animate-pulse [animation-delay:-0.15s]"></span>
        <span class="rounded-full bg-cyan-500 w-8 h-8 animate-pulse [animation-delay:-0.30s]"></span>
        <span class="rounded-full bg-cyan-500 w-8 h-8 animate-pulse [animation-delay:-0.45s]"></span>
        <span class="rounded-full bg-cyan-500 w-8 h-8 animate-pulse [animation-delay:-0.60s]"></span>
    </div>
    </section>`;
}

export default loading;
