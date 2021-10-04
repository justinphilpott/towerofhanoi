
# The Tower of Hanoi
[Tower of Hanoi web app](https://towerofhanoi.app)

Developed initially as a test to learn the XState state management library, I then decided to create an app to package the basic puzzle and release it for fun and learning.

## Local development:

Install:
`$ yarn`

Run in dev mode:
`$ yarn dev`

## XState concepts:
Finite state: A single enumerable state value that can be one of a finite set of defined states, with defined transitions between state values, triggered by a defined set of events.
Extended state: a store of variables that can be updated by actions fired as part of state transitions

[XState Documentation](https://xstate.js.org/docs/)


## Full documentation:
[Tower of Hanoi app docs]()


## Todo:
- [ ] Write an audio player that works on IOS
- [ ] Implement timed games
- [ ] Setup MBT for the HanoiFSM

### Known bugs:
- [ ] IOS play music fails.




Tests:

End to end test with Puppeteer.

- Be sure to run a build first

yarn e2e

Settings are in jest-puppeteer.config.js







To run lighthouse cli to check performance:
https://github.com/GoogleChrome/lighthouse#cli-options
yarn dlx lighthouse --view [https://towerofhanoi.app] --screenEmulation.disabled


Attributions:

Artwork:

"Lilypad" by and with thanks to Slumberbean (specific permission obtained) - http://www.slumberbean.com


Music:

Thanks to Purrple Cat and Uniq for the great vibes:

Equinox by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

Floating Castle by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

Mysterious Lights by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

Wild Strawberry by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

Reverse by Uniq | https://soundcloud.com/uniqofficial/
Music promoted by https://www.chosic.com/
Attribution 4.0 International (CC BY 4.0)
https://creativecommons.org/licenses/by/4.0/


Inspiration

...



License:

This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.