import React from "react";
import { Flex } from "@chakra-ui/react";
import { ScreenStart } from "./ScreenStart";
import { ScreenSettings } from "./ScreenSettings";
import { ScreenGame } from "./ScreenGame";
import { ScreenCredits } from "./ScreenCredits";
import { useScreenService } from "./fsm/ScreenFSMProvider";

export const ScreenWrapper = () => {
  const [screenState] = useScreenService();

  return (
    <>
      {screenState.value === "start" &&
        <ScreenStart />
      }
      {screenState.matches("game") &&
        <Flex
          height="calc(var(--vh, 1vh) * 100)"
          width="100vw"
          alignItems="center"
          justifyContent="center"
        >
          <ScreenGame />
        </Flex>
      }
      {screenState.value === "settings" &&
        <Flex
          height="calc(var(--vh, 1vh) * 100)"
          width="100vw"
          p={12}
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <ScreenSettings />
        </Flex>
      }
      {screenState.value === "credits" &&
        <Flex
          height="calc(var(--vh, 1vh) * 100)"
          width="100vw"
          p={3}
          alignItems="center"

          position="relative"
          flexDirection="column"
        >
          <ScreenCredits />
        </Flex>
      }
    </>
  );
};
