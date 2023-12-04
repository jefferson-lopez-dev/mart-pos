import {
  UserProfilePage,
  BackHeader,
  EditDataSection,
  ProfilePhoto,
} from "@/components/profile-page";

export default function Profile() {
  return (
    <UserProfilePage>
      <BackHeader />
      <ProfilePhoto />
      <EditDataSection />
    </UserProfilePage>
  );
}
