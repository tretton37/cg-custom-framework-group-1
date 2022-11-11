import { HisafeElement } from "./hisafe-element.js";
import hisafe from "./hisafe.js";
import { TodoItem } from "./todo-item.js";

class AppComponentState {
  todoItems: TodoItem[] = [];
}

export class AppComponent extends HisafeElement<AppComponentState> {
  constructor() {
    super(new AppComponentState());
  }

  html(): Node {
    return (
      <div>
        <h1 data-name="henrik">I am a web component!!!!!</h1>
        <p>This is a p</p>
        <input type="text" id="name" />
        <ul>
          {this.state.todoItems.map((todoItem) => (
            <todo-item-component state={todoItem} onDeleteTodoItem={this.deleteItem} />
          ))}
        </ul>
        <button onClick={this.handleClick}>Click me!</button>
      </div>
    );
  }

  deleteItem = (e: CustomEvent) => {
    this.state.todoItems = this.state.todoItems.filter(todoItem => todoItem.id !== e.detail);
    this.render();
  }

  handleClick = () => {
    console.log("clicked it.");
    const input: HTMLInputElement = this.shadowRoot!.getElementById(
      "name"
    ) as HTMLInputElement;
    this.state.todoItems.push({
      isDone: false,
      label: input.value,
      id: Math.random().toString()
    });

    this.render();
  };

}
