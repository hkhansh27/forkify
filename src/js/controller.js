import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';

import 'core-js/stable';
import 'regenerator-runtime';

///////////////////////////////////////
//hot module replacement in Parcel
if (module.hot) {
  module.hot.accept();
}
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //0.Rendering spinner to view
    recipeView.renderSpinner();

    //1.Loading recipe in model
    await model.loadRecipe(id);

    //2.Rendering recipe to view
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function () {
  try {
    //1.Get search query
    const query = searchView.getQuery();
    if (!query) return;

    //2.Load search recipes
    await model.loadSearchResult(query);
    //3.Render result
    resultView.render(model.state.search.result);
  } catch (error) {
    throw error;
  }
};

(function () {
  recipeView.addHandler(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
})();
