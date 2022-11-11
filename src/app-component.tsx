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
    const input: HTMLInputElement = this.shadowRoot!.getElementById('name') as HTMLInputElement
    this.todoItems.push({ 
        isDone: false,
        label: input.value
     });

     this.connectedCallback();
  }

  deleteItem = () => {
      this.todoItems.pop()
      this.connectedCallback()
  }

  connectedCallback() {
      const myElement = (
          <div>
              <h1 data-name="henrik">I am a web component!!!!!</h1>
              <p>This is a p</p>
              <input type="text" id="name"/>
              <button onclick={this.deleteItem}>X</button>
              <ul>
                  { this.todoItems.map(todoItem => <todo-item-component state={todoItem} />) }
              </ul>
              <button onClick={this.handleClick}>Click me!</button>
          </div>
      );

      this.shadowRoot!.innerHTML = "";
      this.shadowRoot!.appendChild(myElement);
  }

  render() {

  }
}
