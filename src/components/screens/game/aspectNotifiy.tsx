import React, { useState } from 'react';
import { Flex, ScaleFade, Text, IconButton } from "@chakra-ui/react"
import { useScreenAspect } from '../../../utils/hooks/useScreenAspect';
import { MdScreenRotation, MdClear } from "react-icons/md"

export const AspectNotify = () => {

  // device rotate notify/dismiss, debounce 250 delay
  const aspect = useScreenAspect(250);
  const [rotateDismissed, setRotateDismissed] = useState(false);

  return (
    <Flex color="white" mt="0.5" mb="0.5" background="rgba(0, 0, 0, 0.3)" width="100vw">
    {(aspect < 1 && !rotateDismissed) &&
      <>
        <ScaleFade in={true} initialScale={0.1}>
          <Flex flexDirection="row"  alignItems="center" justifyContent="space-between"  width="100vw">
            <IconButton
              colorScheme="white"
              aria-label="Rotate device"
              icon={<MdScreenRotation />}
              alignSelf="flex-start"
              ml="2"
              mb="0"
              background="transparent"
            />
            <Text>rotate device for best view</Text>
            <IconButton
              colorScheme="white"
              aria-label="Quit"
              icon={<MdClear />}
              onClick={() => setRotateDismissed(true) }
              alignSelf="flex-start"
              mr="2"
              mb="0"
              background="transparent"
            />
          </Flex>
        </ScaleFade>
      </>
    }
    </Flex>
  )
}