export {};

const gallery = document.querySelector<HTMLElement>('[data-gallery]');
const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox]');
const lightboxImage = document.querySelector<HTMLImageElement>('[data-lightbox-image]');
const lightboxTitle = document.querySelector<HTMLElement>('[data-lightbox-title]');
const lightboxNote = document.querySelector<HTMLElement>('[data-lightbox-note]');
const lightboxCounter = document.querySelector<HTMLElement>('[data-lightbox-counter]');
const lightboxStage = document.querySelector<HTMLElement>('[data-lightbox-stage]');
const closeButton = document.querySelector<HTMLButtonElement>('[data-close-lightbox]');
const previousButton = document.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
const nextButton = document.querySelector<HTMLButtonElement>('[data-lightbox-next]');

if (gallery && dialog && lightboxImage) {
  const imageButtons = Array.from(gallery.querySelectorAll<HTMLButtonElement>('[data-full]'));
  let currentIndex = 0;
  let openingButton: HTMLButtonElement | null = null;
  let pointerStart: { x: number; y: number } | null = null;

  const renderImage = (requestedIndex: number) => {
    if (!imageButtons.length) return;
    currentIndex = (requestedIndex + imageButtons.length) % imageButtons.length;
    const button = imageButtons[currentIndex];
    const src = button.dataset.full;
    const title = button.dataset.title ?? '天公壇公園照片';
    const note = button.dataset.note ?? '';
    if (!src) return;

    lightboxImage.src = src;
    lightboxImage.alt = title;
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxNote) lightboxNote.textContent = note;
    if (lightboxCounter) lightboxCounter.textContent = `${currentIndex + 1} / ${imageButtons.length}`;

    const nextSrc = imageButtons[(currentIndex + 1) % imageButtons.length]?.dataset.full;
    if (nextSrc) {
      const preload = new Image();
      preload.src = nextSrc;
    }
  };

  const showPrevious = () => renderImage(currentIndex - 1);
  const showNext = () => renderImage(currentIndex + 1);

  const closeLightbox = () => {
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  };

  imageButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      openingButton = button;
      renderImage(index);
      document.documentElement.classList.add('lightbox-open');
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      closeButton?.focus();
    });
  });

  closeButton?.addEventListener('click', closeLightbox);
  previousButton?.addEventListener('click', showPrevious);
  nextButton?.addEventListener('click', showNext);

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeLightbox();
  });

  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeLightbox();
  });

  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('lightbox-open');
    openingButton?.focus();
  });

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  });

  lightboxStage?.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' || (event.target as HTMLElement).closest('button')) return;
    pointerStart = { x: event.clientX, y: event.clientY };
  });

  lightboxStage?.addEventListener('pointerup', (event) => {
    if (!pointerStart || event.pointerType === 'mouse') return;
    const deltaX = event.clientX - pointerStart.x;
    const deltaY = event.clientY - pointerStart.y;
    pointerStart = null;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX > 0) showPrevious();
    else showNext();
  });

  lightboxStage?.addEventListener('pointercancel', () => {
    pointerStart = null;
  });
}
