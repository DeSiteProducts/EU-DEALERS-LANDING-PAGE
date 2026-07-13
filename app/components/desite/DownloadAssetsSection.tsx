import { downloadAssets } from "../../lib/desiteData";
import { DownloadCard } from "./DownloadCard";
import { SectionContainer } from "./SectionContainer";

export function DownloadAssetsSection() {
  return (
    <SectionContainer className="downloads-section" id="downloads">
      <div className="section-heading">
        <p className="section-kicker">Download Assets</p>
        <h2>Download Assets</h2>
        <p>Access DeSite product and media resources.</p>
      </div>
      <div className="download-grid">
        {downloadAssets.map((asset) => (
          <DownloadCard key={asset.name} asset={asset} />
        ))}
      </div>
    </SectionContainer>
  );
}
