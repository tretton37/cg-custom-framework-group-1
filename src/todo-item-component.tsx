import { HisafeElement } from './hisafe-element.js';
import hisafe from './hisafe.js';
import { TodoItem } from './todo-item.js';

interface DeleteEvent extends CustomEvent {
  detail: string 
}

export class TodoItemComponent extends HisafeElement<TodoItem> {

  constructor() {
    super({label:'', isDone:false, id: ''});
  }

  html(): Node {
    const myElement = <li>{this.state.label}<button onClick={this.handleDelete}>X</button></li>;
    return myElement;
  }

  handleDelete = () => {
    this.dispatchHisafeEvent('deleteTodoItem', this.state.id)
  };
}
