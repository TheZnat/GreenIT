export function popup() {
  const ButtonNameClass = "bth--porject";
  const WrapperNameClass = "modal-overlay";
  let buttonElements = document.querySelectorAll(`.${ButtonNameClass}`);
  let bodyWrapper = document.body;
  let formHtml2 = `
  <div class="feedback-form feedback-form--modal wow fadeInUp-first">
    <button class="modal__close">&#10006;</button>
    <div class="feedback-form__area">
      <h2 class="feedback-form__leftArea__title">Хотите узнать больше?</h2>
      <p class="feedback-form__leftArea__text">
        Оставьте заявку, и наши специалисты свяжутся с вами в ближайшее время!
        Мы готовы ответить на все ваши вопросы и предоставить подробную информацию
        о наших услугах. для уточнения деталей и консультации. Доверьте свой проект
        профессионалам!
      </p>
    </div>
    <div class="feedback-form__area">
      <p>
        Здесь будет <br />
        форма из Битрекс24
      </p>
    </div>
    <div class="feedback-form--radian"></div>
</div>`;

 let formHtml = `<script data-b24-form="click/13/5pryns" data-skip-moving="true">(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'https://cdn-ru.bitrix24.ru/b25149776/crm/form/loader_13.js');</script>`

  let scrollController = {
    scrollPosition: 0,
    disabledScroll() {
      scrollController.scrollPosition = window.scrollY;
      document.body.style.cssText = `
        overflow: hidden;
        position:fixed;
        top: -${scrollController.scrollPosition}px;
        left:0;
        height: 100vh;
        width: 100vw;
        `;
      // padding-right: ${window.innerWidth - document.body.offsetWidth}px;
    },

    enableScroll() {
      document.body.style.cssText = ``;
      window.scroll({ top: scrollController.scrollPosition });
    },
  };

  function closeModal(event, tempModal) {
    const target = event.target;
    tempModal.classList.add("fade-out");
    if (
      target === tempModal ||
      target.closest(".modal__close") ||
      event.code === "Escape"
    ) {
      tempModal.remove();
      scrollController.enableScroll();
    }
  }

  function OpenModal() {
    wrapElementByDiv(bodyWrapper, WrapperNameClass);
    let tempModal = document.querySelector(`.${WrapperNameClass}`);
    tempModal.addEventListener("click", (event) =>
      closeModal(event, tempModal)
    );
    window.addEventListener("keydown", (event) => closeModal(event, tempModal));
    scrollController.disabledScroll();
  }

  function wrapElementByDiv(element, classNameWrapper) {
    const wrapperNode = document.createElement("div");
    wrapperNode.classList.add(`${classNameWrapper}`);
    wrapperNode.innerHTML = formHtml;
    element.appendChild(wrapperNode);
  }

  buttonElements.forEach((bth) => {
    bth.addEventListener("click", OpenModal);
  });
}
