import React, {FC} from 'react';
import styles from './Question.module.css';
import {QuestionBody} from "../../interfaces/question/question-body";

interface QuestionProps {
    question: QuestionBody;
    answerSubmission: (isAnswer: boolean) => void;
}


const Question: FC<QuestionProps> = ({question, answerSubmission}) => {

    const answerSelected = (isAnswer: boolean) => {
        console.log(isAnswer);
        answerSubmission(isAnswer);
    }

    return (
        <div className={styles.Question} data-testid="Question">
            <div>question: {question.title}</div>
            <div className='options'>
                {question?.options.map((option) => (
                    // onClick={() => handleAnswerOptionClick(option.isAnswer)}
                    <button key={option.title} onClick={() => answerSelected(option.isAnswer)}>{option.title}</button>
                ))}
            </div>
            <div className={styles.tip}>question: {question.tip}</div>
        </div>
    )
};


export default Question;
