import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useState} from 'react';
import { fireStore } from "../firebase";
import {getDoc,doc,setDoc} from "firebase/firestore";

async function checkIn(name,place,date,time){
  const db = fireStore; 
  const newData = doc(db, "member",name);
  let timeset;

  try{   
    const docsnap = await getDoc(newData);
    timeset = docsnap.data().howmuch;   
    await setDoc(newData, {
    name:name,
    place:place,
    time:`${date} ${time}`,
    howmuch:timeset,
    io:true
  });}
  catch{
    await setDoc(newData, {
      name:name,
      place:place,
      time:`${date} ${time}`,
      howmuch:0,
      io:true
    });
  }
}

function InForm(props){

  let datePicker, timePicker = null;
  const [enterDate,setEnterDate] = useState(new Date()); //날짜 설정

  datePicker = <DatePicker 
  name="datepicker" 
  selected={enterDate} 
  dateFormat="MM/dd"
  onChange={(date)=>{
    setEnterDate(date)
  }}></DatePicker>

  timePicker = <input name="timepicker" type="time"></input>

  //timePicker input의 props에 value={timmm}를 추가하여 현재 시간을 설정하고 싶었으나,,
  //onchange를 활용해 선택된 값을 또 업데이트하는 과정을 넣어야 할 것 같아서 생략 

/* 초마다 새로고침
  const [time,setTime]=useState("00:00");
  const Current = ()=>{ 
    setTime(timmm)
  }
  const Start = ()=>{
    setInterval(Current, 1000)
  }
  Start();

  */
  return <article>
    <h2>입실</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const name = event.target.name.value;
        const place = event.target.place.value;
        const date = event.target.datepicker.value;
        const time = event.target.timepicker.value;
        checkIn(name,place,date,time).then(()=>{
          props.onChange();
        });
      }}>
        <div>
        <p ><input type='text' name="name" placeholder='이름'></input></p>
        <p ><input type='text' name="place" placeholder='장소'></input></p>
        <p class="picker">{datePicker}</p>
        <p class="picker">{timePicker}</p>
        <p><input class="btn btn-primary" type='submit' value="Submit"></input></p>
        </div>
      </form>
  </article>
}
export default InForm;