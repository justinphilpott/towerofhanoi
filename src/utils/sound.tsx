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
    }
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
  const tracks = ['music/purrple-cat-equinox-opt.mp3', 'music/purrple-cat-floating-castle-opt.mp3', 'music/purrple-cat-mysterious-lights-opt.mp3', 'music/purrple-cat-wild-strawberry-opt.mp3', 'music/Uniq-Reverse-opt.mp3'];
  const trackNumber = Math.floor(Math.random() * (tracks.length));

  // setup background music -
  const [playing, toggleAudio, playable] = useAudio(tracks[trackNumber]); // gotama-buddha-nature.mp3

  const handleAudioIconClick = () => {
    if (playable) {
      toggleAudio();
    }
  }

  const stop = async () => {
    toggleAudio(false);
  }

  /* eslint-disable */
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

/*
  var music = new Audio("http://curtastic.com/nightmare.mp3")

  var chime = new Audio("http://curtastic.com/gold.wav")

  var nothing = new Audio("http://touchbasicapp.com/nothing.wav")

  var allAudio = []

  allAudio.push(music)

  allAudio.push(chime)

  var tapped = function() {

    messagediv.innerHTML = "tapped"

    // Play all audio files on the first tap and stop them immediately.

    if(allAudio) {

      for(var audio of allAudio) {

        audio.play()

        audio.pause()

        audio.currentTime = 0

      }

      allAudio = null

    }

    

    // We should be able to play music delayed now (not during the tap event).

    messagediv.innerHTML = "Music starts in 2 seconds..."

    setTimeout(function() {

      messagediv.innerHTML = "Music playing. <button onclick='stop()'>Stop</button>"

      music.play()

    }, 2000)

    

  }

  document.body.addEventListener('touchstart', tapped, false)

  document.body.addEventListener('click', tapped, false)

  

  var stop = function() {

    music.pause()

    loop = null

    document.body.removeEventListener('touchstart', tapped, false)

    document.body.removeEventListener('click', tapped, false)

  }

  

  // Check if audio starts already unlocked by playing a blank wav.

  nothing.play().then(function() {

    lockeddiv.innerHTML = "Audio started unlocked!"

  }).catch(function(){

    lockeddiv.innerHTML = "Audio started locked :("

  })

  

  var loop = function() {

    // Try to play chimes whenever we want (not during user action).

    if(Math.random() < .01) {

      chime.play().then(function(){

        lockeddiv.innerHTML = "Audio is now unlocked!"

      })

    }

    setTimeout(loop, 16)

  }

  loop()
*/

  /**
   * possible sound solution 
   * 
   * useEffect
   * on touch start
   * activate audio component with a play and pause
   * so we need the audio component exposed here to trigger playing
   * 
   * -- then pass the icon, play and stop functions down
   * basically a soundControl object in to the game object that
   * 
   * there we need to start and stop the sound at various times...
   * so context is not necessary here...
   * 
   * IOS sound fix
   * https://curtisrobinson.medium.com/how-to-auto-play-audio-in-safari-with-javascript-21d50b0a2765
   */

  /*
  useEffect(() => {

    window.addEventListener("touchstart", startup);

  })


  const audioObject = 


  const gameAudio = (audioObject) => {
    


    const icon = '';
    const stop = () => {

    }
    const play = () => {
      
    }

    return [icon, stop, play];
  }
  */
