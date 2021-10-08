
# The Tower of Hanoi
[Tower of Hanoi web app](https://towerofhanoi.app)

Developed initially as a test to learn the XState state management library. I then decided to create an app to package the basic puzzle and release it for fun and learning. The games allows you to play games with 1-8 disks and 3-5 pegs. Moves counts can be shown along with minimum moves for each game to allow you to understand how to solve the game better. For the 3 peg game there are clear methods to achieve this, for the 4 peg game and beyond, deciding what is exactly optimal is not so clear!

## Full documentation:
[Tower of Hanoi app docs](https://app.gitbook.com/@jphildev/s/towerofhanoi/)

## Known issues/todo:
- [ ] Audio handling tweak needed to work on IOS
- [ ] Delays on some dialogs in E2E tests
- [ ] Tutorial resets "show moves" flag in XState context
- [ ] Implement timed games
- [ ] Setup MBT for the HanoiFSM

## Local development:

Install:
`$ yarn`

Run in dev mode:
`$ yarn dev`

## XState concepts:
Finite state: A single enumerable state value that can be one of a finite defined set, with defined transitions between state values, triggered by a defined set of events.
Extended state: a store of variables that can be updated by actions fired as part of state transitions.

[XState Documentation](https://xstate.js.org/docs/)

## Attributions:

### Artwork:

"Lilypad" by and with thanks to Slumberbean (specific permission obtained) - http://www.slumberbean.com

### Music:

Thanks to Purrple Cat and Uniq for the great vibes:

- [Equinox](https://purrplecat.com/) by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

- [Floating Castle](https://purrplecat.com/) by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

- [Mysterious Lights](https://purrplecat.com/) by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

- [Wild Strawberry](https://purrplecat.com/) by Purrple Cat | https://purrplecat.com/
Music promoted on https://www.chosic.com/
Creative Commons Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)
https://creativecommons.org/licenses/by-sa/3.0/

- [Reverse](https://soundcloud.com/uniqofficial/) by Uniq | https://soundcloud.com/uniqofficial/
Music promoted by https://www.chosic.com/
Attribution 4.0 International (CC BY 4.0)
https://creativecommons.org/licenses/by/4.0/

## License:

This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.