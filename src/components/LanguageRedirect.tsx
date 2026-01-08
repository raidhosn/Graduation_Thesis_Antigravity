import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const LanguageRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    // Check if we're at the root or a path without language prefix
    const pathParts = location.pathname.split('/').filter(Boolean);
    const firstPart = pathParts[0];
    
    // If already has language prefix, do nothing
    if (firstPart === 'en' || firstPart === 'pt') {
      // Update i18n language to match URL
      if (i18n.language !== firstPart) {
        i18n.changeLanguage(firstPart);
      }
      return;
    }
    
    // Get stored language preference or default to English
    const storedLang = localStorage.getItem('i18nextLng');
    const preferredLang = storedLang?.startsWith('pt') ? 'pt' : 'en';
    
    // Redirect to language-prefixed path
    const newPath = `/${preferredLang}${location.pathname === '/' ? '' : location.pathname}`;
    i18n.changeLanguage(preferredLang);
    navigate(newPath, { replace: true });
  }, [location.pathname, navigate, i18n]);

  return null;
};
