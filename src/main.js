import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// 1. Створюємо змінні стану
let query = '';
let page = 1;
let totalHits = 0;

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

// 2. Обробник сабміту форми
form.addEventListener('submit', async event => {
  event.preventDefault();

  // Отримуємо значення з поля введення
  query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search query' });
    return;
  }

  // Скидаємо все перед новим пошуком
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  
  await handleFetch();
  event.target.reset(); // Очищаємо форму після пошуку
});

// 3. Обробник кліку на Load More
loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  await handleFetch();
});

// 4. Головна функція для запитів
async function handleFetch() {
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'Sorry, there are no images matching your search query.',
        position: 'topRight',
      });
      return;
    }

    // Відмальовуємо картки
    createGallery(data.hits);

    // ПЕРЕВІРКА: чи показувати кнопку
    if (page * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      if (page > 1) {
        iziToast.info({ message: "We're sorry, but you've reached the end of search results." });
      }
    }

    // ЛОГІКА СКРОЛУ (тільки для наступних сторінок)
    if (page > 1) {
      const card = document.querySelector('.gallery-item');
      const cardHeight = card.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

  } catch (error) {
    iziToast.error({ message: 'Error fetching data. Try again!' });
    console.error(error);
  } finally {
    hideLoader();
  }
}