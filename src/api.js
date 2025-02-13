const BASE_URL = 'https://676ca9ac0e299dd2ddfd3e48.mockapi.io/order/quick-order';

const popupDescriptionSuccess =
  '<p class="popup-desc">Дякуємо за замовлення.</p><p class="popup-desc">Очікуйте на дзвінок від менеджера.</p>';

const popupDescriptionError =
  '<p class="popup-desc">На жаль, сталася помилка.</p><p class="popup-desc">Спробуйте ще раз.</p>';

async function addQuickOrder(data, openPopup) {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  try {
    const resp = await fetch(`${BASE_URL}`, options);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    openPopup(popupDescriptionSuccess);
    const data = await resp.json();
  } catch (_) {
    openPopup(popupDescriptionError);
  }
}

export { addQuickOrder };