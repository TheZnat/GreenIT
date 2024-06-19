const GalleryClassName = "gallery";
const GalleryLineClassName = "gallery-line";
const GallerySlideClassName = "gallery-slide";
const GalleryOneSlideClassName = "slide";

export class Gallery {
  constructor(element) {
    this.containerNode = element;
    this.currentSlideWasChanged = false;

    this.currentSlide = 0;
    this.lineNode = this.containerNode.querySelector(
      `.${GalleryLineClassName}`
    );
    this.gapSize = Number(
      window.getComputedStyle(this.lineNode).gap.replace(/\px/g, "")
    );
    this.slideSize = this.containerNode.querySelector(
      `.${GalleryOneSlideClassName}`
    );

    this.size = this.lineNode.childElementCount;
    this.slideNode = Array.from(this.lineNode.children);

    this.setParameters = this.setParameters.bind(this);
    this.setEvents = this.setEvents.bind(this);
    this.resizeGallery = this.resizeGallery.bind(this);
    this.startDrag = this.startDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.dragging = this.dragging.bind(this);
    this.setStylePositions = this.setStylePositions.bind(this);

    this.setParameters();
    this.setEvents();
  }

  // функции

  setParameters() {
    this.coordsContainer = this.slideSize.getBoundingClientRect();
    this.width = this.coordsContainer.width;
    this.maximumX = -(this.size - 1) * (this.width + this.gapSize);
    this.x = -this.currentSlide * (this.width + this.gapSize);
    this.lineNode.style.width = `${(this.width + this.gapSize) * this.size}px`;

    this.slideNode.forEach((slide) => {
      slide.style.width = `${this.width}px`;
    });
  }

  setEvents() {
    this.debounceResizeGallery = debounce(this.resizeGallery);
    window.addEventListener("resize", this.debounceResizeGallery);
    this.lineNode.addEventListener("pointerdown", this.startDrag);
    window.addEventListener("pointerup", this.stopDrag);
    window.addEventListener("pointercancel", this.stopDrag);
  }

  startDrag(event) {
    this.currentSlideWasChanged = false;
    this.clickX = event.pageX;
    this.startX = this.x;
    this.resetStyleTransition();
    window.addEventListener("pointermove", this.dragging);
  }

  stopDrag() {
    window.removeEventListener("pointermove", this.dragging);
    this.x = -this.currentSlide * (this.width + this.gapSize);
    this.setStylePositions();
    this.setStyleTransition();
  }

  dragging(event) {
    this.dragX = event.pageX;
    let dragShift = this.dragX - this.clickX;
    let easing = dragShift / 5;
    this.x = Math.max(
      Math.min(dragShift + this.startX, easing),
      this.maximumX + easing
    );
    this.setStylePositions();

    // смена активного слайда
    if (
      dragShift > 17 &&
      dragShift > 0 &&
      !this.currentSlideWasChanged &&
      this.currentSlide > 0
    ) {
      this.currentSlideWasChanged = true;
      this.currentSlide = this.currentSlide - 1;
    }

    if (
      dragShift < -17 &&
      dragShift < 0 &&
      !this.currentSlideWasChanged &&
      this.currentSlide < this.size - 1
    ) {
      this.currentSlideWasChanged = true;
      this.currentSlide = this.currentSlide + 1;
    }
  }

  resizeGallery() {
    this.setParameters();
  }

  setStylePositions() {
    this.lineNode.style.transform = `translate3d(${this.x}px, 0, 0)`;
  }

  setStyleTransition() {
    this.lineNode.style.transition = `all 0.5s ease 0s`;
  }

  resetStyleTransition() {
    this.lineNode.style.transition = `all 0 ease 0s`;
  }
}

function debounce(func, time = 50) {
  let timer;
  return function (event) {
    clearInterval(timer);
    timer = setTimeout(func, time, event);
  };
}
