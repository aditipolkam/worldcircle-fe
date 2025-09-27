"use client";
import { usePathname } from "next/navigation";

export const CurrentURL = () => {
  const pathname = usePathname();
  return (
    <span style={{ backgroundColor: "red", color: "blue" }}>{pathname}</span>
  );
};
