"use client";

import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";

type Banner = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
};

const banners: Banner[] = [
  {
    image: "/banners/man2.jpg",
    alt: "BST nam linen",
    title: "Uniqlo U",
    subtitle: "Bộ Sưu Tập Xuân/Hè 2026",
    description: "Nhịp Điệu Sắc Màu",
    tag: "*Hàng Mới Về",
  },
  {
    image: "/banners/woman1.jpg",
    alt: "BST nữ linen",
    title: "Áo Sơ Mi Vải Linen Cao Cấp",
    subtitle: "Nhẹ nhàng, tinh tế một cách tự nhiên.",
    description: "Được làm từ 100% sợi lanh châu Âu",
    tag: "*Mua Ngay",
  },
  {
    image: "/banners/kid2.jpg",
    alt: "BST trẻ em",
    title: "Kids Active Collection",
    subtitle: "Thoải mái cho mọi chuyển động",
    description: "Thoáng mát, co giãn, dễ giặt",
    tag: "*Khám Phá",
  },
  {
    image: "/banners/woman2.jpeg",
    alt: "BST nữ mới",
    title: "Minimal Daily Wear",
    subtitle: "Phom dáng hiện đại, dễ phối",
    description: "Nâng tầm tủ đồ mỗi ngày",
    tag: "*Bộ Sưu Tập Mới",
  },
];

const SLIDE_TRANSITION_MS = 1000;
const SLIDE_EASING = "cubic-bezier(0.22, 0.61, 0.36, 1)";

const getLoopedIndex = (index: number, length: number) =>
  ((index % length) + length) % length;

const HeroBanner = () => {
  const slideCount = banners.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [startY, setStartY] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [trackShift, setTrackShift] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // hướng chuyển hiện tại, dùng để biết sau animation phải cập nhật index theo next hay prev.
  const [pendingDirection, setPendingDirection] = useState<
    "next" | "prev" | null
  >(null);
  const wheelLockedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayIndex =
    pendingDirection === "next"
      ? getLoopedIndex(activeIndex + 1, slideCount)
      : pendingDirection === "prev"
        ? getLoopedIndex(activeIndex - 1, slideCount)
        : activeIndex;
  const activeBanner = banners[displayIndex];
  const visibleSlides = useMemo(
    () => [
      {
        banner: banners[getLoopedIndex(activeIndex - 1, slideCount)],
        position: -100,
        slot: "prev" as const,
      },
      {
        banner: banners[activeIndex],
        position: 0,
        slot: "current" as const,
      },
      {
        banner: banners[getLoopedIndex(activeIndex + 1, slideCount)],
        position: 100,
        slot: "next" as const,
      },
    ],
    [activeIndex, slideCount],
  );

  const sliderStyle = useMemo(
    () => ({
      transform: `translateY(calc(${trackShift * 100}% + ${dragOffset}px))`,
      willChange: "transform" as const,
      transition:
        isDragging || !isTransitioning
          ? "none"
          : `transform ${SLIDE_TRANSITION_MS}ms ${SLIDE_EASING}`,
    }),
    [trackShift, dragOffset, isDragging, isTransitioning],
  );

  const animateToDirection = (direction: "next" | "prev") => {
    if (isTransitioning) return; // tránh trường hợp người dùng kích hoạt chuyển slide liên tục khi animation chưa kết thúc.

    setPendingDirection(direction); //lưu hướng chuyển
    setIsTransitioning(true); // bật trạng thái đang chuyển để khóa các tương tác khác
    setTrackShift(direction === "next" ? -1 : 1); // dịch chuyển track sang hướng tương ứng
    setDragOffset(0); // reset drag offset để animation diễn ra mượt mà từ vị trí cuối cùng của drag. Nếu không reset, khi người dùng kéo một khoảng rồi thả, animation sẽ bắt đầu từ vị trí đó thay vì bắt đầu từ vị trí trung tâm, dẫn đến cảm giác giật hoặc không mượt. Bằng cách reset về 0, chúng ta đảm bảo rằng animation luôn bắt đầu từ vị trí trung tâm, tạo trải nghiệm chuyển slide mượt mà và nhất quán.
  };

  // Khi người dùng thả sau khi kéo, nếu khoảng cách kéo đủ lớn, slide sẽ chuyển theo hướng đó. Nếu không đủ, slide sẽ quay lại vị trí trung tâm.
  const animateBackToCenter = () => {
    if (isTransitioning || dragOffset === 0) return; // nếu đang trong quá trình chuyển slide hoặc không có drag offset thì không cần animate

    setPendingDirection(null);
    setIsTransitioning(true);
    setTrackShift(0);
    setDragOffset(0);
  };

  const goNext = () => {
    animateToDirection("next"); ////=>settrackShift(-1)
  };
  const goPrev = () => {
    animateToDirection("prev"); //=>settrackShift(1)
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    //e: React.PointerEvent<HTMLDivElement> là kiểu của sự kiện con trỏ (pointer event) được sử dụng trong React. Nó cung cấp thông tin về sự kiện liên quan đến các thiết bị nhập liệu như chuột, bút cảm ứng, hoặc ngón
    if (isTransitioning) return;

    setIsDragging(true); //quá trình kéo bắt đầu
    setStartY(e.clientY); //lưu vị trí Y ban đầu của con trỏ khi bắt đầu kéo
    setDragOffset(0); //
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || startY === null) return;

    setDragOffset(e.clientY - startY);
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startY === null) return;

    const deltaY = e.clientY - startY;
    const threshold =
      (containerRef.current?.clientHeight ?? window.innerHeight) * 0.14;

    setIsDragging(false);
    setStartY(null);

    if (deltaY <= -threshold) {
      goNext();
      return;
    }

    if (deltaY >= threshold) {
      goPrev();
      return;
    }

    animateBackToCenter();
  };

  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;

    if (pendingDirection === "next") {
      setActiveIndex((prev) => getLoopedIndex(prev + 1, slideCount));
    } else if (pendingDirection === "prev") {
      setActiveIndex((prev) => getLoopedIndex(prev - 1, slideCount));
    }

    setPendingDirection(null);
    setIsTransitioning(false);
    setTrackShift(0);
    setDragOffset(0);
  };

  const handleNativeDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (wheelLockedRef.current || isTransitioning || isDragging) return;
    if (Math.abs(e.deltaY) < 8) return;

    e.preventDefault();

    if (e.deltaY > 0) {
      goNext();
    } else {
      goPrev();
    }

    wheelLockedRef.current = true;
    window.setTimeout(() => {
      wheelLockedRef.current = false;
    }, SLIDE_TRANSITION_MS);
  };

  return (
    <div
      ref={containerRef}
      className="relative h-screen min-h-screen w-full cursor-grab overflow-hidden select-none touch-none active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={() => {
        setIsDragging(false);
        setStartY(null);
        animateBackToCenter();
      }}
      onDragStart={handleNativeDragStart}
      onWheel={handleWheel}
    >
      <div
        className="absolute inset-0"
        style={sliderStyle}
        onTransitionEnd={handleTransitionEnd}
      >
        {visibleSlides.map(({ banner, position, slot }) => (
          <div
            key={slot}
            className="absolute inset-x-0 h-full w-full"
            style={{ top: `${position}%` }}
          >
            <Image
              src={banner.image}
              alt={banner.alt}
              fill
              draggable={false}
              className="object-cover object-center"
              priority={slot === "current"}
            />
          </div>
        ))}
      </div>

      <div className="media-banner_shadow pointer-events-none absolute top-0 left-0 right-0 z-10 h-28 md:h-40" />

      <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-center px-8 md:px-16">
        <div className="mb-4 flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="uniqlo"
            width={40}
            height={30}
            className="h-8 w-auto"
          />
          <span className="text-2xl font-bold text-white">U</span>
        </div>
        <h1 className="mb-2 text-3xl font-semibold text-white md:text-5xl">
          {activeBanner.title}
        </h1>
        <p className="mb-1 text-sm text-white/90 md:text-base">
          {activeBanner.subtitle}
        </p>
        <p className="mb-4 text-sm text-white/90 md:text-base">
          {activeBanner.description}
        </p>
        <p className="text-sm font-medium text-white">{activeBanner.tag}</p>
      </div>

      <div className="pointer-events-none absolute top-1/2 right-2 z-30 flex -translate-y-1/2 flex-col items-center gap-1.5 md:right-5">
        {banners.map((banner, index) => {
          const isActive = index === displayIndex;

          return (
            <span
              key={banner.image}
              className={`rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)] transition-all duration-500 ${
                isActive ? "h-8 w-1" : "h-1 w-1"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeroBanner;
