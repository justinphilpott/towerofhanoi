import React, { useContext } from 'react';
import { Button, Flex, Heading, Text } from "@chakra-ui/react"
import { Game } from './game/towerofhanoi/Game';
import { XStateContext } from './ScreenWrapper';
import { useSelector } from '@xstate/react';
import { minMovesLookupTable } from '../../utils/hanoiData';
import { useGameAudioControl } from '../../utils/sound';
import { Interpreter } from 'xstate';
import { HanoiEvent, HanoiContext } from '../../state/hanoi/types/hanoiFSMTypes';
import { GameHeader } from './game/gameHeader';

/**
 * ScreenGame
 */
export const ScreenGame = () => {

  // State machine handling
  const screenActor = useContext(XStateContext);
  const { send: screenSend } = screenActor;
  // hanoi is the child of screen and invoked within it @see /state/screen/screenFSM.txt
  const hanoiActor = screenActor.children.get('hanoiFSM') as Interpreter<HanoiContext, any, HanoiEvent>;
  const { send: hanoiSend } = hanoiActor;

  /**
   * read some state values from the state machine
   * we also deduce some "meta state" from fsm state;
   * either this is done here in a component, or one could
   * have another layer of state machine logic, either above (hierarchical)
   * or a separate machine that represents a "different cross section
   * through the state space."
   */
  const disks:number = useSelector(hanoiActor, (state) => (state.context.numDisks));
  const pegs:number = useSelector(hanoiActor, (state) => (state.context.numPegs));
  const minMoves:number = minMovesLookupTable[pegs-3][disks-1];
  const numMoves:number = useSelector(hanoiActor, (state) => (state.context.moves.length));

  const showMoves:boolean = useSelector(hanoiActor, (state) => (state.context.showMoves));
  const showTime:boolean = useSelector(hanoiActor, (state) => (state.context.showTime));

  const gameComplete = useSelector(hanoiActor, (state) => (state.matches("gameComplete")));
  const midGame = numMoves > 0 && !gameComplete;

  const quitDialog = useSelector(screenActor, (state) => (state.matches("game.quitDialog")));
  const restartDialog = useSelector(screenActor, (state) => (state.matches("game.restartDialog")));

  const selectedPeg = useSelector(hanoiActor, (state) => (state.context.selectedPeg));
  const gameboard:number[][] = useSelector(hanoiActor, (state) => (state.context.gameBoard)); //@todo might need to assign type

  // use custom audio hook @todo, make into a little track player, with generic hook behind
  const [stopAudio, gameAudioIcon] = useGameAudioControl(); // we need to expose a stop control for this for when we exit the game while music is playing

  /**
   * The components that represent the actual game, pegs and disks
   * are not dependent upon xstate, and could use any method of
   * state management. 
   * 
   * SelectHandler is the only causal connection between the game components
   * and XState.
   *
   * It is the only event we need from the actual game board components:
   * pegs and disks and from that we know which peg has been clicked/tapped
   *
   * @param pegIndex
   */
  const selectHandler = (pegIndex: number) => {
    hanoiSend({
      type: "SELECT",
      pegIndex: pegIndex
    })
  }

  // using useeffect here didn't work
  const handleQuit = async () => {
    stopAudio();
    screenSend({ type: "QUIT" });
  }

  // @todo DRY the modals
  return (
    <>
      <Flex direction="column" width="100vw" height="100%" alignItems="center" background="linear-gradient(to bottom, transparent, 60%, #222)" position="relative">
        <GameHeader
          screenSend={screenSend}
          hanoiSend={hanoiSend}
          gameInfo={{ numMoves, minMoves, showMoves, showTime }}
          tutorialMode={false}
          midGame={midGame}
          gameAudioIcon={gameAudioIcon}
        />

        <Flex direction="column" width="100vw" alignItems="center" p="3" mb="auto" flexGrow={1} justifyContent="flex-end">
          <Game gameBoard={gameboard} selectedPeg={selectedPeg} selectHandler={selectHandler} />
        </Flex>

        {quitDialog &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
              <Flex direction="column" flexWrap="wrap" width="100%" justifyContent="center">
                <Heading as="h2" size="lg" mb={6} mr={3}>Quit game?</Heading>
                <Button data-testid="game-quit-confirm" colorScheme="purple" mb={3} onClick={() => {
                  handleQuit();
                }}>Quit</Button>
                <Button data-testid="game-quit-cancel" colorScheme="teal" onClick={() => screenSend({ type: "STAY" })}>Play on</Button>
              </Flex>
            </Flex>
          </Flex>
        }

        {restartDialog &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} rounded={8}>
              <Flex direction="column" flexWrap="wrap" width="100%" justifyContent="center">
                <Heading as="h2" size="lg" mb={6} mr={3}>Loose progress?</Heading>
                <Button data-testid="game-restart-confirm" colorScheme="blue" mb={3} onClick={() => { hanoiSend({ type: "RESET"}); screenSend({ type: "RESTARTCONFIRM"}); }}>Restart</Button>
                <Button data-testid="game-restart-cancel" colorScheme="teal" onClick={() => screenSend({ type: "CANCEL"})}>Play on</Button>
              </Flex>
            </Flex>
          </Flex>
        }

        {gameComplete &&
          <Flex position="absolute" direction="column" width="100vw" height="calc(var(--vh, 1vh) * 100)" alignItems="center" background="rgba(0, 0, 0, 0.6)" justifyContent="center" zIndex={1000}>
            <Flex direction="column" width="300px" background="rgba(255, 255, 255, 0.9)" p={6} m={6} rounded={8}>
              <Flex direction="column" flexWrap="wrap" justifyContent="center">
                { showMoves &&
                  <>
                    { numMoves > minMoves &&
                      <>
                        <Heading as="h1" size="xl" mb={3} flexGrow={1} textAlign="left">Good...</Heading>
                        <Text mb={3} mt={0}>Think how you can complete this with fewer moves.</Text>
                      </>
                    }
                    { numMoves === minMoves &&
                      <>
                        <Heading as="h1" size="xl" mb={3} flexGrow={1} textAlign="center">Well done!</Heading>
                        <Text m={3} mt={0}>You found the optimal solution for the {pegs} peg, {disks} disc setup.
                          {
                            disks < 8 ?
                              <> Try with one more disk.</>
                            :
                              pegs > 3 ?
                                <> Try with one less peg</>
                              :
                                <></> // @todo here suggest a timed game
                          }
                        </Text>
                      </>
                    }
                    { numMoves < minMoves &&
                      <>
                        <Heading as="h1" size="xl" mb={3} flexGrow={1} textAlign="center">Wow!</Heading>
                        <Text m={3} mt={0}>You have shown that my minimum moves calculations are wrong, pls get in touch!</Text>
                      </>
                    }
                  </>
                }

                { !showMoves &&
                  <>
                    <Heading as="h1" size="xl" mb={6} mr={3} flexGrow={1} textAlign="center">Game complete!</Heading>
                  </>
                }

                {
                  disks < 8 ?
                    <Button data-testid="game-restart-confirm" colorScheme="gold" flexGrow={1} mb={3} color="#000" onClick={() => { hanoiSend({ type: "RESETPLUSONEDISK"}); }}>Play +1 disk</Button>
                  :
                  pegs > 3 ?
                    <Button data-testid="game-restart-confirm" colorScheme="gold" flexGrow={1} mb={3} color="#000" onClick={() => { hanoiSend({ type: "RESETLESSONEPEG"}); }}>Play -1 Peg</Button>
                  :
                    <></> // @todo here suggest a timed game...
                }
                <Button data-testid="game-restart-confirm" colorScheme="teal" flexGrow={1} mb={3} onClick={() => { hanoiSend({ type: "RESET"}); }}>Play again</Button>
                <Button data-testid="game-quit-confirm" colorScheme="purple" flexGrow={1} onClick={ () => { handleQuit(); } }>Quit</Button>
              </Flex>
            </Flex>
          </Flex>
        }
      </Flex>
    </>
  )
}
