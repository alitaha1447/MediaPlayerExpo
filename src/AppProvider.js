import React, { useState, useEffect, createContext } from "react";
import { View, Text } from 'react-native';
import { Audio } from "expo-av";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);  // State to track play/pause
  const [playbackPosition, setPlaybackPosition] = useState(null);
  const [playbackDuration, setPlaybackDuration] = useState(null);

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const loadSound = async (url) => {
    console.log('Loading New Sound');
    const { sound: newSound } = await Audio.Sound.createAsync(url);
    await newSound.playAsync();
    setSound(newSound);
    setCurrentUrl(url);
    setIsPlaying(true);

    newSound.setOnPlaybackStatusUpdate((status) => {
      setPlaybackPosition(status.positionMillis);
      setPlaybackDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);

    });
    console.log('Playing Sound');
  }

  async function playSound(url) {
    if (currentUrl === url && sound) {
      console.log('Toggling Play/Pause');
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        console.log('Song Paused');
        await sound.pauseAsync();
        setIsPlaying(false);  // Update isPlaying state
      } else {
        console.log('Song Play');
        await sound.playAsync();
        setIsPlaying(true);  // Update isPlaying state
      }
      return;
    }
    if (sound) {
      console.log('Stopping Current Sound');
      await sound.stopAsync();
      await sound.unloadAsync();
    }


    loadSound(url)

    // console.log('Loading New Sound');
    // const { sound: newSound } = await Audio.Sound.createAsync(url);
    // await newSound.playAsync();
    // setSound(newSound);
    // setCurrentUrl(url);
    // setIsPlaying(true);
    // console.log('Playing Sound');
  };



  return (
    <AppContext.Provider value={{ playSound, currentUrl, isPlaying, playbackPosition, playbackDuration, }}>
      {children}
    </AppContext.Provider>
  );
};

