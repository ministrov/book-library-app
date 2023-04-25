import { DivComponent } from "../../common/div-component";
import './pagination.css';

export class Pagination extends DivComponent {
  constructor(parentState) {
    super();
    this.parentState = parentState;
  }

  nextPage() {
    // this.parentState.offset += this.parentState.limit;
    console.log('click next-button');
  }

  render() {
    this.el.classList.add('pagination');
    this.el.innerHTML = `
      <div class="pagination__container">
        <button class="pagination__button" id="prev-button" title="Previous page" aria-label="Previous page">
          <img src="/static/prev.svg"/>
          Предыдущая страница
        </button>

        <div id="pagination__numbers">
          ${this.parentState.offset}
        </div>

        <button  class="pagination__button" id="next-button" title="Next page" aria-label="Next page">
          Следующая страница
          <img src="/static/next.svg"/>
        </button>
      </div>
    `;

    this.el.querySelector('#next-button').addEventListener('click', this.nextPage.bind(this));
    return this.el;
  }
}