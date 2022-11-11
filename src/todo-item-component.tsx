import { HisafeElement } from './hisafe-element.js';
import hisafe from './hisafe.js';
import { TodoItem } from './todo-item.js';

export class TodoItemComponent extends HisafeElement<TodoItem> {

  constructor() {
    super({label:'TEST', isDone:false});
  }

  html(): Node {
    const myElement = <li>{this.state.label}</li>;
    return myElement;
  }
}
