/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string; // URL base de la API
    readonly VITE_GOOGLE_CLIENT_ID: string; // Google Client ID
  
    // Puedes añadir más variables si las necesitas
    // readonly VITE_ANOTHER_VARIABLE: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  