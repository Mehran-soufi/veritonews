"use client";
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

function Header() {
  const { setTheme } = useTheme();
  return (
    <header className="flex flex-col gap-2 py-4">
      <nav className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link className="relative w-20 sm:w-24 lg:w-28" href="/">
            <Image
              src="https://ik.imagekit.io/h9lpdqryj/verito/logo/logo.png?updatedAt=1752837828426&tr=w-1300%2Ch-400%2Cfo-custom%2Ccm-extract"
              alt="verito news logo"
              width={100}
              height={100}
            />
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
                className="outline-0 border-none shadow-none "
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
            className="bg-transparent outline-0 border-none shadow-none "
          >
            <Search />
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
