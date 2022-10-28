import hisafe from "./hisafe.js";

export default class TodoItemComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  setLabel(val: string) {
    this._label = val;
  }

  _label: string = "TEST";
  set label(val: string) { 
    this._label = val;
  }

  connectedCallback() {
    const myElement = <li>{this.getAttribute("label")}</li>;
    this.shadowRoot!.appendChild(myElement);
  }
}

customElements.define("todo-item-component", TodoItemComponent);
