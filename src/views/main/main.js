import { AbstractView } from "../../common/view";

export class MainView extends AbstractView {
  constructor() {
    super();
    this.setTitle('Поиск книг');
  }

  render() {
    const main = document.createElement('div');
    main.innerHTML = 'Тест';
    this.app.append(main);
  }
}