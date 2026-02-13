declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL: string;
      NEXT_PUBLIC_TENANT_ID: string;
      NEXT_PUBLIC_MINIO_REMOTE: string;
    }
  }
}
