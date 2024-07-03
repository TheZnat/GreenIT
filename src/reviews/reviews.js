import infoForReviews from "./reviews.json";
const allIconsClass = "reviews--icon";
const textFroReviewsClass = "reviews__area--text";
const swipeLogoClass = "swipeLogo";

export function switchReviews() {
  function handlerSwitchClick(event) {
    const targetElement = event.target;
    const dataValue = targetElement.dataset.id;
    textFroReviews.innerHTML = `
    <p class="animate__fadeInDown">${infoForReviews[dataValue].textRev}</p> 
    <div class="reviews__text--author animate__fadeInDown">
        <p class="text--author">${infoForReviews[dataValue].author}</p>
        <p>${infoForReviews[dataValue].position}</p>
    </div>`;
    swipeLogo.src = infoForReviews[dataValue].logoUrl;
  }

  let swipeLogo = document.querySelector(`.${swipeLogoClass}`);
  let allIcons = document.querySelectorAll(`.${allIconsClass}`);
  let textFroReviews = document.querySelector(`.${textFroReviewsClass}`);
  Array.from(allIcons).forEach((el) => {
    el.addEventListener("click", handlerSwitchClick);
  });
}
