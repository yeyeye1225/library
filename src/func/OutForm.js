import {useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fireStore } from "../firebase";
import {doc,updateDoc,getDoc} from "firebase/firestore";

async function checkOut(name,date,time){
  const db = fireStore; 
  const updateData = doc(db, "member", name);
  let timeupdate;

  try{
    const docsnap = await getDoc (updateData);
    let howmuchTime = docsnap.data().howmuch; //원래 누적시간 저장
    let entertime = docsnap.data().time; //입실 시간
    let month = Number(entertime.substring(0,2));
    let day = Number(entertime.substring(3,5));
    let hour = Number(entertime.substring(6,8));
    let min = Number(entertime.substring(9,11));
    let EnterDate = new Date(null, month, day, hour, min); //입실 시간
    month = Number(date.substring(0,2));
    day = Number(date.substring(3,5));
    hour = Number(time.substring(0,2));
    min = Number(time.substring(3,5));
    let ExtranceDate = new Date(null, month, day, hour, min); //퇴실 시간
    timeupdate = (ExtranceDate-EnterDate) / 1000 / 60;
    timeupdate = howmuchTime+timeupdate;

    await updateDoc(updateData, {
      place:"퇴실",
      time:`${date} ${time}`,
      io:false,
      howmuch:timeupdate 
    });
  }catch(e){
    console.log(e);
  }
}

function OutForm(props){
  let datePicker, timePicker = null;
  const [enterDate,setEnterDate] = useState(new Date());

  datePicker = <DatePicker 
  name="datepicker" 
  selected={enterDate} 
  dateFormat="MM/dd"
  onChange={(date)=>{
    setEnterDate(date)
  }}></DatePicker>

  timePicker = <input name="timepicker" type="time"></input>
  //InForm함수와 동일하게 현재값을 기본값으로 하는 속성은 생략

  return <article>
    <h2>퇴실</h2>
      <form onSubmit={(event)=>{
        event.preventDefault();
        const name = event.target.name.value;
        const date = event.target.datepicker.value;
        const time = event.target.timepicker.value;
        checkOut(name,date,time).then(()=>{
          props.onChange('MAIN');
        });
        
      }}>
        <p><input type='text' name="name" placeholder='이름'></input></p>
        <p class="picker">{datePicker}</p>
        <p class="picker">{timePicker}</p>
        <p><input class="btn btn-primary" type='submit' value="Submit"></input></p>
      </form>
  </article>
}

  export default OutForm;