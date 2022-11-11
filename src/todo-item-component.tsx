import { HisafeElement } from './hisafe-element.js';
import hisafe from './hisafe.js';
import { TodoItem } from './todo-item.js';

export class TodoItemComponent extends HisafeElement<TodoItem> {

  constructor() {
    super({label:'', isDone:false, id: ''});
  }

  html(): Node {
    const myElement = <li>{this.state.label}<button onClick={this.handleDelete}>X</button></li>;
    return myElement;
  }

  handleDelete = () => {
    const event = new CustomEvent('deletetodoitem', { detail: this.state.id, composed: true });
    this.dispatchEvent(event);
  };
}
