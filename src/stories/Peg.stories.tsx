import React from "react";
import { Story, Meta } from '@storybook/react/types-6-0';
import { Peg, PegProps } from '../components/towerofhanoi/Peg';

export default {
  title: 'Peg',
  component: Peg,
} as Meta;

const Template: Story<PegProps> = (args) => <Peg {...args} />;

export const Default1 = Template.bind({});
Default1.args = {
  pegDiscs: [1, 2, 3, 4, 5, 6, 7],
  numPegs: 3,
  numDisks: 3,
  pegNum: 1,
  selectHandler: () => { alert('dummy select handler') }
}