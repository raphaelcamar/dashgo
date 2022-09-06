import { useQuery } from "react-query";
import { api } from "../api";

export type User = {
  name: string;
  email: string;
  createdAt: string;
  id?: string
}

type GetUsersResponse = {
  totalCount: number;
  users: User[]
}

export async function getUsers(page: number): Promise<GetUsersResponse>{
  const { data, headers } = await api.get('/users', {
    params: {
      page
    }
  })

  const totalCount = Number(headers['x-total-count'])

  const users = data?.users.map((user: User) => ({
    ...user,
    createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }));

  return {
    users,
    totalCount
  }
}

export function useUsers(page: number){
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10
  })
}