import { UserRole } from '@/types/entities/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
  role: z.nativeEnum(UserRole),
})

export const formResolver = zodResolver(formSchema)

export type FormData = z.infer<typeof formSchema>

export const formInitData: FormData = {
  email: '',
  password: '',
  role: UserRole.Candidate,
}
