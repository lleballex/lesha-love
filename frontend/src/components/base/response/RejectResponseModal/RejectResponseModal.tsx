import { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Response } from '@/types/entities/response'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

import { FormData, formInitData, formResolver } from './utils'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { useRejectResponse } from '@/api/responses/reject-response'

interface Props {
  response: Response
  children?: ReactNode
}

export default function RejectResponseModal({ response, children }: Props) {
  const form = useForm<FormData>({
    resolver: formResolver,
    defaultValues: formInitData,
  })

  const [isActive, setIsActive] = useState(false)

  const { mutate: rejectResponse } = useRejectResponse()

  const onSubmit = form.handleSubmit((data) => {
    rejectResponse(
      { id: response.id, ...data },
      {
        onSuccess: () => {
          form.reset()
          setIsActive(false)
        },
      },
    )
  })

  return (
    <Dialog open={isActive} onOpenChange={setIsActive}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[500px] gap-6">
        <Form {...form}>
          <form className="contents" onSubmit={onSubmit}>
            <DialogHeader>
              <DialogTitle>Отклонить соискателя</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сообщение</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button variant="destructive" type="submit">
                Отклонить
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
