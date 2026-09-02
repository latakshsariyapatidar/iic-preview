import { PageHeader } from "@/components/site/PageHeader";
import { Gallery } from "@/components/site/Gallery";

const GalleryPage = () => {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title={<>Moments from the <span className="text-gradient">journey</span>.</>}
        description="A look back at hackathons, summits, mentor sessions and the people who made them happen."
      />
      <Gallery />
    </>
  );
};

export default GalleryPage;
