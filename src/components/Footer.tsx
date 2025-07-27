import Image from "next/image";
import Link from "next/link";
import React from "react";
import BackToUp from "./BackToUp";
import { Copyright, Headset } from "lucide-react";

function Footer() {
  return (
    <footer className="w-full mx-auto flex items-center flex-col pb-4 bg-background">
      <div className="w-11/12 lg:w-10/12 flex items-center flex-col gap-4 border-t border-accent py-2">
        {/* Footer top */}
        <div className="w-full flex items-center justify-between flex-wrap">
          {/* Logo */}
         <div className="flex items-center relative w-20 h-6 sm:w-24 sm:h-7 lg:w-28 lg:h-8">
            <Link className="w-full h-full" href="/">
              <Image src="/general/logo.webp" alt="verito news logo" fill />
            </Link>
          </div>
          {/* Back to up button */}
          <div className="flex items-center justify-center">
            <BackToUp />
          </div>
        </div>
        {/* Contact */}
        <div className="w-full rounded-md bg-accent py-3 px-2 flex items-center justify-between">
          <p className="flex items-center gap-2 font-semibold">
            <Headset size={20} className="text-chart-4" />
            Contact us
          </p>
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
        {/* Other links */}
        <div className="w-full flex justify-start">
          <ul className="flex items-center gap-3 text-sm cursor-pointer flex-wrap">
            <li className="hover:underline  opacity-70 hover:opacity-100 flex items-center gap-1 border-r border-ring px-2">
              Terms of Use
            </li>
            <li className="hover:underline  opacity-70 hover:opacity-100 flex items-center gap-1 border-r border-ring px-2">
              About the Veritonews
            </li>
            <li className="hover:underline  opacity-70 hover:opacity-100 flex items-center gap-1 border-r border-ring px-2">
              Privacy Policy
            </li>
            <li className="hover:underline  opacity-70 hover:opacity-100 flex items-center gap-1 border-r border-ring px-2">
              Accessibility Help
            </li>
            <li className="hover:underline  opacity-70 hover:opacity-100">
              Advertise with us
            </li>
          </ul>
        </div>
        {/* copyright */}
        <div className="w-full flex items-center justify-center gap-1 border-t pt-4">
          <p>All rights reserved.</p>
          <Copyright size={16} className="text-chart-4" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
