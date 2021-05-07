import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { ScreenStart } from './ScreenStart';

describe('Screen: Start', () => {
test('Renders', () => {
    const { getByText, getByLabelText } = render(<ScreenStart onPlay={} />)
    expect(getByText('Choose game setup:')).toBeVisible();
    expect(getByText('Pegs')).toBeVisible();
    expect(getByText('Disks')).toBeVisible();
    expect(getByText('Play')).toBeVisible();
  })
})