import { SectionContainer } from "./SectionContainer";

export function MissionSection() {
  return (
    <SectionContainer className="mission-section" id="mission">
      <div className="mission-panel">
        <div>
          <p className="section-kicker">Mission Statement</p>
          <h2>Mission Statement</h2>
        </div>
        <p className="mission-text">
          DeSite Products designs and manufactures compact portable vibratory
          screeners built for contractors, landscapers, and material producers.
          Every machine is field-tested in real-world conditions to maximize
          production, reduce downtime, and deliver long-term value.
        </p>
      </div>
    </SectionContainer>
  );
}
