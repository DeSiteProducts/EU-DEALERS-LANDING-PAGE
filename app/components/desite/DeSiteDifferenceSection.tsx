import {
  Layers,
  MessageSquare,
  ShieldCheck,
  TrendingUp,
  Truck,
} from "lucide-react";
import { differenceItems } from "../../lib/desiteData";
import { SectionContainer } from "./SectionContainer";

const differenceIconMap = {
  warranty: ShieldCheck,
  sizes: Layers,
  portability: Truck,
  feedback: MessageSquare,
  roi: TrendingUp,
} as const;

export function DeSiteDifferenceSection() {
  return (
    <SectionContainer className="difference-section">
      <div className="section-heading">
        <h2>Why Contractors Choose DeSite</h2>
        <p>
          Practical machines, clear options, and long-term value for working
          contractors.
        </p>
      </div>
      <div className="difference-grid">
        {differenceItems.map((item) => {
          const DifferenceIcon =
            differenceIconMap[item.icon as keyof typeof differenceIconMap] ??
            ShieldCheck;

          return (
            <article className="difference-card" key={item.title}>
              <span className="difference-icon" aria-hidden="true">
                <DifferenceIcon size={42} strokeWidth={2.2} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </SectionContainer>
  );
}
