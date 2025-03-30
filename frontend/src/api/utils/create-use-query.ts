import { useEffect, useMemo, useState } from 'react'
import { AxiosError } from 'axios'
import { UseQueryOptions, useQuery } from '@tanstack/react-query'

import { RemoteData } from '@/types/remote-data'

type Options<Data> = Omit<
  UseQueryOptions<Promise<Data>, AxiosError, Data>,
  'queryKey' | 'queryFn'
>

interface ExtraOptions {
  enabled?: boolean
}

export const createUseQuery = <Args extends unknown[], Data>(
  key: string,
  func: (...args: Args) => Promise<Data>,
  options?: Options<Data>,
) => {
  return (
    ...args: [...Args, extraOptions?: ExtraOptions]
  ): RemoteData<Data, AxiosError> => {
    const extraOptions = useMemo<ExtraOptions>(() => {
      if (args.length > func.length) {
        return args.splice(args.length - 1, 1)[0] as ExtraOptions
      }
      return {}
    }, [args])

    const { data, status, error } = useQuery({
      queryKey: [key, args],
      queryFn: () => func(...(args as any as Args)),
      ...options,
      ...extraOptions,
    })

    const [remoteData, setRemoteData] = useState<RemoteData<Data, AxiosError>>({
      status: 'pending',
    })

    useEffect(() => {
      if (status === 'error') {
        setRemoteData({
          status: 'error',
          error,
        })
      } else if (status === 'success') {
        setRemoteData({
          status: 'success',
          value: data,
        })
      } else {
        setRemoteData({ status: 'pending' })
      }
    }, [status, error, data])

    return remoteData
  }
}
