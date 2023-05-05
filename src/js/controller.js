import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './Views/recipeView.js';

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
  // 1) Render recipe
  await model.loadRecipe();
  console.log(model.state.recipe);

  // 2) Display recipe
  recipeView.render(model.state.recipe);
};

controlRecipe();

// const init = function () {};

// init();
