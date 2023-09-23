(function flexible (window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  setBodyFontSize();

  // set 1rem = viewWidth / 10
  // function setRemUnit() {
  //   var rem = docEl.clientWidth / 24;
  //   docEl.style.fontSize = rem + "px";
  // }

  // setRemUnit();

  function resizeHandler () {
    var clientWidth = docEl.clientWidth;
    var maxWidth = 1920; // 设定固定范围的最大宽度，根据实际情况调整
    var minWidth = 1080;
    docEl.style.fontSize = clientWidth / 24 + 'px';

    // if (clientWidth <= maxWidth && clientWidth >= minWidth) {
    //   // 在固定范围内，使用rem适应窗口大小
    //   docEl.style.fontSize = clientWidth / 24 + 'px';
    // } else if (clientWidth > maxWidth) {
    //   // 超出范围，保持rem不变
    //   docEl.style.fontSize = maxWidth / 24 + 'px';
    // }
    // else {
    //   docEl.style.fontSize = minWidth / 24 + 'px';
    // }
  }
  resizeHandler()

  // reset rem unit on page resize
  // window.addEventListener("resize", setRemUnit);
  window.addEventListener("resize", resizeHandler);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      // setRemUnit();
      resizeHandler();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
