import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  // Get current language from path or fallback to i18n language
  const pathLang = location.pathname.split('/')[1];
  const currentLang = pathLang === 'pt' ? 'pt' : pathLang === 'en' ? 'en' : (i18n.language?.startsWith('pt') ? 'pt' : 'en');

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const isPortuguese = currentLang === 'pt';

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          {isPortuguese ? 'Ops! Página não encontrada' : 'Oops! Page not found'}
        </p>
        <a href={`/${currentLang}`} className="text-primary underline hover:text-primary/90">
          {isPortuguese ? 'Voltar à Página Inicial' : 'Return to Home'}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
