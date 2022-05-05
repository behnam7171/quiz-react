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

const queries = {
    continents: gql`query MyQuery {
  continents {
    code
    name
  }
}`,
    countries: gql`{
  countries  {
    name,
    code,
    native,
    phone,
    continent {
      code,
      name
    }
    currency,
    languages {
      name,
      code,
      native,
      rtl
    },
    emoji,
    states {
      code,
      name
    },
    capital,
    
  }
}` , languages: gql`{
  languages {
    code,
    name,
    native,
    rtl
  }
}`

}


const QuestionGenerator: FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [questions, setQuestions] = useState<QuestionBody[]>([]);
    const [score, setScore] = useState(0);


    const allContinentsResult = useQuery(queries.continents);
    const allCountriesResult = useQuery(queries.countries);
    const allLanguagesResult = useQuery(queries.languages);

    const errors = allContinentsResult.error || allCountriesResult.error || allLanguagesResult.error;
    const loading = allContinentsResult.loading || allCountriesResult.loading || allLanguagesResult.loading;


    console.error(errors);

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
                countries: allCountriesResult.data.countries,
                continents: allContinentsResult.data.continents,
                languages: allLanguagesResult.data.languages
            }));
        }
        return result;
    }


    React.useEffect(() => {
        if (allContinentsResult.data && allLanguagesResult.data && allCountriesResult.data) {
            setQuestions(generateQuestions(10));
        }
    }, [allContinentsResult, allCountriesResult, allLanguagesResult])

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

    if (loading) {
        return <p>loading...</p>;
    }

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
