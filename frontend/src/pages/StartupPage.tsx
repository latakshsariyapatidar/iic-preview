import { PageHeader } from "@/components/site/PageHeader";
import { Startup } from "@/components/site/Startup";

const StartupPage = () => {
  return (
    <>
      <PageHeader
        eyebrow="Startup Support"
        title={<>From idea to <span className="text-gradient">launch</span>.</>}
        description="A guided path for student founders — submit your idea, find mentors, build prototypes, and ship."
      />
      <Startup />
    </>
  );
};

export default StartupPage;
