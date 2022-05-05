import {QuestionBody} from "../../../interfaces/question/question-body";
import {QuestionStrategyInput} from "../../../interfaces/question/question-strategy-input";
import {QuestionStrategy} from "./question-strategy";

export class CountryInContinentStrategy extends QuestionStrategy {
    generate(data: QuestionStrategyInput): QuestionBody {

        const continents = data.continents || [];
        const countries = data.countries || [];

        const randomContinent = this.pickRandomFromArray(continents, 1)[0];
        const countriesInContinent = countries.filter(country => country.continent?.code === randomContinent.code)

        const countriesNotInContinent = countries.filter(country => country.continent?.code !== randomContinent.code)
        const correctAnswer = this.pickRandomFromArray(countriesInContinent, 1)[0];
        const incorrectAnswers = this.pickRandomFromArray(countriesNotInContinent, 3);

        return {
            title: `Which country is in ${randomContinent.name}?`,
            options: this.optionsGenerator(correctAnswer, incorrectAnswers),
            tip: `They speak ${correctAnswer?.languages?.map(language => language.name).join(' and ')}`
        }
    }

}