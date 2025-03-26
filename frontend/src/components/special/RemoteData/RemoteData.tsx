import { ReactNode } from 'react'

import { RemoteData as IRemoteData } from '@/types/remote-data'

interface Props<V, E extends Error> {
  data: IRemoteData<V, E>
  onSuccess: (value: V) => ReactNode
}

export default function RemoteData<V, E extends Error = Error>({
  data,
  onSuccess,
}: Props<V, E>) {
  if (data.status === 'pending') {
    return <p>Wait a little</p>
  }

  if (data.status === 'error') {
    return <p>{data.error.message}</p>
  }

  return onSuccess(data.value)
}
