import React, { useState, useEffect } from "react";
import { IconButton, Icon } from "@chakra-ui/react"
import { ImMusic } from "react-icons/im"
import { SpinnerLightSmall } from './spinnerLight';

export const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  audio.loop = true;
  const [playing, setPlaying] = useState(false);
  const [playable, setPlayable] = useState(false);

  // if we pass a value we can dictate state, otherwise toggle
  const toggle = <T extends boolean | undefined>(value?: T) => {
    if (typeof(value) === 'boolean') {
      setPlaying(value);
    } else {
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
export const useGameAudioControl = (autoplay: boolean) => {

  // select a track at random
  const tracks = ['music/purrple-cat-equinox.mp3', 'music/purrple-cat-floating-castle.mp3', 'music/purrple-cat-mysterious-lights.mp3', 'music/purrple-cat-wild-strawberry.mp3', 'music/Uniq-Reverse.mp3'];
  const trackNumber = Math.floor(Math.random() * (tracks.length));

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
      icon={ playable ? <Icon as={ImMusic} /> : <SpinnerLightSmall /> }
      onClick={() => handleAudioIconClick()}
      alignSelf="flex-start"
      mr="2"
      mb="0"
      isDisabled={false}
      background="rgba(0, 0, 0, 0.2)"
    />] as const
}
