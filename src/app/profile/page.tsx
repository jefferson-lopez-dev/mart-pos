import {
  CoreProfile,
  BackHeader,
  EditDataSection,
  ProfilePhoto,
} from "@/components/profile-page";

export default function Profile() {
  return (
    <CoreProfile>
      <BackHeader />
      <ProfilePhoto />
      <EditDataSection />
    </CoreProfile>
  );
}
