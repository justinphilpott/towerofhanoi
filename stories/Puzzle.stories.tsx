import React from "react";
import { Story, Meta } from '@storybook/react/types-6-0';
import { Puzzle, PuzzleProps } from '../components/GameBoard';

export default {
  title: 'Puzzle',
  component: Puzzle
} as Meta;

const Template: Story<PuzzleProps> = (args) => <Puzzle {...args} />;

export const TowersOfHanoi = Template.bind({});
TowersOfHanoi.args = {
  puzzleState: [[1, 2, 3, 4, 5, 6, 7], [], []]
};
export const TowersOfHanoiMidGame = Template.bind({});
TowersOfHanoiMidGame.args = {
  puzzleState: [[1], [2], [3]],
};


export const RevesPuzzle = Template.bind({});
RevesPuzzle.args = {
  puzzleState: [[1, 2, 3, 4, 5, 6, 7], [], [], []],
};
export const RevesMidGame = Template.bind({});
RevesMidGame.args = {
  puzzleState: [[5, 6, 7], [1], [2, 3], [4]],
};
