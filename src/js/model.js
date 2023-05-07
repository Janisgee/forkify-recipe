import { API_URL, RES_PER_PAGE } from './config.js';

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
    console.log(id);
    const apiUrl = `${API_URL}${id}`;

    const response = await fetch(apiUrl);

    const data = await response.json();
    state.recipe = createRecipeObject(data);
  } catch (err) {
    console.error('💥⚠️⛔😭👎🏳️', err);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    console.log(query);

    const apiUrl = `${API_URL}?search=${query}`;
    const response = await fetch(apiUrl);

    const data = await response.json();
    console.log(data);
    console.log(data.data.recipes);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });
  } catch (err) {
    console.error('💥⚠️⛔😭👎🏳️', err);
    throw err;
  }
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    console.log(ing);
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
