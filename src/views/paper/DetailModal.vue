<template>
  <div
    class="modal fade"
    tabindex="-1"
    ref="mainModalRef"
    id="main-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header" v-if="!isLoading">
          <h3 class="modal-title">ข้อมูลสาระสำคัญของโครงการ</h3>
          <button
            @click="onClose({ reload: false })"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body" v-if="!isLoading">
          <div class="row">
            <Section1 v-if="item.id != null" :item="item" />

            <Section2
              v-if="item.id != null"
              :item="item"
              :researcher="researcher"
              :method_list="method_list"
            />

            <Section3
              v-if="item.id != null"
              :item="item"
              :budget="budget"
              :budget2="budget2"
              :budget3="budget3"
              :file_attach="file_attach"
            />

            <div class="mx-auto text-center mt-5">
              <button
                @click="generatePDF"
                type="button"
                class="btn btn-success"
                v-if="item.status_id != 1"
              >
                พิมพ์ข้อมูล
              </button>
            </div>
          </div>
        </div>
        <Preloader :isLoading="isLoading" :position="'absolute'" />
      </div>
    </div>

    <!-- PDF -->
    <vue3-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="rp_data"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      ref="html2Pdf"
    >
      <template v-slot:pdf-content>
        <div
          style="
            margin-top: 50px;
            margin-right: 50px;
            margin-bottom: 50px;
            margin-left: 50px;
          "
          class="generate-pdf"
        >
          <SectionPDF1 :item="item" />

          <SectionPDF2
            :item="item"
            :researcher="researcher"
            :method_list="method_list"
          />

          <SectionPDF3
            :item="item"
            :budget="budget"
            :budget2="budget2"
            :budget3="budget3"
            :file_attach="file_attach"
          />
        </div>
      </template>
    </vue3-html2pdf>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted } from "vue";
import ApiService from "@/core/services/ApiService";
// Import Modal Bootstrap
import { Modal } from "bootstrap";
// Import Dayjs
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);
// PDF
import { jsPDF } from "jspdf";
import Vue3Html2pdf from "vue3-html2pdf";

// Use Composables
import useBasicData from "@/composables/useBasicData";
import Preloader from "@/components/preloader/Preloader.vue";

// Import Component
import Section1 from "@/components/paper/detail/Section1.vue";
import Section2 from "@/components/paper/detail/Section2.vue";
import Section3 from "@/components/paper/detail/Section3.vue";
import SectionPDF1 from "@/components/paper/pdf/SectionPDF1.vue";
import SectionPDF2 from "@/components/paper/pdf/SectionPDF2.vue";
import SectionPDF3 from "@/components/paper/pdf/SectionPDF3.vue";

export default defineComponent({
  name: "paper-detail-modal",
  props: {
    paper_id: {
      type: Number,
      required: true,
    },
  },
  components: {
    dayjs,
    Preloader,
    Vue3Html2pdf,
    jsPDF,
    Section1,
    Section2,
    Section3,
    SectionPDF1,
    SectionPDF2,
    SectionPDF3,
  },
  setup(props, { emit }) {
    // UI
    const isLoading = ref<any>(true);
    const mainModalRef = ref<any>(null);
    const mainModalObj = ref<any>(null);
    const html2Pdf = ref<any>(null);

    // Variable
    const selectOptions = ref({});
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");

    const item = reactive<any>({});
    const user_item = reactive<any>({});
    const researcher_types = useBasicData().researcher_types;
    const budget = reactive<any[]>([] as any[]);
    const budget2 = reactive<any[]>([] as any[]);
    const budget3 = reactive<any[]>([] as any[]);
    const researcher = reactive<any[]>([] as any[]);
    const method_list = reactive<any[]>([] as any[]);
    const file_attach = reactive<any[]>([] as any[]);

    const generatePDF = () => {
      html2Pdf.value.generatePdf();
    };

    //Fetch
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

    const fetchItem = async () => {
      try {
        const { data } = await ApiService.query("paper/" + props.paper_id, {});
        Object.assign(item, {
          ...data.data,
          department_id:
            data.data.department_id != null
              ? {
                  name: data.data.department.name,
                  id: data.data.department_id,
                }
              : null,
          paper_type_id:
            data.data.paper_type_id != null
              ? {
                  name: data.data.paper_type.name,
                  id: data.data.paper_type_id,
                }
              : null,
        });

        budget.length = 0;
        Object.assign(budget, data.data.budget);

        budget2.length = 0;
        Object.assign(budget2, data.data.budget2);

        budget3.length = 0;
        Object.assign(budget3, data.data.budget3);

        method_list.length = 0;
        Object.assign(method_list, data.data.method_list);

        researcher.length = 0;
        let new_rs = data.data.researcher.map((el: any) => {
          if (el.department_id != null) {
            el.department_id = {
              id: el.department_id,
              name: el.department.name,
            };
          }

          if (el.researcher_type != null) {
            el.researcher_type = researcher_types.find((x: any) => {
              return x.id == el.researcher_type;
            });
          }

          return el;
        });
        Object.assign(researcher, new_rs);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFileAttach = async () => {
      try {
        let params = { paper_id: props.paper_id };

        const { data } = await ApiService.query("file-attach/", {
          params: { ...params },
        });
        Object.assign(file_attach, data.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Event
    const onClose = ({ reload = false }: { reload?: boolean }) => {
      mainModalObj.value.hide();
      if (reload === true) {
        emit("reload");
      }
      emit("close-modal");
    };

    // Mounted
    onMounted(async () => {
      mainModalObj.value = new Modal(mainModalRef.value, {});
      mainModalObj.value.show();
      mainModalRef.value.addEventListener("hidden.bs.modal", () =>
        onClose({ reload: false })
      );

      await fetchUser();
      await fetchItem();
      await fetchFileAttach();
      isLoading.value = false;
    });

    onUnmounted(() => {
      if (mainModalRef.value) {
        mainModalRef.value.addEventListener("hidden.bs.modal", () =>
          onClose({ reload: false })
        );
      }
      mainModalObj.value.hide();
      emit("close-modal");
    });

    const convertDate = (date: any) => {
      if (!date) {
        return "";
      }
      return dayjs(date).locale("th").format("DD MMM BBBB");
    };

    // Return
    return {
      isLoading,
      mainModalRef,
      convertDate,
      item,
      file_attach,
      onClose,
      generatePDF,
      html2Pdf,
      researcher,
      method_list,
      budget,
      budget2,
      budget3,
    };
  },
});
</script>

<style scoped>
/* @import "https://fonts.googleapis.com/css2?family=Sarabun&display=swap"; */
.generate-pdf {
  font-family: Sarabun, sans-serif;
}

.separator.separator-dotted {
  border-bottom-color: #ccc;
}
</style>
