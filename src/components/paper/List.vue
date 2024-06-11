<template>
  <div>
    <table
      class="table table-bordered table-striped bg-sky"
      style="width: 100%"
    >
      <thead class="bg-color-police">
        <tr>
          <th class="text-center text-white">วันที่เสนอ</th>
          <th class="text-center text-white">รหัส</th>
          <th class="text-center text-white">ชื่อโครงการ (TH)</th>
          <th class="text-center text-white">หน่วยงาน</th>
          <th class="text-center text-white">ประเภททุนวิจัย</th>
          <th class="text-center text-white">สถานะ</th>
          <th class="text-center text-white">จัดการข้อมูล</th>
        </tr>
      </thead>
      <tbody v-if="items.length != 0">
        <tr v-for="(it, idx) in items" :key="idx">
          <td class="text-center">
            {{ convertDate(it.created_at) }}
          </td>
          <td class="text-center">{{ it.rp_no }}</td>

          <td class="text-center">{{ it.title_th }}</td>
          <td>{{ it.department?.name }}</td>
          <td class="text-center">{{ it.paper_type?.name }}</td>
          <td class="text-center">
            <span
              class="badge p-2 text-white"
              :style="`background-color: ${
                convertStatus(it.status_id).bg_color
              };`"
              >{{ convertStatus(it.status_id).name_th }}</span
            >
          </td>

          <td class="text-center">
            <div class="dropdown">
              <button
                class="btn btn-primary btn-sm dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i
                  class="bi bi-pencil-square fs-4 d-sm-inline-block d-lg-none"
                ></i>
                <span class="d-none d-lg-inline-block">จัดการ</span>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a
                    class="dropdown-item cursor-pointer"
                    @click="
                      handleDetail({
                        id: it.id,
                        complainant_id: it.complainant_id,
                      })
                    "
                    >รายละเอียด</a
                  >
                </li>
                <li>
                  <a
                    class="dropdown-item cursor-pointer"
                    v-if="it.status_id != 2 && it.status_id != 4"
                    @click="
                      handleEdit({
                        id: it.id,
                      })
                    "
                    >แก้ไขข้อมูล</a
                  >
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="10">
            <div class="text-center"><span>ไม่พบข้อมูล</span></div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="col-xxl-12">
      <div class="tp-pagination mt-30">
        <BlogPagination
          :totalItems="paginationData.totalItems"
          :totalPage="paginationData.totalPage"
          :currentPage="paginationData.currentPage"
          @update:currentPage="updateCurrentPage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs, ref } from "vue";

// Import Dayjs
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

// Import Pagination
import BlogPagination from "@/components/common/pagination/BlogPagination.vue";

import useStatusData from "@/composables/useStatusData";

export default defineComponent({
  name: "list-complaint",
  components: {
    BlogPagination,
  },
  props: {
    items: {
      type: Array as () => any[],
      required: true,
    },
    paginationData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { items } = toRefs(props);
    const { paginationData } = toRefs(props);
    const internalCurrentPage = ref(paginationData.value.currentPage);
    let { statuses } = useStatusData();

    // fetch

    const handleDetail = (item: any) => {
      emit("detail", item);
    };

    const handleEdit = (item: any) => {
      emit("edit", item);
    };

    const convertDate = (date: any) => {
      return dayjs(date).locale("th").format("DD MMM BBBB");
    };

    const convertStatus = (status: any) => {
      const findStatus = statuses.find((x: any) => x.id === status);
      return {
        name_th: findStatus.name_th,
        bg_color: findStatus.bg_color,
      };
    };

    const updateCurrentPage = (newPage: any) => {
      internalCurrentPage.value = newPage;
      emit("update:currentPage", newPage);
    };

    return {
      items,
      handleDetail,
      handleEdit,
      convertDate,
      convertStatus,
      updateCurrentPage,
    };
  },
});
</script>

<style scoped>
.bg-sky {
  background-color: #d9f4fe;
}
</style>
