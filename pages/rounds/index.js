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
    FormControl, FormLabel, Input, Button, Select
  } from "@chakra-ui/react";
  
  import React, { useState, useRef, useEffect } from "react";
  import { getRoundMapping } from "../../lib/project-utils";
  
  
  export default function WalletsPage(props) {

    const { roundMapping } = props;

    const [inputValue, setInputValue] = useState("");
  
  
    const inputRef = useRef(null);
  
    useEffect(() => {
      inputRef.current.focus();
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      window.location.href = `/rounds/${inputValue}`;
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
                <Select
                  ref={inputRef}
                  id="my-input"
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  borderColor="gray.300"
                  placeholder="Select Round"
                  autoFocus
                >
                {roundMapping.map((option) => (
                <option key={option.round_address} value={option.round_address}>
                    {option.round_name}
                </option>
                ))}
        </Select>
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

    const data = await getRoundMapping();

    return {
        props: {
          roundMapping: data,
        },
        revalidate: 3600,
      };
  }
  