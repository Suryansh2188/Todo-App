import PropTypes from 'prop-types';
import { SlCalender } from "react-icons/sl";
import { MdOutlineToday } from "react-icons/md";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { FaLinesLeaning } from "react-icons/fa6";
import { FaRegCircleCheck } from "react-icons/fa6";


function SideNav({ workCount, personalCount, otherCount, all, onclick, displayClick, workClick, otherClick, todayClick, completeClick, upcomingClick, todayCount }) {

    return (
        <>
            <div className="sm:w-40 md:w-56 lg:w-64 w-14 rounded-tl-xl sm:p-5 md:p-5 lg:p-5 p-2 rounded-bl-xl bg-white">
                <div className="container ">
                    <div>
                        <ul>
                            <li className='m-3 flex justify-between'><button className='btn flex items-center gap-3' onClick={displayClick}><SlCalender /><span className='sm:visible md:visible lg:visible invisible'>All</span></button>  {all} </li>
                            <li className='m-3 flex justify-between'><button className='btn flex items-center gap-3' onClick={todayClick}><MdOutlineToday /><span className='sm:visible md:visible lg:visible invisible'>Today</span></button> {todayCount} </li>
                            <li className='m-3 flex justify-between'><button className='btn flex items-center gap-3' onClick={upcomingClick}><LiaBusinessTimeSolid /><span className='sm:visible md:visible lg:visible invisible'>Upcoming</span></button>0</li>
                        </ul>
                    </div>
                    <div className='mt-5'>
                        <h3 className='m-2 text-xl'>Lists</h3>
                        <ul>
                            <li className='m-3 flex justify-between'><button className='btn flex items-center gap-3' onClick={onclick}><FiUser /><span className='sm:visible md:visible lg:visible invisible'>Personal</span></button> {personalCount} </li>
                            <li className='m-3 flex justify-between'><button className='btn flex items-center gap-3' onClick={workClick}><MdOutlineWorkOutline /><span className='sm:visible md:visible lg:visible invisible'>Work</span></button> {workCount} </li>
                            <li className='m-3 flex justify-between'><button className='btn flex items-center gap-3' onClick={otherClick}><FaLinesLeaning /><span className='sm:visible md:visible lg:visible invisible'>Other</span></button> {otherCount} </li>
                        </ul>
                    </div>
                    <div className='mt-5'>
                        <h3 className='m-3'><button className='btn flex items-center gap-3' onClick={completeClick}><FaRegCircleCheck /><span className='sm:visible md:visible lg:visible invisible'>Completed</span></button></h3>
                    </div>
                    <div className="container mt-5 h-64 bg-[url('./assets/img1.jpg')] bg-center bg-cover sm:visible md:visible lg:visible invisible"></div>
                </div>
            </div>
        </>
    )
}

SideNav.propTypes = {
    workCount: PropTypes.number.isRequired,
    personalCount: PropTypes.number.isRequired,
    otherCount: PropTypes.number.isRequired,
    all: PropTypes.number.isRequired,
    onclick: PropTypes.func.isRequired,
    displayClick: PropTypes.func.isRequired,
    workClick: PropTypes.func.isRequired,
    otherClick: PropTypes.func.isRequired,
    todayClick: PropTypes.func.isRequired,
    completeClick: PropTypes.func.isRequired,
    upcomingClick: PropTypes.func.isRequired,
    todayCount: PropTypes.number.isRequired
};

export default SideNav;
