import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { ScreenStart } from '../ScreenStart';

/** need screen provider here */
describe('Screen: Start', () => {
test('Renders', () => {
    const { getByText } = render(<ScreenStart />)
{/*    expect(getByText('Tower of Hanoi:')).toBeVisible();
    expect(getByText('Pegs')).toBeVisible();
    expect(getByText('Disks')).toBeVisible();
expect(getByText('Play')).toBeVisible();*/}
  })
})