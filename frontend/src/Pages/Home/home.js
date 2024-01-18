import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setTab } from "./tabSlice";
import "./home.css";

// Outside of the component
const handleTabs = (data) => {
  let result = [];
  for (let j = 0; j < data.length; j++) {
    for (let i in data[j]) {
      result = [...result, i];
    }
  }
  let tab = [];
  for (let i = 0; i < result.length; i++) {
    if (i % 3 === 1) {
      tab = [...tab, result[i]];
    }
  }
  return tab;
};

export default function Home() {
  const dispatch = useDispatch();
  const tab = useSelector((state) => state.tab.tab);
  console.log(tab);

  const [data, setData] = useState([]);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setData(data);
        setTabs(handleTabs(data));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleClick = useCallback(
    (clickedTab) => {
      dispatch(setTab(clickedTab));
    },
    [dispatch]
  );

  // console.log(data[0][tab])

  return (
    <div className="home w-screen py-2 flex flex-col md:flex-row overflow-scroll">
      {tabs.map((t, i) => (
        <div className="flex justify-center p-2">
          <div
            className="flex flex-col md:flex-row p-8 bg-gradient-to-tl from-[#06286E] to-[#164EC0] rounded-3xl text-white"
            onClick={() => handleClick(t)}
            key={i}
          >
            <Link to={`/${t}`} key={i}>
              <p>Language: {t} </p>
            </Link>
            <p>No. of Questions: {data[i][t].length}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
