import { PageHeader } from "@/components/site/PageHeader";
import { WhatWeDo } from "@/components/site/WhatWeDo";

const WhatWeDoPage = () => {
  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title={<>Programs that turn <span className="text-gradient">ideas</span> into ventures.</>}
        description="From hackathons and workshops to one-on-one mentorship and industry connect — every program is designed to push student innovation forward."
      />
      <WhatWeDo />
    </>
  );
};

export default WhatWeDoPage;
