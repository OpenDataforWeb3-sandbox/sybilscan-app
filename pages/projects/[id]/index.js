import { Box, Select, SimpleGrid, Text, Flex, Progress, Center, Spinner } from "@chakra-ui/react";

import React, { useState } from "react";

import WalletTable from "../../../components/tables/wallet-table";
import ProjectProfile from "../../../components/profileIndex/project";
import { getProjectData } from "../../../lib/project-utils";


export default function ProjectIndex(props) {
  const { data } = props;

  if (!data) {
    return (
        <Flex
        width={"80vw"}
        height={"80vh"}
        alignContent={"center"}
        justifyContent={"center"}
         >
        <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mr="10px"
        />
        <Text>It's not just a loading bar, it's a journey.</Text>
      </Center>
      </Flex>
    );
  }

  const { projectData, walletStatsData, walletData } = data;

  return (
    <Box margin="auto" width="80%">
      <ProjectProfile projectData={projectData} />

      <Box boxShadow={"xl"} bg={"white"} p="4" rounded={"md"} mb="20px">
      <SimpleGrid width="40%" margin="auto">
        <Text mb="20px" textTransform={"uppercase"} textColor="gray.400">Wallet Indicators</Text>
        {walletStatsData.map(function (t) {
          return (
            <Flex align="center">
              <Text me="10px" fontSize="sm" width="50%">
              {t.name}
              </Text>
              <Text mr="10px" fontSize="sm"  width="40px">
                {t.value}
              </Text>
              <Progress
                variant="table"
                colorScheme={t.type=="positive" ? "green" : "red"}
                h="8px"
                w="50%"
                max={t.max}
                value={t.value}
                backgroundColor="gray.100"
              />

            </Flex>
          );
        })}
        </SimpleGrid>
        </Box>

      <WalletTable tableData={walletData} />



    </Box>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;

  try {
    const data = await getProjectData(id);

    return {
      props: {
        data: data,
      },
      revalidate: 3600,
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}


export function getStaticPaths() {
  const paths = [];
  return { paths, fallback: true };
}