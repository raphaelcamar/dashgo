import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { Header } from "../../components/Header";

import { useQuery } from 'react-query'
import { Sidebar } from "../../components/Sidebar";
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Pagination } from "../../components/Pagination";
import Link from "next/link";

type User = {
  name: string;
  email: string;
  createdAt: string;
}

export default function UserList() {

  const { data, isLoading, error } = useQuery('users', async () => {
    const data = await fetch('http://localhost:3000/api/users')
    const response = await data.json()

    const users = response?.users.map((user: User) => ({
      ...user,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }));

    return users
  }, {
    staleTime: 1000 * 5
  })

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários</Heading>
            <Link href="/users/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>Criar novo</Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    
                    {isWideVersion && <Th w="8"></Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data?.map((user: User) => (
                    <Tr key={user?.name}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user?.name}</Text>
                          <Text fontSize="sm" color="gray.300">{user?.email}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user?.createdAt}</Td>}
                      {isWideVersion && (
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                          >
                            Editar
                        </Button>
                        </Td>
                      )}
                  </Tr>
                  ))}
                </Tbody>
              </Table>
            <Pagination />
          </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}