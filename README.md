
The Tower of Hanoi

Developed initially just as a test of the XState state management library, I then decided to create an app to package the basic puzzle and release it for fun and learning.

XState concepts:
Finite state: enumerable 







To get setup locally:

Install:
$ yarn

Run in dev mode:
$ yarn dev









Work in progress:
- Write an audio player that works on IOS
- Implement timed games
- Setup MBT for the HanoiFSM



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