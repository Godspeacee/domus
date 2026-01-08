"use client";
import React, { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import axios from "axios";
import { useParams } from "next/navigation";
import { DataList, Grid, Box, Flex, Button } from "@radix-ui/themes";
import { Property } from "../list/PropertiesPage";
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
      .get(`/api/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const toggleStatus = async (property: Property) => {
    const newStatus = property.status === "RENTED" ? "AVAILABLE" : "RENTED";

    const res = await axios.patch(`/api/properties/${property.id}/status`, {
      status: newStatus,
    });

    // Update one object, not an array
    setProperty(res.data);
  };

  if (!property) return <p>Loading...</p>;

  return (
    <Box>
      <Grid
        columns={{ initial: "2", sm: "3", md: "5" }}
        gap={"3"}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth p-2"
      >
        {property.images?.map((image) => (
          <div className="relative" key={image.url}>
            {" "}
            <CldImage
              src={image.url}
              alt={image.url || property.title}
              width={300}
              height={300}
              crop="fill"
              className="object-cover w-full h-[140px]"
            />
            {property.status === "RENTED" && (
              <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 text-sm rounded">
                RENTED
              </span>
            )}
          </div>
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

      {role === "AGENT" && session?.user.id === property.agentId && (
        <Button
          onClick={() => toggleStatus(property)}
          className="mt-2 bg-black text-white px-2 py-1 rounded"
        >
          {property.status === "RENTED"
            ? "Mark as Available"
            : "Mark as Rented"}
        </Button>
      )}
    </Box>
  );
};

export default PropertyDetailPage;
