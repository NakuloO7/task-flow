import { atom } from "jotai";
import type { Card } from "../../types";
import { cards as mocCards } from "../../data/mocData";


export const cardState = atom<Record<string, Card>>(mocCards)