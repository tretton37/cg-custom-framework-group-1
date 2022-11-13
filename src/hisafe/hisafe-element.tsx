export abstract class HisafeElement<TState extends object> extends HTMLElement {
  constructor(defaultState: TState) {
    super();
    this.attachShadow({ mode: "open" });
    this.state = this.state ?? defaultState;
  }

  _state!: TState;
  set state(val: TState) {
    const render = this.render;
    const createOnChangeProxy = (target) => {
      return new Proxy(target, {
          set(
            target: TState,
            p: string | symbol,
            value: any,
            receiver: any): boolean {
              target[p] = value;
              render();
              return true;
          },
          get(target: TState, p: string | symbol, receiver: any): any {
            const item = target[p];
            if (item && typeof item === 'object') {
                // create new proxy for nested object
                return createOnChangeProxy(item);
            }

            return item;
        },
      });
    }

    this._state = createOnChangeProxy(val);
  }
  get state() {
    return this._state;
  }

  connectedCallback() {
    this.render();
  }

  dispatchHisafeEvent<T>(name: string, payload: T) {
    const event = new CustomEvent(name, {
      detail: { isHighSafeEvent: true, payload },
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private render = () => {
    const html = this.html();
    this.shadowRoot!.innerHTML = `<style>${this.css()}</style>`;
    this.shadowRoot!.appendChild(html);
  };

  abstract html(): Node;

  css = () => {
    return "";
  };
}
