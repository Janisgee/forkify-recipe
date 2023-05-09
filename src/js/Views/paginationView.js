import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);
      const goToPage = btn.dataset.goToPage;
      handler(+goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPerPage = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    console.log(curPage, numPerPage);

    //1) Next Page and more
    if (curPage === 1 && numPerPage > curPage) {
      return this._generateMarkupNextButton(curPage);
    }

    //2) previous page and next page
    if (curPage > 1 && numPerPage > curPage) {
      return (
        this._generateMarkupPreviousButton(curPage) +
        this._generateMarkupNextButton(curPage)
      );
    }

    //3) last page
    if (curPage !== 1 && curPage === numPerPage) {
      return this._generateMarkupPreviousButton(curPage);
    }

    //4) First page and no other page
    if (curPage === 1 && numPerPage === 1) {
      return ``;
    }
  }
  _generateMarkupNextButton(curPage) {
    return `<button class="btn--inline pagination__btn--next" data-go-to-page='${
      curPage + 1
    }'>
             <span>Page ${curPage + 1}</span>
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-right"></use>
             </svg>
           </button>`;
  }
  _generateMarkupPreviousButton(curPage) {
    return `<button class="btn--inline pagination__btn--prev" data-go-to-page='${
      curPage - 1
    }' >
             <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
             </svg>
             <span>Page ${curPage - 1}</span>
           </button>`;
  }
}

export default new PaginationView();
