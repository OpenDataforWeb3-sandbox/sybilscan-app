/* eslint-disable */
import {
  Flex,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Badge,
  Link,
  Wrap,
  WrapItem,
  IconButton,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Box,
  Input,
  VStack
} from "@chakra-ui/react";

import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@chakra-ui/icons";

import { Select as ReactSelect } from "chakra-react-select";

import React, { useEffect, useMemo, useState } from "react";
import {
  useFilters,
  usePagination,
  useSortBy,
  useTable,
  useBlockLayout,
  useFlexLayout
} from "react-table";


const customTagFilterFunction = (rows, id, filterValue) => {
  const filteredValues = [...new Set(filterValue.map((f) => f.value))];
  //return rows.filter((row) => filteredValues.includes(row.original.tags) || filteredValues.length==0)
  return rows.filter(
    (row) =>
      filteredValues.filter((x) => row.original.tags.includes(x)).length ==
        filteredValues.length || filteredValues.length == 0
  );
};

const customTitleFilterFunction = (rows, id, filterValue) => {
  const filteredValues = [...new Set(filterValue.map((f) => f.value))];
  
  return rows.filter((row) => filteredValues.includes(row.original.title) || filteredValues.length==0)

};

const columnsData = [
  {
    Header: "TITLE",
    accessor: "title",
    Cell: ({ row }) => (
      <Link
        color={useColorModeValue("secondaryGray.900", "white")}
        fontSize="sm"
        fontWeight="700"
        href={`/projects/${row.original.projectID}`}
        textDecorationLine={"underline"}
        textColor="blue.600"
      >
        {row.original.title}
      </Link>
    ),
    filter: customTitleFilterFunction,
  },
  {
    Header: "LEGOS",
    accessor: "tags",
    filter: customTagFilterFunction,
    minWidth:225
  },
  {
    Header: "RISK SCORE",
    accessor: "riskScore",
  },
  {
    Header: "AMOUNT",
    accessor: "amount",
    sortType: compareNumericString
  },
  {
    Header: "CONTRIBUTORS",
    accessor: "contributors",
  }
];


function compareNumericString(rowA, rowB, id, desc) {
  let a = Number(rowA.original[id].replace(/[^0-9.-]+/g,""))
  let b = Number(rowB.original[id].replace(/[^0-9.-]+/g,""))
  if (Number.isNaN(a)) {  // Blanks and non-numeric strings to bottom
      a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }
  if (Number.isNaN(b)) {
      b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  }
  if (a > b) return 1; 
  if (a < b) return -1;
  return 0;
}

export default function ProjectTable(props) {
  const { tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useSortBy,
    usePagination,
    useFlexLayout
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setFilter,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) return;
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) return <></>;

  return (
    <Flex
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"xl"}
      rounded={"md"}
      pt="20px"
      align="center"
    >
      <Flex
        flexDirection="column"
        w="100%"
        px="0px"
        overflowX={{ sm: "scroll", lg: "scroll" }}
      >
        <VStack px="25px" justify="space-between" mb="20px" align={"left"}>
         
             <ReactSelect
              isMulti
              onChange={(e) => {
                setFilter("title", e);
              }}
              name="colors"
              classNamePrefix="chakra-react-select"
              options={data.map(
                (o, i) => {
                  return { id: i, value: o.title, label: o.title };
                }
              )}
              placeholder="Select Projects..."
              closeMenuOnSelect={false}
              size="sm"
              
            />

            <ReactSelect
              isMulti
              onChange={(e) => {
                setFilter("tags", e);
              }}
              name="colors"
              classNamePrefix="chakra-react-select"
              options={[...new Set(data.map((d) => d.tags).flat())].map(
                (o, i) => {
                  return { id: i, value: o, label: o };
                }
              )}
              placeholder="Select Project Legos..."
              closeMenuOnSelect={false}
              size="sm"
            />
          
        </VStack>
        <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
          <Thead>
            {headerGroups.map((headerGroup, index) => (
              <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <Th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    pe="10px"
                    key={index}
                    borderColor={borderColor}
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      fontSize={{ sm: "10px", lg: "12px" }}
                      color="gray.400"
                    >
                      {column.render("Header")}
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data;
                    if (cell.column.Header === "TITLE") {
                      return (
                        <Td
                          {...cell.getCellProps()}
                          key={index}
                          fontSize={{ sm: "14px" }}
                          minW={{ sm: "150px", md: "200px", lg: "auto" }}
                          borderColor="transparent"
                        >
                          {cell.render("Cell")}
                        </Td>
                      );
                    } else if (cell.column.Header === "LEGOS") {
                      data = (
                        <Wrap align="center">
                          {cell.value.map((item, key) => {
                            return (
                              <WrapItem>
                                <Badge
                                  px={2}
                                  py={1}
                                  mr={1}
                                  bg={useColorModeValue(item.includes("✅") ? item.includes("OnChain") ? "green.50" : "red.50" : item.includes("OnChain") ? "red.50": "green.50","gray.500")}
                                  fontWeight={"400"}
                                >
                                  {item}
                                </Badge>
                              </WrapItem>
                            );
                          })}
                        </Wrap>
                      );
                    } else if (cell.column.Header === "RISK SCORE") {
                      data = (
                        <Flex align="center">
                          <Progress
                            variant="table"
                            colorScheme={"red"}
                            backgroundColor={"green.200"}
                            h="8px"
                            w="63px"
                            value={cell.value}
                          />
                        </Flex>
                      );
                    }
                    else {
                      data = (
                        <Text color={textColor} fontSize='sm' fontWeight='700'>
                          {cell.value}
                        </Text>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                      >
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Flex>
            <Tooltip label="First Page">
              <IconButton
                onClick={() => gotoPage(0)}
                isDisabled={!canPreviousPage}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                onClick={previousPage}
                isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Page{" "}
              <Text fontWeight="bold" as="span">
                {pageIndex + 1}
              </Text>{" "}
              of{" "}
              <Text fontWeight="bold" as="span">
                {pageOptions.length}
              </Text>
            </Text>
            <Text flexShrink="0">Go to page:</Text>{" "}
            <NumberInput
              ml={2}
              mr={8}
              w={28}
              min={1}
              max={pageOptions.length}
              onChange={(value) => {
                const page = value ? value - 1 : 0;
                gotoPage(page);
              }}
              defaultValue={pageIndex + 1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Select
              w={32}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex>
            <Tooltip label="Next Page">
              <IconButton
                onClick={nextPage}
                isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                onClick={() => gotoPage(pageCount - 1)}
                isDisabled={!canNextPage}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
