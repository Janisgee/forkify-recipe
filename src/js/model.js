export const state = {
  recipe: {},
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
    const apiUrl =
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcae1';

    const response = await fetch(apiUrl);
    console.log(response);
    const data = await response.json();
    state.recipe = createRecipeObject(data);
    console.log(state.recipe);
  } catch (err) {
    console.error(err);
  }
};
