import React from "react";
import { Story, Meta } from '@storybook/react/types-6-0';
import { Game, GameProps } from '../components/towerofhanoi/Game';

export default {
  title: 'Game',
  component: Game
} as Meta;

const Template: Story<GameProps> = (args) => <Game {...args} />;

export const TowersOfHanoi = Template.bind({});
TowersOfHanoi.args = {
  gameBoard: [[1, 2, 3, 4, 5, 6, 7], [], []]
};
export const TowersOfHanoiMidGame = Template.bind({});
TowersOfHanoiMidGame.args = {
  gameBoard: [[1], [2], [3]],
};

export const RevesPuzzle = Template.bind({});
RevesPuzzle.args = {
  gameBoard: [[1, 2, 3, 4, 5, 6, 7], [], [], []]
};

export const RevesMidGame = Template.bind({});
RevesMidGame.args = {
  gameBoard: [[5, 6, 7], [1], [2, 3], [4]]
};