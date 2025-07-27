"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchComponent from "@/components/Search";

function Header() {
  const { setTheme } = useTheme();
  const [searchSelect, setSearchSelect] = useState<boolean>(false);
  return (
    <>
      <header className="w-full mx-auto flex items-center flex-col gap-2 py-4 bg-background">
        <nav className="w-11/12 lg:w-10/12 flex items-center justify-between border-b border-accent">
          {/* Logo */}
          <div className="flex items-center relative w-20 h-6 sm:w-24 sm:h-7 lg:w-28 lg:h-8">
            <Link className="w-full h-full" href="/">
              <Image src="/general/logo.webp" alt="verito news logo" fill />
            </Link>
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-1">
            {/* Toggle mod */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="p-4 bg-transparent border-none outline-none hover:bg-transparent shadow-none"
                >
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="cursor-pointer"
                >
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="cursor-pointer"
                >
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="cursor-pointer"
                >
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Search */}
            <Button
              variant="outline"
              onClick={() => setSearchSelect(true)}
              className="p-4 bg-transparent border-none outline-none hover:bg-transparent shadow-none"
            >
              <Search />
            </Button>
          </div>
        </nav>
      </header>
      {searchSelect && (
        <SearchComponent
          searchSelect={searchSelect}
          setSearchSelect={setSearchSelect}
        />
      )}
    </>
  );
}

export default Header;
