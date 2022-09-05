import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'


type CreateUserFormData = {
  email: string
  name: string
  password: string
  passwordConfirmation: string
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().required('Campo obrigatório').email('Email inválido'),
  password: yup.string().required('Campo obrigatório').min(6, 'No mínimo 6 caracteres'),
  passwordConfirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais')
})


export default function CreateUser(){

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }  } = useForm<CreateUserFormData>({ resolver: yupResolver(createUserFormSchema) })

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
  }

  return (
    <Box>
    <Header />
    <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
      <Sidebar />
      <Box as="form" onSubmit={handleSubmit(handleCreateUser)} flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
        <Heading size="lg" fontWeight="normal">Criar usuário</Heading>
        <Divider my="6" borderColor="gray.700" />

        <VStack spacing="8">
          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input label="Nome completo" error={errors.name} {...register('name')} />
            <Input {...register('email')} error={errors.email} type="email" label="E-mail" />
          </SimpleGrid>

          <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
            <Input error={errors.password} type="password" label="Senha" {...register('password')} />
            <Input error={errors.passwordConfirmation} type="password" label="Confirmação da senha" {...register('passwordConfirmation')} />
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <HStack spacing="4">
          <Link href="/users" passHref>
            <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
          </Link>
            <Button colorScheme="pink" type="submit" isLoading={isSubmitting}>Salvar</Button>
          </HStack>
        </Flex>
      </Box>
    </Flex>
  </Box>
  )
}