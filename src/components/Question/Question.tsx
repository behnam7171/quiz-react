import React, {FC} from 'react';
import styles from './Question.module.css';
import {QuestionBody} from "../../interfaces/question/question-body";

interface QuestionProps {
    question: QuestionBody;
    answerSubmittion: (isAnswer: boolean) => void;
}


const Question: FC<QuestionProps> = ({question, answerSubmittion}) => {

    const answerSelected = (isAnswer: boolean) => {
        console.log(isAnswer);
        answerSubmittion(isAnswer);
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
            <div>question: {question.tip}</div>
        </div>
    )
};


export default Question;
