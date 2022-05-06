import React, {FC, MouseEventHandler, useState} from 'react';
import styles from './QuestionGenerator.module.css';
import {QuestionBody} from "../../interfaces/question/question-body";
import Question from "../Question/Question";
import {Link} from "react-router-dom";
import {CapitalOfCountryStrategy} from "./QuestionStrategies/capital-of-country-strategy";
import {CountryInContinentStrategy} from "./QuestionStrategies/country-in-continent-strategy";
import {RtlLanguageStrategy} from "./QuestionStrategies/rtl-language-strategy";
import {QuestionStrategy} from "./QuestionStrategies/question-strategy";
import {LanguageOfCountryStrategy} from "./QuestionStrategies/language-of-country-strategy";
import {QuestionStrategyInput} from "../../interfaces/question/question-strategy-input";
import {LeaderboardProfile} from "../../interfaces/leaderboard/LeaderboardProfile";
import {Button, Result} from "antd";

interface QuestionGeneratorInput extends QuestionStrategyInput {
    name: string;
}

const QuestionGenerator: FC<QuestionGeneratorInput> = (data) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [questions, setQuestions] = useState<QuestionBody[]>([]);
    const [score, setScore] = useState(0);
    const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);


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

            const result: LeaderboardProfile = {
                name: data.name,
                dateTime: new Date(),
                score: score
            }

            const leaderboardProfiles: LeaderboardProfile[] = JSON.parse(localStorage.getItem("leaderboard") || JSON.stringify([]));
            const updatedLeaderboard = JSON.stringify([...[result], ...leaderboardProfiles])

            localStorage.setItem("leaderboard", updatedLeaderboard);

        }
    };

    const fiftyFiftyClicked = (event: any) => {
        setFiftyFiftyUsed(true);
        let counter = 0;
        questions[currentQuestion].options.map(option => {
            if (!option.isAnswer && counter < 2) {
                option.title = "";
                counter = counter + 1;
            }
        })
        event.preventDefault();
    }


    return (
        <div className={styles.QuestionGenerator} data-testid="QuestionGenerator">
            {
                !quizFinished ? (

                    <div className="question">
                        <div className={styles.guidance}>
                            <Button disabled={fiftyFiftyUsed} onClick={fiftyFiftyClicked}>50/50</Button>
                        </div>
                        {questions.length !== 0 ?
                            <Question questionNumber={currentQuestion + 1} question={questions[currentQuestion]}
                                      answerSubmission={answerSubmission}></Question> : null}
                    </div>
                ) : (

                    <div className='result'>
                        <h3>You scored {score} out of {questions.length}</h3>
                        <Result
                            icon={
                                score < 5 ? <img style={{marginBottom: "1em"}} height="200px"
                                                 src="https://i.pinimg.com/736x/d6/3e/dd/d63edd9af879f866baea5e3c5b506959.jpg"></img> :
                                    score < 8 ? <img style={{marginBottom: "1em"}} height="200px"
                                                     src="https://external-preview.redd.it/KccyhwbsmRR0ADdmpXkmnMnJfpp7cOBTTZQuLZ8V-to.jpg?auto=webp&s=bfc8c4af211d9c94dacb0090f435c750ff858e69"></img> :
                                        <img style={{marginBottom: "1em"}} height="200px"
                                             src="https://i.kym-cdn.com/entries/icons/mobile/000/009/993/tumblr_m0wb2xz9Yh1r08e3p.jpg"></img>
                            }
                            title={score < 5 ? 'Seriously?! You need geography lesson!!' : score < 8 ? 'Hmm... Not Bad!' : 'You are good! Well done!!!'}
                            extra={<Button type="primary">
                                <Link to="/results/leaderboard">
                                    Leaderboard
                                </Link>
                            </Button>}
                        />

                    </div>
                )
            }

        </div>
    )
};


export default QuestionGenerator;
