import { fireStore } from "../firebase";
import { collection,getDocs,query} from "firebase/firestore";

let lis=[];

async function pushh(){
  lis=[];
  const db = fireStore; 
  const q = query(collection(db, "member"));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => { //doc.place가 아니라 doc.data().place..ㅠㅠㅠㅠㅠㅠ
    if(doc.data().io){
      lis.push(<tr key={doc.id}><td>{doc.id}</td><td>{doc.data().place}</td><td>입실</td><td>{doc.data().time}</td><td>{doc.data().howmuch}</td></tr>
      );
    }  
  });

  querySnapshot.forEach((doc) => {
    if(!doc.data().io){
      lis.push(<tr key={doc.id}><td>{doc.id}</td><td>{doc.data().place}</td><td>퇴실</td><td>{doc.data().time}</td><td>{doc.data().howmuch}</td></tr>
      );
    }
  });
}

function List(props){
  pushh().then(()=>{
    props.printList(lis);});
 return;
}

export default List;