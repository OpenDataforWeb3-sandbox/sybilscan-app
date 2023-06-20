import React, { useState, useEffect } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Collapse,
  List
} from "@chakra-ui/react";

import Banner from "../cards/banner";

import { useRouter } from 'next/router';

const LinkItems = [
  {
    name: "Rounds",
    to : "/rounds"
  },
  {
    name: "Projects",
    to : "/projects"
  },
  {
    name: "Wallets",
    to : "/wallets"
  }
];

export default function SimpleSidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")} width="100%">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Banner />
      <Box ml={{ base: 0, md: 60 }} pt='50px'>
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          GrantLooker
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} to={link.to} items={link.items} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, to, items, children, ...rest }) => {
  const [open, setOpen] = useState(false);

  const { asPath } = useRouter();

  useEffect(() => {
    if (items) {
        const subMenu = items.map((item) => {
            return item.to == asPath
        });
        
        if (subMenu.some(Boolean)) {
             setOpen(true);
        }
    }

  }, []);


  return (
    <>
    <Link
      href={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      onClick={() => setOpen(!open)}
    >
      <Flex
        align="center"
        px="4"
        py="1"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "blue.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
    <List hidden={!open}>
    {items && items.map((item) => (
      <Flex key={item.name} mx="8">
        <NavItem key={item.name} to={item.to}>
          {item.name}
        </NavItem>
      </Flex>
      ))}
     </List>
  </>
  );
};



 

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
    
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        GrantLooker
      </Text>
    </Flex>
  );
};
