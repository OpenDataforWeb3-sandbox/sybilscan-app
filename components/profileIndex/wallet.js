import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Badge,
  useColorModeValue,
  Link
} from "@chakra-ui/react";

export default function WalletProfile(props) {
  const { walletData } = props;

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
            src="https://i.ibb.co/XWp3jnH/Screen-Shot-2023-01-31-at-10-15-54-pm.png"
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"lg"} fontWeight={500} fontFamily={"body"}>
              <Link
                fontSize="sm"
                fontWeight="700"
                href={`https://etherscan.io/address/${walletData.wallet}`}
                target="_blank"
                textDecorationLine={"underline"}
                textColor="blue.600"
              >
                {walletData.wallet.slice(0, 6) +
                  ".." +
                  walletData.wallet.slice(-3)}
              </Link>
            </Heading>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{walletData.projects_contributed}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                projects
              </Text>
            </Stack>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{walletData.amount}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Donated
              </Text>
            </Stack>
          </Stack>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            {walletData.tags.map((t) => {
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
