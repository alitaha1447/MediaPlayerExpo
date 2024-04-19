import React, { useState, useEffect, createContext } from "react";
import { View, Text } from 'react-native';
import { Audio } from "expo-av";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [sound, setSound] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);  // State to track play/pause

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

    console.log('Loading New Sound');
    const { sound: newSound } = await Audio.Sound.createAsync(url);
    setSound(newSound);
    setCurrentUrl(url);
    setIsPlaying(true);
    console.log('Playing Sound');
    await newSound.playAsync();
  }
  return (
    <AppContext.Provider value={{ playSound, currentUrl, isPlaying }}>
      {children}
    </AppContext.Provider>
  );
};

