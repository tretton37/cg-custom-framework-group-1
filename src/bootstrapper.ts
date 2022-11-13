import {AppComponent} from "./app-component.js";
import { LoadingSpinnerComponent } from "./loading-spinner-component.js";
import {TodoItemComponent} from "./todo-item-component.js";

customElements.define("app-component", AppComponent);
customElements.define("todo-item-component", TodoItemComponent);
customElements.define("loading-spinner-component", LoadingSpinnerComponent);
