import React, { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { boardState } from "../state/atoms/boardAtom";
import BoardCard from "../components/BoardCard";

const Boards: React.FC = () => {
  const boards = useAtomValue(boardState);
  const setBoards = useSetAtom(boardState);

  const [isAdding, setIsAdding] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) return;

    const newId = crypto.randomUUID();

    setBoards((prev) => ({
      ...prev,
      [newId]: {
        id: newId,
        name: newBoardName.trim(),
        listIds: [],
        createdAt: new Date().toISOString(),
      },
    }));

    setNewBoardName("");
    setIsAdding(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Boards</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {Object.values(boards).map((board) => (
          <BoardCard
            key={board.id}
            id={board.id}
            name={board.name}
            createdAt={board.createdAt}
          />
        ))}
      </div>

      {/* Add New Board UI */}
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Add New Board
        </button>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            placeholder="Board name"
            className="border rounded-lg px-3 py-2 flex-1"
            autoFocus
          />
          <button
            onClick={handleCreateBoard}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Create
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Boards;