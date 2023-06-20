import {
  Center,
  Container,
  Box,
  Icon,
  Flex,
  SimpleGrid,
  useColorModeValue,
  Progress,
  Text,
  FormControl, FormLabel, Input, Button
} from "@chakra-ui/react";

import React, { useState, useRef, useEffect } from "react";


export default function WalletsPage(props) {
  const [inputValue, setInputValue] = useState("");


  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/wallets/${inputValue}`;
  };

  return (
    <Flex
      width={"80vw"}
      height={"80vh"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <Center>
        <Box width="500px">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <Input
                ref={inputRef}
                id="my-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                borderColor="gray.300"
                placeholder="Enter Wallet Address..."
                autoFocus
              />
            </FormControl>
            <Button colorScheme='blue' mt={4} type="submit">
              Submit
            </Button>
          </form>
        </Box>
      </Center>
    </Flex>
  );
}

export async function getStaticProps() {
  return {
    props: {
      data: {},
    },
  };
}
