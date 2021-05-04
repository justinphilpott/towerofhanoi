import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { ScreenStart } from './ScreenStart';

describe('Screen: Start', () => {
test('Renders', () => {
    const { getByText, getByLabelText } = render(<ScreenStart />)
    expect(getByText('Choose your puzzle setup:')).toBeVisible();
    expect(getByLabelText('Number of disks')).toBeVisible();
    expect(getByLabelText('Number of towers')).toBeVisible();
    expect(getByText('Play')).toBeVisible();

  })
})