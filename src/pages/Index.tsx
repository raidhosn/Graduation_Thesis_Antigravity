import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, Calendar, MapPin, User, ArrowRight, Heart, Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import heroImage from "@/assets/hero-thesis.jpg";
import emailIcon from "@/assets/email-icon.gif";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import AboutAuthor from "@/components/AboutAuthor";

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
        {/* Skip to content link for accessibility */}
        <a
            href="#indice"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
            {currentLang === 'en' ? 'Skip to content' : 'Pular para o conteúdo'}
        </a>

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



                </div>
            </div>
        </section>


        {/* Abstract Section */}
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Top Divider */}
                    <div className="flex items-center justify-center mb-6">
                        <div className="h-px bg-gray-300 w-full max-w-md"></div>
                    </div>

                    {/* Title */}
                    <h2 className="text-center text-xl font-bold font-serif uppercase tracking-widest text-gray-700 mb-6">
                        {t('abstract.title')}
                    </h2>

                    {/* Middle Divider */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="h-px bg-gray-300 w-full max-w-md"></div>
                    </div>

                    {/* Abstract Content */}
                    <p className="text-base leading-relaxed text-gray-700 text-justify max-w-3xl mx-auto mb-8">
                        {t('abstract.content').split('*').map((part, index) => {
                            if (index % 2 === 0) {
                                return <span key={index}>{part}</span>;
                            } else {
                                return <em key={index}>{part}</em>;
                            }
                        })}
                    </p>

                    {/* Bottom Divider */}
                    <div className="flex items-center justify-center">
                        <div className="h-px bg-gray-300 w-full max-w-md"></div>
                    </div>
                </div>
            </div>
        </section>



        {/* Table of Contents Section */}
        <section id="indice" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header Title */}
                    <h2 className="text-center text-3xl md:text-4xl font-bold font-serif uppercase mb-8">
                        {t('indice.title')}
                    </h2>


                    {/* Cards Grid - 2 Columns */}
                    <div className="space-y-8">
                        {/* PRELIMINARY Section */}
                        <div>
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="flex-1 h-px bg-gray-300"></div>
                                <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                                    {t('indice.preliminary')}
                                </span>
                                <div className="flex-1 h-px bg-gray-300"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                {/* 1. Dedications */}
                                <Card
                                    className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    onClick={() => navigate(`/${currentLang}/dedications`)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/${currentLang}/dedications`); } }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-md bg-teal-700 flex items-center justify-center shrink-0">
                                            <Heart className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {t('indice.dedications')}
                                            </h3>
                                        </div>
                                    </div>
                                </Card>

                                {/* 2. Introduction */}
                                <Card
                                    className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    onClick={() => navigate(`/${currentLang}/thesis#chapter-0`)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/${currentLang}/thesis#chapter-0`); } }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-md bg-teal-700 flex items-center justify-center shrink-0">
                                            <BookOpen className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {t('sidebar.introduction')}
                                            </h3>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* CHAPTERS Section */}
                        <div>
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="flex-1 h-px bg-gray-300"></div>
                                <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                                    {t('indice.chapters')}
                                </span>
                                <div className="flex-1 h-px bg-gray-300"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                {/* 3. Chapter 1 */}
                                <Card
                                    className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    onClick={() => navigate(`/${currentLang}/thesis#chapter-1`)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/${currentLang}/thesis#chapter-1`); } }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-md bg-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            1
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {t('indice.chapter1.title')}
                                            </h3>
                                            <ul className="mt-2 space-y-1 pl-0">
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-1`); }}>{t('indice.chapter1.s1')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-1`); }}>{t('indice.chapter1.s2')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-1`); }}>{t('indice.chapter1.s3')}</button>
                                            </ul>
                                        </div>
                                    </div>
                                </Card>

                                {/* 4. Chapter 2 */}
                                <Card
                                    className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    onClick={() => navigate(`/${currentLang}/thesis#chapter-2`)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/${currentLang}/thesis#chapter-2`); } }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-md bg-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            2
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {t('indice.chapter2.title')}
                                            </h3>
                                            <ul className="mt-2 space-y-1 pl-0">
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-2`); }}>{t('indice.chapter2.s1')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-2`); }}>{t('indice.chapter2.s2')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-2`); }}>{t('indice.chapter2.s3')}</button>
                                            </ul>
                                        </div>
                                    </div>
                                </Card>

                                {/* 5. Chapter 3 */}
                                <Card
                                    className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    onClick={() => navigate(`/${currentLang}/thesis#chapter-3`)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/${currentLang}/thesis#chapter-3`); } }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-md bg-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            3
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {t('indice.chapter3.title')}
                                            </h3>
                                            <ul className="mt-2 space-y-1 pl-0">
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-3`); }}>{t('indice.chapter3.s1')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-3`); }}>{t('indice.chapter3.s2')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-3`); }}>{t('indice.chapter3.s3')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-3`); }}>{t('indice.chapter3.s4')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-3`); }}>{t('indice.chapter3.s5')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-3`); }}>{t('indice.chapter3.s6')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-3`); }}>{t('indice.chapter3.s7')}</button>
                                            </ul>
                                        </div>
                                    </div>
                                </Card>

                                {/* 6. Chapter 4 */}
                                <Card
                                    className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    onClick={() => navigate(`/${currentLang}/thesis#chapter-4`)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/${currentLang}/thesis#chapter-4`); } }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-md bg-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            4
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {t('indice.chapter4.title')}
                                            </h3>
                                            <ul className="mt-2 space-y-1 pl-0">
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-4`); }}>{t('indice.chapter4.s1')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-4`); }}>{t('indice.chapter4.s2')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-4`); }}>{t('indice.chapter4.s3')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-4`); }}>{t('indice.chapter4.s4')}</button>
                                            </ul>
                                        </div>
                                    </div>
                                </Card>

                                {/* 7. Chapter 5 */}
                                <Card
                                    className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    onClick={() => navigate(`/${currentLang}/thesis#chapter-5`)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/${currentLang}/thesis#chapter-5`); } }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-md bg-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            5
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {t('indice.chapter5.title')}
                                            </h3>
                                            <ul className="mt-2 space-y-1 pl-0">
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s1')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s2')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s3')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s4')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s5')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s6')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s7')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s8')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s9')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s10')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s11')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s12')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s13')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s14')}</button>
                                                <button className="toc-card-subsection w-full text-left" onClick={(e) => { e.stopPropagation(); navigate(`/${currentLang}/thesis#chapter-5`); }}>{t('indice.chapter5.s15')}</button>
                                            </ul>
                                        </div>
                                    </div>
                                </Card>

                                {/* 8. Final Considerations */}
                                <Card
                                    className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    onClick={() => navigate(`/${currentLang}/thesis#chapter-6`)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/${currentLang}/thesis#chapter-6`); } }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-md bg-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            6
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {t('indice.chapter6.title')}
                                            </h3>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        {/* REFERENCES Section */}
                        <div>
                            <div className="flex items-center justify-center gap-4 mb-6">
                                <div className="flex-1 h-px bg-gray-300"></div>
                                <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                                    {t('indice.references')}
                                </span>
                                <div className="flex-1 h-px bg-gray-300"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                {/* 9. Bibliography */}
                                <Card
                                    className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    onClick={() => navigate(`/${currentLang}/thesis#chapter-7`)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/${currentLang}/thesis#chapter-7`); } }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-md bg-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            7
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {t('indice.chapter6.s1')}
                                            </h3>
                                        </div>
                                    </div>
                                </Card>

                                {/* 10. Glossary */}
                                <Card
                                    className="p-5 hover:shadow-md transition-shadow cursor-pointer bg-white border border-gray-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                    onClick={() => navigate(`/${currentLang}/thesis#chapter-8`)}
                                    tabIndex={0}
                                    role="button"
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/${currentLang}/thesis#chapter-8`); } }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-md bg-teal-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                            8
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-base font-bold text-gray-900">
                                                {t('indice.chapter6.s2')}
                                            </h3>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* About the Author Section - Bento Grid */}
        <AboutAuthor />


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