import { setCustomSelect } from '../helpers/quick_order_select';
import { closePopupBtnEl, openPopup, closePopup } from '../js/pop_up_for_order';
import {addQuickOrder} from '../api'

const orderFormEl = document.querySelector('.order-form');
const selectContainerEl = document.querySelector('.js-select-container');
const selectItemEl = document.querySelector('.js-select-item');

setCustomSelect(selectContainerEl, selectItemEl);

const selectSelectedEl = document.querySelector('.select-selected');
const labelOwnVersionEl = selectContainerEl.nextElementSibling;
const optionOwnVersionEl = selectContainerEl.lastElementChild;


optionOwnVersionEl.addEventListener('click', () => {
  if (selectSelectedEl.dataset.id) {
    labelOwnVersionEl.classList.remove('hiddenvisualy');
  }
  if (!selectSelectedEl.dataset.id) {
    labelOwnVersionEl.classList.add('hiddenvisualy');
  }
});

orderFormEl.addEventListener('submit', onSubmit);

function onSubmit(evt) {
  evt.preventDefault();

  const {
    user_name,
    user_phone,
    number_of_bouquets,
    cost,
    reason_own_version,
    user_message,
  } = evt.currentTarget.elements;


  const data = {
    userName: user_name.value,
    userPhone: user_phone.value,
    numberOfBouquets: number_of_bouquets.value,
    cost: cost.value,
    reasonForPurchase: selectSelectedEl.textContent,
    reasonOwnVersion: (selectSelectedEl.dataset.id) ? reason_own_version.value : '',
    message: user_message.value,
  };

  orderFormEl.reset();
  selectSelectedEl.textContent = 'Привід покупки';
  const sameAsSelectedEl = document.querySelector('.same-as-selected');
  sameAsSelectedEl.classList.remove('same-as-selected');
  labelOwnVersionEl.classList.add('hiddenvisualy');
  addQuickOrder(data, openPopup);
  closePopupBtnEl.addEventListener('click', closePopup);
}
