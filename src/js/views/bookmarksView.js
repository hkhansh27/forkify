import icons from 'url:../../img/icons.svg';
import previewView from './previewView';
import View from './View';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark yet. Find a nice recipe and bookmark it!';
  _successMessage = '';

  // addHandler(handler) {
  //   ['hashchange', 'load'].forEach(event => {
  //     window.addEventListener(event, handler);
  //   });
  // }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();