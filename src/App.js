import React from "react";
import { useState } from "react";
import Header from "./func/Header";
import List from "./func/List";
import OutForm from "./func/OutForm";
import InForm from "./func/InForm";

function App() {
  const [mode, setMode] = useState("MAIN");
  const [lisss, setLisss] = useState();
  let content = null;
  let list = null;

  if (mode === "MAIN") {
    list = (
      <List
        printList={(lis) => {
          if (JSON.stringify(lis) === JSON.stringify(lisss)) {
            console.log("same");
          } else {
            setLisss(lis);
          }
        }}
      ></List>
    );

    content = (
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>이름</th>
              <th>위치</th>
              <th>상태</th>
              <th>입퇴실시간</th>
              <th>누적시간</th>
            </tr>
          </thead>
          <tbody>{lisss}</tbody>
        </table>
      </div>
    );
  } else if (mode === "IN") {
    content = (
      <InForm
        onChange={() => {
          setMode("MAIN");
        }}
      ></InForm>
    );
  } else if (mode === "OUT") {
    content = (
      <OutForm
        onChange={() => {
          setMode("MAIN");
        }}
      ></OutForm>
    );
  }

  return (
    <div class="head">
      <div>
        <Header
          title="LIBRARY CAMP"
          onChangeMode={function () {
            setMode("MAIN");
          }}
        ></Header>
        <ul>
          <button>
            {" "}
            <a
              href="/in"
              onClick={(event) => {
                event.preventDefault();
                setMode("IN");
              }}
            >
              입실
            </a>
          </button>

          <button>
            {" "}
            <a
              href="/out"
              onClick={(event) => {
                event.preventDefault();
                setMode("OUT");
              }}
            >
              퇴실
            </a>
          </button>
        </ul>
      </div>
      {list}
      {content}
    </div>
  );
}
export default App;
