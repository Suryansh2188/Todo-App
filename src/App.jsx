import { useState, useEffect } from 'react'
import SideNav from './components/SideNav'
import Main from './components/Main'


function App() {
  const [workCount, setWorkCount] = useState(0);
  const [personalCount, setPersonalCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);


  const [display, setDisplay] = useState(false);
  const [today, setToday] = useState(false);
  const [personal, setPersonal] = useState(false);
  const [work, setWork] = useState(false);
  const [other, setOther] = useState(false);
  const [complete, setComplete] = useState(false);
  const [upcoming, setUpcoming] = useState(false);
  const [all, setAll] = useState(0);

  let objectDate = new Date();
  let day = objectDate.getDate();
  if (day < 10) {
    day = '0' + day;
  }
  let month = objectDate.getMonth();
  month += 1
  if (month < 10) {
    month = `0${month}`;
  }
  let year = objectDate.getFullYear();

  useEffect(() => {
    setDisplay(true);
    const listData = JSON.parse(localStorage.getItem("Task list"));
    if (listData) {
      let workTasks = listData.filter(task => task.category === "Work");
      let numberOfWorkTasks = workTasks.length;

      let personalTasks = listData.filter(task => task.category === "Personal");
      let numberOfPersonalTask = personalTasks.length;

      let otherTasks = listData.filter(task => task.category === "Other");
      let numberOfOtherTask = otherTasks.length;

      let todayTask = listData.filter(task => task.date === `${year}-${month}-${day}`);
      let numberOfTodayTask = todayTask.length;


      let total = numberOfWorkTasks + numberOfPersonalTask + numberOfOtherTask;

      setTodayCount(numberOfTodayTask);
      setWorkCount(numberOfWorkTasks);
      setPersonalCount(numberOfPersonalTask);
      setOtherCount(numberOfOtherTask);
      setAll(total);
    }
  }, [day, month, year])

  const increment = (incrementCount) => {
    // Update counts
    if (incrementCount.category === "Work") setWorkCount(workCount + 1);
    if (incrementCount.category === "Personal") setPersonalCount(personalCount + 1);
    if (incrementCount.category === "Other") setOtherCount(otherCount + 1);
    if (incrementCount.date === `${year}-${month}-${day}`) setTodayCount(todayCount + 1);
    setAll(all + 1);
  }

  const decrement = (decrementCount) => {
    if (decrementCount.category === "Work") setWorkCount(workCount - 1);
    if (decrementCount.category === "Personal") setPersonalCount(personalCount - 1);
    if (decrementCount.category === "Other") setOtherCount(otherCount - 1);
    if (decrementCount.date === `${year}-${month}-${day}`) setTodayCount(todayCount - 1);
    setAll(all - 1);
  }


  const displayClick = () => {
    setDisplay(true);
    setPersonal(false);
    setOther(false);
    setWork(false);
    setToday(false);
    setComplete(false);
    setUpcoming(false);
  }

  const todayClick = () => {
    setToday(true);
    setPersonal(false);
    setDisplay(false);
    setOther(false);
    setWork(false);
    setComplete(false);
    setUpcoming(false);

  }

  const onclick = () => {
    setPersonal(true);
    setDisplay(false);
    setOther(false);
    setWork(false);
    setToday(false);
    setComplete(false);
    setUpcoming(false);
  }

  const workClick = () => {
    setWork(true);
    setPersonal(false);
    setOther(false);
    setDisplay(false);
    setToday(false);
    setComplete(false);
    setUpcoming(false);
  }

  const otherClick = () => {
    setOther(true);
    setPersonal(false);
    setWork(false);
    setDisplay(false);
    setToday(false);
    setComplete(false);
    setUpcoming(false);
  }

  const completeClick = () => {
    setComplete(true);
    setOther(false);
    setPersonal(false);
    setWork(false);
    setDisplay(false);
    setToday(false);
    setUpcoming(false);
  }

  const upcomingClick = () => {
    setUpcoming(true);
    setComplete(false);
    setOther(false);
    setPersonal(false);
    setWork(false);
    setDisplay(false);
    setToday(false);
  }



  return (
    <>
      <div className="container-lg font-semibold p-2 h-screen bg-[#f0b177] sm:flex md:flex lg:flex flex ">
        <SideNav workCount={workCount} personalCount={personalCount} otherCount={otherCount} all={all} onclick={onclick} displayClick={displayClick} workClick={workClick} otherClick={otherClick} todayClick={todayClick} completeClick={completeClick} upcomingClick={upcomingClick} todayCount={todayCount} />
        <Main display={display} today={today} upcoming={upcoming} personal={personal} work={work} other={other} complete={complete} increment={increment} decrement={decrement} />
      </div>
    </>
  )
}

export default App
