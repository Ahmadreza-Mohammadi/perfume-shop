import TopPerfumes from "@/components/home/TopPerfumes";
import HomeHeader from "@/components/home/HomeHeader";
import RandomProducts from "@/components/home/RandomProducts";
import TopBrands from "@/components/home/TopBrands";
import SearchBar from "@/components/search-bar/SearchBar";
import SwiperComponent from "@/components/swiper/SwiperComponent";

function page() {
  return (
    <div className="m-auto sm:w-[420px] md:w-[640px] lg:w-[768px] xl:w-[1024px] flex flex-col gap-6">
      <HomeHeader />
      <SwiperComponent />
      <TopPerfumes />
      <SearchBar />
      <TopBrands />
      <RandomProducts />
    </div>
  );
}

export default page;
