import { PrimaryButton } from "./Buttons";

export function DownloadCard({
  asset,
}: {
  asset: {
    name: string;
    description: string;
    fileType: string;
    href: string;
  };
}) {
  return (
    <article className="download-card">
      <span className="file-type">{asset.fileType}</span>
      <h3>{asset.name}</h3>
      <p>{asset.description}</p>
      <PrimaryButton href={asset.href}>Download</PrimaryButton>
    </article>
  );
}
