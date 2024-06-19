const GalleryClassName = "gallery";
const GalleryLineClassName = "gallery-line";
const GallerySlideClassName = "gallery-slide";
const GalleryOneSlideClassName = "slide";

export let Slider = (element) => {
  let eventDown;
  let eventUp;
  let eventCancel;
  let eventMove;

  if (!navigator.platform.match(/iPhone|iPod|iPad/)) {
    eventDown = "pointerdown";
    eventUp = "pointerup";
    eventCancel = "pointercancel";
    eventMove = "pointermove";
  } else {
    eventDown = "touchstart";
    eventUp = "touchend";
    eventCancel = "touchcancel";
    eventMove = "touchmove";
  }

  let containerNode = element;
  let currentSlide = 0;
  let lineNode = containerNode.querySelector(`.${GalleryLineClassName}`);
  let gapSize = Number(
    window.getComputedStyle(lineNode).gap.replace(/\px/g, "")
  );
  let slideSize = containerNode.querySelector(`.${GalleryOneSlideClassName}`);

  let x;
  let startX;
  let width;
  let clickX;
  let dragX;
  let dragShift;
  let maximumX;

  let currentSlideWasChanged = false;
  let size = lineNode.childElementCount;
  let slideNode = Array.from(lineNode.children);

  // функции

  let setParameters = () => {
    let coordsContainer = slideSize.getBoundingClientRect();
    width = coordsContainer.width;
    maximumX = -(size - 1) * (width + gapSize);
    x = -currentSlide * (width + gapSize);
    lineNode.style.width = `${(width + gapSize) * size}px`;

    slideNode.forEach((slide) => {
      slide.style.width = `${width}px`;
    });
  };

  let setEvents = () => {
    let debounceResizeGallery = debounce(resizeGallery);
    window.addEventListener("resize", debounceResizeGallery);
    lineNode.addEventListener(`${eventDown}`, startDrag, { passive: false });
    window.addEventListener(`${eventUp}`, stopDrag, { passive: false });
    window.addEventListener(`${eventCancel}`, stopDrag, { passive: false });
  };

  let startDrag = (event) => {
    // event.stopPropagation();
    // event.preventDefault();
    currentSlideWasChanged = false;
    clickX = event.pageX;
    startX = x;
    resetStyleTransition();
    window.addEventListener(`${eventMove}`, dragging);
  };

  let stopDrag = () => {
    // event.stopPropagation();
    // event.preventDefault();
    window.removeEventListener(`${eventMove}`, dragging);
    x = -currentSlide * (width + gapSize);
    setStylePositions();
    setStyleTransition();
  };

  let dragging = (event) => {
    // event.stopPropagation();
    // event.preventDefault();
    dragX = event.pageX;
    dragShift = dragX - clickX;
    let easing = dragShift / 5;
    x = Math.max(Math.min(dragShift + startX, easing), maximumX + easing);
    setStylePositions();

    // смена активного слайда
    if (
      dragShift > 17 &&
      dragShift > 0 &&
      !currentSlideWasChanged &&
      currentSlide > 0
    ) {
      currentSlideWasChanged = true;
      currentSlide = currentSlide - 1;
    }

    if (
      dragShift < -17 &&
      dragShift < 0 &&
      !currentSlideWasChanged &&
      currentSlide < size - 1
    ) {
      currentSlideWasChanged = true;
      currentSlide = currentSlide + 1;
    }
  };

  let resizeGallery = () => {
    setParameters();
  };

  let debounce = (func, time = 50) => {
    let timer;
    return function (event) {
      clearInterval(timer);
      timer = setTimeout(func, time, event);
    };
  };

  let setStylePositions = () => {
    const translate = `translate(${x}px, 0)`;
    lineNode.style.transform = translate;
    lineNode.style.webkitTransform = translate; // Для Safari и старых версий Chrome и Android браузеров
    lineNode.style.mozTransform = translate; // Для старых версий Firefox
    lineNode.style.msTransform = translate; // Для старых версий Internet Explorer
    lineNode.style.oTransform = translate;
  };

  let setStyleTransition = () => {
    let transitionValue = "all 0.5s ease 0s";
    lineNode.style.transition = transitionValue;
    lineNode.style.webkitTransition = transitionValue; // Для Safari и старых версий Chrome и Android браузеров
    lineNode.style.mozTransition = transitionValue; // Для старых версий Firefox
    lineNode.style.msTransition = transitionValue; // Для старых версий Internet Explorer
    lineNode.style.oTransition = transitionValue; // Для старых версий Opera
  };

  let resetStyleTransition = () => {
    let transitionResetValue = "all 0 ease 0s";
    lineNode.style.transition = transitionResetValue;
    lineNode.style.webkitTransition = transitionResetValue; // Для Safari и старых версий Chrome и Android браузеров
    lineNode.style.mozTransition = transitionResetValue; // Для старых версий Firefox
    lineNode.style.msTransition = transitionResetValue; // Для старых версий Internet Explorer
    lineNode.style.oTransition = transitionResetValue; // Для старых версий Opera
  };

  setEvents();
  setParameters();
};
