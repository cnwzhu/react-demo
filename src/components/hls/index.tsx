import React from 'react';
import video from 'video.js';

interface HlsProps {
  videoId: string
  videoRef: string
  videoUrl: string
}

export default class Hls extends React.Component<HlsProps, {}> {
  private player?: video.Player;
  private readonly playerOptions: video.PlayerOptions;
  private readonly source: video.Tech.SourceObject;

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
    this.player = video(this.props.videoId, this.playerOptions);
    this.player.src(this.source);
  }

  componentWillUnmount() {
    if (this.player !== undefined) {
      this.player.dispose();
    }
  }
}
