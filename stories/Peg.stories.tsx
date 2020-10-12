import React from "react";
import { Story, Meta } from '@storybook/react/types-6-0';
import { Peg, PegProps } from '../components/Peg';

export default {
  title: 'Tower of Hanoi peg',
  component: Peg,
} as Meta;

const Template: Story<PegProps> = (args) => <Peg {...args} />;

export const Default1 = Template.bind({});
Default1.args = {
  pegData: [1, 2, 3, 4, 5, 6, 7],
  pegWidth: 100,
  diskSize: 30
};
