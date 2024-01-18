import React, { useCallback, useEffect, useState } from "react";
import Question from "../Question/question";
import { CarbonAddFilled } from "../Icons/icon";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../Data/data";
import { setTab } from "../../Pages/Home/tabSlice";
import { Link } from "react-router-dom";

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

export default function Quiz() {
  const [active, setActive] = useState(0);
  const [tabs, setTabs] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);

  const dispatch = useDispatch();
  const t = useSelector((state) => state.tab.tab);
  console.log(t);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setFetchedData(result);
        setTabs(handleTabs(result));
      } catch (error) {
        console.error("Error fetching data in OtherComponent:", error);
      }
    };

    getData();
  }, []);

  const handleClick = useCallback(
    (clickedTab, i) => {
      dispatch(setTab(clickedTab));
      setActive(i);
    },
    [dispatch]
  );

  console.log(fetchedData);

  return (
    <div>
      <div className="px-4 md:px-48">
        <p className="text-3xl font-bold bg-gradient-to-t from-[#06286E] to-[#164EC0] inline-block text-transparent bg-clip-text">
          {t}
        </p>
      </div>
      <div className="flex justify-center p-4 md:p-8">
        <div className="flex justify-between w-full px-4 md:w-1/4">
          {tabs.map((tab, i) => (
            <Link to={`/${tab}`} key={i}>
              <div
                
                className={`border-b-4 p-2 ${
                  active === i ? "border-[#06286E]" : "border-transparent"
                } hover:border-[#06286E] cursor-pointer`}
                onClick={() => handleClick(tab, i)}
              >
                <p className="font-bold bg-gradient-to-t from-[#06286E] to-[#164EC0] inline-block text-transparent bg-clip-text">
                  {tab}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Question tab={t} active={active} />
      <div className="flex flex-col md:flex-row justify-between px-14 py-4">
        <div className="flex items-center p-4">
          <img src="Assets/round.png" alt="" className="w-28 h-28" />
          <img src="Assets/pub_logo.png" alt="" className="h-12" />
        </div>
        <div className="flex justify-center items-center md:px-14">
          <div className="px-2">
            <CarbonAddFilled className="h-6 w-6" />
          </div>
          <div>
            <p>Create Flashcard</p>
          </div>
        </div>
      </div>
    </div>
  );
}
