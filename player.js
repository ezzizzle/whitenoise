import TrackPlayer from 'react-native-track-player';

export const whiteNoiseTrack = {
  id: 'whitenoise',
  url: require('./resources/whitenoise2.wav'),
  title: 'White Noise',
  artist: 'Ezz',
  artwork: require('./resources/whitenoise.jpg'),
};

export async function startPlayer() {
  TrackPlayer.removeUpcomingTracks();
  await TrackPlayer.add(Array(2).fill(whiteNoiseTrack));

  TrackPlayer.play();
}
