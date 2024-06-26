import axios from 'axios';
import { searchImg } from './js/pixabay-api.js';
import {
  imgCreated,
  imgTemplate,
  imagesGallery,
} from './js/render-functions.js';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Извлечение элементов
const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const btnLoadMore = document.querySelector('.btn-load-more');

// Добавление обработчиков событий
form.addEventListener('submit', handleSubmit);
btnLoadMore.addEventListener('click', onLoadMore);

// Переменные
let page = 1;
let query = '';
let lightbox;

// Инициализация SimpleLightbox
function initializeLightbox() {
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
}
initializeLightbox();

hideBtnLoadMore();

// Функция поиска изображений
async function handleSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';
  hideBtnLoadMore();
  showLoader();

  page = 1;
  query = event.target.elements.query.value.trim();

  if (!query) {
    hideLoader();
    errNoMatchImg();
    return;
  }

  try {
    const data = await searchImg(query, page);

    if (data.hits.length === 0) {
      errNoMatchImg();
    } else {
      const markup = imgTemplate(data.hits);
      gallery.innerHTML = markup;
      lightbox.refresh();
      showBtnLoadMore();
    }
  } catch {
    errNoMatchImg();
  } finally {
    event.target.reset();
    hideLoader();
  }
}

// Функция загрузки дополнительных изображений
async function onLoadMore() {
  page += 1;
  showLoader();

  try {
    const data = await searchImg(query, page);
    const markup = imgTemplate(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
    SmoothScroll();

    const TotalPages = Math.ceil(data.totalHits / data.hits.length);

    if (page >= TotalPages) {
      hideBtnLoadMore();
      noMoreImg();
    }
  } catch (error) {
    noMoreImg();
  } finally {
    hideLoader();
  }
}

// Вспомогательные функции
function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showBtnLoadMore() {
  btnLoadMore.classList.remove('hidden');
}

function hideBtnLoadMore() {
  btnLoadMore.classList.add('hidden');
}

function errNoMatchImg() {
  iziToast.error({
    message: `Sorry, there are no images matching your search query.`,
    messageColor: '#FAFAFB',
    color: '#EF4040',
    position: 'topRight',
  });
}

function noMoreImg() {
  iziToast.info({
    message: `We're sorry, but you've reached the end of search results.`,
    position: 'topRight',
  });
}

function SmoothScroll() {
  const card = document.querySelector('.img-item');
  const cardHeight = card.getBoundingClientRect().height;
  window.scrollBy({
    left: 0,
    top: cardHeight,
    behavior: 'smooth',
  });
}
