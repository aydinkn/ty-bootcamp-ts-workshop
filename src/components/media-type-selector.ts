import { Component } from "./component";
import { MediaType } from "../models/media-type";

import "../styles/components/media-type-selector.css";

export interface MediaTypeSelectorProps {
  onValueChanged?: (value: MediaType) => void;
}

export default class MediaTypeSelector extends Component<
  HTMLSelectElement,
  MediaTypeSelectorProps
> {
  protected createDomElement() {
    const domElement = document.createElement("select");
    domElement.className = "media-type-selector";
    domElement.append(
      this.createOptionElement({
        label: "Select Media Type",
        value: MediaType.none,
        selected: true,
      }),
      this.createOptionElement({ label: "Movies", value: MediaType.movie }),
      this.createOptionElement({ label: "TV Shows", value: MediaType.tv })
    );
    domElement.addEventListener("change", this.changeHandler);

    return domElement;
  }

  private createOptionElement(props: {
    value: string;
    selected?: boolean;
    label: string;
  }) {
    const { value, label, selected } = props;
    const optionElement = document.createElement("option");
    optionElement.value = value;
    optionElement.innerText = label;
    optionElement.selected = !!selected;

    return optionElement;
  }

  private changeHandler = () => {
    const { onValueChanged } = this._props;

    if (onValueChanged) {
      onValueChanged(this._domElement!.value as MediaType);
    }
  };

  destroy() {
    this._domElement?.removeEventListener("change", this.changeHandler);
    super.destroy();
  }
}
