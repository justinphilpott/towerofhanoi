import React from "react";
import { Story, Meta } from '@storybook/react/types-6-0';
import { Disk, DiskProps } from '../components/towerofhanoi/Disk';

export default {
  title: 'Disk',
  component: Disk,
} as Meta;

const Template: Story<DiskProps> = (args) => <Disk {...args} />;

export const std = Template.bind({});
std.args = {
  diskNumber: 1,
};

