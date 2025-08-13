import Image from "next/image";
import Link from "next/link";
import backIcon from "../../../public/right-arrow.svg";

function BackIcon() {
  return (
    <div className="flex justify-between items-center p-4 bg-[#fff] rounded-b-xl">
      <Link
        href="/home"
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
      >
        <Image src={backIcon} alt="بازگشت" className="w-6 h-6" />
      </Link>
    </div>
  );
}

export default BackIcon;
