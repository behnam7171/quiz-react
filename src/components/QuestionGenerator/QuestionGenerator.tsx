import React, {FC, useState} from 'react';
import styles from './QuestionGenerator.module.css';
import {QuestionBody} from "../../interfaces/question/question-body";
import Question from "../Question/Question";
import {useNavigate} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import {CapitalOfCountryStrategy} from "./QuestionStrategies/capital-of-country-strategy";
import {CountryInContinentStrategy} from "./QuestionStrategies/country-in-continent-strategy";
import {RtlLanguageStrategy} from "./QuestionStrategies/rtl-language-strategy";
import {QuestionStrategy} from "./QuestionStrategies/question-strategy";
import {LanguageOfCountryStrategy} from "./QuestionStrategies/language-of-country-strategy";
import {QuestionStrategyInput} from "../../interfaces/question/question-strategy-input";


const QuestionGenerator: FC<QuestionStrategyInput> = (data) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [questions, setQuestions] = useState<QuestionBody[]>([]);
    const [score, setScore] = useState(0);


    const capitalOfCountryStrategy = new CapitalOfCountryStrategy();
    const countryInContinentStrategy = new CountryInContinentStrategy();
    const rtlLanguageStrategy = new RtlLanguageStrategy();
    const languageOfCountryStrategy = new LanguageOfCountryStrategy();


    const generateQuestions = (numberOfQuestions: number) => {
        const strategies: QuestionStrategy[] = [capitalOfCountryStrategy, countryInContinentStrategy, rtlLanguageStrategy, languageOfCountryStrategy]
        const result: QuestionBody[] = [];
        for (let i = 0; i < numberOfQuestions; i++) {
            const randomNumber = Math.floor(Math.random() * (strategies.length));
            result.push(strategies[randomNumber].generate({
                countries: data.countries,
                continents: data.continents,
                languages: data.languages
            }));
        }
        return result;
    }

    React.useEffect(() => {
        if (data.countries?.length !== 0 && data.continents?.length !== 0 && data.languages?.length !== 0) {
            setQuestions(generateQuestions(10));
        }
    }, [data.continents, data.continents, data.languages])


    const answerSubmission = (isCorrect: boolean) => {
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


    let navigate = useNavigate();
    const NavigateToLeaderboard = () => navigate('/results/leaderboard', {replace: true});

    return (
        <div className={styles.QuestionGenerator} data-testid="QuestionGenerator">
            {
                !quizFinished ? (
                    <div className="question">
                        {questions.length !== 0 ? <Question question={questions[currentQuestion]}
                                                            answerSubmission={answerSubmission}></Question> : null}
                    </div>
                ) : (
                    <div className='result'>
                        You scored {score} out of {questions.length}
                        <button onClick={NavigateToLeaderboard}>Leaderboard</button>
                    </div>
                )
            }
        </div>
    )
};


export default QuestionGenerator;
