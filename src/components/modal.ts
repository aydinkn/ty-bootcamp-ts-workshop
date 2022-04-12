import { Component } from "./component";

import "../styles/components/modal.css";

export interface ModalProps {
  hideCloseButton?: boolean;
}

export default class Modal extends Component<HTMLDivElement, ModalProps> {
  private _closeElement?: HTMLSpanElement;
  private _contentElement?: HTMLDivElement;
  private _contentComponent?: Component;

  protected createDomElement() {
    const container = this.createContainerElement();
    this._contentElement = this.createContentElement();
    container.appendChild(this._contentElement);

    return container;
  }

  private createContentElement() {
    const contentElement = document.createElement("div");
    contentElement.className = "modal-content";

    if (!this._props.hideCloseButton) {
      this._closeElement = document.createElement("span");
      this._closeElement.className = "close";
      this._closeElement.innerHTML = "&times;";
      this._closeElement.addEventListener("click", this.closeHandler);
      contentElement.appendChild(this._closeElement);
    }

    return contentElement;
  }

  private createContainerElement() {
    const containerElement = document.createElement("div");
    containerElement.className = "modal";

    window.addEventListener("click", (event: MouseEvent) => {
      if (event.target == containerElement) {
        this.closeHandler();
      }
    });

    return containerElement;
  }

  private closeHandler = () => {
    this.destroyContentComponent();
    this.hide();
  };

  private destroyContentComponent() {
    if (this._contentComponent) {
      this._contentComponent.destroy();
      this._contentComponent = undefined;
    }
  }

  show() {
    this._domElement?.classList.add("show");
  }

  hide() {
    this._domElement?.classList.remove("show");
  }

  setContent(content: Component) {
    this.destroyContentComponent();

    this._contentComponent = content;
    this._contentComponent.render(this._contentElement!);
  }

  destroy() {
    super.destroy();
    this.destroyContentComponent();

    if (this._closeElement) {
      this._closeElement.removeEventListener("click", this.closeHandler);
    }

    window.removeEventListener("click", this.closeHandler);
  }
}
