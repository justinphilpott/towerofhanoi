import React, { useState, useEffect } from "react";
import { IconButton, Icon } from "@chakra-ui/react"
import { ImMusic } from "react-icons/im"
import { SpinnerLightSmall } from './spinnerLight';


/**
 * @todo refactor 
 */

export const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  audio.loop = true;
  const [playing, setPlaying] = useState(false);
  const [playable, setPlayable] = useState(false);
  const [error, setError] = useState(false);

  // if we pass a value we can dictate state, otherwise toggle
  const toggle = <T extends boolean | undefined>(value?: T) => {
    if (typeof(value) === 'boolean') {
      setPlaying(value);
    } else {
      setPlaying(!playing);
    }
  }

  useEffect(() => {
    audio.addEventListener('error', () => {
      setError(true);
    });
    return () => {
      audio.removeEventListener('error', () => setError(false));
    };
  })

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
      setError(false);
    });
//    audio.addEventListener('ended', () => setPlaying(true));
    return () => {
      setPlaying(false);
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle, playable, error] as const;
};

/**
 * @returns callbacks and the audio control icon
 *
 * @todo recode this so that it plays through a set of tracks randomly
 */
export const useGameAudioControl = () => {

  // select a track at random
  const tracks = ['music/purrple-cat-equinox-opt.mp3', 'music/purrple-cat-floating-castle-opt.mp3', 'music/purrple-cat-mysterious-lights-opt.mp3', 'music/purrple-cat-wild-strawberry-opt.mp3', 'music/Uniq-Reverse-opt.mp3'];
  const trackNumber = Math.floor(Math.random() * (tracks.length));

  // setup background music -
  const [playing, toggleAudio, playable, error] = useAudio(tracks[trackNumber]);

  const handleAudioIconClick = () => {
    if (playable) {
      toggleAudio();
    }
  }

  const stop = async () => {
    toggleAudio(false);
  }

  const audioIcon = error ? <></> : <IconButton 
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
  />

  /* eslint-disable */
  return [stop,
    audioIcon] as const 
}
