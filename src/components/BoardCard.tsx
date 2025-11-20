import { useSetAtom } from "jotai";
import React, { useState } from "react";
import { boardState } from "../state/atoms/boardAtom";
import { useNavigate } from "react-router-dom";
type boardCardProps = {
  id: string;
  name: string;
  createdAt: string;
};
const BoardCard: React.FC<boardCardProps> = ({ id, name, createdAt }) => {
  const navigate = useNavigate();
  const setBoards = useSetAtom(boardState);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);

  const handleDelete = () => {
    setBoards((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const handleSave = () => {
    if (!editName.trim()) return;

    setBoards((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        name: editName.trim(),
      },
    }));
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition cursor-pointer flex flex-col gap-2">
      {!isEditing ? (
        <>
          <div onClick={() => navigate(`/boards/${id}`)} className="cursor-pointer flex-1">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">
              Created {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-2 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            className="border px-2 py-1 rounded"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-2 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-2 py-1 text-sm bg-gray-400 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BoardCard;
