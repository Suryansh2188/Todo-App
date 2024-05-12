import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Display from "./Display";
import AddCard from "./AddCard";
import Update from "./Update";


function Main({ display, today, personal, upcoming, work, other, complete, increment, decrement }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskData, setTaskData] = useState(null);

    useEffect(() => {
      let getListData = JSON.parse(localStorage.getItem("Task list"));
      if (getListData) {
        setTasks(getListData);
      }
    }, [])
    

    const saveTaskList = (taskList) => {
        localStorage.setItem("Task list", JSON.stringify(taskList));
    }

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    const toggleUpdate = () => {
        setIsUpdateOpen(!isUpdateOpen);
    };


    const addNewTask =(task) => {
        let newTask = [...tasks, task];
        increment(task);
        setTasks(newTask);
        saveTaskList(newTask);
        toggleModal();
    }

    const editTask = (task_id) => {
        let getTask = tasks.find(task => task.id === task_id);
        decrement(getTask);
        let updatedTasks = tasks.filter(task => task.id !== getTask.id);
        setTaskData(getTask);
        setTasks(updatedTasks);
        saveTaskList(updatedTasks);
        toggleUpdate();
    }

    const updateTask = (data) => {
        increment(data);
        let newTasks = tasks.filter(task => task.id !== data.id);
        setTasks([...newTasks, data]);
        saveTaskList([...newTasks, data]);
        toggleUpdate();
    }

    const deleteTask = (task_id) => {
        let getTask = tasks.find(task => task.id === task_id);
        decrement(getTask);
        let updatedTasks = tasks.filter(task => task.id !== getTask.id);
        setTasks(updatedTasks);
        saveTaskList(updatedTasks);
    }

        //Task Complete Function
        const taskComplete = (taskId) => {
            // Find the task with the given taskId
            const completedTask = tasks.find(task => task.id === taskId);
            let updatedTask
           completedTask.completed ? updatedTask = { ...completedTask, completed: false }: updatedTask = { ...completedTask, completed: true };
            // Update the completed property of the task
            // const updatedTask = { ...completedTask, completed: true };
    
            // Create a new array with the updated task
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? updatedTask : task
            );
    
            // Update the tasks state with the new array
            setTasks(updatedTasks);
            // saveTaskList(updatedTask)
    
            // Save updated tasks to localStorage
            saveTaskList(updatedTasks);
        };

    return (
        <>
            {display && <Display allAct="All" toggleModal={toggleModal} toggleUpdate={toggleUpdate} editTask={editTask} deleteTask={deleteTask} tasks={tasks} taskComplete={taskComplete} />}
            {today && <Display today="Today" toggleModal={toggleModal} toggleUpdate={toggleUpdate} editTask={editTask} deleteTask={deleteTask} tasks={tasks} taskComplete={taskComplete} />}
            {upcoming && <Display upcoming="Upcoming" toggleModal={toggleModal} toggleUpdate={toggleUpdate} editTask={editTask} deleteTask={deleteTask} tasks={tasks} taskComplete={taskComplete} />}
            {personal && <Display personal="Personal" toggleModal={toggleModal} toggleUpdate={toggleUpdate} editTask={editTask} deleteTask={deleteTask} tasks={tasks} taskComplete={taskComplete} />}
            {work && <Display work="Work" toggleModal={toggleModal} toggleUpdate={toggleUpdate} editTask={editTask} deleteTask={deleteTask} tasks={tasks} taskComplete={taskComplete} />}
            {other && <Display other="Other" toggleModal={toggleModal} toggleUpdate={toggleUpdate} editTask={editTask} deleteTask={deleteTask} tasks={tasks} taskComplete={taskComplete} />}
            {complete && <Display complete="Completed" toggleModal={toggleModal} toggleUpdate={toggleUpdate} editTask={editTask} deleteTask={deleteTask} tasks={tasks} taskComplete={taskComplete} />}
            {isModalOpen && <AddCard toggleModal={toggleModal} addNewTask={addNewTask} />}
            {isUpdateOpen && <Update toggleUpdate={toggleUpdate} taskData={taskData} updateTask={updateTask} />}
        </>
    )
}

Main.propTypes = {
    display: PropTypes.bool,
    today: PropTypes.bool,
    personal: PropTypes.bool,
    upcoming: PropTypes.bool,
    work: PropTypes.bool,
    other: PropTypes.bool,
    complete: PropTypes.bool,
    increment: PropTypes.func,
    decrement: PropTypes.func
};

export default Main