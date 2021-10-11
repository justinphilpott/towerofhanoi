---
description: An overview of the original puzzle game
---

# The classic puzzle

### Game Structure

Here's a screenshot from the [Tower of Hanoi app](https://towerofhanoi.app) that shows the start position of the 3peg, 5 disc variation of the game.

![screenshot from towerofhanoi.app](.gitbook/assets/toh\_5peg.png)

### Aim and rules

The aim is to move the discs from the start peg to the destination peg (in this case the one on the right)  using the spare peg in the middle. The following rules are to be adhered to:

1. Move only one disk at a time.
2. Move a single disk from the top of a tower and place it on another tower of empty peg
3. Disks must always sit on top of other larger disks or an empty peg

### Mathematics of the game

We aim to complete the puzzle with as few moves as possible. For the 3 peg game, the minimum number of moves is:

$$
min. moves = 2^n-1
$$

Where n is the number of disks that we choose to play with. The power of the exponential means that a 5 disks game will require 31 moves, but a 10 disk game requires just over a thousand, and a 20 disk game over a million moves. It makes one wonder who has completed the largest version of this game!? There is a legend about an [Indian](https://en.wikipedia.org/wiki/India) temple in [Kashi Vishwanath](https://en.wikipedia.org/wiki/Kashi_Vishwanath_Temple) containing a large room with three time-worn posts in it, surrounded by 64 golden disks. Acting out the command of an ancient prophecy, [Brahmin](https://en.wikipedia.org/wiki/Brahmin) priests have been moving these disks in accordance with the immutable rules of Brahma since that time. The puzzle is therefore also known as the Tower of [Brahma](https://en.wikipedia.org/wiki/Brahma). According to the legend, when the last move of the puzzle is completed, the world will end. 

If those priests were able to move the disks at a rate of one per second, using the smallest number of moves, it would take them (with supernatural dedication and longevity) 2^64 − 1 seconds or roughly 585 billion years to finish, which is about 42 times the current age of the universe. (WikiPedia)

The puzzle was invented by the French mathematician [Édouard Lucas](https://en.wikipedia.org/wiki/%C3%89douard_Lucas) in 1883 and interestingly contains a lot of hidden complexity. Finding proofs for optimal solutions for games with more than 3 Pegs turns out to be quite a challenge. The 4 Peg version as seen below is known as the Reve's Puzzle:\


![The four disk game - Reve's puzzle.](<.gitbook/assets/Screenshot from 2021-10-08 10-27-20.png>)

### Research

Many papers and essays have been written about searches for optimality within the games where p > 3 where p is the number of pegs in the game. The game graph of the p = 3 game is well known and mirrors the fractal known and the [Sierpiński triangle](https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle). Having worked through what I think are optimal solutions for p = 4 and p = 5 games for values of n < 9 I believe that the graphs for games p > 3 also display a more complex (you might say higher-order) fractal nature.\
\
\[More to come here.]
