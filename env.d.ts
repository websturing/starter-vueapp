/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  // tambahkan variable lain di sini kalau ada
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
