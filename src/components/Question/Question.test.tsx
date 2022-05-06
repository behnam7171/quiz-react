import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Question from './Question';

describe('<Question />', () => {
    test('it should mount', () => {
        render(<Question questionNumber={1} question={{
            title: 'Where is capital of Iran',
            options: [{
                title: 'tehran',
                isAnswer: true,
            }, {
                title: 'london',
                isAnswer: false,
            }, {
                title: 'amsterdam',
                isAnswer: false,
            }, {
                title: 'kabol',
                isAnswer: false,
            }],
            tip: 'Tehran!!! ofc'
        }} answerSubmission={() => {
        }}/>);

        const question = screen.getByTestId('Question');

        expect(question).toBeInTheDocument();
    });
});