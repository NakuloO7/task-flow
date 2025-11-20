import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { boardState } from "../state/atoms/boardAtom";
import { listState } from "../state/atoms/listAtom";
import ListColumn from "../components/ListColumn";
import { DndContext } from "@dnd-kit/core";


const BoardDetails: React.FC = () => {
  const { id } = useParams();
  const boards = useAtomValue(boardState);
  const lists = useAtomValue(listState);
  const setLists = useSetAtom(listState);

  const setBoards = useSetAtom(boardState);

  const board = id ? boards[id] : undefined;

  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");

  if (!board) {
    return <div className="p-6 text-xl">Board not found!</div>;
  }

  const handleCreateList = () => {
    if (!newListTitle.trim()) return;

    const newListId = crypto.randomUUID();

    setLists((prev) => ({
      ...prev,
      [newListId]: {
        id: newListId,
        title: newListTitle.trim(),
        cardIds: [],
      },
    }));

    setBoards((prev) => ({
      ...prev,
      [board.id]: {
        ...prev[board.id],
        listIds: [...prev[board.id].listIds, newListId],
      },
    }));

    setNewListTitle("");
    setIsAddingList(false);
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">{board.name}</h1>

      <DndContext>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {board.listIds.map((listId) => (
            <ListColumn key={listId} listId={listId} boardId={board.id} />
          ))}

          {!isAddingList ? (
            <button
              onClick={() => setIsAddingList(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shrink-0"
            >
              + Add List
            </button>
          ) : (
            <div className="flex flex-col gap-2 bg-gray-200 p-4 rounded-lg w-64 shrink-0">
              <input
                type="text"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                className="border px-2 py-1 rounded"
                placeholder="List title"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateList}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Create
                </button>
                <button
                  onClick={() => setIsAddingList(false)}
                  className="bg-gray-400 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </DndContext>
    </div>
  );
};

export default BoardDetails;