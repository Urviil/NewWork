import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import Slider from 'react-native-slider';
import songs from '../../Model/data';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const MusicPlayer2 = () => {
  const {width, height} = Dimensions.get('window');
  const setUpPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        // Media controls capabilities
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],

        // Icons for the notification on Android (if you don't like the default ones)
      });
      await TrackPlayer.add(songs);
    } catch (e) {}
  };

  useEffect(() => {
    setUpPlayer();
  }, []);
  const togglePlayBack = async playbackstate => {
    console.log('playbackstate', playbackstate);
    if (playbackstate === State.Paused || playbackstate === State.Ready) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };
  const playbackstate = usePlaybackState();
  const [songIndex, setSongIndex] = useState(0);

  const songSlider = useRef(null);

  const skipToNext = async () => {
    if (songIndex < songs.length - 1) {
      songSlider.current.scrollToIndex({
        index: songIndex + 1,
        animated: true,
      });
      setSongIndex(songIndex + 1);
      // console.log('songindex', songIndex);
      await TrackPlayer.skip(songIndex + 1);
      togglePlayBack(playbackstate);
    }
  };
  const skipToPrevious = async () => {
    // console.log('songindex', songIndex);
    if (songIndex > 0) {
      songSlider.current.scrollToIndex({
        index: songIndex - 1,
        animated: true,
      });
      setSongIndex(songIndex - 1);
      await TrackPlayer.skip(songIndex - 1);
      togglePlayBack(playbackstate);
    }
  };

  useEffect(() => {
    console.log('songindexafter', songIndex);
  }, [songIndex]);

  const renderSongs = ({index, item}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: width,
        }}>
        <View
          style={{
            marginBottom: RFValue(20),
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: RFPercentage(40),
              height: RFPercentage(50),
              borderRadius: RFValue(10),
            }}
            resizeMode="cover"
            source={item.image}
          />
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', backgroundColor: '#222831'}}>
      <View>
        <FlatList
          ref={songSlider}
          data={songs}
          renderItem={renderSongs}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        />
      </View>

      <View>
        <Text
          style={{
            fontSize: RFValue(18),
            fontWeight: '600',
            color: '#EEEEEE',
            textAlign: 'center',
          }}>
          {songs[songIndex].title}
        </Text>
        <Text
          style={{
            fontSize: RFValue(16),
            fontWeight: '300',
            color: '#EEEEEE',
            textAlign: 'center',
          }}>
          {songs[songIndex].artist}
        </Text>
      </View>
      <View style={{marginHorizontal: RFValue(30)}}>
        <Slider
          value={10}
          minimumValue={0}
          maximumValue={100}
          thumbTintColor="#FFD369"
          minimumTrackTintColor="#FFD369"
          maximumTrackTintColor="#FFF"
          onSlidingComplete={() => {}}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{color: 'white'}}>0:00</Text>
          <Text style={{color: 'white'}}>3:55</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: RFValue(20),
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={skipToPrevious} disabled={!(songIndex > 0)}>
          <Ionicons name="play-back" size={RFValue(30)} color="#FFD369" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => togglePlayBack(playbackstate)}>
          <Ionicons
            name={
              playbackstate == State.Paused || playbackstate == State.Ready
                ? 'play'
                : 'pause'
            }
            size={RFValue(50)}
            color="#FFD369"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={skipToNext}
          disabled={!(songIndex < songs.length - 1)}>
          <Ionicons name="play-forward" size={RFValue(30)} color="#FFD369" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MusicPlayer2;

const styles = StyleSheet.create({});
