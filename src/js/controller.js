import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';

import 'core-js/stable';
import 'regenerator-runtime';

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    //0.Rendering spinner to view
    recipeView.renderSpinner();

    //0.Update results view to mark selected search result
    //event hash changed -> controlRecipes re-render -> resultView updated
    resultView.update(model.getSearchResultsPage());

    //1.Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    //2.Loading recipe in model
    await model.loadRecipe(id);

    //3.Rendering recipe to view
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
    resultView.render(model.getSearchResultsPage());

    //4.Render initial pagination btns
    paginationView.render(model.state.search);
  } catch (error) {
    throw error;
  }
};

const controlPagination = function (toPage = 1) {
  //1.Render result
  resultView.render(model.getSearchResultsPage(toPage));

  //2.Render initial pagination btns
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the underlying data (in state)
  model.updateServings(newServings);

  //Update the recipe view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  //1.Add/remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  //2.Update recipe view
  recipeView.update(model.state.recipe);

  //3.Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

(function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandler(controlRecipes);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
})();
