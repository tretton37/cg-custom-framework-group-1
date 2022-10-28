import hisafe from './hisafe.js';

export default function App() {
  return <div>
    <h1>Hello world</h1>
    <h2>Foo bar</h2>
  </div>;
}

const app = App();
document.getElementById('app')!.appendChild(app);
