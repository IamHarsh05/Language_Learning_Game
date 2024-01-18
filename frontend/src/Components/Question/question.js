import React, { useEffect, useState } from "react";
import {
  AkarIconsFullScreen,
  CiBulb,
  EpRefreshRight,
  FaSolidChevronCircleLeft,
  FaSolidChevronCircleRight,
  FaSolidVolumeUp,
} from "../Icons/icon";
import { useSelector } from "react-redux";

export default function Question({ active }) {

  const tab = useSelector((state) => state.tab.tab);
  console.log(tab);

  const [data, setData] = useState([]);
  const [qactive, setQActive] = useState(active);
  const [question, setQuestion] = useState([]);
  // const [activeTab, setActiveTab] = useState(tab);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8000/questions", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
    const handleQuestion = () => {
      if (data[qactive] !== undefined) {
        setQuestion(data[active][tab] || []);
      } else {
        setQuestion([]);
      }
      setQActive(0);
    };

    handleQuestion();
  }, [tab,active]);

  // console.log(tab);

  // console.log(question);

  // console.log(active);

  // console.log(data[active]);

  // console.log(tab[active]);

  return (
    <div>
      {data && (
        <>
          <div className="flex justify-center px-4">
            <div className="w-full md:w-1/3 p-4 md:px-28 bg-gradient-to-tl from-[#06286E] to-[#164EC0] rounded-3xl">
              <div className="flex justify-between items-center py-4 w-full">
                <CiBulb className="h-8 w-8 text-white" />
                <FaSolidVolumeUp className="h-8 w-8 text-white" />
              </div>
              <div className="flex justify-center py-16">
                <span className="px-4 text-white text-xl">
                  {question.map((question, index) =>
                    qactive === index ? (
                      <div key={index}>{question}</div>
                    ) : (
                      <div key={index} className="hidden"></div>
                    )
                  )}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-center p-4">
            <div className="w-full md:w-1/4 flex justify-around items-center">
              <EpRefreshRight className="h-8 w-8 bg-gradient-to-t from-[#06286E] to-[#164EC0] inline-block text-transparent bg-clip-text" />
              <div
                onClick={() =>
                  setQActive(qactive > 0 ? qactive - 1 : question.length - 1)
                }
                className="cursor-pointer"
              >
                <FaSolidChevronCircleLeft className="h-10 w-10 bg-gradient-to-t from-[#06286E] to-[#164EC0] inline-block text-transparent bg-clip-text" />
              </div>
              <span className="text-xl">{`${qactive + 1}/${
                question.length
              }`}</span>
              <div
                onClick={() =>
                  setQActive(qactive < question.length - 1 ? qactive + 1 : 0)
                }
                className="cursor-pointer"
              >
                <FaSolidChevronCircleRight className="h-10 w-10 bg-gradient-to-t from-[#06286E] to-[#164EC0] inline-block text-transparent bg-clip-text" />
              </div>
              <AkarIconsFullScreen className="h-8 w-8 bg-gradient-to-t from-[#06286E] to-[#164EC0] inline-block text-transparent bg-clip-text" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
