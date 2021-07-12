import { galleryItems } from './app.js';


const refs = {
    gallery: document.querySelector('.js-gallery'),
    modalCloseButton: document.querySelector('[data-action="close-lightbox"]'),
    modalOpen: document.querySelector('.js-lightbox'),
    overlay: document.querySelector('.lightbox__overlay'),
    modalImage: document.querySelector('.lightbox__image'),
};
// console.dir(refs);

refs.gallery.insertAdjacentHTML('afterbegin', createGalleryMarkup(galleryItems));

refs.gallery.addEventListener('click', onGalleryCardClick);

function createGalleryMarkup(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
      return `<li class="gallery__item">
    <a
      class="gallery__link"
      href="${original}"
    >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
    </li>`;
  }).join('');
};

function onGalleryCardClick(event) {
  let imageElement;
  const isLinkElement = event.target.classList.contains('gallery__image');
  if (!isLinkElement) {
    return;
  }

  //запретить браузеру переходить по ссылке картинки
  event.preventDefault();

  //получение url большого изображения
  imageElement = event.target;
  //console.log(imageElement);
  const originalImage = imageElement.getAttribute('data-source');
  
  //Подмена значения атрибута src элемента img.lightbox__image.
  refs.modalImage.src = originalImage;

  //открытие модального окна
  onModalOpen();
};

function onModalOpen() {
  refs.modalOpen.classList.add('is-open');
    
// Закрытие модального окна по клику на div.lightbox__overlay.
  refs.overlay.addEventListener('click', onCloseModal);
    
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]
  refs.modalCloseButton.addEventListener('click', onCloseModal);
};

function onCloseModal() {
  refs.modalOpen.classList.remove('is-open');
  refs.overlay.removeEventListener('click', onCloseModal);
  refs.modalCloseButton.removeEventListener('click', onCloseModal);

  // Очистка значения атрибута src элемента img.lightbox__image. Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.
  refs.modalImage.src = '';
};