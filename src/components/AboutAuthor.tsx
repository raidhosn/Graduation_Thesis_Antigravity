import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from "react-i18next";
import {
    MapPin,
    Mail,
    Github,
    Linkedin,
    BookOpen,
    GraduationCap,
    Clock
} from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import profilePhoto from "@/assets/profile-photo.jpg";
import LivingResumeCard from "./LivingResumeCard";

// Check for reduced motion preference
const prefersReducedMotion = () => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

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
    const targetCount = 12847;
    const duration = 2000;

    // Initialize count based on reduced motion preference
    const [count, setCount] = useState(() => prefersReducedMotion() ? targetCount : 0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const counterRef = useRef<HTMLDivElement>(null);

    const { elementRef, isVisible } = useIntersectionObserver({
        threshold: 0.5,
        triggerOnce: true
    });

    // Combine refs for the counter tile
    const setRefs = useCallback((node: HTMLDivElement | null) => {
        counterRef.current = node;
        (elementRef as React.MutableRefObject<HTMLElement | null>).current = node;
    }, [elementRef]);

    useEffect(() => {
        // Skip animation if already animated or user prefers reduced motion
        if (!isVisible || hasAnimated || prefersReducedMotion()) {
            if (isVisible && !hasAnimated) {
                setCount(targetCount);
                setHasAnimated(true);
            }
            return;
        }

        setHasAnimated(true);
        let startTime: number | null = null;
        let animationId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * targetCount));
            if (progress < 1) {
                animationId = requestAnimationFrame(animate);
            }
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isVisible, hasAnimated]);

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
        { year: "2000", company: "CESUPA University", role: "Graduated with a Bachelor of Science in Computer Science" },
        { year: "2005", company: "Microsoft", role: "Xbox Games Software Test Engineer" },
        { year: "2006", company: "Dell Computers", role: "Trilingual Complex Systems Senior Analyst" },
        { year: "2009", company: "Microsoft", role: "Trilingual Partner Technical Consultant | Pre-Sales Consultant" },
        { year: "2011", company: "IBM", role: "SCCM Engineer | Software Distribution & Infrastructure Support" },
        { year: "2015", company: "Al Jabal Hospital", role: "Senior Information Technology Specialist" },
        { year: "2017", company: "Apollo Hair System", role: "E-Commerce Architect | Platform Engineer" },
        { year: "Present", company: "Microsoft", role: "Senior Trilingual Azure Support Engineer", isCurrent: true },
    ];

    return (
        <section
            className="py-20 bg-[#FAFBFC] overflow-hidden"
            aria-labelledby="about-heading"
        >
            <div className="container mx-auto px-4 md:px-6 max-w-[1200px]">
                {/* Section Header */}
                <div className="flex flex-col items-center mb-16">
                    <div className="flex items-center gap-4">
                        <div className="h-px bg-[#E2E8F0] w-10 md:w-12" aria-hidden="true"></div>
                        <h2
                            id="about-heading"
                            className="text-[11px] uppercase tracking-[3px] font-semibold text-[#64748B]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        >
                            {t('about.title')}
                        </h2>
                        <div className="h-px bg-[#E2E8F0] w-10 md:w-12" aria-hidden="true"></div>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-6">

                    {/* Tile 1: Photo (spans 2 rows on desktop) */}
                    <div className="col-span-12 md:col-span-5 md:row-span-2 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0">
                        <figure
                            className="w-full h-full min-h-[280px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[480px] relative bg-gradient-to-b from-[#0a1628] via-[#1a2744] to-[#0d1a2d]"
                            role="img"
                            aria-label="Professional portrait of Raed Nadim Aboul Hosn, Computer Scientist, wearing a blue suit against a navy background"
                        >
                            <img
                                src={profilePhoto}
                                alt=""
                                className="w-full h-full object-contain object-center transition-transform duration-300 motion-reduce:transition-none hover:scale-[1.02]"
                                loading="lazy"
                            />
                        </figure>
                    </div>

                    {/* Tile 2: Identity */}
                    <div className="col-span-12 md:col-span-7 md:row-span-2 bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-[#EDF2F7] transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0 flex flex-col justify-center">
                        <h1
                            className="text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.15] font-semibold text-[#2D3748] mb-2 tracking-[-0.5px]"
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
                                    className="w-11 h-11 flex items-center justify-center rounded-lg text-[#718096] hover:bg-[#E8F4F4] hover:text-[#4A9B9B] hover:border-[#E8F4F4] border border-transparent transition-all duration-150 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A9B9B] focus-visible:ring-offset-2"
                                >
                                    <link.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Tile 3: Academic Foundation */}
                    <div className="col-span-12 md:col-span-4 bg-[#F5FAFA] rounded-2xl p-8 border border-[#E8F4F4] transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0">
                        <div className="flex items-center gap-2 mb-6">
                            <GraduationCap className="w-4 h-4 text-[#4A9B9B]" strokeWidth={2} aria-hidden="true" />
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
                        ref={setRefs}
                        className="col-span-6 md:col-span-4 bg-white rounded-2xl p-8 shadow-sm border border-[#EDF2F7] flex flex-col items-center justify-center text-center transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        <BookOpen className="w-7 h-7 text-[#64748B] mb-4" strokeWidth={2} aria-hidden="true" />
                        <span
                            className="text-[clamp(2rem,6vw,3rem)] font-semibold text-[#4A9B9B] leading-none mb-2"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            {formatNumber(count)}
                        </span>
                        <span className="text-[11px] uppercase tracking-[1.5px] font-medium text-[#64748B]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Readers
                        </span>
                        <span className="text-[12px] text-[#64748B] mt-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            since January 2006
                        </span>
                    </div>

                    {/* Tile 5: Resume Download - Living Document Card */}
                    <LivingResumeCard
                        resumePdfUrl="https://raw.githubusercontent.com/raidhosn/resume/main/Raed-Hosn-Resume.pdf"
                        title={t('about.resumeTitle')}
                        roleContext={t('about.resumeRoleContext')}
                        version={t('about.resumeVersion')}
                    />

                    {/* Tile 6: Career Journey Timeline */}
                    <div className="col-span-12 bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-[#EDF2F7] mt-2 transition-all duration-300 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0">
                        <div className="flex items-center gap-2 mb-10">
                            <Clock className="w-[18px] h-[18px] text-[#4A9B9B]" strokeWidth={2} aria-hidden="true" />
                            <span className="text-[10px] uppercase tracking-[2px] font-semibold text-[#4A9B9B]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                Career Journey
                            </span>
                        </div>

                        {/* Desktop Timeline (Horizontal) */}
                        <div className="hidden md:flex justify-between items-start relative px-6" role="list" aria-label="Career timeline">
                            {/* Timeline Line */}
                            <div
                                className="absolute top-6 left-0 right-0 h-0.5 z-0 mx-14"
                                style={{ background: 'linear-gradient(90deg, #4A9B9B 0%, #E8F4F4 100%)' }}
                                aria-hidden="true"
                            ></div>

                            {timeline.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-col items-center text-center relative z-10 flex-1 group cursor-default"
                                    role="listitem"
                                >
                                    {/* Dot */}
                                    <div
                                        className={cn(
                                            "w-3 h-3 rounded-full border-[3px] border-white bg-[#4A9B9B] mb-5 shadow-[0_0_0_3px_#E8F4F4] transition-all duration-200 motion-reduce:transition-none group-hover:scale-125 motion-reduce:group-hover:scale-100",
                                            (idx === 0 || item.isCurrent) && "w-4 h-4"
                                        )}
                                        aria-hidden="true"
                                    ></div>

                                    <span
                                        className="text-[1.125rem] font-bold text-[#2D3748] mb-1 group-hover:text-[#4A9B9B] transition-colors motion-reduce:transition-none whitespace-nowrap"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        {item.year}
                                    </span>
                                    <span className="text-[0.8125rem] font-bold text-[#2D3748] mb-1.5 px-2" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {item.company}
                                    </span>
                                    <span className="text-[0.625rem] text-[#64748B] leading-relaxed font-medium px-1 max-w-[130px] hidden lg:block" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                        {item.role}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Timeline (Vertical) */}
                        <div className="md:hidden flex flex-col gap-10 pl-4" role="list" aria-label="Career timeline">
                            {timeline.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex gap-6 relative"
                                    role="listitem"
                                >
                                    {/* Vertical Line */}
                                    {idx !== timeline.length - 1 && (
                                        <div className="absolute left-[7px] top-6 bottom-[-32px] w-0.5 bg-[#E8F4F4]" aria-hidden="true"></div>
                                    )}

                                    <div
                                        className={cn(
                                            "w-4 h-4 rounded-full border-[3px] border-white bg-[#4A9B9B] relative z-10 shrink-0 mt-1 shadow-[0_0_0_2px_#E8F4F4]",
                                            item.isCurrent && "bg-[#2D7575]"
                                        )}
                                        aria-hidden="true"
                                    ></div>

                                    <div className="flex flex-col text-left">
                                        <span
                                            className="text-[1.125rem] font-bold text-[#2D3748] mb-0.5"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            {item.year}
                                        </span>
                                        <span className="text-[0.875rem] font-bold text-[#2D3748] mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {item.company}
                                        </span>
                                        <span className="text-[0.75rem] text-[#64748B] leading-snug font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {item.role}
                                        </span>
                                    </div>
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
