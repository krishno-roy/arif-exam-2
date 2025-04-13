import React, { useState } from "react";

const Todos = () => {
  const [taks, setTask] = useState("");
  const [allTasks, setAllTasks] = useState([]);

  const addTask = () => {
    if (taks.trim() === "") return;
    setAllTasks([...allTasks, { id: Date.now(), text: taks }]);
    setTask("");
  };

  // Delete specific task by ID
  const deleteTask = (id) => {
    const existingTasks = allTasks.filter((task) => task.id !== id);
    setAllTasks(existingTasks);
  };

  return (
    <div className="container mx-auto px-12 pt-10">
      <h2 className="text-2xl font-bold mb-7">Todos Apps</h2>
      <div className="flex gap-6">
        <input
          value={taks}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
          type="text"
          name="text"
          id="text"
          placeholder="Enter Your Task"
          className="border p-2 rounded flex-grow focus:outline-none"
        />
        <button
          onClick={addTask}
          className="bg-black text-white rounded text-lg font-semibold py-2 px-4"
        >
          Add Task
        </button>
      </div>
      <div>
        {allTasks.length > 0 ? (
          <ul className="mt-4 space-y-2">
            {allTasks.map((task, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 bg-gray-100 shadow rounded"
              >
                <span>{task.text}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-600 hove:bg-red-400 text-white py-2 px-4 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 pt-4">No tasks yet. Add some task!</p>
        )}
      </div>
    </div>
  );
};

export default Todos;
