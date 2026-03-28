"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import Category from "@/components/Category";
import { Search, Heart, User, Menu, ShoppingCart } from "lucide-react";

const menuItems = [
  { key: "women", href: "/women", label: "NỮ" },
  { key: "men", href: "/men", label: "NAM" },
  { key: "kids", href: "/kids", label: "TRẺ EM" },
  { key: "baby", href: "/baby", label: "EM BÉ" },
];

const Navbar = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, opacity: 0 });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement>,
    menuKey: string,
  ) => {
    const el = e.currentTarget;
    const parent = menuRef.current;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setIndicator({
      left: elRect.left - parentRect.left,
      width: elRect.width,
      opacity: 1,
    });
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
    setIndicator((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <nav className="flex w-full items-center justify-between relative">
      {/* left - logo */}
      <Link href="/">
        <Image
          src="/logo.png"
          alt="uniqlo"
          width={75}
          height={50}
          className=""
        />
      </Link>

      {/* center - menu (absolute center) */}
      <div
        className="hidden md:block absolute left-1/2 -translate-x-1/2"
        onMouseLeave={handleMouseLeave}
      >
        <div ref={menuRef} className="flex items-center gap-20 h-full relative">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white font-17px tracking-wide py-3 drop-shadow-[0_1.5px_0_rgba(0,0,0,0.55)]"
              onMouseEnter={(e) => handleMouseEnter(e, item.key)}
            >
              {item.label}
            </Link>
          ))}
          {/* sliding indicator */}
          <span
            className="absolute bottom-2 h-[1px] bg-white drop-shadow-[0_1.5px_1px_rgba(0,0,0,0.55)] transition-all duration-300 ease-in-out"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.opacity,
            }}
          />
        </div>

        <Category activeMenu={activeMenu} />
      </div>

      {/* right - icons */}
      <div className="flex items-center gap-6 text-white drop-shadow-[0_1.5px_1px_rgba(0,0,0,0.55)]">
        <button aria-label="Tìm kiếm">
          <Search size={20} strokeWidth={1.5} />
        </button>
        <button aria-label="Yêu thích">
          <Heart size={20} strokeWidth={1.5} />
        </button>
        <button aria-label="Tài khoản">
          <User size={20} strokeWidth={1.5} />
        </button>
        <Link href="/cart" className="relative" aria-label="Giỏ hàng">
          <ShoppingCart size={20} strokeWidth={1.5} />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </Link>
        <button aria-label="Menu">
          <Menu size={20} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
