import React, { useState, useEffect } from "react";
import { IconButton, Icon, Spinner } from "@chakra-ui/react"
import { ImMusic } from "react-icons/im"

export const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  audio.loop = true;
  const [playing, setPlaying] = useState(false);
  const [playable, setPlayable] = useState(false);

  // if we pass a value we can dictate state, otherwise toggle
  const toggle = <T extends boolean | undefined>(value?: T) => {
    if (typeof(value) === 'boolean') {
      console.log('dictate toggle', value);
      setPlaying(value);
    } else {
      console.log('toggle', value);
      setPlaying(!playing);
    };
  }

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    return () => {
      audio.pause();
    }
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('canplaythrough', () => {
      setPlayable(true);
      setPlaying(true);
    });
//    audio.addEventListener('ended', () => setPlaying(true));
    return () => {
      setPlaying(false);
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle, playable] as const;
};

/**
 * @returns callbacks and the audio control icon
 * 
 * @todo through various tracks
 */
export const useGameAudioControl = () => {

  // select a track at random
  const tracks = ['music/gotama-buddha-nature.mp3', 'music/awake.mp3', 'music/purrple-cat-equinox.mp3'];
  const trackNumber = Math.floor(Math.random() * (tracks.length - 0) + 0);

  // setup background music -
  const [playing, toggleAudio, playable] = useAudio(tracks[trackNumber]); // gotama-buddha-nature.mp3

  const handleAudioIconClick = () => {
    if (playable) {
      toggleAudio();
    }
  }

  const stop = () => {
    toggleAudio(false);
  }

  // return stop and play callbacks and the icon control component, not sure about this pattern
  return [stop,
    <IconButton
      colorScheme="white"
      color={ playing ? "white" : "grey" }
      aria-label="Audio on/off"
      icon={ playable ? <Icon as={ImMusic} /> : <Spinner color="white" size="md" speed="0.66s" thickness="2px" /> }
      onClick={() => handleAudioIconClick()}
      alignSelf="flex-start"
      mr="2"
      mb="0"
      isDisabled={false}
      background="rgba(0, 0, 0, 0.2)"
    />] as const
}
