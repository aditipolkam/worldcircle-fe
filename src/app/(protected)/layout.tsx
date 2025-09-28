import { auth } from "@/auth";
const { redirect } = await import("next/navigation");
export default async function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // If the user is not authenticated, redirect to the login page
  if (!session) {
    console.log("Not authenticated");
    redirect("/");
  }

  return <>{children}</>;
}
