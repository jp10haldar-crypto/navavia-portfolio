// WHAT THIS FILE DOES: The interactive picture on the right of the
// homepage headline. It shows what Navavia actually hands over: a finished
// website for a business (here, a made-up travel agency called "Saffron
// Trails") AND the admin panel the owner runs it from, plus the same
// business as a phone app.
//
// When the page opens it plays one short sequence: everything is first
// drawn as a dashed blueprint sketch with measurement marks, then fills in
// as a real, finished product, then a divider sweeps across to reveal the
// admin panel underneath the customer site. After that the visitor can
// drag the divider (or focus it and use the arrow keys) to compare both
// sides. Visitors who've asked their device for reduced motion get the
// finished picture straight away.
//
// The whole mock-up is drawn at one fixed "design size" (CANVAS_W ×
// CANVAS_H) and scaled to fit, so it keeps its exact proportions on every
// screen size. The divider handle and the two labels sit in a separate,
// unscaled layer on top, so they stay readable and easy to grab on a phone.
// Everything inside the mock-up is decoration (hidden from screen
// readers); only the divider itself is a real, labelled control.

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CANVAS_W = 980;
const CANVAS_H = 640;
// Where the browser window's content area sits inside the canvas — the
// unscaled overlay (divider + labels) is positioned to match it exactly.
const VIEW = { x: 0, y: 68, w: 880, h: 550 };
const RESTING_SPLIT = 56;

// One block of the mock-up: a dashed blueprint outline that fills with
// `fill` once the stage is "formed", `d` ms after the others start.
function B({ fill, d = 0, className = "", style, children }) {
  return (
    <div
      className={`bp ${className}`}
      style={{ "--fill": fill, "--d": `${d}ms`, ...style }}
    >
      {children}
    </div>
  );
}

// Content that only appears once its block has filled in (text, artwork).
function T({ d = 0, className = "", style, children }) {
  return (
    <div className={`bp-text ${className}`} style={{ "--d": `${d}ms`, ...style }}>
      {children}
    </div>
  );
}

function Landscape({ sky, sun, hills, water }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: sky }}>
      <div
        className="absolute rounded-full"
        style={{ width: "26%", aspectRatio: 1, left: "58%", top: "18%", background: sun }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[62%]"
        style={{
          background: hills[0],
          clipPath: "polygon(0 55%, 18% 20%, 34% 48%, 52% 8%, 70% 42%, 86% 22%, 100% 45%, 100% 100%, 0 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[42%]"
        style={{
          background: hills[1],
          clipPath: "polygon(0 40%, 22% 70%, 40% 30%, 62% 62%, 80% 34%, 100% 58%, 100% 100%, 0 100%)",
        }}
      />
      {water && (
        <div className="absolute inset-x-0 bottom-0 h-[16%]" style={{ background: water }} />
      )}
    </div>
  );
}

const TRIPS = [
  {
    name: "Kerala Backwaters",
    days: "5 days",
    price: "₹24,900",
    art: {
      sky: "linear-gradient(#9fd8cf, #e9f3df)",
      sun: "#fff4c7",
      hills: ["#4f9a7d", "#2f6f5e"],
      water: "#5fb7b0",
    },
  },
  {
    name: "Rajasthan Forts",
    days: "7 days",
    price: "₹38,500",
    art: {
      sky: "linear-gradient(#f7c98b, #fbe6c2)",
      sun: "#fff1d0",
      hills: ["#d9945a", "#b5673a"],
    },
  },
  {
    name: "Meghalaya Trails",
    days: "6 days",
    price: "₹31,200",
    art: {
      sky: "linear-gradient(#b9c8e8, #e6ecf7)",
      sun: "#ffffff",
      hills: ["#6d8f5d", "#3f6345"],
    },
  },
];

function CustomerView() {
  return (
    <div className="absolute inset-0" style={{ fontFamily: "var(--font-hanken)" }}>
      <B fill="#fffbf5" className="absolute inset-0" />

      {/* Site navigation */}
      <div className="absolute left-7 right-7 top-0 flex h-[52px] items-center justify-between">
        <div className="flex items-center gap-2">
          <B fill="#e2572b" d={60} className="h-[18px] w-[18px] rounded-full" />
          <T d={60} className="text-[14px] font-bold text-[#2b1d14]">
            Saffron Trails
          </T>
        </div>
        <T d={120} className="flex gap-[22px] text-[12px] text-[#6b5b4e]">
          <span>Trips</span>
          <span>Destinations</span>
          <span>Stories</span>
          <span>Contact</span>
        </T>
        <B fill="#e2572b" d={160} className="flex h-[28px] w-[86px] items-center justify-center rounded-[6px]">
          <T d={160} className="text-[11px] font-semibold text-white">
            Book a trip
          </T>
        </B>
      </div>

      {/* Hero */}
      <div className="absolute left-7 top-[84px] w-[360px]">
        <T d={200} className="text-[11px] font-semibold text-[#e2572b]">
          Handpicked trips across India
        </T>
        <B fill="transparent" d={220} className="mt-2 rounded-[4px]">
          <T
            d={220}
            className="text-[36px] font-bold leading-[1.02] tracking-[-0.02em] text-[#2b1d14]"
          >
            Find your next
            <br />
            escape.
          </T>
        </B>
        <B fill="transparent" d={260} className="mt-3 rounded-[4px]">
          <T d={260} className="text-[12px] leading-[1.55] text-[#6b5b4e]">
            Small-group journeys planned end to end, from the first train ticket
            to the last sunset. Book online in minutes.
          </T>
        </B>
        <div className="mt-5 flex gap-2">
          <B fill="#2b1d14" d={300} className="flex h-[32px] w-[108px] items-center justify-center rounded-[6px]">
            <T d={300} className="text-[11px] font-semibold text-white">
              Explore trips
            </T>
          </B>
          <B
            fill="transparent"
            d={330}
            className="flex h-[32px] w-[104px] items-center justify-center rounded-[6px]"
            style={{ boxShadow: "inset 0 0 0 1px #d9cbbd" }}
          >
            <T d={330} className="text-[11px] font-semibold text-[#2b1d14]">
              How it works
            </T>
          </B>
        </div>
      </div>

      <B fill="#f4845f" d={240} className="absolute right-7 top-[70px] h-[248px] w-[432px] overflow-hidden rounded-[12px]">
        <T d={240} className="absolute inset-0">
          <Landscape
            sky="linear-gradient(#f9c27a 0%, #f4845f 55%, #c4547a 100%)"
            sun="#fff0c9"
            hills={["#8c3f5c", "#4a2347"]}
            water="#e7826f"
          />
        </T>
      </B>

      {/* Trips row */}
      <div className="absolute left-7 right-7 top-[340px]">
        <T d={380} className="text-[13px] font-bold text-[#2b1d14]">
          Popular this season
        </T>
        <div className="mt-3 grid grid-cols-3 gap-4">
          {TRIPS.map((trip, index) => (
            <div key={trip.name}>
              <B
                fill={trip.art.hills[0]}
                d={420 + index * 90}
                className="relative h-[110px] overflow-hidden rounded-[10px]"
              >
                <T d={420 + index * 90} className="absolute inset-0">
                  <Landscape {...trip.art} />
                </T>
              </B>
              <T d={460 + index * 90} className="mt-2 text-[12px] font-bold text-[#2b1d14]">
                {trip.name}
              </T>
              <T
                d={480 + index * 90}
                className="mt-0.5 flex justify-between text-[11px] text-[#6b5b4e]"
              >
                <span>{trip.days}</span>
                <span className="font-bold text-[#2b1d14]">{trip.price}</span>
              </T>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const WEEKLY_BOOKINGS = [34, 42, 38, 51, 47, 58, 55, 63, 60, 72, 68, 84];
const ADMIN_NAV = ["Dashboard", "Bookings", "Trips", "Reviews", "Enquiries", "Settings"];
const ADMIN_ROWS = [
  ["Ananya Rao", "Kerala Backwaters", "12 Nov", "Paid"],
  ["Rohan Mehta", "Rajasthan Forts", "15 Nov", "Pending"],
  ["Sara Thomas", "Meghalaya Trails", "18 Nov", "Paid"],
  ["Vikram Iyer", "Kerala Backwaters", "21 Nov", "Paid"],
];

function AdminView() {
  return (
    <div className="absolute inset-0 text-[#141a33]" style={{ fontFamily: "var(--font-hanken)" }}>
      <B fill="#f3f5fa" className="absolute inset-0" />

      {/* Sidebar */}
      <B fill="#161d3a" className="absolute bottom-0 left-0 top-0 w-[176px]">
        <T className="px-5 pt-5">
          <p className="text-[13px] font-bold text-white">Saffron Trails</p>
          <p className="text-[10px] text-[#8f9bc2]">Admin panel</p>
        </T>
        <T className="mt-6 flex flex-col gap-1 px-3">
          {ADMIN_NAV.map((item, index) => (
            <div
              key={item}
              className={`flex h-[30px] items-center gap-2.5 rounded-[6px] px-2.5 text-[11px] ${
                index === 0 ? "bg-white/10 text-white" : "text-[#aab3d3]"
              }`}
            >
              <span
                className={`h-[10px] w-[10px] rounded-[3px] ${
                  index === 0 ? "bg-[#f5a524]" : "border border-[#55608a]"
                }`}
              />
              {item}
            </div>
          ))}
        </T>
        <T className="absolute bottom-5 left-5 flex items-center gap-2">
          <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#f5a524] text-[10px] font-bold text-[#161d3a]">
            PS
          </span>
          <span className="text-[11px] text-[#aab3d3]">Priya S.</span>
        </T>
      </B>

      <div className="absolute bottom-0 left-[176px] right-0 top-0 p-6">
        <div className="flex items-start justify-between">
          <T>
            <p className="text-[16px] font-bold">Good morning, Priya</p>
            <p className="mt-0.5 text-[11px] text-[#6a7290]">
              Here&apos;s how bookings are going this month.
            </p>
          </T>
          <B fill="#f5a524" d={80} className="flex h-[30px] w-[88px] items-center justify-center rounded-[6px]">
            <T d={80} className="text-[11px] font-bold">
              + Add trip
            </T>
          </B>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 gap-4">
          {[
            ["Bookings", "128", "+18%"],
            ["Revenue", "₹4.2L", "+12%"],
            ["New reviews", "36", "+9"],
          ].map(([label, value, delta], index) => (
            <B key={label} fill="#ffffff" d={120 + index * 60} className="h-[72px] rounded-[10px] p-3.5">
              <T d={120 + index * 60}>
                <p className="text-[10px] text-[#6a7290]">{label}</p>
                <div className="mt-1 flex items-baseline justify-between">
                  <p className="text-[20px] font-bold tracking-[-0.02em]">{value}</p>
                  <span className="rounded-full bg-[#e3f6ea] px-1.5 py-0.5 text-[9px] font-semibold text-[#1f8a4c]">
                    {delta}
                  </span>
                </div>
              </T>
            </B>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-[1fr_232px] gap-4">
          {/* Chart */}
          <B fill="#ffffff" d={300} className="h-[162px] rounded-[10px] p-3.5">
            <T d={300} className="flex h-full flex-col">
              <p className="text-[11px] font-bold">Bookings by week</p>
              <div className="mt-3 flex flex-1 items-end gap-[7px]">
                {WEEKLY_BOOKINGS.map((value, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-[3px]"
                    style={{
                      height: `${(value / 84) * 100}%`,
                      background:
                        index === WEEKLY_BOOKINGS.length - 1 ? "#f5a524" : "#4a6cc7",
                      opacity: index === WEEKLY_BOOKINGS.length - 1 ? 1 : 0.35 + index * 0.05,
                    }}
                  />
                ))}
              </div>
            </T>
          </B>

          {/* Trips on sale */}
          <B fill="#ffffff" d={360} className="h-[162px] rounded-[10px] p-3.5">
            <T d={360}>
              <p className="text-[11px] font-bold">Trips on sale</p>
              <div className="mt-3 flex flex-col gap-3">
                {[
                  ["Kerala Backwaters", true],
                  ["Rajasthan Forts", true],
                  ["Meghalaya Trails", true],
                  ["Ladakh Road Trip", false],
                ].map(([name, on]) => (
                  <div key={name} className="flex items-center justify-between text-[11px]">
                    <span className={on ? "" : "text-[#9aa1ba]"}>{name}</span>
                    <span
                      className={`relative h-[14px] w-[26px] rounded-full ${
                        on ? "bg-[#1f8a4c]" : "bg-[#d5d9e6]"
                      }`}
                    >
                      <span
                        className={`absolute top-[2px] h-[10px] w-[10px] rounded-full bg-white ${
                          on ? "left-[14px]" : "left-[2px]"
                        }`}
                      />
                    </span>
                  </div>
                ))}
              </div>
            </T>
          </B>
        </div>

        {/* Bookings table */}
        <B fill="#ffffff" d={440} className="mt-4 h-[160px] rounded-[10px] px-3.5 py-3">
          <T d={440}>
            <div className="grid grid-cols-[1.2fr_1.4fr_0.8fr_0.7fr] border-b border-[#eceef5] pb-2 text-[10px] text-[#6a7290]">
              <span>Customer</span>
              <span>Trip</span>
              <span>Date</span>
              <span>Status</span>
            </div>
            {ADMIN_ROWS.map(([name, trip, date, status]) => (
              <div
                key={name}
                className="grid grid-cols-[1.2fr_1.4fr_0.8fr_0.7fr] items-center border-b border-[#f3f4f9] py-[7px] text-[11px] last:border-0"
              >
                <span className="font-semibold">{name}</span>
                <span className="text-[#4c5470]">{trip}</span>
                <span className="text-[#4c5470]">{date}</span>
                <span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                      status === "Paid"
                        ? "bg-[#e3f6ea] text-[#1f8a4c]"
                        : "bg-[#fdf1d8] text-[#a86a00]"
                    }`}
                  >
                    {status}
                  </span>
                </span>
              </div>
            ))}
          </T>
        </B>
      </div>
    </div>
  );
}

function PhoneView() {
  return (
    <div className="absolute inset-0" style={{ fontFamily: "var(--font-hanken)" }}>
      <B fill="#0a0f22" d={500} className="absolute inset-0 rounded-[30px]" />
      <B fill="#fffbf5" d={560} className="absolute inset-[7px] overflow-hidden rounded-[24px]">
        <T d={560} className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold text-[#2b1d14]">
          <span>9:41</span>
          <span className="h-[8px] w-[18px] rounded-[3px] border border-[#2b1d14]" />
        </T>
        <T d={600} className="mt-3 flex items-center justify-between px-4">
          <span className="text-[13px] font-bold text-[#2b1d14]">Saffron Trails</span>
          <span className="h-[22px] w-[22px] rounded-full bg-[#e2572b]" />
        </T>
        <T d={620} className="mx-4 mt-3 rounded-[8px] bg-[#f1e9df] px-3 py-2 text-[10px] text-[#8c7b6d]">
          Where do you want to go?
        </T>
        <B fill="#5fb7b0" d={660} className="relative mx-4 mt-3 h-[132px] overflow-hidden rounded-[12px]">
          <T d={660} className="absolute inset-0">
            <Landscape
              sky="linear-gradient(#ffd29d, #f7a07a)"
              sun="#fff3d6"
              hills={["#3f8f8a", "#1f5f63"]}
              water="#57a9b3"
            />
          </T>
        </B>
        <T d={700} className="mt-3 px-4">
          <p className="text-[12px] font-bold text-[#2b1d14]">Goa Coast Escape</p>
          <div className="mt-0.5 flex justify-between text-[10px] text-[#6b5b4e]">
            <span>3 days</span>
            <span className="font-bold text-[#2b1d14]">₹18,500</span>
          </div>
        </T>
        <B fill="#e2572b" d={740} className="mx-4 mt-3 flex h-[32px] items-center justify-center rounded-[8px]">
          <T d={740} className="text-[11px] font-semibold text-white">
            Book now
          </T>
        </B>
        <T d={780} className="absolute inset-x-0 bottom-0 flex h-[44px] items-center justify-around border-t border-[#efe5da] bg-white">
          {[0, 1, 2, 3].map((index) => (
            <span
              key={index}
              className={`h-[12px] w-[12px] rounded-[4px] ${
                index === 0 ? "bg-[#e2572b]" : "border border-[#c9b9a9]"
              }`}
            />
          ))}
        </T>
      </B>
    </div>
  );
}

// Blueprint measurement marks around the frames.
function Annotations() {
  const tick = "absolute bg-line";
  return (
    <div className="bp-annot pointer-events-none absolute inset-0 text-[12px] text-line">
      {/* Desktop width */}
      <div className="absolute left-0 top-[14px] w-[880px]">
        <div className={`${tick} left-0 top-0 h-[12px] w-px`} />
        <div className={`${tick} right-0 top-0 h-[12px] w-px`} />
        <div className={`${tick} left-0 right-0 top-[6px] h-px`} />
        <span className="absolute left-1/2 top-[-4px] -translate-x-1/2 bg-background px-2 tabular-nums">
          Desktop, 1280 wide
        </span>
      </div>
      {/* Phone height */}
      <div className="absolute left-[966px] top-[250px] h-[390px]">
        <div className={`${tick} left-[-6px] top-0 h-px w-[12px]`} />
        <div className={`${tick} bottom-0 left-[-6px] h-px w-[12px]`} />
        <div className={`${tick} bottom-0 left-0 top-0 w-px`} />
      </div>
      {/* Corner marks on the browser frame */}
      {[
        [0, 36],
        [880, 36],
        [0, 618],
      ].map(([x, y]) => (
        <div key={`${x}-${y}`} className="absolute" style={{ left: x - 10, top: y - 10 }}>
          <div className={`${tick} left-0 top-[10px] h-px w-[20px]`} />
          <div className={`${tick} left-[10px] top-0 h-[20px] w-px`} />
        </div>
      ))}
    </div>
  );
}

export default function BuildStage() {
  const stageRef = useRef(null);
  const viewRef = useRef(null);
  const timersRef = useRef([]);
  const draggingRef = useRef(false);
  const [scale, setScale] = useState(0);
  const [phase, setPhase] = useState("idle"); // idle | drawn | formed
  const [split, setSplit] = useState(100); // % from the left where the admin panel begins
  const [isAuto, setIsAuto] = useState(true); // animate the divider (vs. follow the pointer)
  const [handleVisible, setHandleVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Keeps the fixed-size mock-up scaled to the stage's real width.
  useEffect(() => {
    const element = stageRef.current;
    if (!element) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / CANVAS_W);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // The one-time opening sequence: sketch → finished → divider sweep.
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const at = (ms, fn) => timersRef.current.push(setTimeout(fn, ms));

    if (reduceMotion) {
      at(0, () => {
        setPhase("formed");
        setSplit(RESTING_SPLIT);
        setHandleVisible(true);
      });
    } else {
      at(150, () => setPhase("drawn"));
      at(1250, () => setPhase("formed"));
      at(2500, () => {
        setHandleVisible(true);
        setSplit(30);
      });
      at(3700, () => setSplit(RESTING_SPLIT));
    }

    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const takeOver = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setIsAuto(false);
    setHandleVisible(true);
    setPhase("formed");
  }, []);

  const splitFromPointer = useCallback((clientX) => {
    const rect = viewRef.current.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.min(100, Math.max(0, percent)));
  }, []);

  function handlePointerDown(event) {
    if (event.button !== 0) return;
    takeOver();
    draggingRef.current = true;
    setTilt({ x: 0, y: 0 });
    event.currentTarget.setPointerCapture(event.pointerId);
    splitFromPointer(event.clientX);
  }

  function handlePointerMove(event) {
    if (draggingRef.current) splitFromPointer(event.clientX);
  }

  function handlePointerUp() {
    draggingRef.current = false;
  }

  function handleKeyDown(event) {
    const step = event.shiftKey ? 10 : 4;
    let next = null;
    if (event.key === "ArrowLeft") next = split - step;
    if (event.key === "ArrowRight") next = split + step;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = 100;
    if (next === null) return;
    event.preventDefault();
    takeOver();
    setIsAuto(true); // keyboard steps glide rather than jump
    setSplit(Math.min(100, Math.max(0, next)));
  }

  // A gentle 3D lean towards the mouse — mouse only, and never while
  // dragging or for visitors who prefer reduced motion.
  function handleStageMove(event) {
    if (event.pointerType !== "mouse" || draggingRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -5, y: x * 6 });
  }

  const showsAdmin = split < 50;
  const glide = isAuto ? "1.1s cubic-bezier(0.65, 0, 0.35, 1)" : "0s";

  return (
    <div
      ref={stageRef}
      className="stage relative w-full select-none"
      style={{ aspectRatio: `${CANVAS_W} / ${CANVAS_H}`, perspective: "1800px" }}
      data-drawn={phase !== "idle" ? "" : undefined}
      data-formed={phase === "formed" ? "" : undefined}
      onPointerMove={handleStageMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.8s cubic-bezier(0.2, 0.7, 0.1, 1)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* The scaled mock-up */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: CANVAS_W,
            height: CANVAS_H,
            transform: `scale(${scale})`,
            visibility: scale ? "visible" : "hidden",
          }}
        >
          <Annotations />

          <div className="bp-layer absolute left-0 top-[36px] w-[880px]">
            <div className="overflow-hidden rounded-[14px] bg-card shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
              {/* Browser bar */}
              <div className="relative flex h-[32px] items-center gap-[6px] border-b border-white/5 px-3">
                <span className="h-[9px] w-[9px] rounded-full bg-white/15" />
                <span className="h-[9px] w-[9px] rounded-full bg-white/15" />
                <span className="h-[9px] w-[9px] rounded-full bg-white/15" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[6px] bg-white/6 px-10 py-[3px] text-[11px] text-muted">
                  saffrontrails.com{showsAdmin ? "/admin" : ""}
                </span>
              </div>

              <div className="relative" style={{ width: VIEW.w, height: VIEW.h }}>
                <CustomerView />
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: `inset(0 0 0 ${split}%)`,
                    transition: `clip-path ${glide}`,
                  }}
                >
                  <AdminView />
                </div>
              </div>
            </div>
          </div>

          <div
            className="bp-layer absolute left-[770px] top-[250px] h-[390px] w-[190px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]"
            style={{ borderRadius: 30, transitionDelay: "300ms" }}
          >
            <PhoneView />
          </div>
        </div>

        {/* Unscaled overlay: the draggable divider and its labels */}
        <div
          ref={viewRef}
          className="absolute cursor-ew-resize"
          style={{
            left: `${(VIEW.x / CANVAS_W) * 100}%`,
            top: `${(VIEW.y / CANVAS_H) * 100}%`,
            width: `${(VIEW.w / CANVAS_W) * 100}%`,
            height: `${(VIEW.h / CANVAS_H) * 100}%`,
            touchAction: "pan-y",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div
            className="pointer-events-none absolute inset-y-0 w-0"
            style={{
              left: `${split}%`,
              opacity: handleVisible ? 1 : 0,
              transition: `left ${glide}, opacity 0.5s`,
            }}
          >
            <div className="absolute inset-y-0 -left-px w-[2px] bg-accent shadow-[0_0_24px_rgba(245,165,36,0.6)]" />
            <div
              role="slider"
              tabIndex={0}
              aria-label="Compare the customer website with its admin panel"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(split)}
              aria-valuetext={`${Math.round(split)}% customer website, ${Math.round(100 - split)}% admin panel`}
              onKeyDown={handleKeyDown}
              className="pointer-events-auto absolute left-0 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-background shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] transition-transform hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
              </svg>
            </div>
          </div>

          <span
            className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-background/85 px-2 py-0.5 text-[11px] font-medium sm:px-2.5 sm:py-1 sm:text-[12px] text-foreground backdrop-blur transition-opacity duration-500 sm:bottom-4 sm:left-4"
            style={{ opacity: handleVisible && split > 18 ? 1 : 0 }}
          >
            <span className="sm:hidden">Customer site</span>
            <span className="hidden sm:inline">What customers see</span>
          </span>
          <span
            className="pointer-events-none absolute bottom-3 rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold sm:px-2.5 sm:py-1 sm:text-[12px] text-background transition-opacity duration-500 sm:bottom-4"
            // Sits just left of the phone, which overlaps this corner.
            style={{
              right: `calc(${((VIEW.w - 770) / VIEW.w) * 100}% + 12px)`,
              opacity: handleVisible && split < 70 ? 1 : 0,
            }}
          >
            <span className="sm:hidden">Admin panel</span>
            <span className="hidden sm:inline">What you control</span>
          </span>
        </div>
      </div>
    </div>
  );
}
