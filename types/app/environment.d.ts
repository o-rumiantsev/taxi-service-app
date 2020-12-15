declare namespace NodeJS {
  interface ProcessEnv {
    ENV: string;
    PORT: string;
    HOST: string;
    PGHOST: string;
    PGPORT: string;
    PGUSER: string;
    PGPASSWORD: string;
  }
}
