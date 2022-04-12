import videojs from "video.js";
import "videojs-youtube";
import "@devmobiliza/videojs-vimeo/dist/videojs-vimeo.esm";
import { Component } from "./component";
import { Player, MediaSource } from "../models/player";
import checkReady from "../decorators/player/check-ready";

import "video.js/dist/video-js.css";

export interface VideoPlayerProps {
  width?: number;
  onReady?: () => void;
}

export default class VideoPlayer
  extends Component<HTMLVideoElement, VideoPlayerProps>
  implements Player
{
  private _player?: videojs.Player;
  private _isReady: boolean = false;

  protected createDomElement() {
    const videoElement = document.createElement("video");
    videoElement.id = "video-player";
    videoElement.classList.add(
      "video-js",
      "vjs-default-skin",
      "vjs-big-play-centered"
    );

    return videoElement;
  }

  private onReady = () => {
    this._isReady = true;
    const { onReady } = this._props;

    if (onReady) {
      onReady();
    }
  };

  isReady() {
    return this._isReady;
  }

  @checkReady
  setSource(source: MediaSource) {
    this._player?.src(source);
  }

  @checkReady
  play(source?: MediaSource) {
    if (source) {
      this.setSource(source);
    }

    this._player?.play();
  }

  render(container: Element) {
    super.render(container);

    if (!this._player) {
      this._player = videojs(
        this._domElement!,
        {
          techOrder: ["html5", "youtube", "vimeo"],
          controls: true,
          width: this._props.width || 640,
        },
        this.onReady
      );
    }
  }

  destroy() {
    this._player?.dispose();
    this._player = undefined;

    super.destroy();
  }
}
