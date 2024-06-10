import type { MenuItem } from "@/layouts/default-layout/config/types";

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "ข้อมูลส่วนตัว",
        route: "/profile",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "รายการเสนอโครงการวิจัย",
        route: "/paper",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
  {
    heading: "จัดการ",
    route: "/crafted",
    pages: [
      {
        heading: "รายการเสนอโครงการวิจัย",
        route: "/admin-paper",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
      {
        heading: "ทะเบียนผู้ใช้งาน",
        route: "/user",
        keenthemesIcon: "element-11",
        bootstrapIcon: "bi-app-indicator",
      },
    ],
  },
];

export default MainMenuConfig;
