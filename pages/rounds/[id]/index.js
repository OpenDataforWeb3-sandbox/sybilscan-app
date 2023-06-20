import {
    Box,
    Icon,
    Flex,
    SimpleGrid,
    useColorModeValue,
    Progress,
    VStack,
    HStack,
    Center,
    Text,
    Spinner,
  } from "@chakra-ui/react";
  import React, { useState } from "react";
  
  import { MdAttachMoney, MdBuild, MdPersonOutline } from "react-icons/md";
  
  import ProjectTable from "../../../components/tables/project-table";
  import Counter from "../../../components/cards/counter";
  import { getProjectOverviewData } from "../../../lib/project-utils";
  
  export default function ProjectsPage(props) {
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
            />
          </Center>
        </Flex>
      );
    }
  
    const { roundName, counters, projectStats, walletStats, projects } = data;
  
    const brandColor = useColorModeValue("blue", "white");
    const boxBg = useColorModeValue("gray.100", "whiteAlpha.100");
  
    return (
      <Box margin="auto" width="80%">
        <Center boxShadow={"xl"} bg={"white"} p="4" rounded={"md"} mb="20px">
        <Text textTransform={"uppercase"}>
        {roundName} ROUND
        </Text>
        </Center>
  
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="20px" mb="20px">
          <Counter
            key={counters.totalProjects.name}
            startContent={
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"50%"}
                w="56px"
                h="56px"
                bg={boxBg}
              >
                <Icon w="32px" h="32px" as={MdBuild} color={brandColor} />
              </Flex>
            }
            name={counters.totalProjects.name}
            value={counters.totalProjects.count}
          />
  
          <Counter
            key={counters.totalContributed.name}
            startContent={
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"50%"}
                w="56px"
                h="56px"
                bg={boxBg}
              >
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              </Flex>
            }
            name={counters.totalContributed.name}
            value={counters.totalContributed.count}
          />
  
          <Counter
            key={counters.totalContributors.name}
            startContent={
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"50%"}
                w="56px"
                h="56px"
                bg={boxBg}
              >
                <Icon w="32px" h="32px" as={MdPersonOutline} color={brandColor} />
              </Flex>
            }
            name={counters.totalContributors.name}
            value={counters.totalContributors.count}
          />
        </SimpleGrid>
        <Box boxShadow={"xl"} bg={"white"} p="4" rounded={"md"} mb="20px">
          <SimpleGrid columns={2} gap="100px">
            <SimpleGrid>
              <Text mb="20px" textTransform={"uppercase"} textColor="gray.400">
                Project Indicators
              </Text>
              {projectStats.map(function (t) {
                return (
                  <Flex align="center">
                    <Text me="10px" fontSize="sm" width="50%">
                      {t.name}
                    </Text>
                    <Text mr="10px" fontSize="sm" width="20px">
                      {t.value}
                    </Text>
                    <Progress
                      variant="table"
                      colorScheme={t.type == "positive" ? "green" : "red"}
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
            <SimpleGrid>
              <Text mb="20px" textTransform={"uppercase"} textColor="gray.400">
                Contributor Indicators
              </Text>
              {walletStats.map(function (t) {
                return (
                  <Flex align="center">
                    <Text me="10px" fontSize="sm" width="50%">
                      {t.name}
                    </Text>
                    <Text mr="10px" fontSize="sm" width="40px">
                      {t.value}
                    </Text>
                    <Progress
                      variant="table"
                      colorScheme={t.type == "positive" ? "green" : "red"}
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
          </SimpleGrid>
        </Box>
        <ProjectTable tableData={projects} />
      </Box>
    );
  }
  
  export async function getStaticProps(context) {
    const { id } = context.params;
  
    try {
      const data = await getProjectOverviewData(id);
  
      return {
        props: {
          data: data,
        },
        revalidate: 3600,
      };
    } catch (err) {
      console.log(err);
      return {
        notFound: true,
      };
    }
  }
  
  
  export function getStaticPaths() {
    const paths = [];
    return { paths, fallback: true };
  }
  