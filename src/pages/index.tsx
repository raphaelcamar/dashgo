import type { NextPage } from 'next'
import { Flex, Button, Stack } from '@chakra-ui/react'
import { Input } from '../components/Form/Input'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, SubmitHandler } from 'react-hook-form'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('Campo obrigatório').email('Email inválido'),
  password: yup.string().required('Campo obrigatório')
})

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting 
    } } = useForm<SignInFormData>({resolver: yupResolver(signInFormSchema)})

  const handleSignIn: SubmitHandler<SignInFormData> = async (values: SignInFormData, event) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(values)
  }


  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={4}>
          <Input label="senha" type="email" {...register("email")} error={errors?.email} />
          <Input label="Senha" type="password" {...register("password")} error={errors?.password} />
        </Stack>

        <Button isLoading={isSubmitting} size="lg" type="submit" mt="6" colorScheme="pink">Entrar</Button>
      </Flex>
    </Flex>
  )
}

export default Home
