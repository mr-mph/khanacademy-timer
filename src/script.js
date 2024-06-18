"use strict";
window.addEventListener("load", () => {
    const scale = (el, x, h, w) => {
        el.style.transform = `scale(${x})`;
        el.style.width = `calc(1/${x} * ${w * x}px)`;
        el.style.height = `calc(1/${x} * ${h * x}px)`;
    };
    var iframe;
    var submitButton;
    var nextQuestionButton;
    setTimeout(() => {
        setInterval(() => {
            nextQuestionButton = document.querySelector(`[data-testid="exercise-next-question"]`);
            if (nextQuestionButton) {
                nextQuestionButton.addEventListener("click", (e) => {
                    console.log("restart timer");
                    const iframeWindow = iframe.contentWindow;
                    iframeWindow === null || iframeWindow === void 0 ? void 0 : iframeWindow.postMessage({ action: "restart" });
                });
            }
            else {
                submitButton = document.querySelector(`[data-testid="exercise-check-answer"]`);
                submitButton.addEventListener("click", (e) => {
                    console.log("pause timer");
                    const iframeWindow = iframe.contentWindow;
                    iframeWindow === null || iframeWindow === void 0 ? void 0 : iframeWindow.postMessage({ action: "pause" });
                });
            }
        }, 1000);
        const testContainer = document.querySelector(".task-container");
        if (!testContainer)
            throw new Error("page not loaded");
        iframe = document.createElement("iframe");
        iframe.src = chrome.runtime.getURL("timer.html");
        iframe.style.position = "absolute";
        iframe.style.top = "-30px";
        iframe.style.right = "-70px";
        scale(iframe, 0.6, 200, 400);
        testContainer.append(iframe);
    }, 2000);
});
