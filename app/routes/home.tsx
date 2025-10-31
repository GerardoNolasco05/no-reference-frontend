import { useState, useEffect } from "react";

const text = `
No Reference is an enmeshment of intertwined analogue and digital entities. Rooted in research and experimentation, it convenes a diverse constellation of actants to probe the capacities of art to summon possible presents.
Throughout our research we approach the territory as a living archive by analysing its symbiosis with organic, inorganic and digital agents and their environments in historical, contemporary, and speculative contexts. We aim to investigate instances in which these symbiotic systems have been used and abused throughout history and discuss the ramifications of these in political imaginaries.
We develop long-term Regenerative Research Projects: adaptive inquiries that do not merely observe entanglement but seek to renew cultural, ecological, and technological terrains. Regenerative research here signals cyclical growth, ethical attunement, and distributed knowledge-making—fostering practices that are responsive, transformative, and attuned to the urgencies of the present.
Each project unfurls through a seven-phase methodology:

1. Research — Emergence of a hypothesis, concept, or provocation, informed by notes, diagrams, and situated inquiry.
2. Metaphoric & Metonymic Processes — Extraction of the key metaphors, metonymies, and icons shaping the conceptual scaffold of the research.
3. Conclusions — Development of textual outputs, including essays and literary forms (such as fiction novels, fables, short stories, and so on) that synthesize findings and symbolic displacements.
4. Preliminary Art Process — Early-stage artistic probing; where speculative forms and visual logics are trialed and tensions articulated.
5. Comparative Poetic Testing — A phase of perceptual analysis and cognitive reception: how does the work resonate, affect, or disorient?
6. Final Art Process — Culmination of prior stages into a fully realized artwork, where conceptual frameworks and visual strategies crystallize.
7. Contemporary Souvenirs — Translation of core metaphors and icons into artistic artefacts (interventions, paintings, videos, sounds, installations, etc.)—objects of interpretation and carriers of residual knowledge beyond the textual.
`;

export default function Home() {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index >= text.length) clearInterval(interval);
    }, 10); // typing speed (ms)
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-mono text-sm leading-relaxed">
      <pre className="whitespace-pre-wrap">{displayedText}</pre>
      <span className="animate-pulse">▋</span> {/* blinking cursor */}
    </div>
  );
}
