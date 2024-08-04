import {MdOutlineImageSearch} from "react-icons/md"
import {FaRegEdit} from "react-icons/fa"

interface TypesOfChatsProps {
  feature: string;
  handleSelectFeature: (event: React.ChangeEvent<HTMLInputElement>) => void;
  divRef:React.RefObject<HTMLDivElement>
}

export const TypesOfChats = ({
  feature,
  handleSelectFeature,
  divRef
}: TypesOfChatsProps) => {
  return (
    <div ref={divRef} className="fixed bottom-36 bg-background text-nowrap text-text flex flex-col rounded-lg p-3 w-52 px-2 gap-3">
      <label className="flex justify-between text-nowrap" htmlFor="html">
        Ask
        <input
          type="radio"
          value="ask"
          checked={feature === "ask"}
          onChange={handleSelectFeature}
        />
      </label>
      <label className="flex justify-between text-nowrap" htmlFor="html">
        Chat
        <input
          className="bg-transparent"
          type="radio"
          value="chat"
          checked={feature === "chat"}
          onChange={handleSelectFeature}
        />
      </label>
      <label className="flex justify-between text-nowrap" htmlFor="html">
        Generate Image
        <input
          type="radio"
          value="generate image"
          checked={feature === "generate image"}
          onChange={handleSelectFeature}
        />
      </label>
    </div>
  );
};

interface ImageFeaturesProprs{
  divRef:React.RefObject<HTMLDivElement>
}

export const ImageFeatures = ({divRef}: ImageFeaturesProprs) => {
  return (
    <div ref={divRef} className="fixed bottom-36 bg-background text-nowrap text-text flex flex-col gap-3 rounded-lg p-3 w-52 px-2 left-[38%]">
      <div className="flex justify-between text-nowrap items-center">
        <p>Describe Image</p>
        <MdOutlineImageSearch className="text-accent" size={18} />
      </div>
      <div className="flex justify-between text-nowrap items-center">
        <p>Edit Image</p>
        <FaRegEdit className="text-accent" size={18} />
      </div>
    </div>
  );
};
