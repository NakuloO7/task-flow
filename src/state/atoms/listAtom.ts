import { atom } from "jotai";
import type { List } from "../../types";
import { lists as mocLists } from "../../data/mocData";

export const listState = atom<Record<string, List>> (mocLists)