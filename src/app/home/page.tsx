import HomeHeader from "@/components/home/HomeHeader";
import SearchBar from "@/components/search-bar/SearchBar";

function page() {
  return (
    <div className="m-auto max-w-[428px] bg-[#FAFAFA] p-2 flex flex-col gap-2">
      <HomeHeader />
      <SearchBar />
    </div>
  );
}

export default page;
