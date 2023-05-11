import { API_URL, RES_PER_PAGE, API_KEY } from './config.js';
import { AJAX } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: RES_PER_PAGE,
  },
};

const createRecipeObject = function (data) {
  let { recipe } = data.data;
  return {
    cookingTime: recipe.cooking_time,
    id: recipe.id,
    image: recipe.image_url,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    ingredients: recipe.ingredients,
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}`);
    state.recipe = createRecipeObject(data);
  } catch (err) {
    console.error('💥⚠️⛔😭👎🏳️', err);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;

    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });

    state.search.page = 1;
  } catch (err) {
    console.error('💥⚠️⛔😭👎🏳️', err);
    throw err;
  }
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });
  state.recipe.servings = newServings;
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * RES_PER_PAGE; //0
  const end = page * RES_PER_PAGE; //9

  return state.search.results.slice(start, end);
};

export const updateSearchPage = function (goToPage) {
  state.search.page = goToPage;
};

export const uploadRecipe = async function (ownRecipeData) {
  try {
    console.log(ownRecipeData);
    const ingredients = Object.entries(ownRecipeData)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        console.log(ingArr);

        const [quantity, unit, description] = ingArr;
        console.log(quantity, unit, description);

        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );

        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      cooking_time: +ownRecipeData.cookingTime,
      image_url: ownRecipeData.image,
      publisher: ownRecipeData.publisher,
      servings: +ownRecipeData.servings,
      source_url: ownRecipeData.sourceUrl,
      title: ownRecipeData.title,
      ingredients: ingredients,
    };
    console.log(recipe);

    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);

    state.recipe = createRecipeObject(data);

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
