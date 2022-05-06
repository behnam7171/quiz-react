import {QuestionBody} from "../../../interfaces/question/question-body";
import {QuestionStrategyInput} from "../../../interfaces/question/question-strategy-input";
import {QuestionStrategy} from "./question-strategy";
import {BaseEntity} from "../../../interfaces/quiz/baseEntity";

export class CapitalOfCountryStrategy extends QuestionStrategy {
    generate(data: QuestionStrategyInput): QuestionBody {
        const countries = data.countries || [];

        const targetCountry = this.pickRandomFromArray(countries, 1)[0];
        const countriesExceptTarget = countries.filter(country => country.code !== targetCountry.code);

        const incorrectAnswers: BaseEntity[] = this.pickRandomFromArray(countriesExceptTarget, 3).map(country => {
            return {
                name: country.capital,
                code: country.code
            }
        });

        const correctAnswer: BaseEntity = {
            code: targetCountry.code,
            name: targetCountry.capital
        };

        return {
            title: `What is capital of ${targetCountry.name}?`,
            options: this.optionsGenerator(correctAnswer, incorrectAnswers),
            tip: `The country is in ${targetCountry.continent?.name}`
        }
    }

}