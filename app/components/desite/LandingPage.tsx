import { navItems } from "../../lib/desiteData";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { HeroSection } from "./HeroSection";
import { ProductsSection } from "./ProductsSection";


export function LandingPage({ showError }: { showError: boolean }) {
  return (
    <>
      <header className="desite-header">
        <div className="desite-container nav-shell">
          <a className="nav-logo" href="#home" aria-label="DeSite Products home">
            <span className="desite-logo-mark">D</span>
            <span>DeSite Products</span>
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="nav-contact" href="#contact">
            Contact
          </a>
          <details className="mobile-nav">
            <summary>Menu</summary>
            <nav aria-label="Mobile navigation">
              {navItems.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </header>
      <main >
        <HeroSection />
        <ProductsSection />
        <ContactSection showError={showError} />
      </main>
      <Footer />
    </>
  );
}
