import {Option} from "./option";

export interface QuestionBody {
    options: Option[];
    title: string;
    tip: string
}