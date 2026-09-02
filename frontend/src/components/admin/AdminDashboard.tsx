import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EventsManager } from "./EventsManager";
import { GalleryManager } from "./GalleryManager";
import { TeamManager } from "./TeamManager";
import { EnquiriesManager } from "./EnquiriesManager";

export const AdminDashboard = () => {
  return (
    <Tabs defaultValue="events" className="w-full">
      <TabsList className="mb-8">
        <TabsTrigger value="events">Events</TabsTrigger>
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
        <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
      </TabsList>
      
      <TabsContent value="events" className="border border-border rounded-xl p-6 bg-card">
        <EventsManager />
      </TabsContent>
      
      <TabsContent value="gallery" className="border border-border rounded-xl p-6 bg-card">
        <GalleryManager />
      </TabsContent>
      
      <TabsContent value="team" className="border border-border rounded-xl p-6 bg-card">
        <TeamManager />
      </TabsContent>

      <TabsContent value="enquiries" className="border border-border rounded-xl p-6 bg-card">
        <EnquiriesManager />
      </TabsContent>
    </Tabs>
  );
};
