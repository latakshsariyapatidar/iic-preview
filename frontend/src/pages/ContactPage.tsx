import { PageHeader } from "@/components/site/PageHeader";
import { Contact } from "@/components/site/Contact";

const ContactPage = () => {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Let's <span className="text-gradient">talk</span>.</>}
        description="Have an idea, partnership opportunity, or want to collaborate on an event? Drop us a message."
      />
      <Contact />
    </>
  );
};

export default ContactPage;
