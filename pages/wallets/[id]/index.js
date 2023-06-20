import {
  Box,
  Select,
  SimpleGrid,
  Text,
  Flex,
  Progress,
  Spinner,
  Center
} from "@chakra-ui/react";

import React, { useState } from "react";

import WalletProfile from "../../../components/profileIndex/wallet";
import { getWalletData } from "../../../lib/wallet-utils";
import ProjectTableInWalletPage from "../../../components/tables/project-table-wallet-view";

const walletData = {
  wallet: "0x12213",
  amount: 124,
  projects_contributed: 2,
  tags: ["farmer", "murmer", "girmur"],
};

const projectsContributed = [
  {
    id: "test",
    title: "jilla",
    amount: 420,
  },
  {
    id: "test2",
    title: "jilla2",
    amount: 421,
  },
];

export default function WalletIndex(props) {
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

  const { contributionsData, walletData } = data;

  return (
    <Box margin="auto" width="80%">
      <WalletProfile walletData={walletData} />

      <ProjectTableInWalletPage tableData={contributionsData} />
    </Box>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;

  try {
    const data = await getWalletData(id);

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
