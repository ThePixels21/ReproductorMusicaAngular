import { ISong } from "./ISong";

export interface ISelectableSong extends ISong {
    selected?: boolean;
}