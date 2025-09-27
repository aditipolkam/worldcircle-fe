"use client";

import { TabItem, Tabs } from "@worldcoin/mini-apps-ui-kit-react";
import { Home, User, Plus, Circle } from "iconoir-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * This component uses the UI Kit to navigate between pages
 * Bottom navigation is the most common navigation pattern in Mini Apps
 * We require mobile first design patterns for mini apps
 * Read More: https://docs.world.org/mini-apps/design/app-guidelines#mobile-first
 */

export const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Map pathname to tab value
  const getTabValue = (path: string) => {
    if (path === "/") return "home";
    if (path === "/qr") return "qr";
    if (path === "/circles") return "circles";
    if (path === "/profile") return "profile";
    return "home";
  };

  const [value, setValue] = useState(getTabValue(pathname));

  // Update tab value when pathname changes
  useEffect(() => {
    setValue(getTabValue(pathname));
  }, [pathname]);

  const handleTabChange = (newValue: string) => {
    setValue(newValue);
    // Navigate to the corresponding page
    switch (newValue) {
      case "home":
        router.push("/");
        break;
      case "qr":
        router.push("/qr");
        break;
      case "circles":
        router.push("/circles");
        break;
      case "profile":
        router.push("/profile");
        break;
      default:
        router.push("/");
    }
  };

  return (
    <Tabs value={value} onValueChange={handleTabChange}>
      <TabItem value="home" icon={<Home />} label="Home" />
      <TabItem value="qr" icon={<Plus />} label="Add Circle" />
      <TabItem value="circles" icon={<Circle />} label="World Circles" />
      <TabItem value="profile" icon={<User />} label="Profile" />
    </Tabs>
  );
};
