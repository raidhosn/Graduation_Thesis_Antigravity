import { Download, ExternalLink, Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

interface LivingResumeCardProps {
    thumbnailSrc?: string;
    resumePdfUrl?: string;
    resumeOnlineUrl?: string;
    title?: string;
    roleContext?: string;
    downloadFilename?: string;
}

type DownloadState = "idle" | "downloading" | "done";

const LivingResumeCard = ({
    thumbnailSrc,
    resumePdfUrl = "/Raed_Nadim_Aboul_Hosn_Resume.pdf",
    resumeOnlineUrl,
    title = "Professional Resume",
    roleContext = "Cloud & AI Engineering",
    downloadFilename = "Raed-Nadim-Aboul-Hosn-Resume.pdf",
}: LivingResumeCardProps) => {
    const [downloadState, setDownloadState] = useState<DownloadState>("idle");
    const downloadRef = useRef<HTMLAnchorElement>(null);

    // Three-phase download flow
    const handleDownload = () => {
        setDownloadState("downloading");
        setTimeout(() => {
            downloadRef.current?.click();
            setTimeout(() => {
                setDownloadState("done");
                setTimeout(() => setDownloadState("idle"), 1500);
            }, 300);
        }, 250);
    };

    // View Online handler
    const handleViewOnline = () => {
        const target = resumeOnlineUrl || resumePdfUrl;
        window.open(target, "_blank", "noopener,noreferrer");
    };

    // Download button content based on state
    const getDownloadButtonContent = () => {
        switch (downloadState) {
            case "downloading":
                return (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                        Preparing…
                    </>
                );
            case "done":
                return (
                    <>
                        <Check className="w-4 h-4" strokeWidth={2.5} />
                        Downloaded
                    </>
                );
            default:
                return (
                    <>
                        <Download className="w-4 h-4" strokeWidth={2.5} />
                        PDF
                    </>
                );
        }
    };

    return (
        <motion.div
            className="col-span-6 md:col-span-4 bg-white rounded-2xl p-6 shadow-sm border border-[#EDF2F7] flex flex-col min-h-[280px] transition-all duration-200 hover:-translate-y-1 hover:shadow-xl group relative overflow-hidden"
            whileHover={{ scale: 1.005 }}
        >
            {/* Teal gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a7a85]/[0.03] to-[#2a7a85]/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none rounded-2xl" />

            {/* Content wrapper */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Non-Interactive Thumbnail Preview */}
                <div className="mb-4 flex justify-center pointer-events-none user-select-none" aria-hidden="true">
                    {thumbnailSrc ? (
                        <div className="relative w-[160px] h-[100px] rounded-lg overflow-hidden border border-black/8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-200">
                            <motion.img
                                src={thumbnailSrc}
                                alt=""
                                className="w-full h-full object-cover object-top"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            />
                            {/* Bottom fade-out gradient */}
                            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        </div>
                    ) : (
                        <div className="relative w-[160px] h-[100px] rounded-lg bg-gray-50 border border-black/8 shadow-[0_2px_8px_rgba(0,0,0,0.06)] group-hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-200 p-3 flex flex-col gap-1.5">
                            <motion.div
                                className="w-full"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                            >
                                {/* Teal accent bar */}
                                <div className="w-full h-1.5 bg-[#2a7a85] rounded-sm mb-2" />
                                {/* Faint gray lines */}
                                <div className="w-3/4 h-0.5 bg-gray-300 rounded-sm mb-1" />
                                <div className="w-full h-0.5 bg-gray-300 rounded-sm mb-1" />
                                <div className="w-5/6 h-0.5 bg-gray-300 rounded-sm mb-2" />
                                <div className="w-full h-0.5 bg-gray-300 rounded-sm mb-1" />
                                <div className="w-4/5 h-0.5 bg-gray-300 rounded-sm mb-1" />
                                <div className="w-full h-0.5 bg-gray-300 rounded-sm mb-2" />
                                <div className="w-2/3 h-0.5 bg-gray-300 rounded-sm" />
                            </motion.div>
                            {/* Bottom fade-out gradient */}
                            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                        </div>
                    )}
                </div>

                {/* Title */}
                <h3
                    className="text-center text-lg font-semibold text-[#1f2937] mb-3"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                    {title}
                </h3>

                {/* Latest Version Indicator */}
                <div className="flex items-center justify-center gap-1.5 mb-6">
                    <div
                        className="w-2 h-2 rounded-full bg-[#14b8a6]"
                        style={{
                            animation: 'resumePulse 2.5s ease-in-out infinite',
                        }}
                        aria-hidden="true"
                    />
                    <span
                        className="text-[13px] font-medium text-[#6b7280]"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Latest Version
                    </span>
                </div>

                {/* Action Buttons */}
                <div className={`flex gap-3 mb-4 ${resumeOnlineUrl ? '' : ''}`}>
                    {/* PDF Download Button */}
                    <motion.button
                        onClick={handleDownload}
                        disabled={downloadState !== "idle"}
                        aria-label="Download resume as PDF"
                        className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#2a7a85] focus:ring-offset-2 ${resumeOnlineUrl ? 'flex-1' : 'w-full'
                            } ${downloadState === "idle"
                                ? "bg-[#2a7a85] hover:bg-[#0d9488] text-white cursor-pointer"
                                : downloadState === "downloading"
                                    ? "bg-[#0f766e] text-white cursor-wait"
                                    : "bg-[#059669] text-white cursor-default"
                            }`}
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                        whileTap={downloadState === "idle" ? { scale: 0.97 } : {}}
                    >
                        {getDownloadButtonContent()}
                    </motion.button>

                    {/* View Online Button (conditional) */}
                    {resumeOnlineUrl && (
                        <motion.button
                            onClick={handleViewOnline}
                            aria-label="View resume online in a new tab"
                            className="relative flex-1 inline-flex items-center justify-center gap-2 border-2 border-[#2a7a85] text-[#2a7a85] py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-200 overflow-hidden group/btn focus:outline-none focus:ring-2 focus:ring-[#2a7a85] focus:ring-offset-2"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {/* Sliding background */}
                            <div className="absolute inset-0 bg-[#2a7a85] transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out" />
                            <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white flex items-center gap-2">
                                <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                                View Online
                            </span>
                        </motion.button>
                    )}
                </div>

                {/* Metadata Line */}
                <div className="text-center mt-auto">
                    <p
                        className="text-xs text-[#9ca3af] tracking-wide opacity-50 group-hover:opacity-70 transition-opacity duration-200"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        {roleContext} · PDF
                    </p>
                </div>
            </div>

            {/* Hidden download anchor */}
            <a
                ref={downloadRef}
                href={resumePdfUrl}
                download={downloadFilename}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
            />

            {/* CSS for pulse animation */}
            <style>{`
        @keyframes resumePulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.4);
          }
        }
      `}</style>
        </motion.div>
    );
};

export default LivingResumeCard;
