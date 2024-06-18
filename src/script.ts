window.addEventListener("load", () => {
  const scale = (el: HTMLElement, x: number, h: number, w: number) => {
    el.style.transform = `scale(${x})`;
    el.style.width = `calc(1/${x} * ${w * x}px)`;
    el.style.height = `calc(1/${x} * ${h * x}px)`;
  };

  var iframe: HTMLIFrameElement;
  setTimeout(() => {
    const submitButton = document.querySelector(
      `[data-testid="exercise-check-answer"]`
    );
    const testContainer = document.querySelector(".task-container");

    if (!submitButton || !testContainer) throw new Error("page not loaded");

    iframe = document.createElement("iframe");

    iframe.src = chrome.runtime.getURL("timer.html");
    iframe.style.position = "absolute";
    iframe.style.top = "-30px";
    iframe.style.right = "-140px";
    scale(iframe, 0.6, 165.2, 500);

    testContainer.append(iframe);
  }, 2000);
  setTimeout(() => {
    const document = iframe.contentDocument;
    const watch = document?.querySelector("#watch") as HTMLElement;
    if (!watch) throw new Error("watch not found");
    let milliseconds = 0;
    let timer: number | undefined;

    function startWatch() {
      watch.classList.remove("paused");
      clearInterval(timer);
      timer = setInterval(() => {
        milliseconds += 10;
        let dateTimer = new Date(milliseconds);
        watch.innerHTML =
          ("0" + dateTimer.getUTCHours()).slice(-2) +
          ":" +
          ("0" + dateTimer.getUTCMinutes()).slice(-2) +
          ":" +
          ("0" + dateTimer.getUTCSeconds()).slice(-2) +
          ":" +
          ("0" + dateTimer.getUTCMilliseconds()).slice(-3, -1);
      }, 10);
    }

    function pauseWatch() {
      watch.classList.add("paused");
      clearInterval(timer);
    }

    function resetWatch() {
      watch.classList.remove("paused");
      clearInterval(timer);
      milliseconds = 0;
      watch.innerHTML = "00:00:00:00";
    }

    document?.addEventListener("click", (e) => {
      const el = e.target as HTMLElement;
      if (el?.id === "start") startWatch();
      if (el?.id === "pause") pauseWatch();
      if (el?.id === "reset") resetWatch();
    });
  }, 10000);
});
