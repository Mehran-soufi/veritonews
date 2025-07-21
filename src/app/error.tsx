"use client";

import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";

export default function Error() {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center gap-4">
      <h2 className="font-bold lg:text-8xl md:text-7xl text-4xl text-destructive">ERROR!</h2>
      <p className="text-ring lg:text-xl md:text-lg text-base">There seems to be a problem.</p>
      <Button variant="outline" className="p-4 bg-chart-4" onClick={() => window.location.reload()}>
        <RotateCw />
        try again
      </Button>
    </div>
  );
}
