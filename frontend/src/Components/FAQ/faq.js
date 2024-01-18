import React, { useState } from "react";
import { PsUp } from "../Icons/icon";

const faqs = [
  {
    question: "Can education flashcards be used for all age groups?",
    answer:
      "Yes, education flashcards are versatile tools that can be used for learners of all age groups. Whether you're a child, a teenager, or an adult, flashcards can be tailored to suit different learning styles and subjects.",
  },
  {
    question: "How do education flashcards work?",
    answer:
      "Education flashcards work by presenting information in a concise and visual format. Each flashcard typically contains a question or prompt on one side and the corresponding answer on the other. Users can review and test their knowledge by flipping through the cards, reinforcing learning through repetition and visualization.",
  },
  {
    question: "Can education flashcards be used for test preparation?",
    answer:
      "Absolutely! Education flashcards are an effective tool for test preparation. They help reinforce key concepts, improve memory retention, and allow for quick self-assessment. Creating flashcards for specific topics and reviewing them regularly can enhance your preparation for exams and tests.",
  },
];

export default function FAQ() {
  const [active, setActive] = useState(0);

  const handleActive = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  };

  return (
    <div className="flex flex-col md:w-1/3 py-8">
      {faqs.map((faq, index) => (
        <div className="p-2" key={index}>
          <div
            className="flex justify-between items-center cursor-pointer transition duration-500 transform hover:bg-gray-300 p-4 rounded-lg"
            onClick={() => handleActive(index)}
          >
            <p> {faq.question}</p>
            <div className="transition-transform transform">
                <PsUp className={`h-6 w-6 transform ${active === index ? '' : 'rotate-180'}  duration-500 ease-in-out`} />
            </div>
          </div>
          <div
            className={`flex justify-between items-center transition duration-500 transform ${
              active === index ? "scale-y-100" : "scale-y-0"
            } p-4`}
          >
            <p className={`${active === index ? "" : "hidden"}`}>
              {" "}
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
