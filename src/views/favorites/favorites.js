import { AbstractView } from "../../common/view";
import { CardList } from "../../components/card-list/card-list";
import { Header } from "../../components/header/header";
import onChange from "on-change";

export class FavoritesView extends AbstractView {
  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle('Мои книги');
  }

  destroy() {
    // Отписка от того чтобы следить за объектом на другой странице
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    if (path === 'favorites') {
      this.render();
    }
  }

  render() {
    const favorites = document.createElement('div');
    favorites.innerHTML = `
      <h2>Избранное - ${this.appState.favorites.length}</h2>
    `
    favorites.append(new CardList(this.appState, { list: this.appState.favorites}).render());
    this.app.innerHTML = '';
    this.app.append(favorites);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}