/**
 * WhiteNoise
 * Play WhiteNoise and listen for requests to change playback state
 *
 * @format
 * @flow
 */

import React, {Component, Fragment} from 'react';
import {StyleSheet, View, Text, StatusBar} from 'react-native';

import TrackPlayer from 'react-native-track-player';
import {startPlayer} from './player.js';

var httpBridge = require('react-native-http-bridge');
import {NetworkInfo} from 'react-native-network-info';

type Props = {};
type State = {isPlaying: boolean, ipAddress: String};

class App extends Component<Props, State> {
  state = {isPlaying: false, ipAddress: null};

  componentDidMount() {
    this.getIP();
    httpBridge.start(5561, 'SERVICENAME', async request => {
      if (request.type === 'GET' && request.url.split('/')[1] === 'play') {
        console.log('PLAY');
        startPlayer();
        httpBridge.respond(
          request.requestId,
          200,
          'application/json',
          '{"message": "OK"}',
        );
      } else if (request.url.split('/')[1] === 'pause') {
        console.log('pause');
        TrackPlayer.pause();
        httpBridge.respond(
          request.requestId,
          200,
          'application/json',
          '{"message": "OK"}',
        );
      } else if (request.url.split('/')[1] === 'status') {
        console.log('status');
        const playerState = await TrackPlayer.getState();

        let status;
        playerState === TrackPlayer.STATE_PLAYING
          ? (status = 'playing')
          : (status = 'paused');

        httpBridge.respond(
          request.requestId,
          200,
          'application/json',
          `{"status": "${status}"}`,
        );
      } else {
        httpBridge.respond(
          request.requestId,
          400,
          'application/json',
          '{"message": "Bad Request"}',
        );
      }
    });
    TrackPlayer.addEventListener('playback-state', () => {
      TrackPlayer.getState().then(playerState => {
        this.setState(previousState => ({
          isPlaying: playerState === TrackPlayer.STATE_PLAYING ? true : false,
        }));
      });
    });

    TrackPlayer.registerPlaybackService(() => require('./playerservice.js'));

    TrackPlayer.setupPlayer().then(async () => {
      TrackPlayer.updateOptions({
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_STOP,
        ],
        notificationCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
        compactCapabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
        ],
      });
    });
  }

  async playWhiteNoise() {
    console.log('Playing white noise');
    const playerState = await TrackPlayer.getState();

    if (playerState !== TrackPlayer.STATE_PLAYING) {
      startPlayer();
    } else {
      TrackPlayer.pause();
    }
  }

  getIP() {
    NetworkInfo.getIPAddress().then(ip => {
      this.setState({
        ipAddress: ip,
      })
    });
  }

  render() {
    const playText = this.state.isPlaying ? 'Pause' : 'Play';
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <View style={styles.buttonSection}>
          <View>
            <Text style={styles.playText} onPress={() => this.playWhiteNoise()}>
              {playText}
            </Text>
            <Text style={styles.ipText}>
              {this.state.ipAddress}:5561
            </Text>
          </View>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  buttonSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  playText: {
    color: 'white',
    fontSize: 36,
    textAlign: 'center',
  },
  ipText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default App;
