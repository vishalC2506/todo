"use client";
import React from "react";
import { useState, useEffect } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from "react-beautiful-dnd";
import { useBoardStore } from "@/store/BoardStore";
import getUrl from "@/lib/getUrl";
import Image from "next/image";
type Props = {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};
const TodoCard = ({
  todo,
  index,
  id,
  innerRef,
  dragHandleProps,
  draggableProps,
}: Props) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    console.log(todo.image);
    if (todo.image) {
      const fetchImage = async () => {
        const url = await getUrl(todo.image!);
        console.log(`url is ${url}`)
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImage();
    }
  }, [todo]);
  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white rounded-md space-y-2 drop-shadow-md"
    >
      <div className="flex justify-between items-center p-5">
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(index, todo, id)}>
          <MdOutlineDeleteForever className="ml-5 h-8 w-8 text-red-400 hover:text-red-600" />
        </button>
      </div>
      {/* Add Image here */}
      {imageUrl && (
        <div className="h-fullw-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="Task Image"
            width={400}
            height={200}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
};

export default TodoCard;
