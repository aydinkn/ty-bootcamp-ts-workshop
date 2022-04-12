export interface Player {
  isReady: () => boolean;
  setSource: (source: MediaSource) => void;
  play: (source?: MediaSource) => void;
}

export interface MediaSource {
  type: "video/youtube" | "video/vimeo";
  src: string;
}
