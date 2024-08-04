import { useCallback, useEffect, useRef, useState } from "react";
import PersonaCard from "../../components/PersonaCard";
import {
  useGetExploreQuery,
  useGetExploreTagsQuery,
} from "../../services/apiSlices";

const ExplorePage = () => {
  const [selectedTag, setSelectedTag] = useState<any>({
    title: "Recommended",
    description: "Suggestions based on your favorite characters",
  });
  const [listOfPersonas, setListOfPersonas] = useState<any[]>([]);
  const { data: tagsData } = useGetExploreTagsQuery({});
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;
  const {
    data: exploreData,
    isLoading,
    isFetching,
    refetch,
  } = useGetExploreQuery({
    offset: (page - 1) * itemsPerPage,
    limit: itemsPerPage + 1,
    searchWord: "",
    selectedTag: selectedTag.title,
  });
  console.log(exploreData);

  useEffect(() => {
    if (exploreData) {
      setListOfPersonas((prevData: any) => [...prevData, ...exploreData.data]);
      setHasMore(exploreData.data.length === itemsPerPage);
    }
  }, [exploreData, page, refetch]);
  console.log("new one", listOfPersonas);

  useEffect(() => {
    setPage(1);
    setListOfPersonas([]);
  }, [selectedTag]);

  const discoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      console.log(discoverRef.current, "inside scroll");

      if (
        discoverRef.current &&
        discoverRef.current.scrollHeight - discoverRef.current.scrollTop <=
          discoverRef.current.clientHeight + 1
      ) {
        if (hasMore) {
          refetch();
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    if (discoverRef.current) {
      console.log("this", discoverRef.current);

      discoverRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (discoverRef.current) {
        discoverRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [discoverRef, refetch, exploreData, page]);

  return (
    <div className="w-full bg-secondaryBg pb-28 h-full overflow-y-auto">
      <div className="relative flex overflow-x-auto gap-2 w-full px-2 top-4">
        {tagsData?.categories?.map((tag: any, index: number) => (
          <button
            key={index}
            className="rounded-full flex align-middle  bg-background text-text text-sm h-6 font-semibold px-3 whitespace-nowrap"
            onClick={() => {
              setListOfPersonas([]), setSelectedTag(tag);
            }}
          >
            <p>{tag.title}</p>
          </button>
        ))}
      </div>
      <div className="relative ml-6 top-7 rounded-lg bg-background text-hint text-sm font-medium px-3 w-4/5 h-10">
        {selectedTag.title}{" "}
        <p className="text-xs font-normal text-hint">
          {selectedTag.description}
        </p>
      </div>
      <div
        ref={discoverRef}
        className="relative top-11 space-y-3 max-h-9/10 overflow-y-scroll"
      >
        {listOfPersonas.map((persona: any, idx: number) => (
          <PersonaCard key={idx} data={persona} />
        ))}
        {(isLoading || isFetching) && <>hellloo</>}
      </div>
    </div>
  );
};

export default ExplorePage;
