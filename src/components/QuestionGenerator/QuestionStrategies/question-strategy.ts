import {QuestionStrategyInput} from "../../../interfaces/question/question-strategy-input";
import {QuestionBody} from "../../../interfaces/question/question-body";
import {BaseEntity} from "../../../interfaces/quiz/baseEntity";
import shuffle from "lodash.shuffle"
import {Option} from "../../../interfaces/question/option";

export abstract class QuestionStrategy {

    abstract generate(questionStrategyInput: QuestionStrategyInput): QuestionBody;

    shuffle<T>(targetArray: Array<T>): Array<T> {
        return shuffle(targetArray);
    }

    pickRandomFromArray<T>(targetArray: T[], numberOfItems: number): Array<T> {
        return this.shuffle(targetArray).slice(0, numberOfItems);
    }

    optionsGenerator<T extends BaseEntity>(correctAnswer: T, incorrectAnswers:  T[]): Option[] {
        const allAnswers = [...[correctAnswer], ...incorrectAnswers];

        return  this.shuffle(allAnswers.map((answer, index) => {
            return {
                title: answer.name,
                isAnswer: index === 0
            }
        }));
    }

}