import {QuestionBody} from "../../../interfaces/question/question-body";
import {QuestionStrategyInput} from "../../../interfaces/question/question-strategy-input";
import {QuestionStrategy} from "./question-strategy";
import {Language} from "../../../interfaces/language";

export class LanguageOfCountryStrategy extends QuestionStrategy {
    generate(data: QuestionStrategyInput): QuestionBody {
        const languages = data.languages || [];
        const countries = data.countries || [];

        const targetLanguage: Language = this.pickRandomFromArray(languages, 1)[0];

        const countriesSpeakTargetLanguage = countries.filter(country => {
            const countrySpokenLanguagesCodes = country.languages?.map(lang => lang.code);
            return countrySpokenLanguagesCodes?.includes(targetLanguage.code)
        });
        const correctAnswer = this.pickRandomFromArray(countriesSpeakTargetLanguage, 1)[0];


        const countriesNotSpeakTargetLanguage = countries.filter(country => {
            const countrySpokenLanguagesCodes = country.languages?.map(lang => lang.code);
            return !countrySpokenLanguagesCodes?.includes(targetLanguage.code)
        });
        const incorrectAnswers = this.pickRandomFromArray(countriesNotSpeakTargetLanguage, 3);



        return {
            title: `Which country speaks ${targetLanguage.name}?`,
            options: this.optionsGenerator(correctAnswer, incorrectAnswers),
            tip: `The country emoji is ${correctAnswer.emoji}`
        }
    }

}