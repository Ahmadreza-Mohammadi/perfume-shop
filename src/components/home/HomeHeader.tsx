import Image from "next/image";
import favoriteIcon from "../../../public/heart.svg";
import bellIcon from "../../../public/bell.svg";
import ThemeToggle from "../theme/ThemeToggle";

function HomeHeader() {
  return (
    <div className="flex justify-between p-2">
      <div>left side</div>
      <div className="flex gap-3">
        <Image
          src={favoriteIcon}
          className="w-6 h-6 cursor-pointer"
          alt="favorites"
        />

        <Image
          src={bellIcon}
          className="w-6 h-6 cursor-pointer"
          alt="favorites"
        />
        <ThemeToggle />
      </div>
    </div>
  );
}

export default HomeHeader;
