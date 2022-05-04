import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Question from './Question';

describe('<Question />', () => {
    test('it should mount', () => {
        render(<Question question={{
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
        }} answerSubmittion={(isAnswer) => {
        }}/>);

        const question = screen.getByTestId('Question');

        expect(question).toBeInTheDocument();
    });
});