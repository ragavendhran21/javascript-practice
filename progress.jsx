import React, { useState, useEffect } from 'react';

// TaskProgressBar Component
const TaskProgressBar = ({ task, progress }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-semibold text-sm">{task}</span>
        <span className="text-sm">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Overall Progress Component
const OverallProgress = ({ progress }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="font-bold">Overall Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-green-600 h-3 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Main Component
const ParallelTaskProgressBar = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [taskInput, setTaskInput] = useState('');
  const [parallelLimit, setParallelLimit] = useState(3);
  
  // Mock function to simulate a task's progress
  const simulateTaskProgress = (taskId, duration) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          setTasks(prevTasks => 
            prevTasks.map(task => 
              task.id === taskId ? { ...task, progress: 100, status: 'completed' } : task
            )
          );
          
          resolve();
        } else {
          setTasks(prevTasks => 
            prevTasks.map(task => 
              task.id === taskId ? { ...task, progress } : task
            )
          );
        }
      }, duration * 10);
    });
  };
  
  // Start a task
  const startTask = async (task) => {
    setActiveTaskCount(count => count + 1);
    
    try {
      await simulateTaskProgress(task.id, task.duration);
    } finally {
      setActiveTaskCount(count => count - 1);
    }
  };
  
  // Add a new task
  const addTask = () => {
    if (!taskInput.trim()) return;
    
    const newTask = {
      id: Date.now(),
      name: taskInput,
      progress: 0,
      status: 'pending',
      duration: Math.floor(Math.random() * 10) + 5 // Random duration between 5-15
    };
    
    setPendingTasks(prev => [...prev, newTask]);
    setTaskInput('');
  };
  
  // Process pending tasks when active tasks change
  useEffect(() => {
    if (pendingTasks.length > 0 && activeTaskCount < parallelLimit) {
      const tasksToStart = pendingTasks.slice(0, parallelLimit - activeTaskCount);
      
      // Add tasks to active tasks list
      setTasks(prev => [
        ...prev,
        ...tasksToStart.map(task => ({ ...task, status: 'active' }))
      ]);
      
      // Remove started tasks from pending
      setPendingTasks(prev => prev.slice(tasksToStart.length));
      
      // Start each task
      tasksToStart.forEach(task => {
        startTask(task);
      });
    }
  }, [activeTaskCount, pendingTasks, parallelLimit]);
  
  // Calculate overall progress
  useEffect(() => {
    if (tasks.length === 0) {
      setOverallProgress(0);
      return;
    }
    
    const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
    const calculatedProgress = Math.round(totalProgress / tasks.length);
    setOverallProgress(calculatedProgress);
  }, [tasks]);
  
  // Clear completed tasks
  const clearCompletedTasks = () => {
    setTasks(prev => prev.filter(task => task.status !== 'completed'));
  };
  
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Parallel Task Progress</h1>
      
      <div className="mb-6">
        <div className="flex mb-2">
          <input
            type="number"
            value={parallelLimit}
            onChange={(e) => setParallelLimit(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 mr-2 px-3 py-2 border rounded"
            min="1"
          />
          <label className="flex items-center">Max Parallel Tasks</label>
        </div>
        
        <div className="flex">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-l"
            placeholder="Enter task name"
          />
          <button 
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Add Task
          </button>
        </div>
      </div>
      
      <OverallProgress progress={overallProgress} />
      
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <div className="text-sm">
          <span className="mr-4">Active: {activeTaskCount}/{parallelLimit}</span>
          <span>Pending: {pendingTasks.length}</span>
        </div>
      </div>
      
      {tasks.length > 0 && (
        <div className="mb-4">
          {tasks.map(task => (
            <TaskProgressBar 
              key={task.id} 
              task={task.name}
              progress={Math.round(task.progress)} 
            />
          ))}
          
          <button 
            onClick={clearCompletedTasks}
            className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Clear Completed
          </button>
        </div>
      )}
      
      {tasks.length === 0 && pendingTasks.length === 0 && (
        <div className="text-center text-gray-500">No tasks yet. Add some tasks to get started.</div>
      )}
    </div>
  );
};

export default ParallelTaskProgressBar;

import React from 'react';

const TaskProgressBar = ({ task, progress }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-semibold text-sm">{task}</span>
        <span className="text-sm">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TaskProgressBar;

import React from 'react';

const OverallProgress = ({ progress }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between mb-1">
        <span className="font-bold">Overall Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-green-600 h-3 rounded-full transition-all duration-300 ease-in-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default OverallProgress;

import React, { useState, useEffect } from 'react';
import TaskProgressBar from './TaskProgressBar';
import OverallProgress from './OverallProgress';

const ParallelTaskProgressBar = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [taskInput, setTaskInput] = useState('');
  const [parallelLimit, setParallelLimit] = useState(3);
  
  // Mock function to simulate a task's progress
  const simulateTaskProgress = (taskId, duration) => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          
          setTasks(prevTasks => 
            prevTasks.map(task => 
              task.id === taskId ? { ...task, progress: 100, status: 'completed' } : task
            )
          );
          
          resolve();
        } else {
          setTasks(prevTasks => 
            prevTasks.map(task => 
              task.id === taskId ? { ...task, progress } : task
            )
          );
        }
      }, duration * 10);
    });
  };
  
  // Start a task
  const startTask = async (task) => {
    setActiveTaskCount(count => count + 1);
    
    try {
      await simulateTaskProgress(task.id, task.duration);
    } finally {
      setActiveTaskCount(count => count - 1);
    }
  };
  
  // Add a new task
  const addTask = () => {
    if (!taskInput.trim()) return;
    
    const newTask = {
      id: Date.now(),
      name: taskInput,
      progress: 0,
      status: 'pending',
      duration: Math.floor(Math.random() * 10) + 5 // Random duration between 5-15
    };
    
    setPendingTasks(prev => [...prev, newTask]);
    setTaskInput('');
  };
  
  // Process pending tasks when active tasks change
  useEffect(() => {
    if (pendingTasks.length > 0 && activeTaskCount < parallelLimit) {
      const tasksToStart = pendingTasks.slice(0, parallelLimit - activeTaskCount);
      
      // Add tasks to active tasks list
      setTasks(prev => [
        ...prev,
        ...tasksToStart.map(task => ({ ...task, status: 'active' }))
      ]);
      
      // Remove started tasks from pending
      setPendingTasks(prev => prev.slice(tasksToStart.length));
      
      // Start each task
      tasksToStart.forEach(task => {
        startTask(task);
      });
    }
  }, [activeTaskCount, pendingTasks, parallelLimit]);
  
  // Calculate overall progress
  useEffect(() => {
    if (tasks.length === 0) {
      setOverallProgress(0);
      return;
    }
    
    const totalProgress = tasks.reduce((sum, task) => sum + task.progress, 0);
    const calculatedProgress = Math.round(totalProgress / tasks.length);
    setOverallProgress(calculatedProgress);
  }, [tasks]);
  
  // Clear completed tasks
  const clearCompletedTasks = () => {
    setTasks(prev => prev.filter(task => task.status !== 'completed'));
  };
  
  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6">Parallel Task Progress</h1>
      
      <div className="mb-6">
        <div className="flex mb-2">
          <input
            type="number"
            value={parallelLimit}
            onChange={(e) => setParallelLimit(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 mr-2 px-3 py-2 border rounded"
            min="1"
          />
          <label className="flex items-center">Max Parallel Tasks</label>
        </div>
        
        <div className="flex">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="flex-1 px-3 py-2 border rounded-l"
            placeholder="Enter task name"
          />
          <button 
            onClick={addTask}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          >
            Add Task
          </button>
        </div>
      </div>
      
      <OverallProgress progress={overallProgress} />
      
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>
        <div className="text-sm">
          <span className="mr-4">Active: {activeTaskCount}/{parallelLimit}</span>
          <span>Pending: {pendingTasks.length}</span>
        </div>
      </div>
      
      {tasks.length > 0 && (
        <div className="mb-4">
          {tasks.map(task => (
            <TaskProgressBar 
              key={task.id} 
              task={task.name}
              progress={Math.round(task.progress)} 
            />
          ))}
          
          <button 
            onClick={clearCompletedTasks}
            className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm"
          >
            Clear Completed
          </button>
        </div>
      )}
      
      {tasks.length === 0 && pendingTasks.length === 0 && (
        <div className="text-center text-gray-500">No tasks yet. Add some tasks to get started.</div>
      )}
    </div>
  );
};

export default ParallelTaskProgressBar;