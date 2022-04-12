import { Component } from "./component";
import { MediaItem } from "../models/media-item";

import "../styles/components/card.css";

export interface CardProps {
  mediaItem: MediaItem;
  onClick?: (card: Card) => void;
}

export default class Card extends Component<HTMLDivElement, CardProps> {
  private _posterLinkElement?: HTMLAnchorElement;
  private _titleLinkElement?: HTMLAnchorElement;

  protected createDomElement() {
    const poster = this.createPoster();
    const content = this.createContent();
    const container = this.createContainer();
    container.append(poster, content);

    return container;
  }

  private createPoster() {
    const posterImageElement = document.createElement("img");
    posterImageElement.loading = "lazy";
    posterImageElement.src = this._props.mediaItem.poster;

    this._posterLinkElement = document.createElement("a");
    this._posterLinkElement.href = "#";
    this._posterLinkElement.className = "poster";
    this._posterLinkElement.appendChild(posterImageElement);
    this._posterLinkElement.addEventListener("click", this.onClickHandler);

    return this._posterLinkElement;
  }

  private createContent() {
    const {
      mediaItem: { title, date },
    } = this._props;

    this._titleLinkElement = document.createElement("a");
    this._titleLinkElement.href = "#";
    this._titleLinkElement.innerText = title;
    this._titleLinkElement.addEventListener("click", this.onClickHandler);

    const titleElement = document.createElement("h2");
    titleElement.appendChild(this._titleLinkElement);

    const dateElement = document.createElement("p");
    dateElement.innerText = date
      ? new Intl.DateTimeFormat(["tr-TR", "en-US"], {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(date)
      : "";

    const content = document.createElement("div");
    content.className = "content";
    content.append(titleElement, dateElement);

    return content;
  }

  private createContainer() {
    const containerElement = document.createElement("div");
    containerElement.className = "card";

    return containerElement;
  }

  private onClickHandler = (event: MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const { onClick } = this._props;

    if (onClick) {
      onClick(this);
    }
  };

  destroy() {
    this._posterLinkElement?.removeEventListener("click", this.onClickHandler);
    this._titleLinkElement?.removeEventListener("click", this.onClickHandler);
    super.destroy();
  }
}
