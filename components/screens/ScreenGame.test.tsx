import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { ScreenGame } from './ScreenGame';

describe('Screen: Game', () => {
  test('Renders', () => {
    const { getByText, getByLabelText } = render(<ScreenGame />)
  })
})