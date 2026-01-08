import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Calendar, MapPin, User, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import heroImage from "@/assets/hero-thesis.jpg";
import emailIcon from "@/assets/email-icon.gif";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { chapterSubsections } from "@/hooks/useTocNavigation";

const Index = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    t,
    i18n
  } = useTranslation();

  // Get current language from path
  const pathLang = location.pathname.split('/')[1];
  const currentLang = pathLang === 'pt' ? 'pt' : 'en';

  // Sync i18n language with URL
  useEffect(() => {
    if (i18n.language !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang, i18n]);

  // Update document language attribute
  useEffect(() => {
    document.documentElement.lang = currentLang;
  }, [currentLang]);
  const navigateToMainPage = (lang: 'en' | 'pt') => {
    // If already on this language's main page, do nothing
    if (currentLang === lang) {
      return;
    }
    i18n.changeLanguage(lang);
    navigate(`/${lang}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Language indicator in top right */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitch />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iaHNsKDE5NSwgNjUlLCAyNSUpIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] opacity-40"></div>
        
        <div className="container mx-auto px-6 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 animate-fade-in" variant="secondary">
              <GraduationCap className="w-3 h-3 mr-1" />
              {t('header.graduationThesis')}
            </Badge>
            
            <h1 className="mb-6 animate-slide-up bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent leading-tight">
              {t('hero.title')}
            </h1>
            
            
            <div className="mb-8 animate-fade-in" style={{
            animationDelay: "0.15s"
          }}>
              <img src={heroImage} alt={t('hero.heroImageAlt')} className="max-w-2xl mx-auto shadow-lg rounded-lg" />
            </div>
            
            <p style={{
            animationDelay: "0.2s"
          }} className="text-xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto leading-relaxed md:text-xl">
              {t('hero.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in" style={{
            animationDelay: "0.3s"
          }}>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{t('hero.location')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{t('hero.year')}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="w-4 h-4" />
                <span className="text-sm">{t('hero.authors')}</span>
              </div>
            </div>

            {/* Two Language Buttons */}
            <div className="flex justify-center gap-4 animate-fade-in" style={{
            animationDelay: "0.4s"
          }}>
              <Button 
                size="lg" 
                className={`group shadow-[var(--shadow-elegant)] hover:shadow-xl transition-all duration-150 ${
                  currentLang === 'en' 
                    ? 'bg-teal-700 text-white border-transparent hover:bg-teal-800' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-teal-50 hover:text-teal-600'
                }`} 
                onClick={() => navigateToMainPage('en')} 
                aria-label="English main page"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                EN
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                className={`group shadow-[var(--shadow-elegant)] hover:shadow-xl transition-all duration-150 ${
                  currentLang === 'pt' 
                    ? 'bg-teal-700 text-white border-transparent hover:bg-teal-800' 
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-teal-50 hover:text-teal-600'
                }`} 
                onClick={() => navigateToMainPage('pt')} 
                aria-label="Portuguese main page"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                PT
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicatórias Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 shadow-[var(--shadow-card)] animate-fade-in rounded">
              <h2 className="font-semibold mb-6 text-center">{t('dedicatorias.title')}</h2>
              <div className="prose-academic">
                <p>{t('dedicatorias.p1')}</p>
                <p>{t('dedicatorias.p2')}</p>
                <p>{t('dedicatorias.p3')}</p>
                <p>{t('dedicatorias.p4')}</p>
                <p>{t('dedicatorias.p5')}</p>
                <p>{t('dedicatorias.p6')}</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 shadow-[var(--shadow-card)] animate-fade-in">
              <h2 className="font-semibold mb-6 text-center">{t('introducao.title')}</h2>
              <div className="prose-academic">
                <p>{t('introducao.p1')}</p>
                <p>{t('introducao.p2')}</p>
                <p>{t('introducao.p3')}</p>
                <p>{t('introducao.p4')}</p>
                <p>{t('introducao.p5')}</p>
                <p>{t('introducao.p6')}</p>
                <p>{t('introducao.p7')}</p>
                <p>{t('introducao.p8')}</p>
                <p>{t('introducao.p9')}</p>
                <p>{t('introducao.p10')}</p>
                <p>{t('introducao.p11')}</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Chapters Overview - ÍNDICE */}
      <section id="indice" className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center mb-12">{t('indice.title')}</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Chapter 1 */}
              <Card className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300 animate-fade-in">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="font-semibold text-lg mb-2 hover:text-primary transition-colors cursor-pointer"
                      onClick={() => navigate(`/${currentLang}/thesis#chapter-1`)}
                    >
                      {t('indice.chapter1.title')}
                    </h3>
                    <div className="space-y-0.5">
                      {chapterSubsections[1]?.map((sub) => (
                        <button 
                          key={sub.id}
                          className="toc-card-subsection w-full text-left"
                          onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#${sub.id}`); }}
                        >
                          {t(sub.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Chapter 2 */}
              <Card className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="font-semibold text-lg mb-2 hover:text-primary transition-colors cursor-pointer"
                      onClick={() => navigate(`/${currentLang}/thesis#chapter-2`)}
                    >
                      {t('indice.chapter2.title')}
                    </h3>
                    <div className="space-y-0.5">
                      {chapterSubsections[2]?.map((sub) => (
                        <button 
                          key={sub.id}
                          className="toc-card-subsection w-full text-left"
                          onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#${sub.id}`); }}
                        >
                          {t(sub.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Chapter 3 */}
              <Card className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="font-semibold text-lg mb-2 hover:text-primary transition-colors cursor-pointer"
                      onClick={() => navigate(`/${currentLang}/thesis#chapter-3`)}
                    >
                      {t('indice.chapter3.title')}
                    </h3>
                    <div className="space-y-0.5">
                      {chapterSubsections[3]?.map((sub) => (
                        <button 
                          key={sub.id}
                          className="toc-card-subsection w-full text-left"
                          onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#${sub.id}`); }}
                        >
                          {t(sub.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Chapter 4 */}
              <Card className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="font-semibold text-lg mb-2 hover:text-primary transition-colors cursor-pointer"
                      onClick={() => navigate(`/${currentLang}/thesis#chapter-4`)}
                    >
                      {t('indice.chapter4.title')}
                    </h3>
                    <div className="space-y-0.5">
                      {chapterSubsections[4]?.map((sub) => (
                        <button 
                          key={sub.id}
                          className="toc-card-subsection w-full text-left"
                          onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#${sub.id}`); }}
                        >
                          {t(sub.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Chapter 5 */}
              <Card className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="font-semibold text-lg mb-2 hover:text-primary transition-colors cursor-pointer"
                      onClick={() => navigate(`/${currentLang}/thesis#chapter-5`)}
                    >
                      {t('indice.chapter5.title')}
                    </h3>
                    <div className="space-y-0.5">
                      {chapterSubsections[5]?.map((sub) => (
                        <button 
                          key={sub.id}
                          className="toc-card-subsection w-full text-left"
                          onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#${sub.id}`); }}
                        >
                          {t(sub.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Chapter 6 - Final Considerations */}
              <Card className="p-6 hover:shadow-[var(--shadow-card)] transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="font-semibold text-lg mb-2 hover:text-primary transition-colors cursor-pointer"
                      onClick={() => navigate(`/${currentLang}/thesis#chapter-6`)}
                    >
                      {t('indice.chapter6.title')}
                    </h3>
                    <div className="space-y-0.5">
                      <button 
                        className="toc-card-subsection w-full text-left"
                        onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-7`); }}
                      >
                        {t('indice.chapter6.s1')}
                      </button>
                      <button 
                        className="toc-card-subsection w-full text-left"
                        onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-8`); }}
                      >
                        {t('indice.chapter6.s2')}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 shadow-[var(--shadow-card)] animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent mx-auto mb-6 flex items-center justify-center shadow-xl">
                  <User className="w-12 h-12 text-primary-foreground" />
                </div>
                <h2 className="mb-4">{t('about.title')}</h2>
              </div>
              
              <div className="prose-academic max-w-3xl mx-auto">
                <div className="mb-8">
                  <h3 className="mb-4">{t('about.authors')}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-semibold text-base">{t('about.author1Name')}</p>
                      <p className="text-muted-foreground text-base">{t('about.author1Role')}</p>
                      <p className="text-muted-foreground mt-2 text-base">14710 Main St AA202<br />Mill Creek, WA 98012<br />USA</p>
                      <p className="mt-2 text-base"><a href="mailto:raidhosn1972@gmail.com" className="text-primary hover:underline">raidhosn1972@gmail.com</a></p>
                    </div>
                    <div>
                      <p className="font-semibold text-base">{t('about.author2Name')}</p>
                      <p className="font-semibold text-base">{t('about.author3Name')}</p>
                      <p className="text-muted-foreground text-base">{t('about.author2Role')}</p>
                      <p className="text-muted-foreground mt-2 text-base">Rua Antonio Everdosa 1245<br />CEP: 66080-190<br />Belém-Pará-Brasil</p>
                      <p className="mt-2 text-base"><a href="mailto:menael@amazon.com.br" className="text-primary hover:underline">menael@amazon.com.br</a></p>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-semibold mb-3 text-xl">{t('about.orientation')}</h3>
                  <p className="text-base"><strong>{t('about.advisor')}</strong> {t('about.advisorName')}</p>
                  <p className="text-base"><strong>{t('about.coAdvisor')}</strong> {t('about.coAdvisorName')}</p>
                  <p className="text-base"><strong>{t('about.methodologicalSupervision')}</strong> {t('about.methodologicalSupervisorName')}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {t('about.computerScience')}
                </Badge>
                <a href="https://www.cesupa.br/" target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Badge variant="secondary" className="text-sm px-4 py-2 hover:bg-secondary/80 transition-colors cursor-pointer">
                    <MapPin className="w-4 h-4 mr-2" />
                    CESUPA
                  </Badge>
                </a>
                <Badge variant="secondary" className="text-sm px-4 py-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  1999
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <Card className="p-8 text-center shadow-[var(--shadow-card)] animate-fade-in">
              <div className="mb-4 flex justify-center">
                <img src={emailIcon} alt="Email" width="84" height="51" />
              </div>
              <p className="text-lg font-semibold mb-2">{t('contact.email')}</p>
              <p>
                <a href="mailto:raidhosn1972@gmail.com" className="text-primary hover:underline">
                  raidhosn1972@gmail.com
                </a>
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/40 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <p className="text-center text-sm text-muted-foreground">
            {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>;
};
export default Index;