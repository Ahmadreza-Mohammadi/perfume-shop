import BackIcon from "@/components/shared/BackIcon";

function page() {
  return (
    <div className="m-auto p-2 sm:w-[420px] md:w-[640px] lg:w-[768px] xl:w-[1024px]">
      <div className="flex items-center">
        <BackIcon />
        <span className="w-64">نهایی کردن پرداخت</span>
      </div>
    </div>
  );
}

export default page;
