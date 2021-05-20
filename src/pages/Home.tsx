import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task ={
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    if(newTaskTitle===''){
      return Alert.alert('Write something before')
    }

    setTasks([...tasks, task]);
  }

  function handleMarkTaskAsDone(id: number) {
    const taskIndex = tasks.findIndex(task => task.id === id)
    
    if(tasks[taskIndex].done === true){
      tasks[taskIndex].done = false
    }else{
      tasks[taskIndex].done = true
    }
    

    setTasks([...tasks])
  }
  const handleRemoveTask = useCallback(
    id => {
    const taskIndex = tasks.findIndex(task => task.id === id)
    tasks.splice(taskIndex, 1);
      setTasks([...tasks]);
    },
    [tasks, setTasks],
  );

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}