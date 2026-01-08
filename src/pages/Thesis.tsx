import { useState, useEffect, useRef, useCallback } from "react";
import { Book, GraduationCap, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChapterNavigation } from "@/components/ChapterNavigation";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useTranslation } from "react-i18next";
import { getChapterContent } from "@/data/chapters";
import { chapterSubsections, scrollToAnchorWithOffset } from "@/hooks/useTocNavigation";
import { validateAnchors, getChapterFromAnchor, logNavigationEvent } from "@/hooks/useTocValidation";

// Chapter IDs for iteration - translations come from i18n
const chapterIds = [1, 2, 3, 4, 5, 6, 7, 8];

const Thesis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation(['common', 'thesis']);
  const [activeSection, setActiveSection] = useState<string | null>("chapter-1");
  const readingPanelRef = useRef<HTMLDivElement>(null);
  const [validationComplete, setValidationComplete] = useState(false);
  
  // Get current language from path - STRICT: default to 'en', never fallback to 'pt'
  const pathLang = location.pathname.split('/')[1];
  const currentLang = pathLang === 'pt' ? 'pt' : 'en';
  
  // Sync i18n language with URL BEFORE first render
  useEffect(() => {
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
    document.documentElement.lang = currentLang;
    
    // Update document title based on locale
    document.title = currentLang === 'en' 
      ? 'Immersive Virtual Reality - Thesis' 
      : 'Realidade Virtual Imersiva - Tese';
  }, [currentLang, i18n]);

  // Validate anchors after content renders (dev mode only)
  useEffect(() => {
    if (validationComplete) return;
    
    // Compute chapter ID inside effect to avoid dependency issues
    const chapterId = parseInt(activeSection?.replace('chapter-', '') || '1');
    
    const timer = setTimeout(() => {
      const result = validateAnchors(readingPanelRef, chapterId);
      setValidationComplete(true);

      // In development, log critical errors (don't throw to avoid breaking UX)
      if (process.env.NODE_ENV === 'development' && !result.valid) {
        console.error('[TOC Validation] Critical validation errors found:', result.errors);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [activeSection, validationComplete]);

  // Handle hash navigation for anchor scrolling - container-aware
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const anchorId = hash.replace('#', '');
      
      // Determine active chapter from anchor
      const chapterId = getChapterFromAnchor(anchorId);
      if (chapterId) {
        setActiveSection(`chapter-${chapterId}`);
      }
      
      // Delay scroll to ensure content is rendered, use container ref
      const scrollTimer = setTimeout(async () => {
        const result = await scrollToAnchorWithOffset(anchorId, readingPanelRef);
        logNavigationEvent('deeplink', anchorId, result.success);
      }, 200);
      
      return () => clearTimeout(scrollTimer);
    }
  }, [location.hash]);

  // Handle sidebar chapter click - scroll to chapter top in reading panel
  const handleChapterClick = useCallback(async (chapterId: number) => {
    setActiveSection(`chapter-${chapterId}`);
    setValidationComplete(false); // Re-validate on chapter change
    
    // Small delay to allow state update, then scroll to chapter heading
    setTimeout(async () => {
      const anchorId = `chapter-${chapterId}`;
      const result = await scrollToAnchorWithOffset(anchorId, readingPanelRef);
      logNavigationEvent('chapter', anchorId, result.success);
    }, 100);
  }, []);

  // Handle sidebar subsection click - scroll to anchor in reading panel
  const handleSubsectionClick = useCallback(async (anchorId: string) => {
    const result = await scrollToAnchorWithOffset(anchorId, readingPanelRef);
    logNavigationEvent('subsection', anchorId, result.success);
  }, []);

  // Get current chapter ID
  const currentChapterId = parseInt(activeSection?.replace('chapter-', '') || '1');
  
  // Get chapter content component based on STRICT locale
  const ChapterContent = getChapterContent(currentChapterId, currentLang);

  // Header title based on locale
  const headerTitle = currentLang === 'en' ? 'Immersive Virtual Reality' : 'Realidade Virtual Imersiva';

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">{headerTitle}</h1>
                <p className="text-xs text-muted-foreground">CESUPA - 1999</p>
              </div>
            </div>
            <LanguageSwitch />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-72 border-r border-sidebar-border bg-[#fafafa] min-h-[calc(100vh-73px)] sticky top-[73px] hidden lg:block">
          <ScrollArea className="h-[calc(100vh-73px)]">
            {/* Navigation */}
            <nav className="px-2 py-3 flex-1">
              <div>
                {/* Table of Contents Header */}
                <h2 className="sidebar-header-title px-2 pb-3">
                  {t('sidebar.index')}
                </h2>
                
                {/* Header Divider - 1px, full width, #E5E5E5 */}
                <div className="h-px bg-[#E5E5E5] -mx-2" />
                
                {/* Main Page Button - 12-14px spacing from divider */}
                <button
                  onClick={() => navigate(`/${currentLang}`)}
                  className="sidebar-chapter w-full text-left mt-3 !justify-start gap-2"
                  aria-label={t('sidebar.mainPage')}
                >
                  <Home className="w-4 h-4 flex-shrink-0 text-gray-400" />
                  <span className="sidebar-chapter-text">
                    {t('sidebar.mainPage')}
                  </span>
                </button>

                {/* Chapters List */}
                <div className="space-y-0.5 pt-1">
                  {chapterIds.map((chapterId) => {
                    const subsections = chapterSubsections[chapterId] || [];
                    const isActive = activeSection === `chapter-${chapterId}`;
                    
                    return (
                      <div key={chapterId}>
                        {/* Chapter Button */}
                        <button 
                          onClick={() => handleChapterClick(chapterId)} 
                          className={`sidebar-chapter ${isActive ? "active" : ""}`} 
                        >
                          <div className="flex items-center gap-2">
                            <span className="sidebar-chapter-number">
                              {chapterId}.
                            </span>
                            <span className="sidebar-chapter-text">
                              {t(`thesis:chapters.chapter${chapterId}.title`)}
                            </span>
                          </div>
                        </button>
                        
                        {/* Subsections - show when this chapter is active */}
                        {isActive && subsections.length > 0 && (
                          <div className="mt-0.5 space-y-0.5">
                            {subsections.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={() => handleSubsectionClick(sub.id)}
                                className="sidebar-subsection w-full flex items-center"
                              >
                                {t(sub.labelKey)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </nav>
          </ScrollArea>
        </aside>

        {/* Main Content - Scrollable Reading Panel */}
        <main 
          ref={readingPanelRef}
          className="flex-1 h-[calc(100vh-73px)] overflow-y-auto scroll-smooth"
        >
          <div className="px-5 md:px-8 py-8 md:py-12">
            <Card className="p-6 md:p-10 shadow-[var(--shadow-card)] animate-fade-in">
              <article className="prose-academic">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Book className="w-4 h-4" />
                  <span>{t(`thesis:chapters.chapter${currentChapterId}.title`)}</span>
                </div>
                
                <h1 id={`chapter-${currentChapterId}`} className="animate-slide-up" tabIndex={-1}>
                  {t(`thesis:chapters.chapter${currentChapterId}.title`)}
                </h1>
                
                {t(`thesis:chapters.chapter${currentChapterId}.subtitle`) && (
                  <p 
                    className="text-lg text-accent font-normal mb-6 animate-slide-up" 
                    style={{ animationDelay: "0.1s" }}
                  >
                    {t(`thesis:chapters.chapter${currentChapterId}.subtitle`)}
                  </p>
                )}

                <div 
                  className="thesis-content animate-fade-in" 
                  style={{ animationDelay: "0.2s" }}
                >
                  {/* Render chapter content from locale-specific dataset */}
                  {ChapterContent ? (
                    <ChapterContent />
                  ) : (
                    <p className="text-muted-foreground italic">
                      {currentLang === 'en' 
                        ? '[Translation pending - Content not yet available in English]' 
                        : '[Tradução pendente - Conteúdo ainda não disponível em Português]'}
                    </p>
                  )}
                </div>
              </article>

              <ChapterNavigation
                onPrevious={() => {
                  const prevChapter = Math.max(1, currentChapterId - 1);
                  setActiveSection(`chapter-${prevChapter}`);
                  setTimeout(() => {
                    readingPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 50);
                }} 
                onNext={() => {
                  const nextChapter = Math.min(chapterIds.length, currentChapterId + 1);
                  setActiveSection(`chapter-${nextChapter}`);
                  setTimeout(() => {
                    readingPanelRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 50);
                }}
                showPrevious={currentChapterId > 1} 
                showNext={currentChapterId < chapterIds.length} 
              />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Thesis;
