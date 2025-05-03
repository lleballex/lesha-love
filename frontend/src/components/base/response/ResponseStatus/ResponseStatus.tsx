import {
  ResponseStatus as IResponseStatus,
  responseStatuses,
} from '@/types/entities/response'
import { cn } from '@/lib/utils'

interface Props {
  status: IResponseStatus
}

export default function ResponseStatus({ status }: Props) {
  return (
    <p className="flex items-center gap-2">
      <span
        className={cn('block w-2 h-2 rounded-full', {
          'bg-green-400': status === IResponseStatus.Approved,
          'bg-red-400': status === IResponseStatus.Rejected,
          'bg-yellow-400': status === IResponseStatus.Pending,
        })}
      />
      {responseStatuses[status]}
    </p>
  )
}
