import { galleryItems } from './app.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    modalCloseButton: document.querySelector('[data-action="close-lightbox"]'),
    modal: document.querySelector('.js-lightbox'),
    overlay: document.querySelector('.lightbox__overlay'),
    modalImage: document.querySelector('.lightbox__image'),
};

const showImages = galleryItems.reduce(
    (str, { preview, original, description }) =>
        str +
        `<li class="gallery__item">
  
    <a class="gallery__link" href=${original}>
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
    </a>
 
   </li>
`,
    '',
);

function ModalIsOpen(target) {
    refs.modal.classList.add('is-open');
    refs.overlay.addEventListener('click', ModalIsClose);
    window.addEventListener('keydown', onModalPress);
    refs.modalCloseButton.addEventListener('click', ModalIsClose);

    galleryItems.forEach(({ preview, original, description }) => {
        if (target.src === preview) {
            refs.modalImage.src = `${original}`;
            refs.modalImage.alt = `${description}`;
        }
    });
}

function ModalIsClose() {
    refs.modal.classList.remove('is-open');
    refs.modalImage.src = '';
    refs.modalImage.alt = '';
    refs.overlay.removeEventListener('click', ModalIsClose);
    refs.modalCloseButton.removeEventListener('click', ModalIsClose);

}

function onModalPress(event) {
    const target = event;
    if (event.key === 'Escape') {
        ModalIsClose();
    }
}

refs.gallery.insertAdjacentHTML('afterbegin', showImages);

refs.gallery.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;

    if (event.target.nodeName !== 'IMG') {
        return;
    }

    ModalIsOpen(target);
});