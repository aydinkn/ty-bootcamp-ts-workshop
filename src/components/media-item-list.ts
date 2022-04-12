import { Component } from "./component";
import { MediaItem } from "../models/media-item";
import Card from "./card";

import "../styles/components/media-item-list.css";

export interface MedieItemListProps {
  onItemSelected?: (item: MediaItem) => void;
}

export default class MediaItemList extends Component<
  HTMLDivElement,
  MedieItemListProps
> {
  private _items: Card[];
  private _selectedItem?: Card;

  constructor(props: MedieItemListProps) {
    super(props);

    this._items = [];
  }

  protected createDomElement() {
    const domElement = document.createElement("div");
    domElement.className = "media-item-list-container";

    return domElement;
  }

  private createCard(item: MediaItem) {
    const card = new Card({
      mediaItem: item,
      onClick: this.clickHandler,
    });

    return card;
  }

  private clickHandler = (card: Card) => {
    this.selectItem(card.props.mediaItem.key);
  };

  private getItem(key: string) {
    return this._items.find((item) => item.props.mediaItem.key === key);
  }

  addItem(item: MediaItem) {
    const card = this.createCard(item);
    card.render(this._domElement!);
    this._items.push(card);
  }

  removeItems() {
    let items = [...this._items];
    this._items = [];

    for (const item of items) {
      item.destroy();
    }
  }

  selectItem(key: string) {
    const card = this.getItem(key);

    if (card) {
      this._selectedItem = card;
      const { onItemSelected } = this._props;

      if (onItemSelected) {
        onItemSelected(this._selectedItem.props.mediaItem);
      }
    }
  }

  destroy() {
    this.removeItems();

    super.destroy();
  }
}
