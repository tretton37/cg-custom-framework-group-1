import { HisafeElement } from './hisafe-element.js';
import hisafe from './hisafe.js';
import { TodoItem } from './todo-item.js';
import { colors, space, font } from './theme.js';

class AppComponentState {
  todoItems: TodoItem[] = [];
}

export class AppComponent extends HisafeElement<AppComponentState> {
  constructor() {
    super(new AppComponentState());
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
            <input type="text" id="todo-input" class="add-input" />
            <input type="submit" value="Add" class="add-button" />
          </form>

          <ul>
            {this.state.todoItems.map((todoItem) => (
              <todo-item-component
                state={todoItem}
                onDeleteTodoItem={this.deleteItem}
              />
            ))}
          </ul>
        </div>
      </main>
    );
  }

  handleSubmit = (e: Event) => {
    e.preventDefault();

    const input: HTMLInputElement = this.shadowRoot!.getElementById(
      'todo-input'
    ) as HTMLInputElement;
    const label = input.value;

    if (!label) {
      return;
    }

    const newTodoItem: TodoItem = {
      isDone: false,
      label,
      id: Math.random().toString(),
    };
    this.state.todoItems = [...this.state.todoItems, newTodoItem];
  };

  deleteItem = (id: string) => {
    this.state.todoItems = this.state.todoItems.filter(
      (todoItem) => todoItem.id !== id
    );
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
    `;
  };
}
