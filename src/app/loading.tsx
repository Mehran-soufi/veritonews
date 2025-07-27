import Image from "next/image";
import React from "react";

function loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-26 h-26 relative flex items-center justify-center">
        <Image src="/loading/loading.gif" fill alt="loading" />
        <span className="font-semibold opacity-60 z-10 text-sm">
          loading...
        </span>
      </div>
    </div>
  );
}

export default loading;
