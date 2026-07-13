import type { ReactNode } from "react";

export function PrimaryButton({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a className="desite-button desite-button-primary" href={href}>
      {children}
    </a>
  );
}

export function SecondaryButton({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a className="desite-button desite-button-secondary" href={href}>
      {children}
    </a>
  );
}
