import { Component } from "./component";
import MediaTypeSelector from "./media-type-selector";
import { MediaType } from "../models/media-type";

import "../styles/components/media-filter.css";

export interface MediaFilterProps {
  onMediaTypeChanged?: (mediaType: MediaType) => void;
}

export default class MediaFilter extends Component<
  HTMLDivElement,
  MediaFilterProps
> {
  private _mediaTypeSelector: MediaTypeSelector;

  constructor(props: MediaFilterProps) {
    super(props);

    this._mediaTypeSelector = new MediaTypeSelector({
      onValueChanged: this.valueChangedHandler,
    });
  }

  protected createDomElement() {
    const containerElement = document.createElement("div");
    containerElement.className = "media-filter-container";

    return containerElement;
  }

  private valueChangedHandler = (value: MediaType) => {
    const { onMediaTypeChanged } = this._props;

    if (onMediaTypeChanged) {
      onMediaTypeChanged(value);
    }
  };

  render(container: Element) {
    super.render(container);
    this._mediaTypeSelector.render(this._domElement!);
  }

  destroy() {
    this._mediaTypeSelector.destroy();
    super.destroy();
  }
}
