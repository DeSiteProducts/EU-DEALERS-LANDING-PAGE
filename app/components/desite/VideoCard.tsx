import { ImagePlaceholder } from "./ImagePlaceholder";

export function VideoCard({
  video,
}: {
  video: {
    title: string;
    thumbnail: string;
    supportImage?: string;
    description: string;
    embed: string;
  };
}) {
  return (
    <article className="video-card">
      <ImagePlaceholder label={`${video.title} thumbnail`} path={video.thumbnail} />
      {video.supportImage ? (
        <ImagePlaceholder
          label={`${video.title} support screenshot`}
          path={video.supportImage}
        />
      ) : null}
      <div className="video-copy">
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <button
          className="play-button"
          type="button"
          aria-label={`Play ${video.title} video placeholder`}
        >
          Play
        </button>
        <p className="embed-placeholder">{video.embed}</p>
      </div>
    </article>
  );
}
