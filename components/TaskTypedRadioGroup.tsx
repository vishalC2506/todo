"use client";
import React from "react";
import { useBoardStore } from "@/store/BoardStore";
import { AiFillCheckCircle } from "react-icons/ai";
import { RadioGroup } from "@headlessui/react";
const types = [
  {
    id: "todo",
    name: "Todo",
    description: "A new Task to be completed",
    color: "bg-red-500/90",
  },
  {
    id: "Inprogress",
    name: "In Progress",
    description: "A task that is currently  being worked on ",
    color: "bg-yellow-500/90",
  },
  {
    id: "done",
    name: "Done",
    description: "A task that has been completed ",
    color: "bg-green-500/90",
  },
];
const TaskTypedRadioGroup = () => {
  const [setNewTaskType, newTaskType] = useBoardStore((state) => [
    state.setNewTaskType,
    state.newTaskType,
  ]);
  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup
          value={newTaskType}
          onChange={(e) => {
            setNewTaskType(e);
          }}
        >
          <div className="space-y-2">
            {types.map((type) => (
              <RadioGroup.Option
                key={type.id}
                value={type.id}
                className={({ active, checked }) =>
                  `${
                    active
                      ? `${type.color} ring-2  ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300`
                      : ""
                  }${
                    checked
                      ? `${type.color} bg-opacity-75 text-white`
                      : "bg-white"
                  }
                  relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md foucs:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {type.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-white" : "text-gray-700"
                            }`}
                          >
                            <span>{type.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <AiFillCheckCircle className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default TaskTypedRadioGroup;
