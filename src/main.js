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

let query = '';
let page = 1;
let totalHits = 0;

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.currentTarget.elements['search-text'].value.trim();

  if (!query) {
    iziToast.warning({ message: 'Please enter a search query' });
    return;
  }

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  
  await handleFetch();
  event.target.reset(); 
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  await handleFetch();
});

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

    createGallery(data.hits);

    if (page * 15 < totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
      
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight'
      });
    }

    if (page > 1) {
      const card = document.querySelector('.gallery-item');
      if (card) {
        const cardHeight = card.getBoundingClientRect().height;
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }
    }

  } catch (error) {
    iziToast.error({ message: 'Error fetching data. Try again!' });
    console.error(error);
  } finally {
    hideLoader();
  }
}