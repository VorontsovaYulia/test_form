import doc from './data.json';

// Only for local webserver:

// async function getData() {
//   try {
//     const response = await fetch('./data.json');

//     if (!response.ok) {
//       console.log('Error');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// const doc = await getData();

const formDocument = document.querySelector('.js-form');
const state = document.querySelector('.js-state');
const tableDate = document.querySelector('.js-date');
const tableInfo = document.querySelector('.js-info');
const btnChoose = document.querySelector('.js-choose');
const formModal = document.querySelector('.modal-form');
const buttonModal = document.querySelector('.js-button-modal');

formDocument['document-name'].value = doc.documentName;
formDocument['sender'].value = doc.sender;
formDocument['sender-organization'].value = doc.senderOrgName;
formDocument['recipient'].value = doc.recipient;
formDocument['recipient-organization'].value = doc.recipientOrgName;
formDocument['number'].value = doc.documentNumber;
formDocument['date'].value = doc.date;
formDocument['order-number'].value = doc.orderNumber;
formDocument['sum'].value = doc.sum;
formDocument['full-name'].value = doc.signatoryFullName;
formDocument['email'].value = doc.email;
formDocument['comment'].value = doc.comment;
state.textContent = doc.journalIhfo;
tableDate.textContent = doc.journalDate;
tableInfo.textContent = doc.journalIhfo;

// modal

const modal = document.querySelector('[data-modal]');
const closeModalBtns = document.querySelectorAll('[data-modal-close]');
const openModalBtn = document.querySelector('[data-modal-open]');

function openModal() {
  modal.classList.remove('is-hidden');
  formModal['recipient-modal'].value = '';
  formModal['term'].value = '';
  formModal['drfo'].value = '';
  formModal['end-date'].value = '';
  formModal['full-name-modal'].value = '';
  formModal['publisher'].value = '';
  document.querySelector('#filename').value = '';
  document.querySelector('.js-password').value = '';
  btnChoose.textContent = 'Вибрати або завантажити сертифікат';
}

function closeModal() {
  modal.classList.add('is-hidden');
}

openModalBtn.addEventListener('click', openModal);

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', closeModal);
});

modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('is-hidden')) {
    closeModal();
  }
});

buttonModal.addEventListener('click', signDocument);

function signDocument() {
  if (!formModal['recipient-modal'].value) {
    alert('Завантажте сертифікат');
    return;
  }
  if (!document.querySelector('#filename').value) {
    alert('Виберіть ключ');
    return;
  }
  if (!document.querySelector('.js-password').value) {
    alert('Введіть пароль');
    return;
  }
  closeModal();
  alert('Документ успішно підписано');
}

// filling out the fields

btnChoose.addEventListener('click', getСertificate);

function getСertificate() {
  formModal['recipient-modal'].value = doc.recipient;
  formModal['term'].value = doc.term;
  formModal['drfo'].value = doc.drfo;
  formModal['end-date'].value = doc.endDate;
  formModal['full-name-modal'].value = doc.fullName;
  formModal['publisher'].value = doc.publisher;
  btnChoose.textContent = 'Сертифікат обрано';
}

// input type="file"

document.querySelector('.js-choose-btn').addEventListener('click', function () {
  document.querySelector('#fileInput').click();
});

document.querySelector('#fileInput').addEventListener('change', function () {
  if (this.files.length > 0) {
    document.querySelector('#filename').value = this.files[0].name;
  }
});
