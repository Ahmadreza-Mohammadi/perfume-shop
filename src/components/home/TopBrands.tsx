import Image from "next/image";
import Dior from "../../../public/dior.png";
import armani from "../../../public/armani.png";
import versace from "../../../public/versace.png";
import montBlanc from "../../../public/montblanc.png";
import ysl from "../../../public/ysl.png";
import chanel from "../../../public/chanel.png";
import LV from "../../../public/LV.png";
import lalique from "../../../public/lalique.png";

function TopBrands() {
  return (
    <div className=" py-4 flex justify-center flex-wrap gap-10 text-xs font-semibold">
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <Image
          className="w-[60px] h-[60px] rounded-full flex justify-center items-center "
          src={Dior}
          alt=""
        />
        <span>Dior</span>
      </div>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <Image
          className="w-[60px] h-[60px] rounded-full flex justify-center items-center "
          src={armani}
          alt=""
        />
        <span>Armani</span>
      </div>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <Image
          className="w-[60px] h-[60px] rounded-full flex justify-center items-center "
          src={versace}
          alt=""
        />
        <span>Versace</span>
      </div>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <Image
          className="w-[60px] h-[60px] rounded-full flex justify-center items-center "
          src={LV}
          alt=""
        />
        <span>LV</span>
      </div>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <Image
          className="w-[60px] h-[60px] rounded-full flex justify-center items-center "
          src={ysl}
          alt=""
        />
        <span>YSL</span>
      </div>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <Image
          className="w-[60px] h-[60px] rounded-full flex justify-center items-center "
          src={chanel}
          alt=""
        />
        <span>Chanel</span>
      </div>

      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <Image
          className="w-[60px] h-[60px] rounded-full flex justify-center items-center "
          src={montBlanc}
          alt=""
        />
        <span>Mont Blanc</span>
      </div>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <Image
          className="w-[60px] h-[60px] rounded-full flex justify-center items-center"
          src={lalique}
          alt=""
        />
        <span>Lalique</span>
      </div>
    </div>
  );
}

export default TopBrands;
