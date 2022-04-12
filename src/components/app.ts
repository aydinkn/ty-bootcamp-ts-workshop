import { Component } from "./component";
import DiscoverManager from "../managers/discover-manager";
import { MediaType } from "../models/media-type";
import MediaItemList from "./media-item-list";
import { MediaItem } from "../models/media-item";
import Modal from "./modal";
import MediaItemDetail from "./media-item-detail";
import MediaFilter from "./media-filter";

import "../styles/components/app.css";

export default class App extends Component<HTMLElement> {
  private _mediaFilter: MediaFilter;
  private _mediaItemList: MediaItemList;
  private _modal: Modal;
  private _discoverManager: DiscoverManager;

  constructor() {
    super();

    this._mediaFilter = new MediaFilter({
      onMediaTypeChanged: this.mediaTypeChangedHandler,
    });
    this._mediaItemList = new MediaItemList({
      onItemSelected: this.itemSelectedHandler,
    });
    this._modal = new Modal({
      hideCloseButton: false,
    });
    this._discoverManager = new DiscoverManager();
  }

  protected createDomElement() {
    const rootElement = document.createElement("div");
    rootElement.id = "root";

    return rootElement;
  }

  private mediaTypeChangedHandler = async (value: MediaType) => {
    this._mediaItemList.removeItems();

    switch (value) {
      case MediaType.movie:
        const movies = await this._discoverManager.getPopularMovies();
        movies.forEach((movie) => {
          const { id, title, poster, releaseDate } = movie;
          this._mediaItemList.addItem({
            key: id.toString(),
            title,
            poster,
            date: releaseDate,
          });
        });
        break;
      case MediaType.tv:
        const tvShows = await this._discoverManager.getPopularTVShows();
        tvShows.forEach((tvShow) => {
          const { id, name, poster, firstAirDate } = tvShow;
          this._mediaItemList.addItem({
            key: id.toString(),
            title: name,
            poster,
            date: firstAirDate,
          });
        });
        break;
      default:
        break;
    }
  };

  private itemSelectedHandler = (mediaItem: MediaItem) => {
    const mediaItemDetail = new MediaItemDetail({ mediaItem });
    this._modal.setContent(mediaItemDetail);
    this._modal.show();
  };

  render(container: Element) {
    super.render(container);

    this._mediaFilter.render(this._domElement!);
    this._mediaItemList.render(this._domElement!);
    this._modal.render(container);
  }

  destroy() {
    this._mediaFilter.destroy();
    this._mediaItemList.destroy();
    this._modal.destroy();

    super.destroy();
  }
}
