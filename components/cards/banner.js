import {
    Box,
    Button,
    CloseButton,
    Container,
    Icon,
    Square,
    Stack,
    Text,
    useBreakpointValue,
  } from '@chakra-ui/react'
  import { FiInfo } from 'react-icons/fi'
  
function Banner() {
    const isMobile = useBreakpointValue({
      base: true,
      md: false,
    })
    return (
      <Box
        as="section"

      >
        <Box bg="bg-surface" boxShadow="sm">
          <Container
            position="relative"
          >
            <Stack
              direction={{
                base: 'column',
                sm: 'row',
              }}
              justify="space-between"
              spacing={{
                base: '3',
                md: '2',
              }}
            >
              <Stack
                spacing="4"
                direction={{
                  base: 'column',
                  md: 'row',
                }}
                align={{
                  base: 'start',
                  md: 'center',
                }}
              >
                {!isMobile && (
                  <Square size="12" bg="bg-subtle" borderRadius="md">
                    <Icon as={FiInfo} boxSize="6" />
                  </Square>
                )}
                <Stack
                  direction={{
                    base: 'column',
                    md: 'row',
                  }}
                  spacing={{
                    base: '0.5',
                    md: '1.5',
                  }}
                  pe={{
                    base: '4',
                    sm: '0',
                  }}
                >
                  <Text fontSize={"sm"}>This is currently in testing. Data accuracy may vary.</Text>
                </Stack>
              </Stack>
              
            </Stack>
          </Container>
        </Box>
      </Box>
    )
  }

  export default Banner;
