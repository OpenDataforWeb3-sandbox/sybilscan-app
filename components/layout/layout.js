import { Fragment } from "react";
import { Flex, Text } from "@chakra-ui/react";
import Banner  from "../cards/banner";
import SimpleSidebar from "./side-navigation";
import { useRouter } from 'next/router';



function Layout(props) {

  return (
    <main>
      
      <SimpleSidebar>{props.children}</SimpleSidebar>
    </main>
  );
}

export default Layout;
