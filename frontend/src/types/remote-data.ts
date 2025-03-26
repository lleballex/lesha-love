export type RemoteData<V, E extends Error = Error> =
  | {
      status: 'pending'
    }
  | { status: 'success'; value: V }
  | { status: 'error'; error: E }
