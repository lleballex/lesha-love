import { Link } from 'react-router'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { useVacancies } from '@/api/vacancies/get-vacancies'
import RemoteData from '@/components/special/RemoteData'
import VacancyCard from '@/components/base/vacancy/VacancyCard'
import { Routes } from '@/config/routes'
import { Button } from '@/components/ui/button'
import { UserRole } from '@/types/entities/user'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useScopes } from '@/api/scopes/get-scopes'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface Props {
  role: UserRole
}

export default function Vacancies({ role }: Props) {
  const [query, setQuery] = useState('')
  const [scope, setScope] = useState('null')
  const [page, setPage] = useState(1)

  const scopes = useScopes()

  const vacancies = useVacancies({
    query: query || undefined,
    scope: scope === 'null' ? undefined : scope,
    byCurRecruiter: role === UserRole.Recruiter,
    page,
  })

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-8">
        <h1 className="text-4xl font-extrabold">Вакансии</h1>
        {role === UserRole.Recruiter && (
          <Link to={Routes.home}>
            <Button>
              <PlusIcon />
              Добавить
            </Button>
          </Link>
        )}
      </div>

      <div className="flex items-center gap-6 max-w-[800px]">
        <Input
          placeholder="Поиск по вакансиям"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {scopes.status === 'success' && (
          <Select value={scope} onValueChange={setScope}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="null">Все направления</SelectItem>
              {scopes.value.map((scope) => (
                <SelectItem key={scope.id} value={scope.id}>
                  {scope.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <RemoteData
        data={vacancies}
        onSuccess={(vacancies) => (
          <>
            {vacancies.data.length ? (
              <div className="flex flex-col gap-6">
                {vacancies.data.map((vacancy) => (
                  <VacancyCard
                    key={vacancy.id}
                    vacancy={vacancy}
                    role={role}
                    link={{
                      [UserRole.Recruiter]: Routes.recruiter.vacancy,
                      [UserRole.Candidate]: Routes.candidate.vacancy,
                    }[role](vacancy.id)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center">Ничего не найдено</p>
            )}

            {vacancies.totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  {page !== 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage((prev) => prev - 1)}
                      />
                    </PaginationItem>
                  )}
                  {page !== 1 && (
                    <PaginationItem>
                      <PaginationLink onClick={() => setPage(1)}>
                        1
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {page >= 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink isActive>{page}</PaginationLink>
                  </PaginationItem>
                  {page <= vacancies.totalPages - 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  {page !== vacancies.totalPages && (
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setPage(vacancies.totalData)}
                      >
                        {vacancies.totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  )}
                  {page !== vacancies.totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setPage((prev) => prev + 1)}
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </>
        )}
      />
    </div>
  )
}
