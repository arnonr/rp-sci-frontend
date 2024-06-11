<template>
  <!--begin::Wrapper-->
  <div class="container mt-5">
    <div class="card shadow-sm my-6">
      <!-- Search -->
      <SearchComponent :search="search" @search="fetchItems" @clear="onClear" />
    </div>
    <div class="card shadow-sm my-5">
      <!-- Button Add & Export -->
      <div class="card-header bg-white">
        <h4 class="card-title">รายการเสนอโครงการวิจัย</h4>
        <div class="card-toolbar">
          <button
            class="btn btn-outline btn-outline-primary me-2 pe-sm-3 ps-sm-5"
            @click="onAddModal()"
          >
            <i class="bi bi-file-earmark-plus-fill fs-4"></i>
            <span class="d-none d-lg-inline-block ms-2">เสนอโครงการวิจัย</span>
          </button>

          <div class="dropdown">
            <button
              class="btn btn-outline btn-outline-success pe-sm-3 ps-sm-5 dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-file-earmark-arrow-down-fill fs-4"></i>
              <span class="d-none d-lg-inline-block ms-2">ส่งออกรายการ</span>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a class="dropdown-item" @click="onExport()">Excel</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="card-body table-responsive">
        <Preloader :isLoading="isLoading" :position="'absolute'" />
        <ListComponent
          :items="items"
          :paginationData="paginationData"
          @update:currentPage="paginationData.currentPage = $event"
          @edit="
            (it: any) => {
              Object.assign(item, it);
              openEditModal = true;
            }
          "
          @detail="
            (it: any) => {
              Object.assign(item, it);
              openDetailModal = true;
            }
          "
        />
      </div>
    </div>

    <div>
      <!-- Modal Detail ดูข้อมูล -->
      <!-- <div id="detail-modal">
        <DetailPage
          v-if="openDetailModal == true"
          :paper_id="item.id"
          @close-modal="
            () => {
              openDetailModal = false;
            }
          "
        />
      </div> -->

      <!-- Modal Edit แก้ไขข้อมูล -->
      <!-- <div id="edit-modal">
        <EditPage
          v-if="openEditModal == true"
          :paper_id="item.id"
          @close-modal="
            () => {
              openEditModal = false;
            }
          "
          @reload="fetchItems"
        />
      </div> -->

      <!-- Modal Add เพิ่มข้อมูล -->
      <!-- <div id="add-modal">
        <AddPage
          v-if="openAddModal == true"
          @close-modal="
            () => {
              openAddModal = false;
            }
          "
          @reload="fetchItems"
        />
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import ApiService from "@/core/services/ApiService";

// Import Dayjs
import dayjs from "dayjs";

// Component
import SearchComponent from "@/components/paper/Search.vue";
import ListComponent from "@/components/paper/List.vue";
import Preloader from "@/components/preloader/Preloader.vue";
// import EditPage from "@/views/new-complaint/Edit.vue";
// import AddPage from "@/views/new-complaint/Add.vue";
// import DetailPage from "@/views/new-complaint/DetailModal.vue";
// import Receive1Page from "@/views/new-complaint/Receive1.vue";

export default defineComponent({
  name: "paper",
  components: {
    SearchComponent,
    ListComponent,
    Preloader,
    // EditPage,
    // DetailPage,
    // Receive1Page,
    // AddPage,
  },
  setup() {
    // UI Variable
    const isLoading = ref<any>(false);

    // Variable
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    const search = reactive<any>({});

    const items = reactive<any[]>([]);
    const item = reactive<any>({});

    const paginationData = reactive<any>({
      perPage: 20,
      currentPage: 1,
      totalPage: 1,
      totalItems: 0,
    });

    const openDetailModal = ref(false);
    const openEditModal = ref(false);
    const openReceive1Modal = ref(false);
    const openAddModal = ref(false);

    // Fetch Data
    const fetchItems = async () => {
      isLoading.value = true;
      const params = {
        ...search,
        create_year: search.year ?? undefined,
        title_th: search.title_th ?? undefined,
        rp_no: search.rp_no ?? undefined,
        fullname: search.fullname ?? undefined,
        state_id: search.state_id?.id ?? 1,
        orderBy: "created_at",
        order: "desc",
        perPage: paginationData.perPage,
        currentPage: paginationData.currentPage,
      };

      const { data } = await ApiService.query("paper", {
        params: params,
      });

      items.length = 0;
      Object.assign(items, data.data);
      paginationData.totalPage = data.totalPage;
      paginationData.totalItems = data.totalData;
      paginationData.currentPage = data.currentPage;
      isLoading.value = false;
    };

    // Event
    const onClear = () => {
      Object.keys(search).forEach((key) => {
        if (typeof search[key] === "object" && search[key] !== null) {
          Object.keys(search[key]).forEach((subKey) => {
            search[key][subKey] = null;
          });
        } else {
          search[key] = null;
        }
      });
    };

    const onExport = async () => {};

    // Modal action
    const onAddModal = () => {
      openAddModal.value = true;
    };

    const onDetailModal = (it: any) => {
      Object.assign(item, it);
    };

    // Mounted
    onMounted(() => {
      fetchItems();
    });

    // Watch
    watch(
      () => paginationData.currentPage,
      () => {
        fetchItems();
      }
    );

    return {
      search,
      items,
      item,
      paginationData,
      isLoading,
      onClear,
      onExport,
      onAddModal,
      onDetailModal,
      fetchItems,
      openDetailModal,
      openEditModal,
      openReceive1Modal,
      openAddModal,
    };
  },
});
</script>

<style>
.vs__dropdown-toggle {
  border: none;
}

.v-select {
  padding: 0.4em 0.5em;
}

.dp__main {
  padding: 0.35em 0em;
}

.dp__input {
  border: none !important;
}
@media only screen and (max-width: 768px) {
  .card > .card-body {
    padding: 0px;
  }
}

.bg-color-police {
  background-color: #800001;
}
</style>
