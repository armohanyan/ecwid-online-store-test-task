/// <reference types="vite/client" />
export interface ImportMetaEnv {
    VITE_MAC_INTEGRATION: string;
    VITE_BASE_API_URL: string;
    VITE_FALLBACK_LOCALE: string;
    VITE_NODE_ENV: string;
    VITE_USE_ONLY_MOCK_API: string;
    VITE_DISABLE_MOCK_API: string;
    VITE_TEST_URL: string;
    VITE_PORT: string;
}

interface ImportMeta {
    env: ImportMetaEnv;
}
