"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";
import { Fragment } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname(); // next/navigation hook to get path
  const paths = pathname.split("/").filter(Boolean); // filter empty segments

  const breadcrumbs = paths.map((path, index) => {
    const href = "/" + paths.slice(0, index + 1).join("/");
    return {
      label: index === 0 ? "home" : path.replace(/-/g, " "),
      href,
    };
  });

  // Add root "home" explicitly at the start if not empty
  if (pathname !== "/") {
    breadcrumbs.unshift({ label: "home", href: "/" });
  }

  return (
    <nav aria-label="breadcrumb" className="w-full gap-2 flex-wrap items-center hidden md:flex">
      <ol className="w-full flex gap-2 flex-wrap items-center overflow-x-scroll container-snap">
        {breadcrumbs.map((link, index) => (
          <Fragment key={link.href}>
            <li className="text-sm">
              <Link
                title={`${link.label} link`}
                href={link.href}
                className="text-neutral-400 hover:text-neutral-500"
              >
                {link.label}
              </Link>
            </li>
            {index < breadcrumbs.length - 1 && (
              <ChevronRightIcon className="max-w-4 max-h-4 font-semibold fill-neutral-400" />
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
