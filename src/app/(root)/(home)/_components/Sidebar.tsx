"use client";
import React from "react";
import { sidebarLinks } from "@/app/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <section className="sticky left-0  top-0 flex flex-col h-screen w-fit justify-between bg-dark-1 p-6 pt-28  text-white max-sm:hidden lg:w-[264px] ">
      <div className="flex flex-1  flex-col gap-16 ">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route && pathname.startsWith(link.route);
          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                `flex  items-center gap-4 rounded-lg justify-start`,
                {
                  "bg-blue-1 , p-4": isActive,
                },
              )}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
