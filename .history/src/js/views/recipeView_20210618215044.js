class RecipeView {
  #parentEl = document.querySelector('.recipe');
  _data;
  render(data) {
    this._data = data;
  }
}

export default new RecipeView();
