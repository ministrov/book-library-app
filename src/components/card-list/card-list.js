import { DivComponent } from "../../common/div-component";
import './card-list.css';

export class CardList extends DivComponent {
  constructor(appState, parentState) {
    super();
    this.appState = appState;
    this.parentState = parentState;
  }

  render() {
    if (this.parentState.loading) {
      this.el.innerHTML = `<div class="card_list--loader">Загрузка...</div>`;
      return this.el;
    }
    this.el.classList.add('card_list');
    this.el.innerHTML = `
      <h2>Найдено книг – ${this.parentState.list.length}</h2>
    `
    return this.el;
  }
}