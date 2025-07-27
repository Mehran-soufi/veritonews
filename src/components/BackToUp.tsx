"use client";
import React from "react";
import { Button } from "./ui/button";

function BackToUp() {
  return (
    <Button
      variant="outline"
      size="sm"
      className="border border-accent outline-none shadow-none rounde-lg"
      onClick={() => window.scrollTo({ top: 0 })}
    >
      Back to up
    </Button>
  );
}

export default BackToUp;
