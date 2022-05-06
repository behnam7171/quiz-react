import {Language} from "../quiz/language";
import {Continent} from "../quiz/continent";
import {Country} from "../quiz/country";

export interface QuestionStrategyInput {
    languages?: Language[];
    continents?: Continent[];
    countries?: Country[];
}