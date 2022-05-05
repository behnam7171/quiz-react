import {Language} from "../language";
import {Continent} from "../continent";
import {Country} from "../country";

export interface QuestionStrategyInput {
    languages?: Language[];
    continents?: Continent[];
    countries?: Country[];
}