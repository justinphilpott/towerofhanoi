import React from "react";
import { Story, Meta } from '@storybook/react/types-6-0';
import { Puzzle, PuzzleProps } from '../components/Puzzle';

export default {
  title: 'Puzzle',
  component: Puzzle,
} as Meta;

const Template: Story<PuzzleProps> = (args) => <Puzzle {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialState: [[1, 2, 3, 4, 5, 6, 7], [8], [9]]
};
