import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegImages } from "react-icons/fa";
import { ImageFeatures, TypesOfChats } from "./MainFeatures";
import { IoSend } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchedWord,
  setSelectedInput,
  setSelectedModel,
  setSessionId,
} from "../services/inputSlice";
import { RootState } from "../store/store";

interface TextBarProps {
  model: string;
  setCurrentFeature: React.Dispatch<React.SetStateAction<string>>;
}

export const TextBar = ({ model, setCurrentFeature }: TextBarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [feature, setFeature] = useState<string>("ask");
  const [featureVisible, setFeatureVisible] = useState(false);
  const [imageVisibility, setImageVisibility] = useState(false);
  const [question, setQuestion] = useState<string>("");
  const { searchedWord, selectedModel, session_id } = useSelector(
    (state: RootState) => state.input
  );

  const handleSelectFeature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeature(event.target.value);
  };

  const divRef = useRef<HTMLDivElement>(null);
  const outSideClickhandler = () => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (divRef.current && !divRef.current.contains(event.target as Node)) {
      setFeatureVisible(false);
      setImageVisibility(false);
    }
  };

  useEffect(() => {
    if (feature !== "generate image") {
      setCurrentFeature("llm_models");
    } else {
      setCurrentFeature("image_models");
    }
    if (searchedWord && selectedModel !== "") {
      navigate("/response");
    }
    outSideClickhandler();
  }, [feature, selectedModel, searchedWord, navigate]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch(setSelectedModel(model || "GPT 3.5"));
      dispatch(setSearchedWord(question));
      dispatch(setSelectedInput({ title: feature }));
      dispatch(setSessionId(session_id || ""));
      setQuestion("");
    }
  };

  return (
    <>
      {featureVisible && (
        <TypesOfChats
          divRef={divRef}
          feature={feature}
          handleSelectFeature={handleSelectFeature}
        />
      )}
      {imageVisibility && <ImageFeatures divRef={divRef} />}
      <div className="flex items-center rounded-full h-12 w-full justify-center bg-background shadow-lg px-5 gap-3">
        <IoMdArrowDropdown
          onClick={() => {
            setFeatureVisible(!featureVisible);
            setImageVisibility(false);
          }}
          className="text-button"
          size={25}
        />
        <input
          className="bg-transparent outline-none w-60 focus:ring-0"
          type="text"
          placeholder={feature}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <FaRegImages
          onClick={() => {
            setImageVisibility(!imageVisibility);
            setFeatureVisible(false);
          }}
          className="text-button"
          size={24}
        />
      </div>
    </>
  );
};

export const ChatBar = () => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState<string>("");
  const { session_id } = useSelector((state: RootState) => state.input);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dispatch(setSelectedModel("GPT 3.5"));
      dispatch(setSearchedWord(question));
      if (session_id) {
        dispatch(setSelectedInput({ title: "chat" }));
      } else {
        dispatch(setSelectedInput({ title: "ask" }));
      }
      dispatch(setSessionId(session_id || ""));
      setQuestion("");
    }
  };

  const handleSend = () => {
    dispatch(setSelectedModel("GPT 3.5"));
    dispatch(setSearchedWord(question));
    if (session_id) {
      dispatch(setSelectedInput({ title: "chat" }));
    } else {
      dispatch(setSelectedInput({ title: "ask" }));
    }
    dispatch(setSessionId(session_id || ""));
    setQuestion("");
  };

  return (
    <div className="flex items-center rounded-full h-14 bg-background justify-between shadow-lg px-5 gap-3">
      <input
        className="bg-transparent outline-none w-60 focus:ring-0"
        type="text"
        placeholder="Ask anything"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <IoSend onClick={handleSend} />
    </div>
  );
};

export const SearchBar = () => {
  return (
    <div className="flex h-10 gap-3">
      <div className="flex items-center justify-center bg-background w-10 h-10 rounded-lg">
        <RiSearch2Line className="text-button font-bold" size={25} />
      </div>
      <input
        className="bg-background rounded-lg outline-none w-5/6 focus:ring-0 text-sm pl-2"
        type="text"
        placeholder="Search your chat history here..."
      />
    </div>
  );
};
