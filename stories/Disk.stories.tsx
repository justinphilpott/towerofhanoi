import React from "react";
import { Story, Meta } from '@storybook/react/types-6-0';
import { Disk, DiskProps } from '../components/Disk';

export default {
  title: 'Disk',
  component: Disk,
} as Meta;

const Template: Story<DiskProps> = (args) => <Disk {...args} />;

export const Default1 = Template.bind({});
Default1.args = {
  diskNumber: 10,
  diskSize: 30
};

