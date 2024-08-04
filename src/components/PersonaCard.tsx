import { MdOutlineMessage } from "react-icons/md";
import { CiStar } from "react-icons/ci";

interface PersonaProp {
  data: any;
}

const PersonaCard = ({ data }: PersonaProp) => {
  return (
    <div className="flex w-[90%] px-3 py-4 bg-background mx-5 gap-2 rounded-lg">
      <div className="flex flex-col gap-2 mr-1">
        <div className="rounded-full w-[50px] h-[50px] object-cover">
          <img
            className="relative rounded-full w-[50px] h-[50px] object-cover"
            src={data?.image}
            alt=""
          />
        </div>

        <div className="flex justify-center gap-1 items-center text-text">
          <MdOutlineMessage size={20} />
          <p className="font-light text-xs text-start">156</p>
        </div>
      </div>

      <div className="text-text">
        <p className="text-sm font-bold">{data.name}</p>
        <p className="font-normal text-[10px] line-clamp-4">{data.description}</p>
      </div>
      <div className="flex items-start text-text">
        <CiStar size={30} />
      </div>
    </div>
  );
};

export default PersonaCard;
