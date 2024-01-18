import React from "react";
import { JamHome, PsRight } from "../../Components/Icons/icon";
import Quiz from "../../Components/Quiz/quiz";
import FAQ from "../../Components/FAQ/faq";

export default function Home() {
  return (
    <div className="w-screen h-full py-2">
      <div className="p-4 md:px-48 md:py-8 flex items-center">
        <div>
          <JamHome className="h-6 w-6" />
        </div>
        <div className="flex items-center">
          <PsRight className="h-4 w-6" />
          <p>Flashcard</p>
        </div>
      </div>
      <Quiz />
      <div className="p-4 md:px-28">
        <p className="text-2xl font-bold bg-gradient-to-t from-[#06286E] to-[#164EC0] inline-block text-transparent bg-clip-text">
          FAQ
        </p>
      </div>
      <div className="flex justify-center">
        <FAQ />
      </div>
    </div>
  );
}
