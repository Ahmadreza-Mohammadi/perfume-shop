import Image from "next/image";
import globe from "../../../public/globe.svg";
import window from "../../../public/window.svg";
import file from "../../../public/file.svg";

function ProductsFooter() {
  return (
    <footer className="mt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-bold text-[#343A40] mb-3">درباره ما</h4>
              <p className="text-sm text-gray-600 leading-6">
                فروشگاه عطر با بهترین برندها و اصالت کالا. هدف ما تجربه خریدی
                مطمئن و لذت‌بخش است.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-[#343A40] mb-3">لینک‌ها</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <a className="hover:text-[#343A40] transition" href="/about">
                    درباره
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#343A40] transition" href="/orders">
                    سفارش‌ها
                  </a>
                </li>
                <li>
                  <a
                    className="hover:text-[#343A40] transition"
                    href="/profile"
                  >
                    پروفایل
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#343A40] mb-3">قوانین</h4>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <a className="hover:text-[#343A40] transition" href="#">
                    حریم خصوصی
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#343A40] transition" href="#">
                    شرایط استفاده
                  </a>
                </li>
                <li>
                  <a className="hover:text-[#343A40] transition" href="#">
                    بازگشت کالا
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#343A40] mb-3">
                شبکه‌های اجتماعی
              </h4>
              <div className="flex items-center gap-3">
                <a
                  className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition shadow-sm"
                  href="#"
                  aria-label="website"
                >
                  <Image src={globe} alt="web" className="w-5 h-5" />
                </a>
                <a
                  className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition shadow-sm"
                  href="#"
                  aria-label="dashboard"
                >
                  <Image src={window} alt="dashboard" className="w-5 h-5" />
                </a>
                <a
                  className="p-2 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition shadow-sm"
                  href="#"
                  aria-label="docs"
                >
                  <Image src={file} alt="docs" className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-6 pt-4 text-xs text-gray-500 flex justify-between items-center">
            <span>
              © {new Date().getFullYear()} Perfume Shop. All rights reserved.
            </span>
            <span>Made with ❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ProductsFooter;
