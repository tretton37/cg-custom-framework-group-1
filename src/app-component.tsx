import { HisafeElement } from './hisafe/hisafe-element.js';
import hisafe from './hisafe/hisafe.js';
import { TodoItem } from './todo-item.js';
import { colors, space, font } from './theme.js';

class AppComponentState {
  todoItems: TodoItem[] = [];
  isLoading = false;
}

export class AppComponent extends HisafeElement<AppComponentState> {
  text = '';

  constructor() {
    super(new AppComponentState());
  }

  async connectedCallback() {
    super.connectedCallback();
    await this.loadItems();
  }

  async loadItems() {
    this.state.isLoading = true;
    // fake delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.state.isLoading = false;
    const items = localStorage.getItem("todoItems");
    if (items) {
      try {
        this.state.todoItems = JSON.parse(items);
      } catch {}
    }
  }

  storeItems() {
    localStorage.setItem("todoItems", JSON.stringify(this.state.todoItems));
  }

  html(): Node {
    return (
      <main class="app">
        <div class="card">
          <h1>ToDo-List</h1>

          <form onSubmit={this.handleSubmit} class="form">
            <label for="todo-input" class="add-label">
              What needs to be done?
            </label>
            <input type="text" id="todo-input" class="add-input" onInput={this.handleTextChanged} />
            <input type="submit" value="Add" class="add-button" />
          </form>
          { this.state.isLoading && <loading-spinner-component /> }
          <ul>
            {this.state.todoItems.map((todoItem) => (
              <todo-item-component
                state={todoItem}
                onDeleteTodoItem={this.deleteItem}
                onToggleTodoItem={this.toggleTodoItem}
              />
            ))}
          </ul>
        </div>
      </main>
    );
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
  }

  deleteItem = (id: string) => {
    this.state.todoItems = this.state.todoItems.filter(
      (todoItem) => todoItem.id !== id
    );
    this.storeItems();
  };

  toggleTodoItem = (id: string) => {
    const item = this.state.todoItems.filter((todoItem) => todoItem.id === id)[0];
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
        font-family: ${font.family};
        font-display: block;
        color: ${colors.text};
        line-height: ${font.lineHeight};
      }

      .app {
        background: ${colors.section};
        min-height: 100vh;
        padding: ${space.xl}  ${space.l};

        display: flex;
        justify-content: center;
        align-items: flex-start
      }
      
      .card {
        background: ${colors.surface};
        padding: ${space.xxl}  ${space.xl};
        box-shadow: 0 ${space.xs}  ${space.s} rgb(0 0 0 / 16%);
        max-width: 35rem;
        width: 100%;
        
        display: grid;
        grid-template-rows: 1fr;
        grid-gap: ${space.xxl};
      }

      h1 {
        color: ${colors.title};
        font-size: ${font.size.l};
        font-weight: bold;
      }

      .form {
        display: grid;
        grid-template: auto 3rem / minmax(10rem, 1fr) minmax(auto, 8rem);
        grid-template-areas: "label label"
          "input submit";
        grid-gap: ${space.l};
      }

      .add-label {
        grid-area: label;
        font-size: ${font.size.s};
        cursor: pointer;
      }

      .add-input {
        grid-area: input;
        font-size: ${font.size.l};
        font-weight: bold;
        padding: ${space.l};
        background-color: ${colors.lightGray};
        color: ${colors.input.text.default};
        border: 0 solid ${colors.input.border.default};
        border-bottom-width: ${space.s};
        outline: none;
        width: 100%;
        transition: all 0.2s ease-out;
        transition-property: color, border-color;
      }

      .add-input:hover,
      .add-input:focus {
        color: ${colors.input.text.hover};
        border-color: ${colors.input.border.hover};
      }

      .add-button {
        grid-area: submit;
        appearance: button;
        cursor: pointer;
        font-size: ${font.size.s};
        color: ${colors.button.text.default};
        background-color: ${colors.button.background.default};
        border: ${space.xs} solid ${colors.button.border.default};
        outline: 0;
        transition: all 0.2s ease-out;
        transition-property: background-color, color, border-color;
      }

      .add-button:hover,
      .add-button:focus {
        background-color: ${colors.button.background.hover};
        color: ${colors.button.text.hover};
        border-color: ${colors.button.border.hover};
      }
      
      .add-button:active {
        background-color: ${colors.button.background.active};
        color: ${colors.button.text.active};
        border-color: ${colors.button.border.active};
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
