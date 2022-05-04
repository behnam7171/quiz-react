import {BaseEntity} from "./baseEntity";
import {Continent} from "./continent";
import {Language} from "./language";
import {State} from "./state";

export interface Country extends BaseEntity {
    native: string
    phone: string;
    continent: Continent;
    currency: string;
    language: Language;
    emoji: string;
    state: State[];
    capital: string;
}