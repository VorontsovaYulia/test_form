import SlimSelect from 'slim-select';
import { flowers, categories } from '../helpers/flowers';

const container = document.querySelector('.js-gallery');
const selectEL = document.querySelector('.js-gallery-select');

selectEL?.addEventListener('change', onCategoryOptions);

const swiper = new Swiper('.swiper', {
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true,
  },
  touchRatio: 2,
  grabCursor: true,
  keyboard: {
    enabled: true,
    pageUpDown: true,
  },
  initialSlide: 0,
  breakpoints: {
    360: {
      slidesPerView: 1,
      grid: {
        rows: 2,
      },
      spaceBetween: 5,
    },
    768: {
      slidesPerView: 2,
      grid: {
        rows: 2,
      },
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      grid: {
        rows: 2,
      },
      spaceBetween: 30,
    },
    1440: {
      grid: {
        rows: 2,
      },
      spaceBetween: 34,
      slidesPerView: 4,
    },
  },
});

categories.map(category => {
  selectEL?.insertAdjacentHTML(
    'beforeend',
    `<option value="${category}">${category}</option>`
  );
});

new SlimSelect({
  select: '.js-gallery-select',
  settings: {
    showSearch: false,
    openPosition: 'down',
  },
});

create('Бестселлери');

function onCategoryOptions(e) {
  const value = e.currentTarget.value;
  create(value);
}

function create(value) {
  const filteredFlowers = flowers.filter(({ category }) => value === category);
  const markup = filteredFlowers
    .map(
      ({
        id,
        name,
        price,
        photo_1,
        photo_2,
      }) => `<li data-id="${id}" class="gallery-item swiper-slide">

    <div class="gallery-holder">
        <h3 class="gallery-subtitle">${name}</h3>
        <p class="gallery-subtitle">${price} грн</p>
    </div>
    <img
    srcset="${photo_2} 2x"
    src="${photo_1}" alt="${name}" width="274" height="346"/>

</li>`
    )
    .join('');

  if (selectEL) {
    container.innerHTML = markup;
    swiper.update();
    swiper.slideTo(0);
  }
}
