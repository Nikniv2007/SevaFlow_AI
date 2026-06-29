import VolunteerHero from "@/components/VolunteerHero";
import EventOverview from "@/components/EventOverview";
import VolunteerPortal from "@/components/VolunteerPortal";

export const metadata = {
  title: "Volunteer Assignment Portal — SevaFlow AI",
  description:
    "View open seva roles, pick a volunteer assignment, and manage your spot for the Sunday community event.",
};

export default function VolunteerPage() {
  return (
    <>
      <VolunteerHero />
      <EventOverview />
      <VolunteerPortal />
    </>
  );
}
