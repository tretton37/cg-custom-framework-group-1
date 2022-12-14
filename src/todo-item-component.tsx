import { HisafeElement } from './hisafe/hisafe-element.js';
import hisafe from './hisafe/hisafe.js';
import { TodoItem } from './todo-item.js';

export class TodoItemComponent extends HisafeElement<TodoItem> {
  constructor() {
    super({ label: '', isDone: false, id: '' });
  }

  html(): Node {
    const svg = `<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width="20"
    height="20"
    class="delete-icon">
    <path
      fill="currentColor"
      d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
  </svg>`;

    const myElement = (
      <li class={`item ${this.state.isDone ? 'done' : ''}`}>
        <div className="checkbox">
          <input
            type="checkbox"
            onChange={this.handleCheckboxChanged}
            checked={this.state.isDone}
            id={this.state.id}
          />
        </div>

        <label for={this.state.id} class="text">
          {this.state.label}
        </label>

        <button
          aria-label={`Delete todo '${this.state.label}'`}
          onClick={this.handleDelete}
          class="delete-button"
          innerHTML={svg}></button>
      </li>
    );
    return myElement;
  }

  handleDelete = () => {
    this.dispatchHisafeEvent('deleteTodoItem', this.state.id);
  };

  handleCheckboxChanged = () => {
    this.dispatchHisafeEvent('toggleTodoItem', this.state.id);
  };

  css = () => {
    return `
      *, *:before, *:after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    
      label, button {
        font-family: var(--font-family);
        font-display: block;
        color: var(--color-text);
        line-height: var(--font-line-height);
      }

      .item {
        padding: var(--space-m) 0;
        width: 100%;
        display: grid;
        grid-template-columns: auto 1fr var(--space-xl);
        grid-gap: 1rem;
        align-items: center;
        border-bottom: var(--space-xxs)  solid var(--color-palette-light-gray);
      }

      .checkbox {
        border: var(--space-xs) solid var(--color-palette-light-gray);
        background-color: transparent;
        width: 1.5rem;
        aspect-ratio: 1/1;
        position: relative;
        transition: all 0.2s ease-out;
        transition-property: border-color, background-color;
      }

      .checkbox:before {
        content: '';
        display: block;
        width: 18%;
        height: 65%;
        transform: translate(-50%, -50%) rotate(45deg);
        border-color: transparent;
        border-style: solid;
        border-width: 0 var(--space-xs) var(--space-xs) 0;
        position: absolute;
        top: 46%;
        left: 50%;
        pointer-events: none;
        transition: border-color 0.2s ease-out;
      }

      .done .checkbox {
        background-color: var(--color-palette-light-gray);
      }

      .done .checkbox:before {
        border-color: var(--color-primary);
      }

      .checkbox > input {
        appearance: none;
        display: block;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      .text {
        font-size: var(--font-size-m);
        cursor: pointer;
      }

      .done .text {
        text-decoration: line-through;
      }

      .delete-button {
        appearance: none;
        aspect-ratio: 1/1;
        font-size: var(--font-size-m);
        cursor: pointer;
        color: var(--color-palette-gray);
        background: transparent;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s ease-out;
      }

      .delete-button:hover,
      .delete-button:focus {
        color: var(--color-button-background-hover);
      }
    `;
  };
}
