import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubSection {
  id: string;
  title: string;
  href: string;
}

interface Chapter {
  id: string;
  number: string;
  title: string;
  href: string;
  subsections?: SubSection[];
}

const thesisChapters: Chapter[] = [
  {
    id: 'intro',
    number: '1',
    title: 'Introduction',
    href: '#introduction',
    subsections: [
      { id: 'intro-1', title: '1.1 Background & Motivation', href: '#background' },
      { id: 'intro-2', title: '1.2 Research Objectives', href: '#objectives' },
      { id: 'intro-3', title: '1.3 Thesis Structure', href: '#structure' },
    ],
  },
  {
    id: 'literature',
    number: '2',
    title: 'Literature Review',
    href: '#literature',
    subsections: [
      { id: 'lit-1', title: '2.1 Virtual Reality Foundations', href: '#vr-foundations' },
      { id: 'lit-2', title: '2.2 Immersive Technologies', href: '#immersive-tech' },
      { id: 'lit-3', title: '2.3 Human-Computer Interaction', href: '#hci' },
      { id: 'lit-4', title: '2.4 Prior Research Analysis', href: '#prior-research' },
    ],
  },
  {
    id: 'methodology',
    number: '3',
    title: 'Methodology',
    href: '#methodology',
    subsections: [
      { id: 'meth-1', title: '3.1 Research Design', href: '#research-design' },
      { id: 'meth-2', title: '3.2 System Architecture', href: '#architecture' },
      { id: 'meth-3', title: '3.3 Implementation Details', href: '#implementation' },
    ],
  },
  {
    id: 'results',
    number: '4',
    title: 'Results & Analysis',
    href: '#results',
    subsections: [
      { id: 'res-1', title: '4.1 Experimental Results', href: '#experimental' },
      { id: 'res-2', title: '4.2 Performance Metrics', href: '#metrics' },
      { id: 'res-3', title: '4.3 User Study Findings', href: '#user-study' },
    ],
  },
  {
    id: 'conclusion',
    number: '5',
    title: 'Conclusion',
    href: '#conclusion',
    subsections: [
      { id: 'conc-1', title: '5.1 Summary of Contributions', href: '#contributions' },
      { id: 'conc-2', title: '5.2 Future Work', href: '#future-work' },
    ],
  },
];

interface ThesisSidebarProps {
  className?: string;
}

export function ThesisSidebar({ className }: ThesisSidebarProps) {
  const [activeChapterId, setActiveChapterId] = useState<string>('literature');
  const [activeSubsectionId, setActiveSubsectionId] = useState<string>('lit-2');
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set(['literature'])
  );

  const toggleChapter = (chapterId: string, hasSubsections: boolean) => {
    if (hasSubsections) {
      setExpandedChapters((prev) => {
        const next = new Set(prev);
        if (next.has(chapterId)) {
          next.delete(chapterId);
        } else {
          next.add(chapterId);
        }
        return next;
      });
    } else {
      setActiveChapterId(chapterId);
      setActiveSubsectionId('');
    }
  };

  const handleSubsectionClick = (chapterId: string, subsectionId: string) => {
    setActiveChapterId(chapterId);
    setActiveSubsectionId(subsectionId);
  };

  return (
    <aside
      role="navigation"
      aria-label="Thesis chapters"
      className={cn(
        'flex h-screen w-72 flex-col border-r border-sidebar-border bg-white',
        className
      )}
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {/* Header */}
      <header className="px-3 pt-2.5 pb-1">
        <h2 
          className="text-lg font-bold text-gray-900 leading-tight tracking-normal m-0"
          style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 700, lineHeight: 1.3 }}
        >
          Table of Contents
        </h2>
      </header>

      {/* Navigation - compact */}
      <nav className="flex-1 overflow-y-auto p-0 m-0">
        <ul className="m-0 p-0 list-none">
          {thesisChapters.map((chapter) => {
            const isActive = activeChapterId === chapter.id;
            const isExpanded = expandedChapters.has(chapter.id);
            const hasSubsections = chapter.subsections && chapter.subsections.length > 0;

            return (
              <li key={chapter.id} className="m-0 p-0">
                {/* Chapter Button - compact 40px */}
                <button
                  onClick={() => toggleChapter(chapter.id, !!hasSubsections)}
                  aria-expanded={hasSubsections ? isExpanded : undefined}
                  data-active={isActive}
                  className={cn(
                    'w-full h-10 px-3 py-2.5 m-0',
                    'flex items-center gap-1.5',
                    'text-[15px] font-normal text-[#374151]',
                    'cursor-pointer transition-all duration-150 ease-out',
                    'hover:text-teal-600 hover:bg-teal-50/50',
                    'focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-1',
                    isActive && 'text-teal-600'
                  )}
                >
                  {/* Chapter number */}
                  <span>{chapter.number}.</span>
                  
                  {/* Chapter title */}
                  <span className="flex-1 text-left">
                    {chapter.title}
                  </span>

                  {/* Chevron icon */}
                  {hasSubsections && (
                    <ChevronRight
                      className={cn(
                        'h-4 w-4 shrink-0 transition-transform duration-200',
                        isExpanded && 'rotate-90',
                        isActive ? 'text-teal-600' : 'text-gray-400'
                      )}
                    />
                  )}
                </button>

                {/* Subsections - compact */}
                {hasSubsections && isExpanded && (
                  <div className="ml-2.5 border-l-2 border-[#e5e5e5] m-0 p-0">
                    <ul className="m-0 p-0 list-none">
                      {chapter.subsections!.map((sub) => {
                        const isSubActive = activeSubsectionId === sub.id;
                        
                        return (
                          <li key={sub.id} className="m-0 p-0">
                            <button
                              onClick={() => handleSubsectionClick(chapter.id, sub.id)}
                              data-active={isSubActive}
                              className={cn(
                                'w-full h-9 py-2 pr-3 pl-[18px] m-0 -ml-0.5',
                                'flex items-center',
                                'text-sm font-normal text-[#6b7280]',
                                'border-l-2 border-transparent',
                                'cursor-pointer transition-all duration-150 ease-out',
                                'hover:text-teal-600 hover:bg-teal-50/50',
                                'focus:outline-none focus:ring-2 focus:ring-sidebar-ring focus:ring-offset-1',
                                isSubActive && 'text-teal-600 bg-teal-50/30 border-l-teal-600'
                              )}
                            >
                              <span>{sub.title}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <footer className="border-t border-sidebar-border px-3 py-2">
        <p className="text-center text-sidebar-muted text-sm m-0">
          CESUPA — Computer Science
        </p>
      </footer>
    </aside>
  );
}

export default ThesisSidebar;
