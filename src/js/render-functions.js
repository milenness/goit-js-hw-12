import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(img => `
      <li class="gallery-item">
        <a class="gallery-link" href="${img.largeImageURL}">
          <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
        </a>
        <ul class="info">
          <li class="info-item"><b>Likes</b> <span>${img.likes}</span></li>
          <li class="info-item"><b>Views</b> <span>${img.views}</span></li>
          <li class="info-item"><b>Comments</b> <span>${img.comments}</span></li>
          <li class="info-item"><b>Downloads</b> <span>${img.downloads}</span></li>
        </ul>
      </li>`)
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function showLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.remove('is-hidden');
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.classList.add('is-hidden');
}


export function showLoadMoreButton() {
  const button = document.querySelector('.load-more');
  if (button) button.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  const button = document.querySelector('.load-more');
  if (button) button.classList.add('is-hidden');
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  if (gallery) gallery.innerHTML = '';
}