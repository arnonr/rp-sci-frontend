import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "หน้าหลัก",
        route: "/home",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
    //   {
    //     heading: "เอกสารดาวน์โหลด",
    //     route: "/tracking",
    //     keenthemesIcon: "element-11",
    //     bootstrapIcon: "bi-app-indicator",
    //   },
      {
        heading: "เข้าสู่ระบบ",
        route: "sign-in",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
];

export default MainMenuConfig;
