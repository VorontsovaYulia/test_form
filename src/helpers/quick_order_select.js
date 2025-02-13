function setCustomSelect(selectContainerEl, selectItemEl) {
  const numberOfOptions = selectItemEl.length;
  const divForSelectSelectedEl = document.createElement('DIV');
  const divForSelectItemsEl = document.createElement('DIV');

  divForSelectSelectedEl.classList.add('select-selected');
  divForSelectItemsEl.classList.add('select-items', 'select-hide');

  divForSelectSelectedEl.innerHTML =
    selectItemEl.options[selectItemEl.selectedIndex].innerHTML;

  selectContainerEl.appendChild(divForSelectSelectedEl);

  for (let i = 1; i < numberOfOptions; i++) {
    const divOptionEl = document.createElement('DIV');
    divOptionEl.innerHTML = selectItemEl.options[i].innerHTML;
    divOptionEl.addEventListener('click', evt =>
      onClickDivOptionEl(evt, divForSelectSelectedEl)
    );
    divForSelectItemsEl.appendChild(divOptionEl);
  }
  divForSelectItemsEl.lastChild.dataset.id = 'ownVersion';

  selectContainerEl.appendChild(divForSelectItemsEl);

  selectContainerEl.addEventListener('click', evt =>
    onClickAllSelect(evt, divForSelectItemsEl, divForSelectSelectedEl)
  );

  document.addEventListener('click', evt =>
    onClickCloseAllSelect(evt, divForSelectItemsEl, divForSelectSelectedEl)
  );
}

function onClickDivOptionEl(evt, divForSelectSelectedEl) {
  divForSelectSelectedEl.innerHTML = evt.target.innerHTML;
  const sameAsSelectedEl = document.querySelector('.same-as-selected');
  if (sameAsSelectedEl) {
    sameAsSelectedEl.classList.remove('same-as-selected');
  }
  if (evt.target.dataset.id) {
    divForSelectSelectedEl.dataset.id = evt.target.dataset.id;
  }
  if (!evt.target.dataset.id) {
    divForSelectSelectedEl.removeAttribute('data-id');
  }
  evt.target.classList.add('same-as-selected');
}

function onClickAllSelect(evt, divForSelectItemsEl, divForSelectSelectedEl) {
  evt.stopPropagation();
  divForSelectItemsEl.classList.toggle('select-hide');
  divForSelectSelectedEl.classList.toggle('select-arrow-active');
}

function onClickCloseAllSelect(
  evt,
  divForSelectItemsEl,
  divForSelectSelectedEl
) {
  evt.stopPropagation();
  divForSelectItemsEl.classList.add('select-hide');
  divForSelectSelectedEl.classList.remove('select-arrow-active');
}

export { setCustomSelect };
