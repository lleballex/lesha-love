import { Response, ResponseStatus } from '@/responses/entities/response.entity'
import { User } from '@/users/entities/user.entity'

interface ResponseSeed extends Omit<Response, 'user'> {
  user: {
    id: User['id']
  }
}

export const responsesSeed: ResponseSeed[] = [
  {
    id: 'e6407993-25a4-4854-b689-2629dc4ad052',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Pending,
    user: {
      id: 'c84f8cf2-ac10-4e01-a6d8-2383b3130e9d',
    },
  },
  {
    id: 'e6407993-25a4-4854-b689-2629dc4ad053',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Approved,
    user: {
      id: 'c84f8cf2-ac10-4e01-a6d8-2383b3130e9d',
    },
  },
  {
    id: 'e6407993-25a4-4854-b689-2629dc4ad054',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ResponseStatus.Rejected,
    user: {
      id: 'c84f8cf2-ac10-4e01-a6d8-2383b3130e9d',
    },
  },
]
