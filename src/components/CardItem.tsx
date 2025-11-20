import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Card } from "../types";

type CardItemProps = {
  card: Card;
};

const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: card.id,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded-md shadow p-2 text-sm border hover:bg-gray-50 cursor-grab active:cursor-grabbing"
    >
      <div className="font-medium">{card.title}</div>
      {card.description && (
        <div className="text-xs text-gray-500 mt-1 line-clamp-2">{card.description}</div>
      )}
    </div>
  );
};

export default CardItem;
