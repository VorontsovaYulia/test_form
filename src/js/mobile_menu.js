const bodyScrollLock = require('body-scroll-lock');

const mobileMenu = document.querySelector('.js-menu-container');
const openMenuBtn = document.querySelector('.js-open-menu');
const closeMenuBtn = document.querySelector('.js-close-menu');
const closeMenuLink = document.querySelector('.js-close-link');
const backdropEl = document.querySelector('.js-backdrop');

openMenuBtn.addEventListener('click', toggleMenu);
openMenuBtn.addEventListener('click', onModalOpen);
closeMenuBtn.addEventListener('click', toggleMenu);
closeMenuLink.addEventListener('click', onLinkClose);
backdropEl.addEventListener('click', onBackdropClick);

function toggleMenu() {
  const isMenuOpen =
    openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
  openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
  mobileMenu.classList.toggle('is-open');
  const scrollLockMethod = !isMenuOpen
    ? 'disableBodyScroll'
    : 'enableBodyScroll';
  bodyScrollLock[scrollLockMethod](document.body);

  backdropEl.classList.contains('is-open')
    ? setTimeout(() => {
        backdropEl.classList.remove('is-open');
      }, 1000)
    : backdropEl.classList.add('is-open');
}

window.matchMedia('(min-width: 1024px)').addEventListener('change', e => {
  if (!e.matches) return;
  mobileMenu.classList.remove('is-open');
  openMenuBtn.setAttribute('aria-expanded', false);
  bodyScrollLock.enableBodyScroll(document.body);
  setTimeout(() => {
    backdropEl.classList.remove('is-open');
  }, 1000);
});

function onModalOpen() {
  window.addEventListener('keydown', onEscKeyPress, { passive: true });
}

function onModalRemove() {
  window.removeEventListener('keydown', onEscKeyPress);
  toggleMenu();
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onModalRemove();
  }
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    onModalRemove();
  }
}

function onLinkClose(event) {
  if (event.target.nodeName === 'A') {
    onModalRemove();
  }
}
