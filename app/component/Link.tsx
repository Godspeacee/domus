import React from "react";
import { Link as RadiusLink } from "@radix-ui/themes";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface Props {
  href: string;
  children: string[];
}

const Link = ({ href, children }: Props) => {
  const currentPath = usePathname();
  return (
    <RadiusLink
      asChild
      className={classNames({
        "nav-link": true,
        "!text-amber-500": currentPath === href,
      })}
    >
      <NextLink href={href}>{children}</NextLink>
    </RadiusLink>
  );
};

export default Link;
