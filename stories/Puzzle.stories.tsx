import React from "react";
import { Story, Meta } from '@storybook/react/types-6-0';
import { Puzzle } from '../components/Puzzle';

export default {
  title: 'Puzzle',
  component: Puzzle,
} as Meta;

const Template: Story = (args) => <Puzzle />;

export const Default1 = Template.bind({});

