"use client";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import axios from "axios";
import { useParams } from "next/navigation";
import { DataList, Grid, Box, Flex } from "@radix-ui/themes";
import { Property } from "../list/page";
import DeleteProprtyButton from "./DeletePropertyButton";
import { useSession } from "next-auth/react";

const PropertyDetailPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const { data: session } = useSession();
  const role = session?.user.role;
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/propertise/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!property) return <p>Loading...</p>;

  return (
    <Box>
      <Grid
        columns={{ initial: "2", sm: "3", md: "5" }}
        gap={"3"}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth p-2"
      >
        {property.images.map((image) => (
          <CldImage
            src={image.url}
            alt={image.url || property.title}
            width={300}
            height={300}
            crop="fill"
            className="object-cover w-full h-[140px]"
          />
        ))}
      </Grid>
      <Flex direction={"row"}>
        <DataList.Root>
          <DataList.Item>
            <DataList.Label minWidth="88px">Title</DataList.Label>
            <DataList.Value>{property.title}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Description</DataList.Label>
            <DataList.Value>{property.description}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Category</DataList.Label>
            <DataList.Value>{property.category}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">State</DataList.Label>
            <DataList.Value>{property.state}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Area</DataList.Label>
            <DataList.Value>{property.area}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Address</DataList.Label>
            <DataList.Value>{property.address}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Currency</DataList.Label>
            <DataList.Value>{property.currency}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Price</DataList.Label>
            <DataList.Value> {property.price}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Created at</DataList.Label>
            <DataList.Value>
              {new Date(property.createdAt).toDateString()}
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        {role === "ADMIN" && <DeleteProprtyButton propertyId={property.id} />}
      </Flex>
    </Box>
  );
};

export default PropertyDetailPage;
