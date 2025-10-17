import { Grid, Box, Card, Inset, Flex, Text } from "@radix-ui/themes";
import { CldImage } from "next-cloudinary";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import BookButton from "../BookButton";

const LoadingPropertiesPage = () => {
  const properties = [1, 2, 3, 4, 5];
  return (
    <Grid columns={{ initial: "2", sm: "3", md: "5" }} gap={"3"}>
      {properties.map((property) => (
        <Box maxWidth={"240px"} key={property}>
          {" "}
          <Card size={"2"}>
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

            <Flex direction={"column"}>
              <Text size="3" weight="bold">
                <Skeleton />
              </Text>
              <Text>
                <Skeleton />
              </Text>
              <Text>
                <Skeleton />
              </Text>
              <Text>
                {" "}
                <Skeleton /> <Skeleton />
              </Text>
            </Flex>
            <BookButton />
          </Card>
        </Box>
      ))}
    </Grid>
  );
};

export default LoadingPropertiesPage;
