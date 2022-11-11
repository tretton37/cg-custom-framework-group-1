export abstract class HisafeElement<TState extends object> extends HTMLElement {
  constructor(defaultState: TState) {
    super();
    this.attachShadow({ mode: "open" });
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

  dispatchHisafeEvent<T>(name: string, payload: T) {
    const event = new CustomEvent(name, { detail: payload, composed: true });
    this.dispatchEvent(event);
  }

  render() {
    const html = this.html();
    this.shadowRoot!.innerHTML = "";
    this.shadowRoot!.appendChild(html);
  }

  abstract html(): Node;
}
