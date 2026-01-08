import React from 'react';
import { ThesisSidebar } from '@/components/ThesisSidebar';

export function ThesisPage() {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Fixed Sidebar */}
      <ThesisSidebar className="fixed left-0 top-0" />

      {/* Main Content Area */}
      <main className="ml-72 flex-1 px-8 py-8">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-foreground">
              Immersive Virtual Reality
            </h1>
            <p className="text-lg text-muted-foreground">
              A Comprehensive Study of Virtual Environment Technologies
            </p>
          </header>

          {/* Active Chapter Display */}
          <section className="mb-8 rounded-lg border border-border bg-card p-6">
            <p className="text-sm font-medium text-primary">
              Currently viewing
            </p>
            <h2 className="mt-1 border-none pb-0">
              Chapter 2: Literature Review
            </h2>
            <p className="mt-2 text-muted-foreground">
              Section 2.2 — Immersive Technologies
            </p>
          </section>

          {/* Placeholder Content */}
          <article className="prose prose-lg">
            <h2>2.2 Immersive Technologies</h2>
            
            <p className="lead-paragraph">
              Immersive technologies represent a fundamental shift in how humans interact 
              with digital information and virtual environments. This section explores the 
              core technologies that enable immersive experiences.
            </p>

            <p>
              Virtual reality systems have evolved significantly since their inception in 
              the 1960s. Early systems were primarily research tools, confined to 
              laboratories and military applications. However, advances in computing power, 
              display technology, and motion tracking have made immersive experiences 
              increasingly accessible to broader audiences.
            </p>

            <h3>2.2.1 Display Technologies</h3>

            <p>
              Head-mounted displays (HMDs) remain the primary delivery mechanism for 
              immersive virtual reality experiences. These devices place screens directly 
              in front of the user's eyes, creating a stereoscopic view that simulates 
              depth perception. Modern HMDs achieve resolutions exceeding 1080p per eye, 
              with refresh rates of 90Hz or higher to minimize motion sickness.
            </p>

            <p>
              CAVE (Cave Automatic Virtual Environment) systems offer an alternative 
              approach, projecting images onto the walls, floor, and ceiling of a room-sized 
              cube. Users wear lightweight stereo glasses and can move freely within the 
              space, making CAVE systems particularly suitable for collaborative experiences 
              and architectural visualization.
            </p>

            <h3>2.2.2 Tracking Systems</h3>

            <p>
              Accurate tracking of user position and orientation is essential for 
              maintaining the illusion of presence in virtual environments. Six degrees 
              of freedom (6DoF) tracking captures both position (x, y, z) and rotation 
              (pitch, yaw, roll), enabling natural movement within virtual spaces.
            </p>

            <p>
              Optical tracking systems use cameras to detect markers or features on 
              tracked objects. Inside-out tracking, where cameras are mounted on the 
              headset itself, has become increasingly popular due to its simplicity 
              and lack of external hardware requirements.
            </p>

            <h3>2.2.3 Input Devices</h3>

            <p>
              Hand tracking and haptic feedback devices bridge the gap between physical 
              and virtual worlds. Data gloves capture finger movements, allowing users 
              to manipulate virtual objects with natural gestures. Force feedback systems 
              provide resistance and texture sensations, enhancing the sense of presence 
              and enabling precise manipulation tasks.
            </p>
          </article>

          {/* Navigation Footer */}
          <footer className="mt-12 flex items-center justify-between border-t border-border pt-6">
            <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              ← Previous: 2.1 VR Foundations
            </button>
            <button className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              Next: 2.3 Human-Computer Interaction →
            </button>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default ThesisPage;
