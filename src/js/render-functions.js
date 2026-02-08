import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      img => `
    <li class="gallery-item">
      <a class="gallery-link" href="${img.largeImageURL}">
        <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
      </a>
      <ul class="info">
        <li class="info-item">
          <span class="info-label">Likes</span>
          <span class="info-value">${img.likes}</span>
        </li>
        <li class="info-item">
          <span class="info-label">Views</span>
          <span class="info-value">${img.views}</span>
        </li>
        <li class="info-item">
          <span class="info-label">Comments</span>
          <span class="info-value">${img.comments}</span>
        </li>
        <li class="info-item">
          <span class="info-label">Downloads</span>
          <span class="info-value">${img.downloads}</span>
        </li>
      </ul>
    </li>`
    )
    .join('');

  gallery.innerHTML = markup;
  lightbox.refresh();
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoader() {
  const form = document.querySelector('.form');

  const loader = document.createElement('span');
  loader.classList.add('loader');
  form.after(loader);
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.remove();
}
