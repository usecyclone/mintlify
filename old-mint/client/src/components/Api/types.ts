export type RequestMethods =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'COPY' // "COPY" and everything below has a grey color
  | 'HEAD'
  | 'OPTIONS'
  | 'LINK'
  | 'UNLINK'
  | 'PURGE'
  | 'LOCK'
  | 'UNLOCK'
  | 'PROPFIND'
  | 'VIEW';

export type ApiInputValue =
  | string
  | number
  | boolean
  | object
  | File
  | string[]
  | number[]
  | boolean[]
  | File[]
  | undefined
  | null;
