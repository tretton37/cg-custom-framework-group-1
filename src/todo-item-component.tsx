import hisafe from "./hisafe.js";

export default class TodoItemComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  label: string = "TEST";

  connectedCallback() {
    const myElement = <li>{this.label}</li>;
    this.shadowRoot!.appendChild(myElement);
  }
}

customElements.define("todo-item-component", TodoItemComponent);
