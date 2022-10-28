import hisafe from './hisafe.js';
import { TodoItem } from './todo-item.js';

export class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  todoItems: TodoItem[] = [];

  handleClick = () => {
    console.log('clicked it.');
    this.todoItems.push({ 
        isDone: false,
        label: "Dummy"
     });

     this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const myElement = (
        <div>
          <h1 data-name="henrik">I am a web component!!!!!</h1>
          <p>This is a p</p>
          <ul>
            { this.todoItems.map(x => <todo-item-component label={x.label} />) }
          </ul>
          <button onClick={this.handleClick}>Click me!</button>
        </div>
      );
      
      this.shadowRoot!.innerHTML = "";
      this.shadowRoot!.appendChild(myElement);
  }
}
