import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

export default function ProjectProfile(props) {
  const { projectData } = props;

  return (
    <Center py={6}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              "https://images.unsplash.com/photo-1585314062604-1a357de8b000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
            }
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"lg"} fontWeight={500} fontFamily={"body"}>
              {projectData.title}
            </Heading>
            <Text color={"gray.500"} fontSize={"sm"}>
              {projectData.wallet.slice(0,6) + ".." + projectData.wallet.slice(-3)}
            </Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{projectData.contributors}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Contributors
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{projectData.amount}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Donated
              </Text>
            </Stack>
          </Stack>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            {projectData.tags.map((t) => {
              return (
                <Badge
                  px={2}
                  py={1}
                  bg={useColorModeValue(t.includes("✅") ? t.includes("OnChain") ? "green.50" : "red.50" : t.includes("OnChain") ? "red.50": "green.50","gray.500")}
                  fontWeight={"400"}
                >
                  {t}
                </Badge>
              );
            })}
          </Stack>
        </Box>
      </Box>
    </Center>
  );
}
