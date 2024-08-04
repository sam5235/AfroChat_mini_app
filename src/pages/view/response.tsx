import { ResponseShimmer } from "../../components/ResponsePageShimmer";
import { TbZoomQuestion } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useGetAskResponseQuery } from "../../services/apiSlices";
import ResponsePage from "../../components/layouts/responsePage";
import { useEffect, useRef, useState } from "react";
import { setSearchedWord } from "../../services/inputSlice";
import { ChatBar } from "../../components/InputTextFields";

interface ChatProps {
  data: any;
  searchedWord: string;
}

const Response = () => {
  const dispatch = useDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chats, setChats] = useState<ChatProps[]>([]);
  const { searchedWord, selectedModel } = useSelector(
    (state: RootState) => state.input
  );
  const lastChat = chats.length - 1;

  const firstMessageRef = useRef<string | null>(null);
  if (!firstMessageRef.current && searchedWord) {
    firstMessageRef.current = searchedWord;
  }
  const firstMessage = firstMessageRef.current;

  const { data, refetch, isLoading, isFetching } = useGetAskResponseQuery(
    {
      question: searchedWord,
      model: selectedModel,
    },
    { skip: !searchedWord }
  );

  useEffect(() => {
    if (searchedWord) {
      refetch();
    }
  }, [searchedWord, refetch]);

  useEffect(() => {
    if (data) {
      setChats((prevChats) => [...prevChats, { data, searchedWord }]);
    }
  }, [data, searchedWord]);

  const handleClickRelated = (newQuestion: string) => {
    dispatch(setSearchedWord(newQuestion));
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  return (
    <div className="flex flex-col py-5 h-full bg-secondaryBg gap-3 px-2 pb-16">
      {isLoading ? (
        <ResponseShimmer />
      ) : (
        <>
          {chats.length > 0 && (
            <>
              <p className="bg-background w-1/2 rounded-md px-2 font-light font-serif">
                {firstMessage}
              </p>
              {chats.map((chat, idx) =>
                idx == lastChat && isFetching && idx !== 0 ? (
                  <ResponseShimmer key={idx} />
                ) : (
                  <ResponsePage key={idx} data={chat.data} />
                )
              )}
              {!(isFetching && lastChat !== 0) && (
                <div className="flex flex-col">
                  <div className="flex flex-row justify-start gap-2">
                    <TbZoomQuestion size={26} />
                    <p className="font-extrabold text-xl mb-3">
                      Related Questions
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 h-full overflow-y-scroll">
                    {" "}
                    {chats[lastChat]?.data?.recommendations.map(
                      (item: string, key: number) => (
                        <div
                          key={key}
                          className="rounded-md p-2 bg-background text-sm text-hint font-semibold"
                          onClick={() => handleClickRelated(item)}
                        >
                          {item}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              <ChatBar />
              <div ref={messagesEndRef} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Response;
