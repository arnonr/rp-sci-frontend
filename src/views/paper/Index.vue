<template>
  <!--begin::Wrapper-->
  <div class="container mt-5">
    <div class="card shadow-sm my-6">
      <!-- Search -->
      <SearchComponent :search="search" @search="fetchItems" @clear="onClear" />
    </div>
    <div class="card shadow-sm my-5">
      <div class="card-header bg-white">
        <h4 class="card-title">ข้อมูลส่วนตัว</h4>
        <div class="card-toolbar">
          <button
            class="btn btn-outline btn-outline-primary me-2 pe-sm-3 ps-sm-5"
            @click="onEditUserModal"
          >
            <i class="fa fa-edit"></i>
            <span>แก้ไข</span>
          </button>
        </div>
      </div>
      <div class="card-body row">
        <div class="col-md-12">
          <span class="fw-bold">ชื่อ-นามสกุล : </span>
          <span class="fst-italic">{{
            user_item.prefix_name +
            user_item.firstname +
            " " +
            user_item.surname
          }}</span>
          <div class="separator separator-dotted my-2"></div>
        </div>
        <div class="col-md-12">
          <span class="fw-bold">หน่วยงาน : </span>
          <span class="fst-italic">{{ user_item.department?.name }}</span>
        </div>

        <div class="separator separator-dotted my-2"></div>
      </div>
    </div>
    <div class="card shadow-sm my-5">
      <!-- Button Add & Export -->
      <div class="card-header bg-white">
        <h4 class="card-title">รายการเสนอโครงการวิจัย</h4>
        <div class="card-toolbar">
          <button
            class="btn btn-outline btn-outline-primary me-2 pe-sm-3 ps-sm-5"
            @click="goToAddPage"
          >
            <i class="bi bi-file-earmark-plus-fill fs-4"></i>
            <span class="d-none d-lg-inline-block ms-2">เสนอโครงการวิจัย</span>
          </button>

          <!-- <div class="dropdown">
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
          </div> -->
        </div>
      </div>
      <div class="card-body table-responsive">
        <Preloader :isLoading="isLoading" :position="'absolute'" />
        <ListComponent
          :items="items"
          :paginationData="paginationData"
          @update:currentPage="paginationData.currentPage = $event"
          @edit="(it: any) => {goToEditPage(it.id)}"
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
      <div id="edit-user-modal">
        <EditUserPage
          v-if="openEditUserModal == true"
          :id="user_item.id"
          @close-modal="
            () => {
              openEditUserModal = false;
            }
          "
          @reload="fetchUser"
        />
      </div>

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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, watch } from "vue";
import ApiService from "@/core/services/ApiService";
import { useRouter } from "vue-router";
import useToast from "@/composables/useToast";

// Component
import SearchComponent from "@/components/paper/Search.vue";
import ListComponent from "@/components/paper/List.vue";
import Preloader from "@/components/preloader/Preloader.vue";
import EditUserPage from "@/views/user/EditUser.vue";
import DetailPage from "@/views/paper/DetailModal.vue";

export default defineComponent({
  name: "paper",
  components: {
    SearchComponent,
    ListComponent,
    Preloader,
    EditUserPage,
    DetailPage,
  },
  setup() {
    // UI Variable
    const isLoading = ref<any>(false);
    const router = useRouter();

    // Variable
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const openEditUserModal = ref<any>(false);
    const user_item = reactive<any>({});

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

    // Fetch Data
    const fetchItems = async () => {
      isLoading.value = true;
      const params = {
        ...search,
        create_year: search.year ?? undefined,
        title_th: search.title_th ?? undefined,
        rp_no: search.rp_no ?? undefined,
        fullname: search.fullname ?? undefined,
        status_id: search.status_id?.id ?? undefined,
        user_id: userData.data.id,
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
    const fetchUser = async () => {
      try {
        const { data } = await ApiService.query("user/" + userData.data.id, {});
        Object.assign(user_item, {
          ...data.data,
          department_id:
            data.data.department_id != null
              ? {
                  name: data.data.department.name,
                  id: data.data.department_id,
                }
              : null,
        });
      } catch (error) {
        console.log(error);
      }
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

    const onEditUserModal = () => {
      openEditUserModal.value = true;
    };

    // Mounted
    onMounted(() => {
      fetchUser();
      fetchItems();
    });

    // Watch
    watch(
      () => paginationData.currentPage,
      () => {
        fetchItems();
      }
    );

    const goToAddPage = () => {
      if (
        user_item.prefix_name == "" ||
        user_item.firstname == "" ||
        user_item.surname == "" ||
        user_item.email == "" ||
        user_item.department_id == null
      ) {
        useToast("โปรดระบุข้อมูลส่วนตัวให้ครบถ้วน", "error");
        return;
      }
      router.push({ name: "paper-add" });
    };

    const goToEditPage = (id: number) => {
      if (
        user_item.prefix_name == "" ||
        user_item.firstname == "" ||
        user_item.surname == "" ||
        user_item.email == "" ||
        user_item.department_id == null
      ) {
        useToast("โปรดระบุข้อมูลส่วนตัวให้ครบถ้วน", "error");
        return;
      }
      router.push({ name: "paper-edit", params: { id: id } });
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
      fetchUser,
      openDetailModal,
      openEditModal,
      openReceive1Modal,
      goToAddPage,
      goToEditPage,
      openEditUserModal,
      onEditUserModal,
      user_item,
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
