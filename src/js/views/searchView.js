class SearchView {
  #parentEl = document.querySelector('.search');

  getQuery() {
    const valInput = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return valInput;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
