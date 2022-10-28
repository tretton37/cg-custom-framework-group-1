import hisafe from "./hisafe.js";

export default class TodoItemComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const myElement = <li>
                Ok this is lovely todo item!
            </li>
        this.shadowRoot!.appendChild(myElement);
    }
}

customElements.define("todo-item-component", TodoItemComponent);
