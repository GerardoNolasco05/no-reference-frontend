import { useEffect, useState } from "react";

/** Minimal, safe typewriter (no 'undefined' issues) */
function Typewriter({
  text = "",
  speed = 14,
  startDelay = 0,
  className = "",
  cursorClass = "",
}: {
  text?: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  cursorClass?: string;
}) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setOut("");
    setDone(false);

    if (!text) return;

    let i = 0;
    let interval: number | undefined;
    const timer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        const ch = text.charAt(i);
        if (!ch) {
          window.clearInterval(interval);
          setDone(true);
          return;
        }
        setOut((prev) => prev + ch);
        i++;
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timer);
      if (interval) window.clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      {out}
      <span className={`${done ? "invisible" : "animate-pulse"} ${cursorClass}`}>
        ▋
      </span>
    </span>
  );
}

/** Contact form with faster typing */
function ContactForm({ startDelay = 0 }: { startDelay?: number }) {
  const headerSpeed = 18; // faster
  const labelSpeed = 12;  // faster
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShowForm(true), startDelay + 250);
    return () => window.clearTimeout(t);
  }, [startDelay]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="mt-6">
      {/* Code-like header */}
      <div className="mb-2 font-mono text-[14px] text-red-300">
        <Typewriter
          text={`let contactForm = {`}
          speed={headerSpeed}
          startDelay={startDelay}
          cursorClass="text-red-300"
        />
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="pl-6 space-y-3 font-mono text-neutral-200">
          <div>
            <div className="text-[12px] mb-1">
              <Typewriter text={`name:`} speed={labelSpeed} startDelay={startDelay + 300} />
            </div>
            <input
              type="text"
              name="name"
              className="w-full bg-transparent border border-neutral-800 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-600"
              placeholder="Your name"
              autoComplete="name"
            />
          </div>

          <div>
            <div className="text-[12px] mb-1">
              <Typewriter text={`email:`} speed={labelSpeed} startDelay={startDelay + 420} />
            </div>
            <input
              type="email"
              name="email"
              className="w-full bg-transparent border border-neutral-800 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-600"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <div className="text-[12px] mb-1">
              <Typewriter text={`message:`} speed={labelSpeed} startDelay={startDelay + 540} />
            </div>
            <textarea
              name="message"
              rows={4}
              className="w-full bg-transparent border border-neutral-800 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-600"
              placeholder="Write your message…"
            />
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className="rounded px-4 py-2 border border-neutral-700 hover:bg-neutral-900 transition"
            >
              Send
            </button>
          </div>
        </form>
      )}

      {/* Closing brace */}
      <div className="mt-2 font-mono text-[14px] text-white">
        <Typewriter
          text={`}`}
          speed={headerSpeed}
          startDelay={startDelay + 900}
          cursorClass="text-white"
        />
      </div>
    </div>
  );
}

/** Privacy policy block with fast typing */
function PrivacyPolicy({ startDelay = 0 }: { startDelay?: number }) {
  const policyText = `Privacy Policy
Effective Date: January 1, 2026

At No Reference, your privacy is important to us. This Privacy Policy applies to all of our services, including our website and any applications for smartphones, tablets, or other devices.

1. No Data Collection
We want to be completely transparent: We do not collect, store, or share any personal data or information of any kind.

2. No Third-Party Sharing
Because we do not collect any data, we do not and cannot share your information with any third party—whether for advertising, analytics, or any other purpose.

3. Security
Although we do not process any personal information, we are committed to keeping our website and applications secure and free from malicious code or vulnerabilities.

4. Children's Privacy
Since we do not collect any information, our services are safe for users of all ages, including children. We comply with applicable privacy regulations, including COPPA.

5. Changes to This Policy
If No Reference ever decides to collect any data in the future, this Privacy Policy will be updated, and users will be given clear notice and options. We encourage users to review this policy periodically for any changes.

6. Contact Us
If you have any questions or concerns about this Privacy Policy, you can contact us at:
info@noreference.art`;
  return (
    <div className="mt-6 pl-6 font-mono text-[12.5px] text-neutral-200 whitespace-pre-wrap">
      <Typewriter text={policyText} speed={8} startDelay={startDelay} />
    </div>
  );
}

/** Column (About/Projects/Team) */
function Column({
  variableName,
  body,
  delay = 0,
}: {
  variableName: string;
  body: string;
  delay?: number;
}) {
  const header = `let ${variableName} = "`;
  const bodySpeed = 12;
  const headerSpeed = 28;
  const closeQuoteDelay = delay + 350 + body.length * bodySpeed;

  // Buttons + toggles only for the left column
  const [showContact, setShowContact] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  return (
    <section className="h-screen overflow-y-auto no-scrollbar p-5 md:p-6">
      <div className="mb-2 font-mono text-[14px] text-red-300">
        <Typewriter
          text={header}
          speed={headerSpeed}
          startDelay={delay}
          cursorClass="text-red-300"
        />
      </div>

      <pre className="font-mono text-[12.5px] leading-loose text-neutral-200 whitespace-pre-wrap pl-6">
        <Typewriter text={body} speed={bodySpeed} startDelay={delay + 350} />
      </pre>

      <div className="mt-2 font-mono text-[14px] text-white">
        <Typewriter
          text={``}
          speed={headerSpeed}
          startDelay={closeQuoteDelay}
          cursorClass="text-white"
        />
      </div>

      {/* Buttons appear AFTER the body only in aboutText column */}
      {variableName === "aboutText" && (
        <div className="mt-6 pl-6 font-mono text-sm text-neutral-300">
          <div className="flex gap-6">
            <button
              onClick={() => {
                setShowContact((p) => !p);
                setShowPolicy(false);
              }}
              className="hover:text-red-400 transition"
            >
              <Typewriter text="CONTACT" speed={18} startDelay={closeQuoteDelay + 200} />
            </button>

            <button
              onClick={() => {
                setShowPolicy((p) => !p);
                setShowContact(false);
              }}
              className="hover:text-red-400 transition"
            >
              <Typewriter text="PRIVACY POLICY" speed={18} startDelay={closeQuoteDelay + 250} />
            </button>
          </div>

          {showContact && <ContactForm startDelay={0} />}
          {showPolicy && <PrivacyPolicy startDelay={0} />}
        </div>
      )}
    </section>
  );
}

/* ---------- TEXT CONTENT ---------- */
const aboutBody = `
No Reference is an enmeshment of intertwined analogue and digital entities. Rooted in research and experimentation, it convenes a diverse constellation of actants to probe the capacities of art to summon possible presents.

Throughout our research we approach the territory as a living archive by analysing its symbiosis with organic, inorganic and digital agents and their environments in historical, contemporary, and speculative contexts. We aim to investigate instances in which these symbiotic systems have been used and abused throughout history and discuss the ramifications of these in political imaginaries.

We develop long-term Regenerative Research Projects: adaptive inquiries that do not merely observe entanglement but seek to renew cultural, ecological, and technological terrains. Regenerative research here signals cyclical growth, ethical attunement, and distributed knowledge-making—fostering practices that are responsive, transformative, and attuned to the urgencies of the present.
`;

const projectsBody = `
Each project unfurls through a seven-phase methodology:

1. Research — Emergence of a hypothesis, concept, or provocation, informed by notes, diagrams, and situated inquiry.

2. Metaphoric & Metonymic Processes — Extraction of the key metaphors, metonymies, and icons shaping the conceptual scaffold of the research.

3. Conclusions — Development of textual outputs, including essays and literary forms (such as fiction novels, fables, short stories, and so on) that synthesize findings and symbolic displacements.

4. Preliminary Art Process — Early-stage artistic probing; where speculative forms and visual logics are trialed and tensions articulated.

5. Comparative Poetic Testing — A phase of perceptual analysis and cognitive reception: how does the work resonate, affect, or disorient?

6. Final Art Process — Culmination of prior stages into a fully realized artwork, where conceptual frameworks and visual strategies crystallize.

7. Contemporary Souvenirs — Translation of core metaphors and icons into artistic artefacts (interventions, paintings, videos, sounds, installations, etc.)—objects of interpretation and carriers of residual knowledge beyond the textual.
`;

const teamBody = `
Each project within No Reference is developed through the collaboration of multiple actants with diverse cultural, territorial, and disciplinary backgrounds. These contributors bring different perspectives and methodologies into dialogue. Rather than adhering to fixed roles, actants engage in transversal exchanges that shape the process through mutual influence and adaptive entangled making.

This assembly of collaborators forms a dynamic, non-hierarchical network in which human and nonhuman agencies — including organic, inorganic, and digital forms — are regarded with equal ontological significance. Through this entangled approach, each project becomes an ecosystem of interdependent relationships where knowledge production is collective, emergent, and regenerative.

Our aim is to foster a framework where disciplinary boundaries dissolve, to enable speculative practices, critical inquiry and experimentation.

Actants = {
    "Gerardo Nolasco": "Multidisciplinary artist who coordinates all steps of the projects.",
    "Jose Magaña": "Cultural anthropologist who conducts the research for the projects.",
    "Hiyori Yoshida": "Experimental composer who develops the music and sound installations of the projects.",
    "Iska Dimalanta": "Coder and creative technologist supporting programming implementation.",
    "Soren Ravn": "Designer handling the implementation of visual design, 3D modelling, AR, and VR for the projects.",
    "Fenja Vollbrecht": "Provides scientific insights to the projects.",
    "Tobias Ziebell": "Industrial designer who develops all technical aspects of the project, from initial setups to final production.",
    "Lupita Ndlovu": "Speculative storyteller developing short stories and narrative elements.",
    "Gellert Rózsás": "Fictional filmmaker responsible for producing the videos and animations of the projects.",
    "János Kovács": "Specialized in contemporary and new media art, develops the conceptual framework for the exhibition of the projects."
}
`;

/* ---------- PAGE ---------- */
export default function Home() {
  return (
    <main className="h-screen overflow-hidden bg-black text-white grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-neutral-800">
      <Column variableName="aboutText" body={aboutBody} delay={0} />
      <Column variableName="projectsText" body={projectsBody} delay={200} />
      <Column variableName="teamText" body={teamBody} delay={400} />
    </main>
  );
}
