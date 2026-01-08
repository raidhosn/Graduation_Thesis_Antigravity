import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface ChapterNavigationProps {
  onPrevious?: () => void;
  onNext?: () => void;
  showPrevious?: boolean;
  showNext?: boolean;
}

export const ChapterNavigation = ({
  onPrevious,
  onNext,
  showPrevious = true,
  showNext = true,
}: ChapterNavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('common');
  
  // Get current language from path
  const pathLang = location.pathname.split('/')[1];
  const currentLang = pathLang === 'pt' ? 'pt' : 'en';

  const handlePreviousClick = () => {
    onPrevious?.();
    // Parent handles scrolling in the reading panel container
  };

  const handleMainPageClick = () => {
    navigate(`/${currentLang}`);
  };

  const handleNextClick = () => {
    onNext?.();
    // Parent handles scrolling in the reading panel container
  };

  return (
    <div className="flex items-center justify-between gap-4 mt-12 pt-8 border-t border-border/40">
      <Button
        onClick={handlePreviousClick}
        disabled={!showPrevious}
        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        {t('navigation.previousChapter')}
      </Button>

      <Button
        onClick={handleMainPageClick}
        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
      >
        <Home className="w-4 h-4 mr-2" />
        {t('sidebar.mainPage')}
      </Button>

      <Button
        onClick={handleNextClick}
        disabled={!showNext}
        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
      >
        {t('navigation.nextChapter')}
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};
