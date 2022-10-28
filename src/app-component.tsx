import hisafe from "./hisafe.js";

export class AppComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const myElement = <div>
            <h1>I am a web component!!!!!</h1>
            <p>This is a p</p>
            </div>
        this.shadowRoot!.appendChild(myElement);
    }
}

customElements.define("app-component", AppComponent);
