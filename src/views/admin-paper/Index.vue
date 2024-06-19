<template>
  <!--begin::Wrapper-->
  <div class="container mt-5">
    <!-- Search -->
    <div class="card shadow-sm my-6">
      <SearchComponent :search="search" @search="fetchItems" @clear="onClear" />
    </div>
    <!-- Profile -->
    <div class="card shadow-sm my-5">
      <div class="card-header bg-white">
        <h4 class="card-title">รายการเสนอโครงการวิจัย</h4>
      </div>
      <div class="card-body table-responsive">
        <Preloader :isLoading="isLoading" :position="'absolute'" />
        <ListComponent
          :items="items"
          :paginationData="paginationData"
          :sortKey="sortKey"
          :sortOrder="sortOrder"
          @update:currentPage="paginationData.currentPage = $event"
          @update:perPage="paginationData.perPage = $event"
          @sort="(key: any) => {
            sortedItems(key)}"
          @edit="(it: any) => {goToEditPage(it.id)}"
          @reject="(it: any) => {item={...it}; openRejectModal = true;}"
          @approve="(it: any) => { item={...it};  openApproveModal = true}"
          @cancel="(it: any) =>{item={...it};  openCancelModal = true}"
          @history-detail="(it: any) =>{item={...it};  openHistoryDetailModal = true}"
          @manage-review="(it: any) =>{ item={...it}; openManageReviewModal = true}"
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
      <div id="detail-modal">
        <DetailPage
          v-if="openDetailModal == true"
          :paper_id="item.id"
          @close-modal="
            () => {
              openDetailModal = false;
            }
          "
        />
      </div>

      <div id="reject-form-modal">
        <RejectPaperPage
          v-if="openRejectModal == true"
          :item="item"
          @close-modal="
            () => {
              openRejectModal = false;
            }
          "
          @reload="fetchItems"
        />
      </div>

      <div id="reject-detail-modal">
        <HistoryDetailPage
          v-if="openHistoryDetailModal == true"
          :paper_id="item.id"
          :item="item"
          @close-modal="
            () => {
              openHistoryDetailModal = false;
            }
          "
        />
      </div>

      <div id="approve-modal">
        <ApprovePaperPage
          v-if="openApproveModal == true"
          :item="item"
          @close-modal="
            () => {
              openApproveModal = false;
            }
          "
          @reload="fetchItems"
        />
      </div>

      <!--
      <div id="cancel-modal">
        <CancelPaperPage
          v-if="openCancelModal == true"
          :id="user_item.id"
          @close-modal="
            () => {
              openCancelModal = false;
            }
          "
          @reload="fetchItems"
        />
      </div>

      <div id="manage-review-modal">
        <ManageReviewPaperPage
          v-if="openManageReviewModal == true"
          :id="user_item.id"
          @close-modal="
            () => {
              openManageReviewModal = false;
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
import { useRouter } from "vue-router";

// Component
import SearchComponent from "@/components/paper/Search.vue";
import ListComponent from "@/components/paper/AdminList.vue";
import Preloader from "@/components/preloader/Preloader.vue";
import DetailPage from "@/views/paper/DetailModal.vue";
import RejectPaperPage from "@/views/admin-paper/RejectModal.vue";
// import CancelPaperPage from "@/views/admin-paper/CancelModal.vue";
import ApprovePaperPage from "@/views/admin-paper/ApproveModal.vue";
// import ManageReviewPaperPage from "@/views/admin-paper/ManageReviewModal.vue";
import HistoryDetailPage from "@/views/paper/HistoryDetailModal.vue";

export default defineComponent({
  name: "admin-paper",
  components: {
    SearchComponent,
    ListComponent,
    Preloader,
    DetailPage,
    RejectPaperPage,
    // CancelPaperPage,
    ApprovePaperPage,
    // ManageReviewPaperPage,
    HistoryDetailPage,
  },
  setup() {
    // UI Variable
    const isLoading = ref<any>(false);
    const router = useRouter();
    const sortKey = ref<any>("");
    const sortOrder = ref<any>(-1);

    // Variable
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
    const openRejectModal = ref(false);
    const openApproveModal = ref(false);
    const openCancelModal = ref(false);
    const openManageReviewModal = ref(false);
    const openHistoryDetailModal = ref(false);

    // Fetch Data
    const fetchItems = async () => {
      isLoading.value = true;
      const params = {
        ...search,
        create_year: search.year ?? undefined,
        title_th: search.title_th ?? undefined,
        rp_no: search.rp_no ?? undefined,
        fullname: search.fullname ?? undefined,
        in_status_id: search.status_id?.id
          ? search.status_id?.id
          : [2, 3, 4, 5].join(","),
        orderBy: sortKey.value != "" ? sortKey.value : "created_at",
        order: sortOrder.value == 1 ? "asc" : "desc",
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

    watch(
      () => paginationData.perPage,
      () => {
        fetchItems();
      }
    );

    const goToAddPage = () => {
      router.push({ name: "paper-add" });
    };

    const goToEditPage = (id: number) => {
      router.push({ name: "admin-paper-edit", params: { id: id } });
    };

    const sortedItems = (key: any) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value * -1;
      } else {
        sortKey.value = key;
      }

      if (!sortKey.value) return items;

      fetchItems();
    };

    return {
      search,
      items,
      item,
      paginationData,
      isLoading,
      onClear,
      onExport,
      onDetailModal,
      fetchItems,
      openDetailModal,
      openEditModal,
      openReceive1Modal,
      goToAddPage,
      goToEditPage,
      sortKey,
      sortOrder,
      sortedItems,
      openRejectModal,
      openApproveModal,
      openCancelModal,
      openManageReviewModal,
      openHistoryDetailModal,
    };
  },
});
</script>
