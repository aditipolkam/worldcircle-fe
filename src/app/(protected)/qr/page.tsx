import QrCode from "./QrCode";
import { auth } from "@/auth";

export default async function QrPage() {
  const session = await auth();

  return session?.user.username ? (
    <QrCode worldId={session?.user.username} />
  ) : (
    <>no qr</>
  );
}
