import { GrCopy } from "react-icons/gr";
import { HiLink } from "react-icons/hi";
import { TbWritingSign, TbZoomQuestion } from "react-icons/tb";

export const ModelShimmer = () => {
  return <div className="shimmer w-24 rounded-full"></div>;
};
export const SourcesShimmer = () => {
  return (
    <div className="shimmer rounded-md">
      <p className="w-40 h-14"></p>
    </div>
  );
};

export const RelatedShimmer = () => {
  return (
    <div className="flex flex-col gap-2 h-full overflow-y-scroll">
      <div className="rounded-md shimmer w-80 h-12"></div>
      <div className="rounded-md shimmer w-80 h-12"></div>
      <div className="rounded-md shimmer w-80 h-12"></div>
      <div className="rounded-md shimmer w-80 h-12"></div>
    </div>
  );
};

export const ResponseShimmer = () => {
  return (
    <div className="flex flex-col h-full bg-secondaryBg gap-3">
      <div className="w-full flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center ">
            <TbWritingSign size={26} />
            <p className="font-extrabold text-xl">Summary</p>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <ModelShimmer />
            <GrCopy className="text-button" size={24} />
          </div>
        </div>
        <p className="shimmer w-80 h-40 rounded-lg"></p>
      </div>
      <div className="flex-col">
        <div className="flex justify-start my-1">
          <HiLink size={25} />
          <p className="font-extrabold text-xl ml-2 ">Sources</p>
        </div>
        <div className="flex flex-nowrap w-full overflow-x-scroll gap-2 ">
          <SourcesShimmer /> <SourcesShimmer />{" "}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-row justify-start gap-2">
          <TbZoomQuestion size={26} />
          <p className="font-extrabold text-xl mb-3">Related Questions</p>
        </div>
        <RelatedShimmer />
      </div>
    </div>
  );
};
