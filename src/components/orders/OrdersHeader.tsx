import BackIcon from "@/components/shared/BackIcon";
import Image from "next/image";
import Logo from "../../../public/perfume-bottle-heart.svg";

function OrdersHeader() {
  return (
    <div className="flex items-center">
      <BackIcon />
      <div className="flex items-center">
        <span>سفارشات من</span>
        <Image src={Logo} alt="perfume" className="h-10 w-10" />
      </div>
    </div>
  );
}

export default OrdersHeader;
