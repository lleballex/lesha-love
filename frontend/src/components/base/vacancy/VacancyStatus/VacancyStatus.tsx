import {
  VacancyStatus as IVacancyStatus,
  vacancyStatuses,
} from '@/types/entities/vacancy'
import { cn } from '@/lib/utils'

interface Props {
  status: IVacancyStatus
}

export default function VacancyStatus({ status }: Props) {
  return (
    <p className="flex items-center gap-2">
      <span
        className={cn('block w-2 h-2 rounded-full', {
          'bg-green-400': status === IVacancyStatus.Active,
          'bg-gray-400': status === IVacancyStatus.Closed,
        })}
      />
      {vacancyStatuses[status]}
    </p>
  )
}
