import Image from "next/image";
import search from "../../../public/search.svg";


function SearchBar() {
  return (
    <div className="bg-[#FAFAFA] m-auto w-12/13 flex justify-center rounded-sm">
        <Image
            className="w-6 h-6 cursor-pointer"
            src={search}
            alt="search" />
      <input className="outline-none w-7/8" placeholder="جستجو..." type="text" />
    </div>
  );
}

export default SearchBar;
