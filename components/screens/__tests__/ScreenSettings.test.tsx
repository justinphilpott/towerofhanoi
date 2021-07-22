import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { ScreenSettings } from '../ScreenSettings';

describe('Screen: Start', () => {
test('Renders', () => {
    const { getByText, getByLabelText } = render(<ScreenSettings />)
{/*    expect(getByText('Choose game setup:')).toBeVisible();
    expect(getByText('Pegs')).toBeVisible();
    expect(getByText('Disks')).toBeVisible();
expect(getByText('Play')).toBeVisible();*/}
  })
})