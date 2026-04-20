import { PageHeader } from "@/components/site/PageHeader";
import { Team } from "@/components/site/Team";

const TeamPage = () => {
  return (
    <>
      <PageHeader
        eyebrow="The Team"
        title={<>People behind the <span className="text-gradient">momentum</span>.</>}
        description="Meet the faculty, students and operators driving innovation across IIT Dharwad."
      />
      <Team />
    </>
  );
};

export default TeamPage;
