import React from 'react';
import flv from 'flv.js';

interface FlvProps {
  videoId: string,
  videoRef: string,
  videoUrl: string,
  controls: boolean
}

export default class Flv extends React.Component<FlvProps, {}> {
  private flvPlayer: flv.Player;
  private readonly mediaDataSource: flv.MediaDataSource;
  private readonly config: flv.Config;

  constructor(props: any) {
    super(props);
    this.mediaDataSource = {
      type: 'flv',
      url: this.props.videoUrl,
      hasAudio: true,
      hasVideo: true,
      isLive: true,
    };
    this.config = {
      enableStashBuffer: false,
      lazyLoad: false,
      isLive: true,
      autoCleanupSourceBuffer: true,
    };
    this.flvPlayer = flv.createPlayer(this.mediaDataSource, this.config);
  }

  render() {
    return <video id={this.props.videoId}
                  ref={this.props.videoRef}
                  controls={this.props.controls}
                  style={{ height: '100%', width: '100%' }}
    />;
  }

  componentDidMount() {
    const videoElement = window.document.getElementById(this.props.videoId);
    this.flvPlayer.attachMediaElement(videoElement as HTMLMediaElement);
    this.flvPlayer.load();
    this.flvPlayer.play();
  }

  componentWillUnmount() {
    this.flvPlayer.destroy();
  }
}
