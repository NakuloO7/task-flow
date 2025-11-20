import React, { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { listState } from "../state/atoms/listAtom";
import { cardState } from "../state/atoms/cardAtom";
import type { List } from "../types";
import CardItem from "./CardItem";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import type { Card } from "../types";

type ListColumnProps = {
  listId: string;
  boardId: string;
};

const ListColumn: React.FC<ListColumnProps> = ({ listId, boardId }) => {
  const lists = useAtomValue(listState);
  const cards = useAtomValue(cardState);
  const setLists = useSetAtom(listState);
  const setBoardsAtom = useSetAtom(listState); // correct mapping
  const setCards = useSetAtom(cardState);

  const list = lists[listId] as List;

  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  if (!list) return null;

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;

    const newId = crypto.randomUUID();

    const newCard: Card = {
      id: newId,
      title: newCardTitle.trim(),
      createdAt: new Date().toISOString(),
      completed: false,
    };

    setCards((prev) => ({
      ...prev,
      [newId]: newCard,
    }));

    setLists((prev) => ({
      ...prev,
      [listId]: {
        ...prev[listId],
        cardIds: [...prev[listId].cardIds, newId],
      },
    }));

    setNewCardTitle("");
    setIsAddingCard(false);
  };

  const handleDeleteList = () => {
    // Delete list from listState
    setLists((prev) => {
      const updated = { ...prev };
      delete updated[listId];
      return updated;
    });

    // Remove listId from board.listIds
    setBoardsAtom((prev: any) => ({
      ...prev,
      [boardId]: {
        ...prev[boardId],
        listIds: prev[boardId].listIds.filter((id: string) => id !== listId),
      },
    }));
  };

  return (
    <div className="bg-gray-100 w-64 shrink-0 rounded-lg p-4 shadow-md flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg">{list.title}</h3>
        <button onClick={handleDeleteList} className="text-xs text-red-600 hover:underline">
          Delete
        </button>
      </div>

      <SortableContext items={list.cardIds} strategy={verticalListSortingStrategy}>
        <div className="flex flex-col gap-2">
          {list.cardIds.map((cardId) => {
            const card = cards[cardId];
            if (!card) return null;
            return <CardItem key={card.id} card={card} />;
          })}
        </div>
      </SortableContext>

      {!isAddingCard ? (
        <button onClick={() => setIsAddingCard(true)} className="mt-2 text-sm text-blue-700 hover:underline">
          + Add card
        </button>
      ) : (
        <div className="flex flex-col gap-2">
          <textarea
            rows={2}
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            className="border rounded-md px-2 py-1 text-sm"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddCard}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded"
            >
              Add
            </button>
            <button
              onClick={() => setIsAddingCard(false)}
              className="px-3 py-1 bg-gray-300 text-sm rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListColumn;