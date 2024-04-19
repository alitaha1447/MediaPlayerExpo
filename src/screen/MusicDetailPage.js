import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, FlatList, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { songs } from '../MusicData';
import { AppContext } from '../AppProvider';

const { width, height } = Dimensions.get('window')

const MusicDetailPage = ({ route }) => {
  const { playSound, currentUrl, isPlaying } = useContext(AppContext);
  const { index } = route.params;
  const { data } = route.params;
  const [currentSong, setCurrentSong] = useState(index);

  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: true,
        index: currentSong,
      });
    }, 100)

  }, []);



  const handleSong = (currentSong) => {
    playSound(songs[currentSong].url)
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={songs}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.bannerView}>
              <Image source={item.artwork} style={styles.banner} />
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.name}>{item.singer}</Text>
              <Text style={styles.name}>{index}</Text>
            </View>
          )
        }}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.floor(e.nativeEvent.contentOffset.x / width);
          if (newIndex !== currentSong) {
            setCurrentSong(newIndex);
            handleSong(newIndex); // Play the new song
          }
        }}
      />
      {/* <Image source={data.artwork} style={styles.banner} /> */}
      <View style={styles.controls}>
        <Slider style={styles.sliderView} />
        <Text>{currentSong}</Text>
        <View style={styles.btnArea}>
          <TouchableOpacity onPress={() => {
            if (currentSong - 1 >= 0) {
              setCurrentSong(currentSong - 1);
              ref.current.scrollToIndex({
                animated: true,
                index: currentSong - 1
              });
            }
          }
          } disabled={currentSong === 0}>
            <Icon name="skip-previous" size={70} color={currentSong === 0 ? '#ccc' : '#FFFFFF'} style={{ opacity: currentSong === 0 ? 0.3 : 1 }} />

          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSong(currentSong)} >
            <Icon name={currentUrl === songs[currentSong].url && isPlaying ? 'pause' : 'play-arrow'} size={70} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            if (songs.length - 1 > currentSong) {
              setCurrentSong(currentSong + 1);
              ref.current.scrollToIndex({
                animated: true,
                index: currentSong + 1
              });
            }
          }} disabled={currentSong === songs.length - 1}>
            <Icon name="skip-next" size={70} color={currentSong === songs.length - 1 ? '#ccc' : '#FFFFFF'} style={{ opacity: currentSong === songs.length - 1 ? 0.3 : 1 }} />

          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MusicDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
  bannerView: {
    width: width,
    height: height / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  banner: {
    width: '90%',
    height: '80%',
    alignSelf: 'center',
    borderRadius: 10,
    resizeMode: "cover"
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '700',
    color: 'black',
  },
  controls: {
    marginBottom: 50,
    alignItems: 'center'
  },
  sliderView: {
    width: '90%',
    alignSelf: 'center',
  },
  btnArea: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    marginTop: 20,
  },

});
