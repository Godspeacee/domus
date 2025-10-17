"use client";

import Link from "./component/Link";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import {
  Avatar,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

import { error } from "console";

const NavBar = () => {
  return (
    <nav className=" border-b mb-5 px-5 py-3 ">
      <Flex justify={"between"}>
        <Flex align={"center"} gap={"3"}>
          {" "}
          <Link href={"/"}> Logo</Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { label: "Properties", href: "/propertise/list", key: "propertise" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.key}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session, update } = useSession();
  const role = session?.user?.role;
  if (status === "loading") return null;

  if (status === "unauthenticated")
    return <Link href={"/api/auth/signin"}>Login</Link>;

  return (
    <Box>
      {status === "authenticated" && (
        <Flex align={"center"} gap={"3"}>
          {role === "CUSTOMER" && (
            <Button
              variant="ghost"
              onClick={async () => {
                axios.post("/api/become-agent");

                await update();
              }}
            >
              Become Agent
            </Button>
          )}
          {role === "AGENT" && (
            <Link href="/propertise/new">Post Property</Link>
          )}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar
                src={session.user?.image!}
                fallback="?"
                size={"2"}
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>
                <Text size={"2"}>{session.user?.email}</Text>
              </DropdownMenu.Label>
              <DropdownMenu.Item onClick={() => signOut()} color="yellow">
                Sign out
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      )}
    </Box>
  );
};

export default NavBar;
