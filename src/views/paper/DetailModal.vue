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
          <h3 class="modal-title">รายละเอียด</h3>
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
            <div class="col-md-12 mb-5">
              <h4>ข้อมูลสาระสำคัญของโครงการ</h4>
            </div>

            <div class="col-md-12">
              <span class="fw-bold">ประเภทงานวิจัย : </span>
              <span class="fst-italic">{{ item.paper_type_id.name }}</span>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div class="col-md-12">
              <span class="fw-bold">ชื่อโครงการ ภาษาไทย : </span>
              <span class="fst-italic">{{ item.title_th }}</span>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div class="col-md-12">
              <span class="fw-bold">ชื่อโครงการ ภาษาอังกฤษ : </span>
              <span class="fst-italic">{{ item.title_en }}</span>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div class="col-md-12">
              <span class="fw-bold">บทคัดย่อ (Abstract) : </span>
              <div class="fst-italic" v-html="item.abstract"></div>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div class="col-md-12">
              <span class="fw-bold">คำสำคัญ (Keyword) : </span>
              <span class="fst-italic">
                {{ keyword }}
              </span>
              <div class="separator separator-dotted my-2"></div>
            </div>
            <div class="col-md-12">
              <span class="fw-bold">ภาควิชา : </span>
              <span class="fst-italic">{{ item.department_id?.name }}</span>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div>
              <hr class="my-6" />
              <h6>คณะผู้วิจัย</h6>
              <div v-for="(rc, idx) in researcher" :key="idx" class="row">
                <div class="col-md-6 mt-10">
                  <span class="fw-bold">คนที่ {{ idx + 1 }} : </span>
                  <span class="fst-italic">
                    {{ rc.prefix_name + "" + rc.firstname + " " + rc.surname }}
                  </span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
                <div class="col-md-6 mt-10">
                  <span class="fw-bold">หน่วยงาน : </span>
                  <span class="fst-italic">{{
                    rc.department_id
                      ? rc.department_id?.name
                      : rc.department_text
                  }}</span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
                <div class="col-md-6">
                  <span class="fw-bold">เบอร์โทรศัพท์ : </span>
                  <span class="fst-italic">{{ rc.phone_number }}</span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
                <div class="col-md-6">
                  <span class="fw-bold">ความชำนาญ/ความสนใจพิเศษ : </span>
                  <span class="fst-italic">{{ rc.expertise }}</span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
                <div class="col-md-6">
                  <span class="fw-bold">ประเภท : </span>
                  <span class="fst-italic">{{ rc.researcher_type?.name }}</span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
                <div class="col-md-6">
                  <span class="fw-bold">สัดส่วน (%) : </span>
                  <span class="fst-italic">{{ rc.percentage }}</span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
              </div>
              <hr class="my-6" />
            </div>

            <div class="col-md-12">
              <span class="fw-bold"
                >ความเป็นมาและความสำคัญของปัญหาการวิจัยที่ทำ :
              </span>
              <div class="fst-italic" v-html="item.history"></div>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div class="col-md-12">
              <span class="fw-bold">วัตถุประสงค์ของโครงการวิจัย : </span>
              <div class="fst-italic" v-html="item.objective"></div>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div class="col-md-12">
              <span class="fw-bold">ขอบเขตของการวิจัย : </span>
              <div class="fst-italic" v-html="item.scope"></div>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div class="col-md-12">
              <span class="fw-bold">ผลงานวิจัยที่เกี่ยวข้อง : </span>
              <div class="fst-italic" v-html="item.review_literature"></div>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div class="col-md-12">
              <span class="fw-bold">ระเบียบวิธีวิจัย : </span>
              <div class="fst-italic" v-html="item.method"></div>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div class="col-md-12">
              <span class="fw-bold">ประโยชน์ที่คาดว่าจะได้รับ : </span>
              <div class="fst-italic" v-html="item.benefit"></div>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div>
              <hr class="my-6" />
              <h6>ขั้นตอนและระยะเวลาของแผนดำเนินงาน</h6>
              <div v-for="(ml, idx) in method_list" :key="idx" class="row">
                <div class="col-md-12 mt-10">
                  <span class="fw-bold">ลำดับที่ {{ idx + 1 }} : </span>
                  <span class="fst-italic">
                    {{ ml.detail }}
                  </span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
                <div class="col-md-6 mt-10">
                  <span class="fw-bold">วันที่เริ่ม: </span>
                  <span class="fst-italic">{{
                    convertDate(ml.start_date)
                  }}</span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
                <div class="col-md-6 mt-10">
                  <span class="fw-bold">วันที่สิ้นสุด: </span>
                  <span class="fst-italic">{{ convertDate(ml.end_date) }}</span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
              </div>
              <hr class="my-6" />
            </div>

            <div class="col-md-12">
              <span class="fw-bold"
                >สถานที่ทำการทดลอง และ/หรือเก็บข้อมูล :
              </span>
              <div class="fst-italic" v-html="item.location"></div>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div>
              <hr class="my-6" />
              <h6>งบประมาณในการดำเนินงานวิจัย</h6>
              <h6 class="mt-10">หมวดค่าตอบแทน เฉพาะค่าจ้างผู้ช่วยวิจัย</h6>
              <div v-for="(bg, idx) in budget" :key="idx" class="row">
                <div class="col-md-9 mt-5">
                  <span class="fw-bold">ลำดับที่ {{ idx + 1 }} : </span>
                  <span class="fst-italic">
                    {{ bg.detail }}
                  </span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
                <div class="col-md-3 mt-5">
                  <span class="fw-bold">จำนวนเงิน : </span>
                  <span class="fst-italic">{{ bg.amount }}</span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
              </div>
              <hr class="my-6" />
            </div>

            <div v-if="budget2.length != 0">
              <h6>
                หมวดค่าใช้สอย เช่น ค่าพาหนะ ค่าจ้างเหมาต่าง ๆ เช่น
                ค่าจัดทำรูปเล่ม
              </h6>
              <div v-for="(bg, idx) in budget2" :key="idx" class="row">
                <div class="col-md-9 mt-5">
                  <span class="fw-bold">ลำดับที่ {{ idx + 1 }} : </span>
                  <span class="fst-italic">
                    {{ bg.detail }}
                  </span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
                <div class="col-md-3 mt-5">
                  <span class="fw-bold">จำนวนเงิน : </span>
                  <span class="fst-italic">{{ bg.amount }}</span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
              </div>
              <hr class="my-6" />
            </div>

            <div v-if="budget3.length != 0">
              <h6>หมวดค่าวัสดุ (แจกแจงรายละเอียดราคาต่อหน่วยอย่างชัดเจน)</h6>
              <div v-for="(bg, idx) in budget3" :key="idx" class="row">
                <div class="col-md-9 mt-5">
                  <span class="fw-bold">ลำดับที่ {{ idx + 1 }} : </span>
                  <span class="fst-italic">
                    {{ bg.detail }}
                  </span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
                <div class="col-md-3 mt-5">
                  <span class="fw-bold">จำนวนเงิน : </span>
                  <span class="fst-italic">{{ bg.amount }}</span>
                  <div class="separator separator-dotted my-2"></div>
                </div>
              </div>
              <hr class="my-6" />
            </div>

            <div class="col-md-12">
              <span class="fw-bold">รายการเอกสารอ้างอิงหรือบรรณานุกรม : </span>
              <div class="fst-italic" v-html="item.references"></div>
              <div class="separator separator-dotted my-2"></div>
            </div>

            <div v-for="(fa, idx) in file_attach" :key="idx">
              <span class="fw-bold">ไฟล์แนบ {{ idx + 1 }} : </span>
              <a :href="fa.filename" target="_blank"
                ><span class="fst-italic">คลิก</span></a
              >
              <div class="separator separator-dotted my-2"></div>
            </div>
          </div>
        </div>
        <Preloader :isLoading="isLoading" :position="'absolute'" />
      </div>
    </div>

    <!-- PDF -->
    <!-- <vue3-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="true"
      :paginate-elements-by-height="1400"
      filename="jcoms_data"
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
          <SectionPDF2
            :complaint_type="complaint_type"
            :complaint_item="complaint_item"
            :complainant_item="complainant_item"
            :new_item="new_item"
          />

          <SectionPDF3
            :complaint_type="complaint_type"
            :complaint_item="complaint_item"
            :complainant_item="complainant_item"
            :new_item="new_item"
            :accused_item="accused_item"
            :complaint_file_attach="complaint_file_attach"
          />
        </div>
      </template>
    </vue3-html2pdf> -->
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
import useComplaintTypeData from "@/composables/useComplaintTypeData";
import useBasicData from "@/composables/useBasicData";
import useStateData from "@/composables/useStateData";
import Preloader from "@/components/preloader/Preloader.vue";

export default defineComponent({
  name: "complaint-detail-modal",
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
    const file_attach = reactive<any>([]);

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
@media only screen and (max-width: 768px) {
  .card > .card-body {
    padding: 0px;
  }
}

.generate-pdf {
  font-family: Sarabun, sans-serif;
}

.color-primary {
  color: #800001;
}

.modal-content {
  background-color: #d9f4fe;
}
</style>
