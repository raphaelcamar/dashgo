import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { RiAddLine, RiPencilLine } from 'react-icons/ri'
import { Pagination } from "../../components/Pagination";
import NextLink from "next/link";
import { User, useUsers } from "../../services/hooks/useUsers";
import { useState } from 'react'
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";
import { getUsers } from '../../services/hooks/useUsers'

interface UserListProps {
  users: User[]
  totalCount: number
}


export default function UserList({ users, totalCount }: UserListProps) {
  const [page, setPage] = useState<number>(1)
  const result = useUsers(page, {
    initialData: users
  })

  const data = result.data as UserListProps
  const { isLoading, error, isFetching } = result

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10
    })
  }

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && <Spinner ml="4" size="sm" color="grey.500" />}
              </Heading>
            <NextLink href="/users/create" passHref>
              <Button as="a" size="sm" fontSize="sm" colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>Criar novo</Button>
            </NextLink>
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
                  {data?.users.map((user: User) => (
                    <Tr key={user?.name}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(String(user.id))}>
                            <Text fontWeight="bold">{user?.name}</Text>
                          </Link>
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
            <Pagination totalCountOfRegisters={data?.totalCount} currentPage={page} onPageChange={setPage} />
          </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1)
  
  return {
    props: {
      users,
      totalCount
    }
  }
}