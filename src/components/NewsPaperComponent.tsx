"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewsPapers from "./NewsPapers";
import Title from "./Title";

function NewsPaperComponent() {
  const [category, setCategory] = useState<string>("world");
  return (
    <>
      <div className="flex items-center justify-between flex-wrap gap-1">
        <Title title="📰 News papers" />
        <Select value={category} onValueChange={(val) => setCategory(val)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue className="cursor-pointer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="world" onClick={() => setCategory("world")}>
              🌎 World
            </SelectItem>
            <SelectItem value="sport" onClick={() => setCategory("sport")}>
              ⚽ Sport
            </SelectItem>
            <SelectItem
              value="financial"
              onClick={() => setCategory("financial")}
            >
              💰 Financial
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <NewsPapers category={category} />
    </>
  );
}

export default NewsPaperComponent;
