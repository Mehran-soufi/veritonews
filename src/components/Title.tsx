import React from "react";

function Title({ title }: { title: string }) {
  return <h2 className="text-lg font-semibold text-ring border-b border-ring">{title}:</h2>;
}

export default Title;
