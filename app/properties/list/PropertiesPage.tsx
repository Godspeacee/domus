"use client";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { Card, Box, Inset, Text, Flex, Grid } from "@radix-ui/themes";
import axios from "axios";
import BookButton from "../BookButton";
import Link from "@/app/component/Link";
import PropertyToolBar from "./PropertyToolBar";
import { useSearchParams } from "next/navigation";

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  state: string;
  category: string;
  images: { url: string }[];
  area: string;
  address: string;
  createdAt: Date;
  status: string;
  agentId: string;
}

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const searchParams = useSearchParams();
  const current = searchParams.get("state") || "";

  useEffect(() => {
    const params = searchParams.toString();
    axios
      .get(`/api/properties?${params}`)
      .then((res) => setProperties(res.data));
  }, [searchParams]);

  const filtered = properties.filter((p) =>
    current ? p.state.toLowerCase() === current.toLowerCase() : true,
  );

  if (filtered.length === 0) {
    return (
      <>
        <PropertyToolBar />
        <Text size="4">No property from this state yet</Text>
      </>
    );
  }

  return (
    <>
      <PropertyToolBar />
      <div>
        <Grid
          columns={{ initial: "1", sm: "3", md: "5" }}
          className="justify-items-center"
          gap={"3"}
        >
          {properties.map((property) => (
            <Box maxWidth={"240px"} key={property.id} className="shadow-xl">
              <Card size={"2"}>
                <Inset clip={"padding-box"} side={"top"}>
                  <CldImage
                    src={property.images[0]?.url}
                    alt={property.title}
                    width={240}
                    height={140}
                    crop="fill"
                    className="object-cover w-full h-[140px]"
                  />
                </Inset>

                <Flex direction={"column"}>
                  <Text size="3" weight="bold">
                    <Link href={`/properties/${property.id}`}>
                      {property.title}
                    </Link>
                  </Text>
                  <Text>{property.state}</Text>
                  <Text>{property.category}</Text>
                  <Text>
                    {property.currency} {property.price}
                  </Text>
                </Flex>
                <BookButton property={property} />
              </Card>
            </Box>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default PropertiesPage;
