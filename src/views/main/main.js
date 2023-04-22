import { AbstractView } from "../../common/view";
import { CardList } from "../../components/card-list/card-list";
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import onChange from "on-change";

export class MainView extends AbstractView {
  state = {
    list: [],
    numFound: 0,
    loading: false,
    searchQuery: undefined,
    offset: 0
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle('Поиск книг');
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

  async stateHook(path) {
    if (path === 'searchQuery') {
      this.state.loading = true;
      const data = await this.loadList(this.state.searchQuery, this.state.offset);
      this.state.loading = false;
      this.state.numFound = data.numFound;
      this.state.list = data.docs;
    }

    if (path === 'list' || path === 'loading') {
      this.render();
    }
  }

  async loadList(query, offset) {
    const res = await fetch(`http://openlibrary.org/search.json?q=${query}&offset=${offset}`);

    return res.json();
  }

  render() {
    const main = document.createElement('div');
    main.innerHTML = `
      <h2>Найдено книг – ${this.state.numFound}</h2>
    `
    main.append(new Search(this.state).render());
    main.append(new CardList(this.appState, this.state).render());
    this.app.innerHTML = '';
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}