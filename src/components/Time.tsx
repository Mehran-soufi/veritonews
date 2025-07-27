"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

function Time() {
  const [dateTime, setDateTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-11/12 lg:w-10/12 flex items-center justify-center sm:justify-between  py-2">
      {/* Icon */}
      <div className="hidden sm:inline-flex">
        <ul className="flex items-center gap-4">
          <li className="cursor-pointer">
            <Image
              src="/svg/instagram.svg"
              alt="instagram"
              width={20}
              height={20}
            />
          </li>
          <li className="cursor-pointer">
            {" "}
            <Image
              src="/svg/pinterest.svg"
              alt="instagram"
              width={20}
              height={20}
            />
          </li>
          <li className="cursor-pointer">
            {" "}
            <Image src="/svg/x.svg" alt="instagram" width={20} height={20} />
          </li>
          <li className="cursor-pointer">
            {" "}
            <Image
              src="/svg/youtube.svg"
              alt="instagram"
              width={20}
              height={20}
            />
          </li>
        </ul>
      </div>
      {/* Date & Time */}
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold">{dateTime}</p>
      </div>
    </div>
  );
}

export default Time;
