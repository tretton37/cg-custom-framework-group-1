# Session 2: Components and the Web

So far we were able to create an app component using JSX and parse it with `hisafe` function and finally append it into the body.

## Web Components
The framework will be based around web components. You can read more about web component in this [link](https://developer.mozilla.org/en-US/docs/Web/Web_Components).

Each component that we create will extend from `HTMLElement` class. The `connectedCallback` will be called when the component is going to be rendered.

Here is the `TodoItemComponent`, the first step to have todo app.

File: `src/todo-item-component.tsx`

```typescript jsx
import hisafe from './hisafe.js';

export class TodoItemComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  _label: string = 'TEST';
  set label(val: string) {
    this._label = val;
  }
  get label() {
    return this._label;
  }

  connectedCallback() {
    const myElement = <li>{this.label}</li>;
    this.shadowRoot!.appendChild(myElement);
  }
}
```
As simple as is :) , let's move to next step.

Creating the `app-component` that will render whole app and `todo-item-component`

file: `src/app-component.tsx`

```typescript jsx
import hisafe from './hisafe.js';
import { TodoItem } from './todo-item.js';

export class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  todoItems: TodoItem[] = [];

  connectedCallback() {
      const myElement = (
          <div>
              <h1 data-name="henrik">I am a web component!!!!!</h1>
              <p>This is a p</p>
              <ul>
                  { this.todoItems.map(x => <todo-item-component label={x.label} />) }
              </ul>
          </div>
      );

      this.shadowRoot!.innerHTML = "";
      this.shadowRoot!.appendChild(myElement);
  }
}
```

And the interface for todo item, file: `src/todo-item.ts`
```typescript
export interface TodoItem {
    label: string;
    isDone: boolean;
}
```

We need some modifications on `hisafe` function to support parsing props. here we go!

```typescript
export default function hisafe(tagname: string, props: any, ...children: any) {
    const element = document.createElement(tagname);

    if (props) {
        Object.entries(props).forEach(([key, val]) => {
            if (key.startsWith('on')) { 
                // here is for events such as onclick onchange and etc.
                const eventName = key.substring(2).toLowerCase();
                element.addEventListener(eventName, val as any);
            } else {
                element.setAttribute(key, val as string);
                element[key] = val;
            }
        });
    }

    children.forEach((child) => {
        if (typeof child === 'string') {
            element.innerText = child;
        } else if (Array.isArray(child)) {
            element.append(...child)
        } else {
            element.appendChild(child);
        }
    });
    return element;
}
```

## Some actions!
Here we are going to add an input and button to create new todo item!
The final version of `app-component` looks like this:

```typescript jsx
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
                  { this.todoItems.map(x => <todo-item-component label={x.label} />) }
              </ul>
              <button onClick={this.handleClick}>Click me!</button>
          </div>
      );

      this.shadowRoot!.innerHTML = "";
      this.shadowRoot!.appendChild(myElement);
  }
  
}
```

The last step is to register the two web components that we have created.

let's create a bootstrap file: `src/bootstrapper.ts`
```typescript
import {AppComponent} from "./app-component.js";
import {TodoItemComponent} from "./todo-item-component.js";

customElements.define("app-component", AppComponent);
customElements.define("todo-item-component", TodoItemComponent);
```

Call the `app-component` in `public/index.html`
Final version:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <app-component></app-component>
  </body>
  <script src="build/bootstrapper.js" type="module"></script>
</html>
```