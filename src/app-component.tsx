import hisafe from './hisafe.js';

export class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  handleClick() {
    console.log('clicked it.');
  }

  connectedCallback() {
    const myElement = (
      <div>
        <h1 data-name="henrik">I am a web component!!!!!</h1>
        <p>This is a p</p>
        <ul>
          <todo-item-component label="item1" />
          <todo-item-component label="item2" />
          <todo-item-component label="item3" />
          <todo-item-component label="item4" />
        </ul>
        <button onClick={this.handleClick}>Click me!</button>
      </div>
    );
    this.shadowRoot!.appendChild(myElement);
  }
}
