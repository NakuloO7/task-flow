import type { Board, List, Card } from "../types";

export const cards: Record<string, Card> = {
  c1: { id: "c1", title: "Setup project", completed: false, createdAt: "2025-11-13T08:00:00Z" },
  c2: { id: "c2", title: "Design homepage", completed: true, createdAt: "2025-11-13T09:00:00Z" },
  c3: { id: "c3", title: "Implement API", completed: false, createdAt: "2025-11-13T10:00:00Z" },
};

export const lists: Record<string, List> = {
  l1: { id: "l1", title: "Todo", cardIds: ["c1", "c3"] },
  l2: { id: "l2", title: "Done", cardIds: ["c2"] },
};


export const boards : Record<string, Board> ={
    b1: { id: "b1", name: "Project Alpha", listIds: ["l1", "l2"], createdAt: "2025-11-13T07:00:00Z" },
}