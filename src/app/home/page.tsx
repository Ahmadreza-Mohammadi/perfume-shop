import HomeHeader from "@/components/home/HomeHeader";
import TopBrands from "@/components/home/TopBrands";
import SearchBar from "@/components/search-bar/SearchBar";

function page() {
  return (
    <div className="m-auto max-w-[428px] flex flex-col gap-6">
      <HomeHeader />
      <SearchBar />
      <TopBrands />
    </div>
  );
}

export default page;
