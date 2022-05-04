import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QuestionGenerator from './QuestionGenerator';

describe('<QuestionGenerator />', () => {
  test('it should mount', () => {
    render(<QuestionGenerator />);
    
    const questionGenerator = screen.getByTestId('QuestionGenerator');

    expect(questionGenerator).toBeInTheDocument();
  });
});