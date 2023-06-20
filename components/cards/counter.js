// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
  Box,
  Card,
} from "@chakra-ui/react";
// Custom components

import React from "react";
import dynamic from "next/dist/shared/lib/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function Counter(props) {
  const { startContent, name, value } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  return (
    <Box boxShadow={"xl"} bg={"white"} p="4" rounded={"md"}>
      <Flex
        align={{ base: "center", xl: "center" }}
        justify={{ base: "center", xl: "center" }}
        mb="2"
      >
        {startContent}

        <Stat my="auto" ms={startContent ? "18px" : "0px"}>
          <StatLabel
            lineHeight="100%"
            color={textColorSecondary}
            fontSize={{
              base: "sm",
            }}
          >
            {name}
          </StatLabel>
          <StatNumber
            color={textColor}
            fontSize={{
              base: "2xl",
            }}
          >
            {value}
          </StatNumber>
        </Stat>
      </Flex>
    </Box>
  );
}

export default Counter;
