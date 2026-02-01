import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import {
    MapPin,
    Mail,
    Github,
    Linkedin,
    FileText,
    Download,
    BookOpen,
    GraduationCap,
    Clock
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import profilePhoto from "@/assets/profile-photo.jpg";

const XIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const AboutAuthor = () => {
    const { t, i18n } = useTranslation();
    const [count, setCount] = useState(0);
    const targetCount = 12847;
    const duration = 2000;

    const { elementRef, isVisible } = useIntersectionObserver({
        threshold: 0.5,
        triggerOnce: true
    });

    useEffect(() => {
        if (isVisible) {
            let startTime: number | null = null;
            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                // Ease-out cubic
                const easeOut = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(easeOut * targetCount));
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isVisible]);

    const formatNumber = (num: number) => {
        return new Intl.NumberFormat(i18n.language === 'pt' ? 'pt-BR' : 'en-US').format(num);
    };

    const socialLinks = [
        { icon: Mail, href: "mailto:raidhosn1972@gmail.com", label: "Email Raed" },
        { icon: Github, href: "https://github.com/raidhosn", label: "Raed's GitHub" },
        { icon: Linkedin, href: "https://linkedin.com/in/raid-aboul-hosn", label: "Raed's LinkedIn profile" },
        { icon: XIcon, href: "https://x.com/raidhosnibm", label: "Raed's X profile" },
    ];

    const timeline = [
        { year: "1999", company: "CESUPA", role: "VR Thesis" },
        { year: "2001", company: "Microsoft", role: "Xbox • ISV" },
        { year: "2006", company: "Dell", role: "Enterprise" },
        { year: "2011", company: "IBM", role: "SCCM" },
        { year: "2017", company: "E-Commerce", role: "Architecture" },
        { year: "2021", company: "Microsoft", role: "Azure", isCurrent: true },
    ];

    return (
        <section className="py-20 bg-[#FAFBFC] overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-16">
                    <div className="flex items-center gap-4">
                        <div className="h-px bg-[#E2E8F0] w-10 md:w-12"></div>
                        <h2 className="text-[11px] uppercase tracking-[3px] font-semibold text-[#A0AEC0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {t('about.title')}
                        </h2>
                        <div className="h-px bg-[#E2E8F0] w-10 md:w-12"></div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">

                    {/* Tile 1: Photo (spans 2 rows on desktop) */}
                    <div className="col-span-12 md:col-span-5 md:row-span-2 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <figure className="w-full h-full min-h-[320px] md:min-h-[480px] relative">
                            <img
                                src={profilePhoto}
                                alt="Professional portrait of Raed Nadim Aboul Hosn, Computer Scientist, wearing a blue suit against a navy background"
                                className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-102"
                                loading="lazy"
                            />
                        </figure>
                    </div>

                    {/* Tile 2: Identity */}
                    <div className="col-span-12 md:col-span-7 md:row-span-2 bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-[#EDF2F7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-center">
                        <h1
                            className="text-[2rem] md:text-[2.75rem] leading-[1.15] font-semibold text-[#2D3748] mb-2 tracking-[-0.5px] whitespace-nowrap"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            Raed Nadim Aboul Hosn
                        </h1>
                        <p
                            className="text-[1.25rem] italic text-[#4A9B9B] mb-8"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            {t('about.role')}
                        </p>
                        <p className="text-[1.0625rem] leading-[1.7] text-[#4A5568] mb-6 max-w-[420px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            {t('about.tagline').split('**').map((part, i) =>
                                i % 2 === 1 ? <strong key={i} className="font-semibold text-[#2D3748]">{part}</strong> : part
                            )}
                        </p>
                        <div className="flex items-center gap-2 text-[0.9375rem] text-[#718096] mb-8" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            <MapPin className="w-[18px] h-[18px] text-[#4A9B9B]" strokeWidth={2} />
                            <span>{t('about.location')}</span>
                        </div>

                        {/* Social Links */}
                        <nav className="flex gap-4 mt-auto" aria-label="Social media links">
                            {socialLinks.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="w-11 h-11 flex items-center justify-center rounded-lg text-[#718096] hover:bg-[#E8F4F4] hover:text-[#4A9B9B] hover:border-[#E8F4F4] border border-transparent transition-all duration-150"
                                >
                                    <link.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Tile 3: Academic Foundation */}
                    <div className="col-span-12 md:col-span-4 bg-[#F5FAFA] rounded-2xl p-8 border border-[#E8F4F4] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="flex items-center gap-2 mb-6">
                            <GraduationCap className="w-4 h-4 text-[#4A9B9B]" strokeWidth={2} />
                            <span className="text-[10px] uppercase tracking-[2px] font-semibold text-[#4A9B9B]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Academic Foundation
                            </span>
                        </div>

                        <h2 className="text-[1.125rem] font-semibold text-[#2D3748] mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            B.S. Computer Science
                        </h2>
                        <p className="text-[0.9375rem] text-[#4A5568] mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            CESUPA, Brazil • Class of 2000
                        </p>

                        <div className="w-10 h-px bg-[#4A9B9B] opacity-30 mb-4"></div>

                        <span className="text-[10px] uppercase tracking-[1.5px] font-semibold text-[#4A9B9B] block mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Thesis
                        </span>
                        <p
                            className="text-[1.125rem] italic text-[#2D3748]"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            "Immersive Virtual Reality"
                        </p>
                    </div>

                    {/* Tile 4: Readers Counter */}
                    <div
                        ref={elementRef as any}
                        className="col-span-6 md:col-span-4 bg-white rounded-2xl p-8 shadow-sm border border-[#EDF2F7] flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <BookOpen className="w-7 h-7 text-[#A0AEC0] mb-4" strokeWidth={2} />
                        <span
                            className="text-[3rem] font-semibold text-[#4A9B9B] leading-none mb-2"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            {formatNumber(count)}
                        </span>
                        <span className="text-[11px] uppercase tracking-[1.5px] font-medium text-[#A0AEC0]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Readers
                        </span>
                        <span className="text-[12px] text-[#718096] mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            since January 2006
                        </span>
                    </div>

                    {/* Tile 5: Resume Download */}
                    <div className="col-span-6 md:col-span-4 bg-[#4A9B9B] rounded-2xl p-8 text-white flex flex-col transition-all duration-300 hover:bg-[#2D7575] hover:-translate-y-1 hover:shadow-xl">
                        <div className="flex justify-between items-start mb-auto">
                            <div>
                                <span className="text-[10px] uppercase tracking-[2px] font-semibold opacity-80" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                    Résumé
                                </span>
                                <p
                                    className="text-[1.75rem] font-medium mt-1"
                                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                >
                                    PDF
                                </p>
                            </div>
                            <FileText className="w-8 h-8 opacity-70" strokeWidth={1.5} />
                        </div>

                        <p className="text-[0.875rem] opacity-70 mb-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            v2.4 • Jan 2026
                        </p>

                        <a
                            href="https://raw.githubusercontent.com/raidhosn/resume/main/Raed-Hosn-Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Download Raed's resume PDF"
                            className="flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white py-3.5 px-6 rounded-lg font-medium text-[0.9375rem] transition-all duration-150"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            Download
                            <Download className="w-[18px] h-[18px]" strokeWidth={2} />
                        </a>
                    </div>

                    {/* Tile 6: Career Journey Timeline */}
                    <div className="col-span-12 bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-[#EDF2F7] mt-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className="flex items-center gap-2 mb-10">
                            <Clock className="w-[18px] h-[18px] text-[#4A9B9B]" strokeWidth={2} />
                            <span className="text-[10px] uppercase tracking-[2px] font-semibold text-[#4A9B9B]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Career Journey
                            </span>
                        </div>

                        {/* Desktop Timeline (Horizontal) */}
                        <div className="hidden md:flex justify-between items-start relative pt-4">
                            {/* Timeline Line */}
                            <div
                                className="absolute top-6 left-0 right-0 h-0.5 z-0"
                                style={{ background: 'linear-gradient(90deg, #4A9B9B 0%, #E8F4F4 100%)' }}
                            ></div>

                            {timeline.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center text-center relative z-10 flex-1 max-w-[140px] group cursor-default"
                                >
                                    {/* Dot */}
                                    <div className={cn(
                                        "w-3 h-3 rounded-full border-[3px] border-white bg-[#4A9B9B] mb-4 shadow-[0_0_0_3px_#E8F4F4] transition-all duration-200 group-hover:scale-125",
                                        (idx === 0 || idx === timeline.length - 1) && "w-4 h-4"
                                    )}></div>

                                    <span
                                        className="text-[1.25rem] font-semibold text-[#2D3748] mb-1 group-hover:text-[#4A9B9B] transition-colors"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {item.year}
                                    </span>
                                    <span className="text-[0.8125rem] font-medium text-[#4A5568]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {item.company}
                                    </span>
                                    <span className="text-[0.75rem] text-[#718096]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {item.role}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Timeline (Wrapped Grid) */}
                        <div className="md:hidden flex flex-wrap gap-6 justify-center">
                            {timeline.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center text-center w-[calc(33.333%-1rem)]"
                                >
                                    <div className={cn(
                                        "w-3 h-3 rounded-full bg-[#4A9B9B] mb-3",
                                        (idx === 0 || idx === timeline.length - 1) && "w-4 h-4"
                                    )}></div>

                                    <span
                                        className="text-[1.25rem] font-semibold text-[#2D3748] mb-1"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {item.year}
                                    </span>
                                    <span className="text-[0.8125rem] font-medium text-[#4A5568]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {item.company}
                                    </span>
                                    <span className="text-[0.75rem] text-[#718096]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {item.role}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutAuthor;
