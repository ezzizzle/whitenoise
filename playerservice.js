import TrackPlayer from 'react-native-track-player';
import {startPlayer, whiteNoiseTrack} from './player.js';

module.exports = async function() {
  TrackPlayer.addEventListener('remote-play', async () => {
    console.log('got remote play');
    startPlayer();
  });

  TrackPlayer.addEventListener('remote-pause', async () => {
    console.log('got remote pause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener('playback-track-changed', async () => {
    console.log('track changed');
    TrackPlayer.add(Array(1).fill(whiteNoiseTrack));
  });
};
