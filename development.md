---
title: Development
description: Notable aspects of the development
nav_order: 3
---

# Development

## Aims

The app was created basically to test out XState as a new (to me) way of modelling UI logic. There were a few other notable points that came up whilst creating the game which are touched upon below, with links to articles that I have authored on some of the topics. 

## XState

Considered, but exactly what I wanted to create sort of evolved to fluidly as I explored XState.


## NextJS dynamic import

Initially I coded the app so that XState loaded at the start and governed the screen logic from the first screen, then later in an optimization focused refactor aiming to get the "first load js" down as far below 100K as possible (implying a slightly leaning load time but more significantly less processing getting in the way of the Critical Rendering Path) .

I achieved this mainly by shifting XState out of the CRP and presenting instead a static HTML first screen. This is then immediately replaced on first interaction by dynamically loading in the "screenFSM" which (depending upon which menu button is selected) loads the screen control state machine into anyone of its four main states (game, tutorial, settings or credits). A fifth top level state "start" will then show the start screen again, when returned to, this time under XState control. All  screen are also dynamically loaded as and when requested.

[Check out the NextJS dynamic import docs](https://nextjs.org/docs/advanced-features/dynamic-import){:target="_blank" rel="noopener"}


## Automatic test generation with Model based testing

As part of the XState libraries there is XState/test, which provides some very interesting possibilities for the automatic generation of tests. This is achieved by using one of a set of provided methods that traverses the state graph (minimally or extensively) as defined by a "test machine" and returns a set of "paths" that can then be fed into the test runner. Et voila, one need only define state assertions and event triggers and you can get multiple tests for free. 

Worth noting here is that one can create a "test machine" to test an existing application with this method, it doesn't need to be created with XState. That said you can also use the same state machine that drives an application, to test that application, as I have done (with some tweaks) for the E2E tests.

These generated tests will be as meaningful as the logic in the "test" state machine. This could be used to extensively test a very complex component or to test a whole site E2E. Using this method we can create unit tests, integration tests or E2E tests.

In the towerofhanoi.app I use this method twice, once to test the screen flow, and secondly to test the user game interaction logic. Run the E2E tests to check it out.


### Model based test driven development (MDTDD)

Looking from another angle, one can see an interesting intersection between TDD and Model based testing, have a look at my [article of model based tdd](http://jphil.dev){:target="_blank" rel="noopener"}.

I wasn't the first to think of this of course, as the following research papers published on the exact topic of MBTDD atest:

[MBTDD research paper](https://www.worldscientific.com/doi/10.1142/S0218194012500295){:target="_blank" rel="noopener"}

[MBTDD in hardware design](https://link.springer.com/chapter/10.1007/978-3-319-06862-6_23){:target="_blank" rel="noopener"}


## Font optimization

Overview and link to Font optimization 

Link to article on jphil.dev
[font optimization in Chakra UI](http://jphil.dev){:target="_blank" rel="noopener"}


## Chakra UI usage

Having been on my list of stuff to check out I thought this app would be a good test bed for seeing if I would like the Chakra style, of styling. Initially having inline styles (reminding my of the VERY old days) and being in a way very verbose as a result, I didn't think I would stick with it. Here's why I did:

- For all its verbosity, I did find myself "thrashing" less between the file with the markup and the file with the style (or part of the file) which helped with speed of development for a prototype.
- Great docs, it's a really well documented project.

My current thought is that its great for a smaller project with minimal markup or quick prototypes, but if things were to get extensive, styling inline would become a nightmare. Great for components, not so good for general markup, especially if you were to have a lot of it that isn't part of a neatly packaged and optimally sized components.

[Chakra UI](https://chakra-ui.com/){:target="_blank" rel="noopener"}
