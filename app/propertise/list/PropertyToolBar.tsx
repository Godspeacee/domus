import { Box, Flex, Text } from "@radix-ui/themes";
import React from "react";
import PropertyCategoryFilter from "./PropertyCategoryFilter";

const PropertyToolBar = () => {
  return (
    <Flex mb="5" justify={"between"}>
      <Flex gap={"3"}>
        {" "}
        <Text> Category</Text>
        <PropertyCategoryFilter />{" "}
      </Flex>
      <Box>
        <search>SearchBar</search>
      </Box>
    </Flex>
  );
};

export default PropertyToolBar;
