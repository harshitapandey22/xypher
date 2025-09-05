import React, { useState, useEffect } from "react";
import { deleteGoal, getGoals, reorderGoals } from "../api/goal";
import { useAuthStore } from "../store/authStore";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MdDelete } from "react-icons/md";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function GoalList({ refreshFlag }) {
  const { accessToken } = useAuthStore();
  const [goals, setGoals] = useState([]);

  const load = async () => {
    const res = await getGoals(accessToken);
    setGoals(res.data);
  };

  const handleDelete = async (id) => {
    await deleteGoal(id, accessToken);
    await load();
  };

  const onDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    const items = Array.from(goals);
    const [moved] = items.splice(source.index, 1);
    items.splice(destination.index, 0, moved);
    setGoals(items);
    const order = items.map((g) => g.id);
    await reorderGoals(order, accessToken);
  };

  useEffect(() => {
    load();
  }, [refreshFlag]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="goals">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {goals.map((g, idx) => {
              const percent = g.target
                ? Math.min(100, (g.current / g.target) * 100).toFixed(0)
                : 0;
              return (
                <Draggable key={g.id} draggableId={String(g.id)} index={idx}>
                  {(prov) => (
                    <li
                      ref={prov.innerRef}
                      {...prov.draggableProps}
                      {...prov.dragHandleProps}
                      className="border-b border-gray-600 p-2 mb-2 flex justify-between items-center"
                    >
                      <div className="flex items-center space-x-4">
                        <div style={{ width: 60, height: 60 }}>
                          <CircularProgressbar
                            value={g.current}
                            maxValue={g.target}
                            text={`${percent}%`}
                            styles={buildStyles({
                              textColor: "#fff",
                              pathColor: "#7c3aed", // Customize based on goal
                              trailColor: "#1f2937",
                              textSize: "18px",
                            })}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{g.name}</div>
                          <div className="text-sm">
                            ₹{g.current.toFixed(2)} / ₹{g.target.toFixed(2)} (
                            {percent}%)
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(g.id)}
                        className="text-[#FF4C4C] ml-4 cursor-pointer"
                      >
                        <MdDelete size={20} />
                      </button>
                    </li>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}
