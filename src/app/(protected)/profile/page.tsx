import { auth } from "@/auth";
import MyProfile from "./MyProfile";

export default async function Page() {
  const session = await auth();

  return session ? <MyProfile session={session} /> : <></>;
}
