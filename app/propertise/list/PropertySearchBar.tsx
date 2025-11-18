import { TextField } from "@radix-ui/themes";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

import { CiSearch } from "react-icons/ci";

const PropertySearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const newParams = new URLSearchParams(params.toString());

    if (!value) newParams.delete("search");
    else newParams.set("search", value);

    router.push(`${pathname}?${newParams.toString()}`);
  };
  return (
    <TextField.Root
      placeholder="Search by title or address…"
      onChange={handleSearch}
      defaultValue={params.get("search") || ""}
    >
      <TextField.Slot>
        <CiSearch />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default PropertySearchBar;
