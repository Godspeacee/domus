"use client";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { Card, Box, Inset, Text, Flex, Grid } from "@radix-ui/themes";
import axios from "axios";

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  state: string;
  category: string;
  images: { url: string }[];
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
                {property.title}
              </Text>
              <Text>{property.state}</Text>
              <Text>{property.category}</Text>
              <Text>
                {" "}
                {property.currency} {property.price}
              </Text>
            </Flex>
          </Card>
        </Box>
      ))}
    </Grid>
  );
};

export default PropertiesPage;
