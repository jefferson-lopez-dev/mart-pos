import { DataProfile } from "@/components/DataProfile";
import Link from "next/link";

export default function profile() {
  return (
    <div>
      <Link href={"/"}>back</Link>
      <br />
      <DataProfile />
    </div>
  );
}
