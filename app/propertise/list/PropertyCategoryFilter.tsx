"Use client";
import { PropertyCategory } from "@/app/generated/prisma";
import { Select } from "@radix-ui/themes";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories: { label: string; value?: PropertyCategory }[] = [
  { label: "All" },
  { label: "Apartment", value: "APARTMENT" },
  { label: "Airbnb", value: "AIRBNB" },
];

const PropertyCategoryFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentStatus = searchParams.get("category") || "ALL";
  return (
    <Select.Root
      defaultValue={currentStatus}
      onValueChange={(value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value === "ALL") {
          params.delete("category");
        } else {
          params.set("category", value);
        }
        params.set("page", "1");
        router.push(`${pathname}?${params.toString()}`);
      }}
    >
      <Select.Trigger placeholder={currentStatus} />
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
