import { useState } from "react";
import Image from "next/image";

export default function VeritoImage({ image }: { image?: string }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <div
        className={hasError ? "w-1/2 h-1/2 relative" : "w-full h-full relative"}
      >
        <Image
          src={hasError ? "/general/icon.png" : image || "/general/icon.png"}
          alt="verito news"
          loading="lazy"
          fill
          unoptimized
          onError={() => setHasError(true)}
          className={hasError ? "opacity-40 grayscale" : "object-cover"}
        />
      </div>
      {hasError && (
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-lg text-destructive opacity-100">
          No Image!
        </p>
      )}
    </div>
  );
}
