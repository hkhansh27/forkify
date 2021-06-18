class RecipeView {
  #parentEl = document.querySelector('.recipe');
  #data;
  render(data) {
    this._data = data;
  }
}

export default new RecipeView();
