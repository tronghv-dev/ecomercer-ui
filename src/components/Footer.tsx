import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="border-t mt-12 pt-10 pb-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        {/* Column 1 */}
        <div>
          <h3 className="font-bold text-sm mb-4">HỖ TRỢ</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="#">Câu hỏi thường gặp</Link>
            </li>
            <li>
              <Link href="#">Chính sách đổi trả</Link>
            </li>
            <li>
              <Link href="#">Liên hệ</Link>
            </li>
            <li>
              <Link href="#">Cửa hàng</Link>
            </li>
          </ul>
        </div>
        {/* Column 2 */}
        <div>
          <h3 className="font-bold text-sm mb-4">CÔNG TY</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="#">Về chúng tôi</Link>
            </li>
            <li>
              <Link href="#">Tuyển dụng</Link>
            </li>
            <li>
              <Link href="#">Bền vững</Link>
            </li>
            <li>
              <Link href="#">Tin tức</Link>
            </li>
          </ul>
        </div>
        {/* Column 3 */}
        <div>
          <h3 className="font-bold text-sm mb-4">TÀI KHOẢN</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link href="#">Đăng nhập</Link>
            </li>
            <li>
              <Link href="#">Đăng ký</Link>
            </li>
            <li>
              <Link href="#">Đơn hàng</Link>
            </li>
            <li>
              <Link href="#">Yêu thích</Link>
            </li>
          </ul>
        </div>
        {/* Column 4 */}
        <div>
          <h3 className="font-bold text-sm mb-4">THANH TOÁN</h3>
          <div className="flex gap-2">
            <Image src="/stripe.png" alt="Stripe" width={40} height={24} />
            <Image src="/klarna.png" alt="Klarna" width={40} height={24} />
          </div>
        </div>
      </div>
      <div className="border-t pt-4 text-center text-xs text-gray-500">
        © 2026 UNIQLO Clone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
