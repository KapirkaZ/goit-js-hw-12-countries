import refs from './image-search';
const { loadMoreBtnRef } = refs;

// Methods to manupulate the Load more button
export default {
  show() {
    loadMoreBtnRef.classList.remove('is-hidden');
  },
  hide() {
    loadMoreBtnRef.classList.add('is-hidden');
  },
  enable() {
    loadMoreBtnRef.disabled = false;
    loadMoreBtnRef.textContent = 'Load more';
  },
  disable() {
    loadMoreBtnRef.disabled = true;
    loadMoreBtnRef.textContent = 'On the way...';
  },
};
