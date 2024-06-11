export default () => {
  const statuses = [
    {
      id: 1,
      name_th: "ร่าง",
      name_en: null,
      bg_color: "#f8285a",
    },
    {
      id: 2,
      name_th: "อยู่ระหว่างการพิจารณา",
      name_en: null,
      bg_color: "#ffc107",
    },
    {
      id: 3,
      name_th:
        "แก้ไขข้อเสนอโครงการ",
      name_en: null,
      bg_color: "#17c653",
    },
    {
      id: 4,
      name_th: "ตอบรับข้อเสนอโครงการ",
      name_en: null,
      bg_color: "#17c653",
    },
    {
      id: 5,
      name_th: "ยกเลิก",
      name_en: null,
      bg_color: "#7be382",
      bg_bureau_color: "#7be382",
      bg_division_color: "#7be382",
    },
  ];

  return {
    statuses,
  };
};
