import { atom } from "jotai";
import type { Board } from "../../types";
import { boards as mocBoards } from "../../data/mocData";


export const boardState = atom<Record<string, Board>> (mocBoards);