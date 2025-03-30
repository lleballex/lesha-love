import {
  InvalidateQueryFilters,
  QueryClient,
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { UseFormSetError } from 'react-hook-form'

type Options<Args, Data> = Omit<
  UseMutationOptions<Data, AxiosError, Args>,
  'mutationFn' | 'onError' | 'onSuccess'
> & {
  invalidateQueriesFn?: (args: Args) => InvalidateQueryFilters[]
  onError?: (
    [error, variables, context]: [AxiosError, Args, unknown],
    utils: {
      queryClient: QueryClient
      setError?: UseFormSetError<any>
    },
  ) => boolean | Promise<boolean>
  onSuccess?: (
    [data, variables, context]: [Data, Args, unknown],
    utils: {
      queryClient: QueryClient
    },
  ) => void
}

interface ExtraOptions {
  setError?: UseFormSetError<any>
}

export const createUseMutation = <Args, Data>(
  func: (args: Args) => Promise<Data>,
  options?: Options<Args, Data>,
) => {
  return (extraOptions?: ExtraOptions) => {
    const queryClient = useQueryClient()

    const { mutate, status } = useMutation<Data, AxiosError, Args>({
      mutationFn: func,
      ...options,
      onSuccess: (data, variables, context) => {
        if (options?.invalidateQueriesFn) {
          options
            .invalidateQueriesFn(variables)
            .forEach((i) => queryClient.invalidateQueries(i))
        }
        options?.onSuccess?.([data, variables, context], {
          queryClient,
        })
      },
      onError: async (...args_) => {
        if (
          !(await options?.onError?.(args_, {
            queryClient,
            setError: extraOptions?.setError,
          }))
        ) {
          alert(
            `Ошибка. ${
              (args_[0].response?.data as any | undefined)?.message ??
              args_[0].message
            }`,
          )
        }
      },
    })

    return { mutate, status }
  }
}
