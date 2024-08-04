import HistoryCard from "../../components/HistoryCard";
import { SearchBar } from "../../components/InputTextFields";

const HistoryPage = () => {
  return (
    <div className="h-auto w-full bg-secondaryBg p-2">
      <div className="relative top-2">
        <SearchBar />
      </div>
      <div className="relative flex flex-col gap-2 top-8">
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
      </div>
    </div>
  );
};

export default HistoryPage;
