import icons from 'url:../../img/icons.svg';
import View from './View';
import previewView from './previewView';

class ResultView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipies found for your query. Please try again!';
  _successMessage = '';

  // addHandler(handler) {
  //   ['hashchange', 'load'].forEach(event => {
  //     window.addEventListener(event, handler);
  //   });
  // }
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultView();
