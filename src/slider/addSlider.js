export function addSlider(type) {
  function addHTML(sliderHtml, classNamePointer) {
    const pointerHTML = document.querySelector(`.${classNamePointer}`);
    pointerHTML.innerHTML = sliderHtml;
  }
  let sliderHtml = "";
  if (type === "ios") {
    sliderHtml = `<div class="swiper-container mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide ">
              <div class="slide">
                <img src="/images/Cases-logo/PD.svg" alt="ProfilDoors" class="slide__item__img--iconLogo"
                  loading="lazy">
                <p class="slide__item__title">Интеграция Битрикс</p>
                <a href="./src/pages/page.html">Подробнее</a>
              </div>
            </div>
            <div class="swiper-slide ">
              <div class="slide">
                <img src="/images/Cases-logo/Warmet.svg" alt="Warmet" class="slide__item__img--iconLogo" loading="lazy">
                <p class="slide__item__title">Системное администрирование</p>
                <a href="./src/pages/page.html">Подробнее</a>
              </div>
            </div>
            <div class="swiper-slide ">
              <div class="slide">
                <img src="/images/Cases-logo/Rada.svg" alt="Rada" class="slide__item__img--iconLogo" loading="lazy">
                <p class="slide__item__title">Кейс по лидогенерации</p>
                <a href="./src/pages/page.html">Подробнее</a>
              </div>
            </div>
            <div class="swiper-slide ">
              <div class="slide">
                <img src="/images/Cases-logo/Rada.svg" alt="Rada" class="slide__item__img--iconLogo" loading="lazy">
                <p class="slide__item__title">Кейс по лидогенерации</p>
                <a href="./src/pages/page.html">Подробнее</a>
              </div>
            </div>
          </div>
        </div>
    `;
  } else {
    sliderHtml = `<div class="case__cards" id="gallery">
          <div class="gallery-line">
            <div class="gallery-slide">
              <div class="slide">
                <img src="/images/Cases-logo/PD.svg" alt="ProfilDoors" class="slide__item__img--iconLogo"
                  loading="lazy">
                <p class="slide__item__title">Интеграция Битрикс</p>
                <a href="./src/pages/page.html">Подробнее</a>
              </div>
            </div>
            <div class="gallery-slide">
              <div class="slide">
                <img src="/images/Cases-logo/Warmet.svg" alt="Warmet" class="slide__item__img--iconLogo" loading="lazy">
                <p class="slide__item__title">Системное администрирование</p>
                <a href="./src/pages/page.html">Подробнее</a>
              </div>
            </div>
            <div class="gallery-slide">
              <div class="slide">
                <img src="/images/Cases-logo/Rada.svg" alt="Rada" class="slide__item__img--iconLogo" loading="lazy">
                <p class="slide__item__title">Кейс по лидогенерации</p>
                <a href="./src/pages/page.html">Подробнее</a>
              </div>
            </div>
            <div class="gallery-slide">
              <div class="slide">
                <img src="/images/Cases-logo/Rada.svg" alt="Rada" class="slide__item__img--iconLogo" loading="lazy">
                <p class="slide__item__title">Кейс по лидогенерации</p>
                <a href="./src/pages/page.html">Подробнее</a>
              </div>
            </div>
          </div>
        </div>`;
  }
  addHTML(sliderHtml, "test");
}
