import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export const LanguageSwitch = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Use path as source of truth for current language (not i18n.language)
  const pathLang = location.pathname.split('/')[1];
  const currentLang = pathLang === 'pt' ? 'pt' : 'en';
  const otherLang = currentLang === 'en' ? 'pt' : 'en';

  const switchLanguage = () => {
    // Get current path without language prefix
    const pathParts = location.pathname.split('/').filter(Boolean);
    const currentLangInPath = pathParts[0];
    
    let newPath: string;
    if (currentLangInPath === 'en' || currentLangInPath === 'pt') {
      // Replace language prefix
      pathParts[0] = otherLang;
      newPath = '/' + pathParts.join('/');
    } else {
      // Add language prefix
      newPath = `/${otherLang}${location.pathname}`;
    }
    
    i18n.changeLanguage(otherLang);
    navigate(newPath);
  };

  const ariaLabel = currentLang === 'en' 
    ? 'Current language: English. Click to switch to Português' 
    : 'Idioma atual: Português. Clique para mudar para English';

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={switchLanguage}
      className={`gap-2 transition-all duration-150 ${
        currentLang === 'pt' 
          ? 'bg-teal-700 text-white border-transparent hover:bg-teal-800 hover:text-white' 
          : 'bg-white text-gray-700 border-gray-200 hover:bg-teal-50 hover:text-teal-600'
      }`}
      aria-label={ariaLabel}
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase font-medium">{currentLang}</span>
    </Button>
  );
};
