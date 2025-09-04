import TopPerfumes from "@/components/home/TopPerfumes";
import HomeHeader from "@/components/home/HomeHeader";
import RandomProducts from "@/components/home/RandomProducts";
import TopBrands from "@/components/home/TopBrands";
import SearchBar from "@/components/search-bar/SearchBar";
import SwiperComponent from "@/components/swiper/SwiperComponent";

function page() {
  return (
    <>
      <HomeHeader />
      <div className="max-w-[1440px] mx-auto px-4 py-6 pb-24 flex flex-col gap-6">
        <TopPerfumes />
        <SwiperComponent />
        <SearchBar />
        <TopBrands />
        <RandomProducts />
      </div>
    </>
  );
}

export default page;
