import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
  message: z.string().nonempty(),
})

export const formResolver = zodResolver(formSchema)

export type FormData = z.infer<typeof formSchema>

export const formInitData: FormData = {
  message: '',
}
