import View from './View';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = `Successfully uploaded new recipe! :)`;

  _overlay = document.querySelector('.overlay');
  _window = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerHideWindow();
    this._addHandlerShowRecipe();
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const values = [...formData.entries()];
      const data = Object.fromEntries(values);
      console.log(data);
      handler(data);
    });
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerShowRecipe() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  toggleWindow() {
    console.log(this._overlay);
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
}

export default new AddRecipeView();
