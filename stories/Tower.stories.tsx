import React from "react";
import { Story, Meta } from '@storybook/react/types-6-0';
import { Tower, TowerProps } from '../components/Tower';

export default {
  title: 'Tower',
  component: Tower,
} as Meta;

const Template: Story<TowerProps> = (args) => <Tower {...args} />;

export const Default1 = Template.bind({});
Default1.args = {
  towerDiscs: [1, 2, 3, 4, 5, 6, 7],
  towerWidth: 500
};
