import React from "react";
import { Flex, Fade, SlideFade } from "@chakra-ui/react";
import { ScreenStart } from "./ScreenStart";
import { ScreenSettings } from "./ScreenSettings";
import { ScreenGame } from "./ScreenGame";
import { ScreenTutorial } from "./ScreenHighScores";
import { useScreenService } from "./fsm/ScreenFSMProvider";

export const ScreenWrapper = () => {
  const [screenState] = useScreenService();

  return (
    <>
      {screenState.value === "start" &&
        <ScreenStart />
      }
      {screenState.matches("game") &&
        <Fade in={true}>
          <Flex
            height="100vh"
            width="100vw"
            alignItems="center"
            justifyContent="center"
          >
            <ScreenGame />
          </Flex>
        </Fade>
      }
      {screenState.value === "settings" &&
        <Flex
          height="100vh"
          width="100vw"
          p={12}
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <ScreenSettings />
        </Flex>
      }
      {screenState.matches("highScores") &&
        <Fade in={true}>
          <Flex
            height="100vh"
            width="100vw"
            p={12}
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <ScreenTutorial />
          </Flex>
        </Fade>
      }
      {screenState.matches("credits") &&
        <Fade in={true}>
          <Flex
            height="100vh"
            width="100vw"
            p={12}
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <ScreenTutorial />
          </Flex>
        </Fade>
      }
    </>
  );
};
