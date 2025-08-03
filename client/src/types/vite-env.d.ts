/// <reference types="vite/client" />
export interface ImportMetaEnv {
  VITE_BASE_API_URL: string
  VITE_STORE_ID: string
  VITE_TOKEN: string
}

interface ImportMeta {
  env: ImportMetaEnv
}
