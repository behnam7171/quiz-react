import {BaseEntity} from "./baseEntity";

export interface Language extends BaseEntity {
    native?: string;
    rtl: boolean;
}