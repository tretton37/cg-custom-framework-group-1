export abstract class HisafeElement<TState extends object> extends HTMLElement {
  constructor(defaultState: TState) {
    super();
    this.attachShadow({ mode: "open" });
    this.state = defaultState;
    
  }

  _state!: TState;
  set state(val: TState) {
    const render = this.render;
    this._state = new Proxy(val, {
        set(target: TState, p: string | symbol, value: any, receiver: any): boolean {
          target[p] = value
          render();
          return true
        },
        get(target: TState, p: string | symbol, receiver: any): any {
          return target[p]
        }
      })
  }
  get state() {
    return this._state;
  }

  connectedCallback() {
    this.render();
  }

  dispatchHisafeEvent<T>(name: string, payload: T) {
    const event = new CustomEvent(name, { detail: { isHighSafeEvent: true, payload }, composed: true });
    this.dispatchEvent(event);
  }

  private render = ()=> {
    const html = this.html();
    this.shadowRoot!.innerHTML = "";
    this.shadowRoot!.appendChild(html);
  }

  abstract html(): Node;
}
