export abstract class Component<
  E extends Element = HTMLDivElement,
  P extends Record<string, any> = {}
> {
  protected _domElement?: E;
  protected _props: P;
  protected _isRendered = false;

  constructor(props: P = {} as P) {
    this._props = props;
  }

  get domElement() {
    return this._domElement;
  }

  get props() {
    return this._props;
  }

  protected abstract createDomElement(): E;

  render(container: Element) {
    if (!this._isRendered) {
      this._domElement = this.createDomElement();
      container.appendChild(this._domElement);
      this._isRendered = true;
    }
  }

  destroy() {
    if (this._isRendered) {
      this._domElement?.parentNode?.removeChild(this._domElement);
      this._isRendered = false;
    }
  }
}
