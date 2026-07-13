import type { ReactNode } from "react";

export function SectionContainer({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={`desite-section ${className}`} id={id}>
      <div className="desite-container">{children}</div>
    </section>
  );
}
