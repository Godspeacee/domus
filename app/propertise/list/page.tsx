"use client";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { Card, Box, Inset, Text, Flex, Grid } from "@radix-ui/themes";
import axios from "axios";
import BookButton from "../BookButton";
import Link from "@/app/component/Link";

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
  createdAt: string;
}

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  useEffect(() => {
    axios.get("/api/propertise").then((res) => setProperties(res.data));
  }, []);

  return (
    <Grid columns={{ initial: "2", sm: "3", md: "5" }} gap={"3"}>
      {properties.map((property) => (
        <Box maxWidth={"240px"} key={property.id}>
          {" "}
          <Card size={"2"}>
            <Inset clip={"padding-box"} side={"top"}>
              <CldImage
                src={property.images[0]?.url}
                alt={property.title}
                width={400}
                height={300}
                crop="fill"
                className="object-cover w-full h-[140px]"
              />
            </Inset>

            <Flex direction={"column"}>
              <Text size="3" weight="bold">
                <Link href={`/propertise/${property.id}`}>
                  {" "}
                  {property.title}
                </Link>
              </Text>
              <Text>{property.state}</Text>
              <Text>{property.category}</Text>
              <Text>
                {" "}
                {property.currency} {property.price}
              </Text>
            </Flex>
            <BookButton />
          </Card>
        </Box>
      ))}
    </Grid>
  );
};

export default PropertiesPage;
