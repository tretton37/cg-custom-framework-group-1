# Competence Group Web Technologies: Ecosystems

- Are you suffering from JS framework fatigue?

- Are you tired of jumping from one framework to the next?

- Do you think that modern JS frameworks are too large and difficult to understand?

Great! Then `hisafe` should be just the right framework for you! 

`hisafe` is a new kind of minimal framework that does away with legacy code, is standards-compliant, and keeps your app's performance blazingly fast even at massive scale*.

By using `hisafe` in your next project, you can ensure massive success, staying under budget and over delivering**.

### Stay `hi`.
### Stay `safe`.

---

<sub>* `hisafe` does not really contain any new concepts and has only been tested at minimal scale.</sub><br>
<sub>** You would be crazy to use this framework in production.</sub>

# Features

- Custom elements, based on native Web Components
- Style isolation thanks to Shadow DOM
- JSX syntax for improved developer experience
- Strong typing with TypeScript
- No dependencies, apart from TypeScript compiler

<img src="docs/static/images/final.apng">

# Quick Start

1. Create a new folder for the project

2. Open a terminal, navigate to the folder, and run these commands:

```
npm init
npm install tretton37/cg-custom-framework-group-1
npm install typescript --save-dev
npm install serve --save-dev
npm pkg set scripts.build=tsc
npm pkg set scripts.serve=serve
```

3. In the root of the folder, create the file `tsconfig.json` with these contents:
``` json
{
    "compilerOptions": {
        "target": "ES2022",
        "jsx": "react",
        "jsxFactory": "hisafe"
    }
}
```

4. Now that we have the basics set up, we will create our first component. In the root of the folder, create the file `app-component.tsx` with these contents:

``` js
import { HisafeElement } from './node_modules/cg-framework/src/hisafe/hisafe-element.js';
import hisafe from './node_modules/cg-framework/src/hisafe/hisafe.js'

interface AppComponentState { text: string; }
export class AppComponent extends HisafeElement<AppComponentState> {
  constructor() {
    super({ text: 'Hello hisafe!' });
  }

  clickHandler = () => {
    this.state.text += '!';
  }

  html(): Node {
    return (<div>
        <h1>{this.state.text}</h1>
        <button onClick={this.clickHandler}>Click me!</button>
      </div>);
  }

  css = () => {
    return `h1 {
      color: #0d6efd;
    }`;
  }
}

customElements.define('app-component', AppComponent);
```

5. We also need a basic `html` file that references the component. In the root of the folder, create the file `index.html` with these contents:

``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My hisafe app</title>
    <script type="module" src="app-component.js"></script>
</head>
<body>
    <app-component></app-component>
</body>
</html>
```

6. With the terminal, run these scripts:

```
npm run build
npm run serve
```

7. Open a web browser and point to the URL shown, default: http://localhost:3000

# Concepts

At the heart of `hisafe` is the `HisafeElement`. This abstract base class serves as the basis for each component. To create a component, simply perform these steps:
1. Create a new class for the component.
2. Define a state model for the component. This can typically be a class or an interface and will contain the data that will trigger re-renders when updated.
3. In the component class, inherit from `HisafeElement` by using the `extends` keyword. As the generic type, set it to the state model type.
4. In the constructor, pass in a default state model to the `super` class.
5. Implement the `html` method and return the JSX that should render the HTML of the component.

## Handling state

The state that will affect re-rendering is accessible in the component using `this.state`. Whenever a value is set in this object, the component will re-render. Note that while the state can be mutated directly (i.e. we generally don't have to create a copy of the state when updating it), even when using complex types, the value actually need to be set - so when using arrays, using methods such as `push` will not update the state. Instead, the reference to the array needs to be replaced, typically by using the spread operator:

```js
this.state.myArray = [...this.state.myArray, newItem];
```

The state can be passed on to a child component by using the special attribute `state`:
``` html
<child-component state={someData} />
```

## CSS

To define CSS for the component, override the `css` method from the base class and return the CSS as a plain string (typically a template literal).

`hisafe` uses web components and the [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). This means that styles in the component (as well as the DOM in the component itself) are isolated from the styles of the rest of the page.

## Events from child components

In order to communicate up to a parent component, we can use the `dispatchHisafeEvent` method which is defined in the base class. So the child component specifies the name of the event and the payload:
```js
this.dispatchHisafeEvent('somethingHappened', this.state.id);
```
And the parent component can subscribe to that event by using the same event name (prefixed with "on") and a handler method that will accept the payload as a parameter:
```html
<child-component onSomethingHappened={this.handleSomething} />
```
```js
handleSomething = (id: string) => {
  // do something
};
```

# Known bugs

Yes.

# Moar docs

Don't miss the whole story about the [creation of this framework](docs/index.md)!