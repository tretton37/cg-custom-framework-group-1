import { HisafeElement } from './hisafe-element.js';
import hisafe from './hisafe.js';
import { TodoItem } from './todo-item.js';

export class TodoItemComponent extends HisafeElement<TodoItem> {

  constructor() {
    super({label:'', isDone:false, id: ''});
  }

  html(): Node {
    const myElement = <li>
      <input type="checkbox" onChange={this.handleCheckboxChanged} checked={this.state.isDone} />
      <span style={this.state.isDone ? 'text-decoration:line-through' : ''}>{this.state.label}</span>
      <button onClick={this.handleDelete}>X</button>
    </li>;
    return myElement;
  }

  handleDelete = () => {
    this.dispatchHisafeEvent('deleteTodoItem', this.state.id)
  };

  handleCheckboxChanged = () =>{
    this.state.isDone = !this.state.isDone;
  }
}
