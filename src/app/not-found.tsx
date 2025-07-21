"use client";
import { Button } from "@/components/ui/button";
import { House } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function notFound() {
  const navigate = useRouter();
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4">
      <h2 className="font-bold lg:text-9xl md:text-8xl text-5xl text-destructive">
        404
      </h2>
      <p className="text-ring lg:text-xl md:text-lg text-base">
        Page not found
      </p>
      <Button
        variant="outline"
        className="p-4 bg-chart-4"
        onClick={() => navigate.push("/")}
      >
        <House /> back home
      </Button>
    </div>
  );
}

export default notFound;
