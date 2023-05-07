import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';

import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultsView from './Views/resultsView.js';
import paginationView from './Views/paginationView.js';

recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    // if (!id) return;
    // 1) Render spinner while loading recipe
    recipeView.renderSpinner();

    // 2) Load recipe
    await model.loadRecipe(id);
    console.log(model.state.recipe);

    // 3) Display recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1) getQuery
    const query = searchView.getQuery();
    console.log(query);

    // 2) Send query to model get search data
    await model.loadSearchResult(query);

    // 3) Send data to resultView
    resultsView.render(model.getSearchResultsPage());

    // 4) Render Pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlServings = function (serving) {
  // 1) Get new servings number
  model.updateServings(serving);

  // 3) Display new recipe with new servings
  recipeView.render(model.state.recipe);
};

const controlPagination = function () {
  paginationView.render(model.getSearchResultsPage(1));
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
