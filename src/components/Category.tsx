import Link from "next/link";
import React from "react";
import { Search } from "lucide-react";

type CategoryProps = {
  activeMenu: string | null;
};

const subCategories: Record<string, string[]> = {
  women: [
    "Áo khoác",
    "Áo thun",
    "Quần",
    "Chân váy",
    "Đầm",
    "Đồ mặc nhà",
    "Innerwear",
    "Phụ kiện",
  ],
  men: [
    "Áo khoác",
    "Áo thun",
    "Sơ mi",
    "Quần jean",
    "Quần tây",
    "Đồ thể thao",
    "Đồ mặc nhà",
    "Phụ kiện",
  ],
  kids: [
    "Bé gái",
    "Bé trai",
    "Áo khoác",
    "Áo thun",
    "Quần",
    "Đồ ngủ",
    "Đồ đi học",
    "Phụ kiện",
  ],
  baby: [
    "Newborn",
    "Bộ bodysuit",
    "Áo len",
    "Quần",
    "Áo khoác",
    "Đồ ngủ",
    "Bib & khăn",
    "Tất & phụ kiện",
  ],
};

const Category = ({ activeMenu }: CategoryProps) => {
  if (!activeMenu) {
    return null;
  }

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[1200px] rounded-xl border border-white/30 bg-white/90 p-6 text-gray-900 shadow-xl backdrop-blur-md">
      <div className="mb-6">
        <div className="flex items-center gap-3 rounded-full border border-gray-300 bg-white px-5 py-3 text-gray-500">
          <Search size={22} strokeWidth={1.5} />
          <span className="text-3xl leading-none text-gray-300">|</span>
          <span className="text-3xl font-medium">
            Bạn đang tìm sản phẩm gì?
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {subCategories[activeMenu].map((item) => (
          <Link
            key={item}
            href="#"
            className="rounded-md px-3 py-2 text-sm hover:bg-gray-100"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
