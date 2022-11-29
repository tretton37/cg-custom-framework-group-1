# Session 1 - Make Something That Does Something

**So first meet our team!**
- Henrik Ljungdahl
- Ivan Tsud
- Simon Oskarsson
- Andre Brdoch
- Farhad Mehryari
- Erik Moberg (lead)

## Let's get started!
We choose `hisafe` as name of our framework (using the first letter of each of our names).

As we decided to move with typescript, so first we need to install typescript package.

`npm install -g typescript`

Create `src/hisafe.ts` file with following content for parsing the JSX:

```typescript
export default function hisafe(tagname: string, props: any, children: any) {
    // this is for parsing the components
    // let's change the any types later :)
}
```

`src/index.tsx`
```typescript jsx
export default function Component(){
	return (
		<h1>Hello world</h1>
	)
}
```

run this command to generate typescript config file.

`tsc --init`

add this script as a build command into `package.json` file
```json
{
	"scripts": {
		"build": "tsc --build tsconfig.json"
	}
}
```

**First create a public directory then apply the following changes to the tsconfig file**

Specify the build directory and module version:
```json
{
	"outDir": "./public/build",
	"module": "ES6"
}
```

Allow using any type:
```json
{
	"noImplicitAny": false
}
```

Tell typescript to parse JSX with hisafe function
```json
{
	"jsx": "react",
	"jsxFactory": "hisafe"
}
```

## A simple web server is required to see what's going on in the browser.
Use `serve` package to create webserver.

`npm install -g serve`

Then new script is added to package.json to run webserver.

file: `package.json`
```json
{
	"scripts": {
		"build": "tsc --build tsconfig.json",
		"serve": "serve public"
	}
}
```

Create `public/index.html` file with following content:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">

    </div>
</body>
<script src="build/app.js">
</script>
</html>
```

Now in `hisafe.ts` file we apply following changes to create element and append it to root node.

```typescript
export default function hisafe(tagname: string, props: any, ...children: any) {
    const element = document.createElement(tagname);
    children.forEach((child) => {
        if (typeof child === 'string') {
            element.innerText = child;
        } else {
            element.appendChild(child);
        }
    });
    return element;
}
```

Create `app.tsx` with following content:
(This is our first component that will be parsed by hisafe function)

```typescript jsx
import hisafe from './hisafe.js';
export default function App() {
  return <div>
    <h1>Hello world</h1>
    <h2>Foo bar</h2>
  </div>;
}

const app = App();
document.getElementById('app')!.appendChild(app);
```

run `npm run build` now build files are generated and `app.js` script is included in `index.html` file.
run `npm run serve` open the browser and see the result.

And as it turns out, we now have something that does something!

### On to [session 2!](session-2.md)