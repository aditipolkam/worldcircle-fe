import { Page } from "@/components/PageLayout";
import { AuthButton } from "../components/AuthButton";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  // If user is already authenticated, redirect to home
  if (session) {
    redirect("/home");
  }

  return (
    <Page>
      <Page.Main className="flex flex-col items-center justify-center">
        <AuthButton />
      </Page.Main>
    </Page>
  );
}
