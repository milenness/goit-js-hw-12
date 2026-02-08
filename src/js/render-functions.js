import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function imageTemplate(img) {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${img.largeImageURL}">
        <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
      </a>
      <div class="info">
        <p><b>Likes:</b> ${img.likes}</p>
        <p><b>Views:</b> ${img.views}</p>
        <p><b>Comments:</b> ${img.comments}</p>
        <p><b>Downloads:</b> ${img.downloads}</p>
      </div>
    </li>`;
}

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(imageTemplate).join('');
  gallery.innerHTML = markup;

  lightbox.refresh();
}

export function showLoader() {
  const form = document.querySelector('.form');
  const loaderHtml = '<span class="loader"></span>';
  form.insertAdjacentHTML('afterend', loaderHtml);
}

export function hideLoader() {
  const loader = document.querySelector('.loader');
  if (loader) loader.remove();
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}
