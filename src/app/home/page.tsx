import HomeHeader from "@/components/home/HomeHeader";
import TopBrands from "@/components/home/TopBrands";
import SearchBar from "@/components/search-bar/SearchBar";

function page() {
  return (
    <div className="m-auto sm:w-[420px] md:w-[640px] lg:w-[768px] xl:w-[1024px] flex flex-col gap-6">
      <HomeHeader />
      <SearchBar />
      <TopBrands />
    </div>
  );
}

export default page;
