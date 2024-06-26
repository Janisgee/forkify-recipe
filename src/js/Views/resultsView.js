import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentEl = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map(result => this._previewMarkup(result));
  }

  _previewMarkup(data) {
    const windowID = window.location.hash.slice(1);
    const isActive = data.id === windowID;

    //TODO : Add recipe and fix this.
    const isUserGenerated = data.isMine;

    return `<li class="preview">
            <a class="preview__link ${
              isActive ? 'preview__link--active' : ''
            }" href="#${data.id}">
              <figure class="preview__fig">
                <img src="${data.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${data.title}</h4>
                <p class="preview__publisher">${data.publisher}</p>
                <div class="preview__user-generated ${
                  isUserGenerated ? '' : 'hidden'
                }">
                
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`;
  }
}

export default new ResultsView();
