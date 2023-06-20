// Chakra imports
import {
    Box,
    Flex,
    Text,
    useColorModeValue,
  } from "@chakra-ui/react";
  
  
  import dynamic from 'next/dist/shared/lib/dynamic'
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
  
  export default function ApexChart(props) {
  
    const { chartTitle, chartData, chartOptions, chartType, ...rest } = props;
  
    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
  
    return (
      <>
        <Box
          p="20px"
          bg={"white"}
          boxShadow={"xl"}
          rounded={"md"}
          height="400px"
        >
          <Flex
            px={{ base: "0px", "2xl": "10px" }}
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            mb="8px"
          >
            <Text color={textColor} fontSize="md" fontWeight="600" mt="4px">
              {chartTitle}
            </Text>
          </Flex>
          <Chart
              options={chartOptions}
              series={chartData}
              type={chartType}
              height="100%"
          />
        </Box>
      </>
    );
  }
  