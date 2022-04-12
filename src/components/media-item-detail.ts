import { Component } from "./component";
import { MediaItem } from "../models/media-item";
import VideoPlayer from "./video-player";

import "../styles/components/media-item-detail.css";

export interface MediaItemDetailProps {
  mediaItem: MediaItem;
}

export default class MediaItemDetail extends Component<
  HTMLDivElement,
  MediaItemDetailProps
> {
  private _videoPlayer: VideoPlayer;

  constructor(props: MediaItemDetailProps) {
    super(props);

    this._videoPlayer = new VideoPlayer({
      onReady: this.playerReadyHandler,
    });
  }

  protected createDomElement() {
    const domElement = document.createElement("div");
    domElement.className = "media-item-detail";

    return domElement;
  }

  private playerReadyHandler = () => {
    this._videoPlayer.setSource({
      // type: "video/vimeo",
      // src: "https://vimeo.com/691180937",
      type: "video/youtube",
      src: "https://www.youtube.com/watch?v=xjS6SftYQaQ",
    });
  };

  render(container: Element) {
    super.render(container);
    this._videoPlayer.render(this._domElement!);
  }

  destroy() {
    this._videoPlayer.destroy();
    super.destroy();
  }
}
