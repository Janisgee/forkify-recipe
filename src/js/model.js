import { API_URL } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
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

export const loadRecipe = async function () {
  try {
    const apiUrl = `${API_URL}/5ed6604591c37cdc054bcae1`;

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
    state.search.results = data.data.recipes;
    console.log(state.search.results);
  } catch (err) {
    console.log(err);
  }
};
