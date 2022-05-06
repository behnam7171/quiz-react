import {QuestionBody} from "../../../interfaces/question/question-body";
import {QuestionStrategyInput} from "../../../interfaces/question/question-strategy-input";
import {QuestionStrategy} from "./question-strategy";
import {Language} from "../../../interfaces/quiz/language";

export class RtlLanguageStrategy extends QuestionStrategy {
    generate(data: QuestionStrategyInput): QuestionBody {
        const languages = data.languages || [];

        const rtlLanguages = languages.filter(language => language.rtl);
        const correctAnswer: Language = this.pickRandomFromArray(rtlLanguages, 1)[0];

        const ltrLanguages = languages.filter(language => !language.rtl);
        const incorrectAnswers = this.pickRandomFromArray(ltrLanguages, 3);



        return {
            title: `Which Language is right-to-left language?`,
            options: this.optionsGenerator(correctAnswer, incorrectAnswers),
            tip: `The native of the language is ${correctAnswer.native}`
        }
    }

}