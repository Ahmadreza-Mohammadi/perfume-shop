import BackIcon from "@/components/shared/BackIcon";
import HeaderMenu from "../menu/HeaderMenu";
import LogoutButton from "../shared/LogoutButton";

function OrdersHeader() {
  return (
    <div className="w-full sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-4">
          <BackIcon />
          <HeaderMenu />
        </div>
        <div className="hidden md:flex items-center">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}

export default OrdersHeader;
