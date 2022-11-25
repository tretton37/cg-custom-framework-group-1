import { HisafeElement } from './hisafe/hisafe-element.js';
import hisafe from './hisafe/hisafe.js';
import { TodoItem } from './todo-item.js';

class AppComponentState {
  todoItems: TodoItem[] = [];
  isLoading = false;
}

export class AppComponent extends HisafeElement<AppComponentState> {
  text = '';

  constructor() {
    super(new AppComponentState());
  }

  html(): Node {
    return (
      <main class="app">
        <div class="card">
          <h1>Todo-List</h1>

          <form onSubmit={this.handleSubmit} class="form">
            <label for="todo-input" class="add-label">
              What needs to be done?
            </label>
            <input
              type="text"
              id="todo-input"
              class="add-input"
              onInput={this.handleTextChanged}
            />
            <input type="submit" value="Add" class="add-button" />
          </form>

          {this.state.isLoading && <loading-spinner-component />}

          {!!this.state.todoItems.length && (
            <ul>
              {this.state.todoItems.map((todoItem) => (
                <todo-item-component
                  state={todoItem}
                  onDeleteTodoItem={this.deleteItem}
                  onToggleTodoItem={this.toggleTodoItem}
                />
              ))}
            </ul>
          )}
        </div>
      </main>
    );
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadItems();
  }

  async loadItems() {
    this.state.isLoading = true;
    // fake delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    this.state.isLoading = false;
    const items = localStorage.getItem('todoItems');
    if (items) {
      try {
        this.state.todoItems = JSON.parse(items);
      } catch {}
    }
  }

  storeItems() {
    localStorage.setItem('todoItems', JSON.stringify(this.state.todoItems));
  }

  handleSubmit = (e: Event) => {
    e.preventDefault();

    if (!this.text) {
      return;
    }

    const newTodoItem: TodoItem = {
      isDone: false,
      label: this.text,
      id: Math.random().toString(),
    };
    this.state.todoItems = [...this.state.todoItems, newTodoItem];
    this.storeItems();
    this.text = '';
  };

  handleTextChanged = (e: Event) => {
    this.text = (e.target as HTMLInputElement).value;
  };

  deleteItem = (id: string) => {
    this.state.todoItems = this.state.todoItems.filter(
      (todoItem) => todoItem.id !== id
    );
    this.storeItems();
  };

  toggleTodoItem = (id: string) => {
    const item = this.state.todoItems.filter(
      (todoItem) => todoItem.id === id
    )[0];
    item.isDone = !item.isDone;
    this.storeItems();
  };

  css = () => {
    return `
      *, *:before, *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      h1, label, input {
        font-family: var(--font-family);
        font-display: block;
        color: var(--color-text);
        line-height: var(--font-line-height);
      }

      .app {
        --_app-space-y: var(--space-xl);
        
        background: var(--color-section);
        min-height: 100vh;
        padding: var(--_app-space-y)  var(--space-l);

        display: flex;
        justify-content: center;
        align-items: flex-start
      }
      
      .card {
        background: var(--color-surface);
        padding: var(--space-xxl)  var(--space-xl);
        box-shadow: 0 var(--space-xs)  var(--space-s) rgb(0 0 0 / 16%);
        max-width: 35rem;
        width: 100%;
        min-height: calc(100vh - var(--_app-space-y) * 2);
        
        display: flex;
        flex-direction: column;
        gap: var(--space-xxl);
      }

      h1 {
        color: var(--color-title);
        font-size: var(--font-size-l);
        font-weight: bold;
      }

      .form {
        display: grid;
        grid-template: auto 3rem / minmax(10rem, 1fr) minmax(auto, 8rem);
        grid-template-areas: "label label"
          "input submit";
        grid-gap: var(--space-l);
      }

      .add-label {
        grid-area: label;
        font-size: var(--font-size-s);
        cursor: pointer;
      }

      .add-input {
        grid-area: input;
        font-size: var(--font-size-l);
        font-weight: bold;
        padding: var(--space-l);
        background-color: var(--color-input-background);
        color: var(--color-input-text);
        border: 0 solid var(--color-input-border);
        border-bottom-width: var(--space-s);
        outline: none;
        width: 100%;
        transition: all 0.2s ease-out;
        transition-property: background-color, color, border-color;
      }

      .add-input:hover,
      .add-input:focus {
        background-color: var(--color-input-background-hover);
        color: var(--color-input-text-hover);
        border-color: var(--color-input-border-hover);
      }

      .add-button {
        grid-area: submit;
        appearance: button;
        cursor: pointer;
        font-size: var(--font-size-s);
        color: var(--color-button-text);
        background-color: var(--color-button-background);
        border: var(--space-xs) solid var(--color-button-border);
        outline: 0;
        transition: all 0.2s ease-out;
        transition-property: background-color, color, border-color;
      }

      .add-button:hover,
      .add-button:focus {
        background-color: var(--color-button-background-hover);
        color: var(--color-button-text-hover);
        border-color: var(--color-button-border-hover);
      }
      
      .add-button:active {
        background-color: var(--color-button-background-active);
        color: var(--color-button-text-active);
        border-color: var(--color-button-border-active);
      }      

      .list {
        list-style: none;
        display: grid;
        grid-template-columns: 1fr;
      }

      loading-spinner-component {
        display: flex;
        justify-content: center;
      }
    `;
  };
}
