import run from "../config/Gemini";
import { createContext, useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]); // Ensure it's an array
  const [showResult, setshowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setresultData] = useState("");

  const delaypara = (index, nextWord) => {
    setTimeout(() => {
      setresultData((prev) => prev + nextWord);
    }, 50 * index);
  };

  

  const onSent = async (prompt) => {
    setresultData("");
    setLoading(true);
    setshowResult(true);

    const inputPrompt = prompt || input; // Use input if prompt is undefined
    setPrevPrompt((prev) => [...prev, inputPrompt]); // Correctly update prevPrompt
    setRecentPrompt(inputPrompt);

    const response = await run(inputPrompt);

    let responseArray = response.split("**");
    let newResponse = ""; // Initialize properly

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let newResponse2 = newResponse.split("*").join("<br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delaypara(i, nextWord + " ");
    }

    setLoading(false);
    setInput(""); // Reset input after sending
  };

  const contextValue = {
    prevPrompt,
    setPrevPrompt,
    onSent,
    recentPrompt,
    setRecentPrompt,
    input,
    setInput,
    showResult,
    loading,
    resultData,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
