import { Grid, Box, Card, Inset, Flex, Text, Skeleton } from "@radix-ui/themes";
import { CldImage } from "next-cloudinary";
import React from "react";

import BookButton from "../BookButton";

const LoadingPropertiesPage = () => {
  const properties = [1, 2, 3, 4, 5];
  return (
    <Grid columns={{ initial: "2", sm: "3", md: "5" }} gap={"3"}>
      {properties.map((property) => (
        <Box maxWidth={"240px"} key={property}>
          {" "}
          <Card size={"2"}>
            <Skeleton>
              <Inset clip={"padding-box"} side={"top"}>
                <CldImage
                  src={property.toString()}
                  alt={property.toString()}
                  width={400}
                  height={300}
                  crop="fill"
                  className="object-cover w-full h-[140px]"
                />
              </Inset>
            </Skeleton>

            <Flex direction={"column"}>
              <Skeleton>
                <Text size="3" weight="bold">
                  {property.toString()}
                </Text>
              </Skeleton>
              <Skeleton>
                <Text>{property}</Text>
                <Text>{property}</Text>
              </Skeleton>
              <Skeleton>
                <Text>
                  {" "}
                  {property} {property}
                </Text>
              </Skeleton>
            </Flex>
            <BookButton />
          </Card>
        </Box>
      ))}
    </Grid>
  );
};

export default LoadingPropertiesPage;
