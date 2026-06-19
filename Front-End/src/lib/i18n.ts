// src/i18n.ts (ou src/lib/i18n.ts)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importamos os dicionários que você acabou de criar
import ptBR from '../locales/pt-BR.json';
import enUS from '../locales/en-US.json';

const resources = {
  pt: { translation: ptBR },
  en: { translation: enUS },
};

i18n
  .use(initReactI18next) // Passa a instância do i18n para o react-i18next
  .init({
    resources,
    lng: 'pt', // Idioma padrão inicial
    fallbackLng: 'pt', // Se der erro ou faltar tradução, volta pro PT
    
    interpolation: {
      escapeValue: false, // O React já é seguro contra XSS por padrão
    },
  });

export default i18n;