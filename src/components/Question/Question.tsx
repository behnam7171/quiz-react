import React, {FC} from 'react';
import styles from './Question.module.css';
import {QuestionBody} from "../../interfaces/question/question-body";
import {Button, Col, Popover, Row} from 'antd';
import {InfoCircleFilled} from "@ant-design/icons";

interface QuestionProps {
    question: QuestionBody;
    questionNumber: number;
    answerSubmission: (isAnswer: boolean) => void;
}


const Question: FC<QuestionProps> = ({question,questionNumber, answerSubmission}) => {

    const answerSelected = (isAnswer: boolean) => {
        console.log(isAnswer);
        answerSubmission(isAnswer);
    }

    return (
        <div className={styles.Question} data-testid="Question">
            <div style={{
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1em",
                display: "flex",
            }} className={styles.tipContainer}>
                <div style={{marginInlineEnd: "0.5em"}}>{questionNumber}. {question.title}</div>
                <Popover content={question.tip} >
                    <InfoCircleFilled />
                </Popover>
            </div>
            <div className={styles.options}>
                <Row gutter={[16, 16]}>
                    {question?.options.map((option, index) => {
                        return (
                            <Col xs={{span: 12}} lg={{span: 12}}>
                                <Button disabled={option.title === ""} title={option.title} style={{width: "100%"}} key={option.title}
                                        onClick={() => answerSelected(option.isAnswer)}>
                                    <div style={{
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        width: "100%",
                                        display: "inline-block"}}>
                                        {option.title}
                                    </div>
                                </Button>
                            </Col>
                            // onClick={() => handleAnswerOptionClick(option.isAnswer)}
                        )
                    })}
                </Row>
            </div>
        </div>
    )
};


export default Question;
