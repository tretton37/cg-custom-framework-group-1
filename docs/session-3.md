# Session 3 - Refactoring and Reactivity

In the last session, we managed to combine JSX with web components. This gives us a basic foundation, but what we have built hardly qualifies as a framework. For example, the `render()` method sits in the component itself and needs to be called whenever a re-render is needed. We need to hide some of the complexity from the developer, and make it easier to develop components.

## Abstracting away complexity

So the first thing we did was to set up a base class that each component should implement. The base class will help us with a few things:
 - Since it is abstract, it will define what methods must be implemented in a component (in our case, it's `html()` which will render the HTML). You could say that this serves as a hard guideline for the developer.
 - It defines the type of the state model that also will need to be provided, and allows working with the model using the `state` property.
 - It will do some basic plumping, such as attaching to the shadow DOM and render itself. 

The first version of the base class looked like this:

*hisafe-element.ts*
```ts
export abstract class HisafeElement<TState extends object> extends HTMLElement {

    constructor(defaultState:TState) {
        super();
        this.attachShadow({ mode: 'open' });
        this._state = defaultState;
      }

    _state: TState;
    set state(val: TState) {
        this._state = val;
    }
    get state() {
        return this._state;
    }

    connectedCallback() {
        this.render();
    }

    render(){
        const html = this.html();
        this.shadowRoot!.appendChild(html);
    }

    abstract html(): Node;
}
```

Using this base class allows the `TodoItemComponent` to be greatly simplified and it's much more clear what the component actually does once some of the noise is gone:

*todo-item-component.tsx*
```ts
export class TodoItemComponent extends HisafeElement<TodoItem> {

  constructor() {
    super({label:'TEST', isDone:false});
  }

  html(): Node {
    const myElement = <li>{this.state.label}</li>;
    return myElement;
  }
}
```

## Props Down, Events Up

Next step was to try and delete a todo item. While the delete button should sit inside the `TodoItemComponent` itself, the component can hardly delete itself from the list it belongs to as the list is owned by the parent component, `AppComponent`. So what we need to do is to inform the parent component that we would like to be deleted. The typical way of handling communication between web components is to pass data down to child components as properties, and data up to parents using events - or more specifically, the native `CustomEvent`.

In order to provide a better developer experince, we created a utility method in the base class for sending events:

*hisafe-element.tsx*
```ts
dispatchHisafeEvent<T>(name: string, payload: T) {
  const event = new CustomEvent(name, { detail: { isHighSafeEvent: true, payload }, composed: true });
  this.dispatchEvent(event);
}
```

Now, all we need to do in the child component to send an event is simply pass in the name of the event and the payload:

*todo-item-component.tsx*
```ts
html(): Node {
    const myElement = <li>{this.state.label}<button onClick={this.handleDelete}>X</button></li>;
    return myElement;
  }

  handleDelete = () => {
    this.dispatchHisafeEvent('deleteTodoItem', this.state.id)
  };
```

And thanks to some magic in the `hisafe()` method (that handles the JSX) the parent component can subscribe to the event by using the name of the event in the JSX (with the prefix "on"):

*app-component.tsx*
```html
 <todo-item-component state={todoItem} onDeleteTodoItem={this.deleteItem} />
 ```

## Mutation by Proxy

What is still missing is automatic re-rendering when we change the data. What we could use is a way to intercept calls that update the state and simply call `render()` internally. Luckily, we can use the native `Proxy` object for this purpose ([MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)). With `Proxy`, we can use so called "traps" to detect when the state is changed - but still, the proxy is transparent and for the components, it looks like we are still just working with the plain state object, although it's being proxied.

Here is the first draft of the functionality in the base class:

```ts
set state(val: TState) {
  const render = this.render
  const proxy = new Proxy(val, {
    set(target: TState, p: string | symbol, value: any, receiver: any): boolean {
      target[p] = value
      render() // Value set - re-render!
      return true
    },
    get(target: TState, p: string | symbol, receiver: any): any {
      return target[p]
    }
  })
  this._state = proxy;
}
```

So basically, whenever a value is set on the state object, we simply call `render()`. The implementation above is too simple to handle many real-world scenarios but it gets the job done well enough for now.

## Going out in Style

Last step was to simply add a `css()` method in the base class. The method can be overridden by a component that needs to define custom styles. Since we are using web components, and also shadow DOM, almost all CSS will be isolated to the component by default.