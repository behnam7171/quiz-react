import React, {FC, useState} from 'react';
import styles from './QuestionGenerator.module.css';
import {QuestionBody} from "../../interfaces/question/question-body";
import Question from "../Question/Question";

interface QuestionGeneratorProps {
    // countries: Country[]
}

const questions: QuestionBody[] = [{
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
}, {
    title: 'Where is capital of England',
    options: [{
        title: 'tokyo',
        isAnswer: true,
    }, {
        title: 'london',
        isAnswer: true,
    }, {
        title: 'berlin',
        isAnswer: false,
    }, {
        title: 'prague',
        isAnswer: false,
    }],
    tip: 'london!!! ofc'
}];

const QuestionGenerator: FC<QuestionGeneratorProps> = (countries) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [score, setScore] = useState(0);

    const answerSubmittion = (isCorrect: boolean) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className={styles.QuestionGenerator} data-testid="QuestionGenerator">
            {
                quizFinished ? (
                    <div className="question">
                        <Question question={questions[currentQuestion]} answerSubmittion={answerSubmittion}></Question>
                    </div>
                ) : (
                    <div className='result'>
                        You scored {score} out of {questions.length}
                    </div>
                )
            }


        </div>
    )
};

export default QuestionGenerator;
