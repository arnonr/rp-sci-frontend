// Import Dayjs
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

export default () => {
  const convertDate = (date: any) => {
    return dayjs(date).locale("th").format("DD MMM BBBB");
  };

  return {
    convertDate,
  };
};
