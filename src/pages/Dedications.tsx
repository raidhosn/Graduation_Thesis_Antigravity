import { GraduationCap, Home } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const Dedications = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation(['common', 'thesis']);

    // Get current language from path
    const pathLang = location.pathname.split('/')[1];
    const currentLang = pathLang === 'pt' ? 'pt' : 'en';

    // Sync i18n language with URL
    useEffect(() => {
        if (i18n.language !== currentLang) {
            i18n.changeLanguage(currentLang);
        }
        document.documentElement.lang = currentLang;

        // Update document title based on locale
        document.title = currentLang === 'en'
            ? 'Dedications and Acknowledgments - Thesis'
            : 'Dedicatórias e Agradecimentos - Tese';
    }, [currentLang, i18n]);

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

                                {/* Header Divider */}
                                <div className="h-px bg-[#E5E5E5] -mx-2" />

                                {/* Main Page Button */}
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

                                {/* Dedications (Active) */}
                                <button
                                    className="sidebar-chapter w-full text-left !justify-start gap-2 active"
                                    aria-label={t('sidebar.dedications')}
                                >
                                    <span className="sidebar-chapter-text">
                                        {t('sidebar.dedications')}
                                    </span>
                                </button>

                                {/* Introduction */}
                                <button
                                    onClick={() => navigate(`/${currentLang}/thesis#chapter-0`)}
                                    className="sidebar-chapter"
                                >
                                    <span className="sidebar-chapter-text">
                                        {t('sidebar.introduction')}
                                    </span>
                                </button>

                                {/* Chapter Links */}
                                <div className="space-y-0.5 pt-1">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((chapterId) => (
                                        <button
                                            key={chapterId}
                                            onClick={() => navigate(`/${currentLang}/thesis#chapter-${chapterId}`)}
                                            className="sidebar-chapter"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="sidebar-chapter-number">
                                                    {chapterId}.
                                                </span>
                                                <span className="sidebar-chapter-text">
                                                    {t(`indice.chapter${chapterId}.title`)}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </nav>
                    </ScrollArea>
                </aside>

                {/* Main Content */}
                <main className="flex-1 h-[calc(100vh-73px)] overflow-y-auto scroll-smooth">
                    <div className="px-5 md:px-8 py-8 md:py-12">
                        <Card className="p-6 md:p-10 shadow-[var(--shadow-card)] animate-fade-in">
                            <article className="prose-academic">
                                <h1 className="animate-slide-up" tabIndex={-1}>
                                    {t('dedications.title')}
                                </h1>

                                {/* DEDICATIONS Section */}
                                <h2 className="section-heading">
                                    {t('dedications.dedicationsTitle')}
                                </h2>

                                <p>{t('dedications.claudiaDedication1')}</p>

                                <p>{t('dedications.claudiaDedication2')}</p>

                                <p>{t('dedications.claudiaDedication3')}</p>

                                <p className="text-right italic font-semibold">
                                    {t('dedications.claudiaName')}
                                </p>

                                {/* Elegant Divider */}
                                <div className="flex items-center justify-center gap-4 my-8">
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                    <span className="text-gray-400 text-xl">✦</span>
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                </div>

                                <p className="whitespace-pre-line">
                                    {t('dedications.raidDedication')}
                                </p>

                                <p className="text-right italic font-semibold">
                                    {t('dedications.raidName')}
                                </p>

                                {/* Elegant Divider */}
                                <div className="flex items-center justify-center gap-4 my-8">
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                    <span className="text-gray-400 text-xl">✦</span>
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                </div>

                                {/* ACKNOWLEDGMENTS Section */}
                                <h2 className="section-heading">
                                    {t('dedications.acknowledgementsTitle')}
                                </h2>

                                <p>{t('dedications.acknowledgements1')}</p>

                                <p>{t('dedications.acknowledgements2')}</p>

                                <p>{t('dedications.acknowledgements3')}</p>

                                <p>{t('dedications.acknowledgements4')}</p>

                                <p className="text-right italic font-semibold whitespace-pre-line">
                                    {t('dedications.acknowledgementsAuthors')}
                                </p>
                            </article>
                        </Card>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dedications;
