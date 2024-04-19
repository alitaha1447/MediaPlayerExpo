import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, TouchableOpacity, Image } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { songs } from '../MusicData';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../AppProvider';

const Home = () => {
  const { playSound, currentUrl, isPlaying } = useContext(AppContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.logo}>Music App</Text>
      </View>
      <FlatList
        data={songs}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.listItem}>
              <TouchableOpacity onPress={() => navigation.navigate('MusicDetailPage', { data: item, index: index })}>
                <Image source={item.artwork} style={styles.artwork} />
              </TouchableOpacity>
              <View style={styles.songInfo}>
                <Text>{item.title}</Text>
                <Text>{item.singer}</Text>
              </View>
              <TouchableOpacity onPress={() => playSound(item.url)} style={styles.playButton}>
                <Icon name={currentUrl === item.url && isPlaying ? 'pause' : 'play-arrow'} size={24} color="black" />
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    width: '100%',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: 'red',
    marginLeft: 20
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    marginTop: 10,
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  songInfo: {
    flex: 1,
    marginLeft: 10,
  },
  playButton: {
    padding: 10,
  },
});
