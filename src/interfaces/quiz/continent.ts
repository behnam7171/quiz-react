import {BaseEntity} from "./baseEntity";
import {Country} from "./country";

export interface Continent extends BaseEntity {
    countries?: Country[]
}