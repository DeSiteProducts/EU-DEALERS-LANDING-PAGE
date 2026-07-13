import { navItems } from "../../lib/desiteData";

export function Footer() {
  return (
    <footer className="desite-footer">
      <div className="desite-container footer-inner">
        <p>DeSite Products</p>
        <nav aria-label="Footer navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
