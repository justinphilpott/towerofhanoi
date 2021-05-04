import React from 'react';
import { screenMachine } from '../state/screenMachine';
import { ScreenStart } from './screens/ScreenStart';
import { ScreenGame } from './screens/ScreenGame';
import { useMachine } from '@xstate/react'

export const TowerOfHanoiGame = () => {
  const [state, send] = useMachine(screenMachine);

  return (
    <div>
      {state.matches("screenStart") &&
        <ScreenStart onPlay={
          (numDisks: number, numPegs: number) => send("PLAY", { numDisks, numPegs })
        } />
      }
      {state.matches("screenGame") &&
        <ScreenGame onNewGame={
          send("NEWGAME")
        } />
      }
    </div>
  )
}