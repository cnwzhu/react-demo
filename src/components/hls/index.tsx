import React from 'react';
import videojs from 'video.js';

interface HlsProps {
  videoId: string
  videoRef: string
  videoUrl: string
}

export default class Hls extends React.Component<HlsProps, {}> {
  private player?: videojs.Player;
  private readonly playerOptions: videojs.PlayerOptions;
  private readonly source: videojs.Tech.SourceObject;

  constructor(props: HlsProps) {
    super(props);
    this.playerOptions = {
      fluid: true,
    };
    this.source = {
      src: this.props.videoUrl,
      type: 'application/x-mpegURL',
    };
  }

  render() {
    return <div>
      <video id={this.props.videoId}
             ref={this.props.videoRef}
             className="video-js"
             controls={true}
             autoPlay={true}
      />
    </div>;
  }

  componentDidMount() {
    this.player = videojs(this.props.videoId, this.playerOptions);
    this.player.src(this.source);
  }

  componentWillUnmount() {
    if (this.player !== undefined) {
      this.player.dispose();
    }
  }
}
