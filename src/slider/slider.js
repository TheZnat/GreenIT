const GalleryClassName = "gallery";
const GalleryLineClassName = "gallery-line";
const GallerySlideClassName = "gallery-slide";
const GalleryOneSlideClassName = "slide";

export function Slider(element) {
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

  setEvents();
  setParameters();
  // функции

  function setParameters() {
    let coordsContainer = slideSize.getBoundingClientRect();
    width = coordsContainer.width;
    maximumX = -(size - 1) * (width + gapSize);
    x = -currentSlide * (width + gapSize);
    lineNode.style.width = `${(width + gapSize) * size}px`;

    slideNode.forEach((slide) => {
      slide.style.width = `${width}px`;
    });
  }

  function setEvents() {
    let debounceResizeGallery = debounce(resizeGallery);
    window.addEventListener("resize", debounceResizeGallery);
    lineNode.addEventListener("pointerdown", startDrag);
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);
  }

  function startDrag(event) {
    currentSlideWasChanged = false;
    clickX = event.pageX;
    startX = x;
    resetStyleTransition();
    window.addEventListener("pointermove", dragging);
  }

  function stopDrag() {
    window.removeEventListener("pointermove", dragging);
    x = -currentSlide * (width + gapSize);
    setStylePositions();
    setStyleTransition();
  }

  function dragging(event) {
    dragX = event.pageX;
    dragShift = dragX - clickX;
    let easing = dragShift / 5;
    x = Math.max(Math.min(dragShift + startX, easing), maximumX + easing);
    setStylePositions();

    // смена активного слайда
    if (
      dragShift > 30 &&
      dragShift > 0 &&
      !currentSlideWasChanged &&
      currentSlide > 0
    ) {
      currentSlideWasChanged = true;
      currentSlide = currentSlide - 1;
    }

    if (
      dragShift < -30 &&
      dragShift < 0 &&
      !currentSlideWasChanged &&
      currentSlide < size - 1
    ) {
      currentSlideWasChanged = true;
      currentSlide = currentSlide + 1;
    }
  }

  function resizeGallery() {
    setParameters();
  }

  function debounce(func, time = 50) {
    let timer;
    return function (event) {
      clearInterval(timer);
      timer = setTimeout(func, time, event);
    };
  }

  function setStylePositions() {
    lineNode.style.transform = `translate3d(${x}px, 0, 0)`;
  }

  function setStyleTransition() {
    lineNode.style.transition = `all 0.5s ease 0s`;
  }

  function resetStyleTransition() {
    lineNode.style.transition = `all 0 ease 0s`;
  }
}
