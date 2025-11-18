import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import React from "react";
import PropertyCategoryFilter from "./PropertyCategoryFilter";
import PropertyStateFilter from "./PropertyStateFilter";
import PropertySearchBar from "./PropertySearchBar";

const PropertyToolBar = () => {
  return (
    <Flex mb="5" justify={"between"}>
      <Flex gap={"3"}>
        <PropertyCategoryFilter />
        <PropertyStateFilter />
      </Flex>
      <Box>
        <PropertySearchBar />
      </Box>
    </Flex>
  );
};

export default PropertyToolBar;
