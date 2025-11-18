"use client";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select } from "@radix-ui/themes";

const states = [
  { label: "All" },
  { label: "Lagos", value: "Lagos" },
  { label: "Abuja", value: "Abuja" },
  { label: "Port Harcourt", value: "Port Harcourt" },
];

const PropertyStateFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathName = usePathname();

  const current = params.get("state") || "";
  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(params.toString());
    if (value === "All") newParams.delete("state");
    else newParams.set("state", value);
    router.push(`${pathName}?${newParams.toString()}`);
  };

  return (
    <Select.Root value={current} onValueChange={handleChange}>
      <Select.Trigger placeholder="State" />
      <Select.Content>
        {states.map((state) => (
          <Select.Item key={state.value ?? "All"} value={state.value ?? "All"}>
            {state.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default PropertyStateFilter;
