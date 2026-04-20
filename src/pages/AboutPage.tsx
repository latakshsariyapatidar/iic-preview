import { PageHeader } from "@/components/site/PageHeader";
import { About } from "@/components/site/About";

const AboutPage = () => {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={<>Building India's next <span className="text-gradient">founders</span>.</>}
        description="The Institute Innovation Council at IIT Dharwad fosters a culture of innovation, entrepreneurship and bold thinking on campus."
      />
      <About />
    </>
  );
};

export default AboutPage;
