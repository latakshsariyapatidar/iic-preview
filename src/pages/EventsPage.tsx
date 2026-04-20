import { PageHeader } from "@/components/site/PageHeader";
import { Events } from "@/components/site/Events";

const EventsPage = () => {
  return (
    <>
      <PageHeader
        eyebrow="Events"
        title={<>Where ideas <span className="text-gradient">collide</span>.</>}
        description="E-Summits, hackathons, innovation challenges and workshops — explore everything happening at IIC."
      />
      <Events />
    </>
  );
};

export default EventsPage;
