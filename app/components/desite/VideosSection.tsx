import { videos } from "../../lib/desiteData";
import { SectionContainer } from "./SectionContainer";
import { VideoCard } from "./VideoCard";

export function VideosSection() {
  return (
    <SectionContainer className="videos-section" id="videos">
      <div className="section-heading">
        <p className="section-kicker">Videos</p>
        <h2>Videos</h2>
        <p>See DeSite screeners working in real jobsites.</p>
      </div>
      <div className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video.title} video={video} />
        ))}
      </div>
    </SectionContainer>
  );
}
