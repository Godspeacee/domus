"Use client";

import { Select } from "@radix-ui/themes";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  { label: "All" },
  { label: "Apartment", value: "APARTMENT" },
  { label: "Airbnb", value: "AIRBNB" },
];

const PropertyCategoryFilter = () => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const current = params.get("category") || "";
  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(params.toString());

    if (value === "All") newParams.delete("category");
    else newParams.set("category", value);

    router.push(`${pathname}?${newParams.toString()}`);
  };
  return (
    <Select.Root value={current} onValueChange={handleChange}>
      <Select.Trigger placeholder="Category" />
      <Select.Content>
        {categories.map((category) => (
          <Select.Item
            key={category.value ?? "All"}
            value={category.value ?? "All"}
          >
            {category.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default PropertyCategoryFilter;
