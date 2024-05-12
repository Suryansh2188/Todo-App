import PropTypes from 'prop-types';
import { FaEdit } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaLinesLeaning } from "react-icons/fa6";

function Display({ allAct, today, upcoming, personal, work, other, complete, toggleModal, editTask, deleteTask, tasks, taskComplete }) {
    let list = tasks;
    let objectDate = new Date();
    let day = objectDate.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    let month = objectDate.getMonth();
    month += 1

    if (month < 10) {
        month = `0${month}`;
    }

    const nameOfMonth = (monthNumber) => {
        for (let i = 1; i <= 12; i++) {
            if (monthNumber == i) {
                month = monthNames[i - 1];
                return month;
            }
        }
    }

    let year = objectDate.getFullYear();

    if (personal) {
        list = list.filter(task => task.category === "Personal");
    }
    else if (work) {
        list = list.filter(task => task.category === "Work");
    }
    else if (other) {

        list = list.filter(task => task.category === "Other");
    }
    else if (today) {
        list = list.filter(task => task.date === `${year}-${month}-${day}`);
    }
    else if (upcoming) {
        list = list.filter(task => task.completed === false);
    }
    else if (complete) {
        list = list.filter(task => task.completed === true);
    }

    return (
        <>
            <div className="container bg-[#ded9e9] h-full w-11/12 p-1 rounded-tr-xl rounded-br-xl overflow-hidden">
                <div className="container p-3 flex  md:flex-row justify-between items-center border-b-2">
                    <h1 className="title-font text-3xl md:text-5xl font-medium text-gray-900 mb-3"> {allAct}  {upcoming} {personal} {work} {other} {complete} {today && <span>{today}&apos;s</span>} Tasks </h1>
                    <button className="flex items-center text-black bg-white border-0 py-2 px-5 focus:outline-none rounded text-lg mb-3 md:mt-0 md:text-lg" onClick={() => toggleModal()} >
                        New Task
                    </button>
                </div>

                <div className="container px-5 pt-10 mx-auto h-screen overflow-y-auto scroll-smooth">
                    {list.length === 0 && <div className="container mx-auto mt-32 flex px-5 py-2 items-center justify-center flex-col">
                        <div className="text-center lg:w-2/3 w-full">
                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                                No {upcoming} {personal} {work} {other} {complete} Task
                            </h1>
                        </div>
                    </div>
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  -mx-4 -my-8 mb-24 ">
                        {list.map(task => {
                            const completeTaskClass = task.completed ? 'bg-green-200 line-through' : 'bg-white'
                            const btn = task.completed ? <MdOutlineCancel /> : <MdDownloadDone />
                            return <div className={`py-8 px-4 lg:w-full border-white rounded-2xl border-2 transition-all hover:border-blue-500 ${completeTaskClass}`} key={task.id} >
                                <div className="h-full flex items-start">
                                    <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                                        <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                                            {nameOfMonth(task.date.slice(5, 7))}
                                        </span>
                                        <span className="font-medium text-lg text-gray-800 title-font leading-none">
                                            {task.date.slice(8, 10)}
                                        </span>
                                    </div>
                                    <div className="flex-grow pl-6">
                                        <h2 className="tracking-widest flex items-center gap-1 text-xs title-font font-medium text-indigo-500 mb-1">
                                            {task.category === "Personal" && <FiUser />}
                                            {task.category === "Work" && <MdOutlineWorkOutline />}
                                            {task.category === "Other" && <FaLinesLeaning />}
                                            {task.category}
                                        </h2>
                                        <h1 className="title-font text-xl md:text-2xl font-medium text-gray-900 mb-3">
                                            {task.title}
                                        </h1>
                                        <p className="leading-relaxed mb-5">
                                            {task.work}
                                        </p>
                                        <div className="flex gap-4">
                                            <button className="btn btn-primary bg-blue-300 flex justify-center items-center p-2 rounded-2xl" onClick={() => editTask(task.id)}><FaEdit /></button>
                                            <button className="btn btn-primary bg-blue-300 flex justify-center items-center p-2 rounded-2xl" onClick={() => deleteTask(task.id)}><MdOutlineDeleteOutline /></button>
                                            <button className="btn btn-primary bg-blue-300 flex justify-center items-center p-2 rounded-2xl" onClick={() => taskComplete(task.id)}>  {btn} </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

Display.propTypes = {
    allAct: PropTypes.string,
    today: PropTypes.bool,
    upcoming: PropTypes.bool,
    personal: PropTypes.bool,
    work: PropTypes.bool,
    other: PropTypes.bool,
    complete: PropTypes.bool,
    toggleModal: PropTypes.func,
    toggleUpdate: PropTypes.func,
    editTask: PropTypes.func,
    deleteTask: PropTypes.func,
    tasks: PropTypes.arrayOf(PropTypes.object),
    taskComplete: PropTypes.func,
};

export default Display