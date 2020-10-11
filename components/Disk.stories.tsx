import React from "react";
import { Story, Meta } from '@storybook/react/types-6-0';
import { Disk, DiskProps } from './Disk';

export default {
  title: 'Tower of Hanoi disk',
  component: Disk,
} as Meta;

const Template: Story<DiskProps> = (args) => <Disk {...args} />;

export const Default1 = Template.bind({});
Default1.args = {
  diskNumber: 10,
  diskSize: 30
};

