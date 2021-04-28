import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';

import { TowerOfHanoiGame } from './TowerOfHanoiGame';

describe('Tower of Hanoi Game', () => {
  test('Renders', () => {
    const { getByText, getByLabelText } = render(<TowerOfHanoiGame />)
  })
})