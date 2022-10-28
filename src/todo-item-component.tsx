import hisafe from './hisafe.js';

export class TodoItemComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  _label: string = 'TEST';
  set label(val: string) {
    this._label = val;
  }
  get label() {
    return this._label;
  }

  connectedCallback() {
    const myElement = <li>{this.label}</li>;
    this.shadowRoot!.appendChild(myElement);
  }
}
