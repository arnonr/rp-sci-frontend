<template>
  <div>
    <div class="card" v-if="item">
      <div class="card-body">
        <form-wizard
          color="#800001"
          ref="formStep"
          finishButtonText="บันทึก"
          backButtonText="ย้อนกลับ"
          nextButtonText="ถัดไป"
          step-size="xs"
          id="form"
          @on-change="onTabChange"
          @on-complete="onComplete"
        >
          <Tab1
            v-if="item.id != null"
            :item="item"
            :budget="budget"
            :budget2="budget2"
            :budget3="budget3"
            :researcher="researcher"
            :method_list="method_list"
            :r="r"
          />

          <Tab2
            v-if="item.id != null"
            :tab_index="tab_index"
            :item="item"
            :budget="budget"
            :budget2="budget2"
            :budget3="budget3"
            :researcher="researcher"
            :method_list="method_list"
          />

          <template #footer="props">
            <div class="wizard-footer-left">
              <button
                v-if="props.activeTabIndex > 0"
                @click.native="props.prevTab()"
                class="btn text-white float-left"
                style="background-color: #800001"
                :disabled="isLoading"
              >
                ย้อนกลับ
              </button>
            </div>

            <div class="wizard-footer-right">
              <button
                v-if="!props.isLastStep"
                @click.native="props.nextTab()"
                class="btn text-white"
                style="background-color: #800001"
                :disabled="isLoading"
              >
                ถัดไป
              </button>

              <button
                v-else
                @click.native="onComplete(0)"
                class="finish-button btn text-white"
                style="background-color: #800001"
                :disabled="isLoading"
              >
                {{ props.isLastStep ? "บันทึก" : "Next" }}
              </button>

              <button
                v-if="props.isLastStep"
                @click.native="onComplete(1)"
                class="finish-button btn text-white ms-4"
                style="background-color: green"
                :disabled="isLoading"
              >
                {{ "ส่งข้อมูล" }}
              </button>
            </div>
          </template>
        </form-wizard>
      </div>
      <Preloader
        :isLoading="isLoading != undefined ? isLoading : false"
        :position="'fix'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, onUnmounted } from "vue";
import ApiService from "@/core/services/ApiService";

// Import FormWizard
import { FormWizard } from "vue3-form-wizard";
import "vue3-form-wizard/dist/style.css";
// Use Toast Composables
import useToast from "@/composables/useToast";
import { useRouter, useRoute } from "vue-router";

// Import Dayjs
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(buddhistEra);
dayjs.extend(customParseFormat);

// Import Component
import Tab1 from "@/components/paper/form/Tab1.vue";
import Tab2 from "@/components/paper/form/Tab2.vue";
import Preloader from "@/components/preloader/Preloader.vue";

// Import Yup Validate
import * as Yup from "yup";

// Use Composables
import useBasicData from "@/composables/useBasicData";

export default defineComponent({
  name: "add-paper",
  components: {
    FormWizard,
    Tab1,
    Tab2,
    Preloader,
  },
  setup() {
    // UI Variable
    const router = useRouter();
    const route = useRoute();
    const isLoading = ref<any>(false);

    const tab_index = ref(0);
    const onTabChange = (prevIndex: number, nextIndex: number) => {
      tab_index.value = nextIndex;
    };

    // Variable
    const r = (Math.random() + 1).toString(36).substring(7);
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    // Item Variable
    const item = reactive<any>({
      rp_no: "",
      user_id: null,
      title_th: "",
      title_en: "",
      abstract: "",
      keyword: "",
      department_id: null,
      paper_type_id: null,
      history: "",
      objective: "",
      scope: "",
      review_literature: "",
      method: "",
      benefit: "",
      location: "",
      references: "",
      status_id: null,
      sended_at: null,
      sended_user_id: null,
    });
    const user_item = reactive<any>({});

    const researcher_types = useBasicData().researcher_types;

    const budget_default = {
      detail: "",
      amount: null,
      paper_id: null,
    };

    const budget = reactive<any[]>([
      {
        ...budget_default,
      },
    ] as any[]);

    const budget2 = reactive<any[]>([
      {
        ...budget_default,
      },
    ] as any[]);

    const budget3 = reactive<any[]>([
      {
        ...budget_default,
      },
    ] as any[]);

    const budget_old = reactive([
      {
        ...budget_default,
      },
    ] as any[]);

    const budget2_old = reactive([
      {
        ...budget_default,
      },
    ] as any[]);

    const budget3_old = reactive([
      {
        ...budget_default,
      },
    ] as any[]);

    // researcher
    const researcher_default = {
      prefix_name: "",
      firstname: "",
      surname: "",
      department_id: null,
      department_text: "",
      phone_number: "",
      expertise: "",
      researcher_type: null,
      percentage: null,
      paper_id: null,
    };

    const researcher = reactive<any[]>([
      {
        ...researcher_default,
      },
    ] as any[]);

    const researcher_old = reactive([
      {
        ...researcher_default,
      },
    ] as any[]);

    // researcher
    const method_list_default = {
      start_date: null,
      end_date: null,
      detail: "",
      paper_id: null,
    };

    const method_list = reactive<any[]>([
      {
        ...method_list_default,
      },
    ] as any[]);

    const method_list_old = reactive([
      {
        ...method_list_default,
      },
    ] as any[]);

    // Validate Schema
    const validationItemSchema = Yup.object().shape({
      title_th: Yup.string()
        .required("${path} จำเป็นต้องระบุ")
        .label("ชื่อโครงการ ภาษาไทย"),
      title_en: Yup.string()
        .required("${path} จำเป็นต้องระบุ")
        .label("ชื่อโครงการ ภาษาอังกฤษ"),
      abstarct: Yup.string().nullable().label(""),
      keyword: Yup.string().nullable().label(""),
      history: Yup.string().nullable().label(""),
      objective: Yup.string().nullable().label(""),
    });

    const validationBudgetSchema = Yup.object().shape({
      detail: Yup.object().nullable().label("รายละเอียด"),
      amount: Yup.number().nullable().label("จำนวนเงิน"),
    });

    // errors
    const errors_default = {
      title_th: { error: 0, text: "" },
      title_en: { error: 0, text: "" },
      abstarct: { error: 0, text: "" },
      paper_type_id: { error: 0, text: "" },
      abstract: { error: 0, text: "" },
      references: { error: 0, text: "" },
      location: { error: 0, text: "" },
      benefit: { error: 0, text: "" },
      method: { error: 0, text: "" },
      review_literature: { error: 0, text: "" },
      objective: { error: 0, text: "" },
      history: { error: 0, text: "" },
      scope: { error: 0, text: "" },
      department_id: { error: 0, text: "" },
    };
    const errors = reactive<any>({
      ...errors_default,
    });

    // budget_errors
    const budget_errors_default = {
      detail: { error: 0, text: "" },
      amount: { error: 0, text: "" },
    };
    const budget_errors = reactive<any>({
      ...budget_errors_default,
    });

    const researcher_errors_default = {
      prefix_name: { error: 0, text: "" },
      firstname: { error: 0, text: "" },
      surname: { error: 0, text: "" },
      department_id: { error: 0, text: "" },
      department_text: { error: 0, text: "" },
      phone_number: { error: 0, text: "" },
      expertise: { error: 0, text: "" },
      researcher_type: { error: 0, text: "" },
      percentage: { error: 0, text: "" },
    };
    const researcher_errors = reactive<any>({
      ...researcher_errors_default,
    });

    const method_list_errors_default = {
      start_date: { error: 0, text: "" },
      end_date: { error: 0, text: "" },
      detail: { error: 0, text: "" },
    };
    const method_list_errors = reactive<any>({
      ...method_list_errors_default,
    });

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
        const { data } = await ApiService.query("paper/" + route.params.id, {});
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
        budget_old.length = 0;
        Object.assign(budget, data.data.budget);
        Object.assign(budget_old, data.data.budget);

        budget2.length = 0;
        budget2_old.length = 0;
        Object.assign(budget2, data.data.budget2);
        Object.assign(budget2_old, data.data.budget2);

        budget3.length = 0;
        budget3_old.length = 0;
        Object.assign(budget3, data.data.budget3);
        Object.assign(budget3_old, data.data.budget3);

        method_list.length = 0;
        method_list_old.length = 0;
        Object.assign(method_list, data.data.method_list);
        Object.assign(method_list_old, data.data.method_list);

        researcher.length = 0;
        researcher_old.length = 0;
        Object.assign(researcher_old, data.data.researcher);

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

    // Event
    const onTab1Validate = async () => {
      Object.assign(errors, {
        ...errors_default,
      });

      Object.assign(budget_errors, {
        ...budget_errors_default,
      });

      try {
        await validationItemSchema.validate(item, {
          abortEarly: false,
        });
      } catch (err: any) {
        err.inner.forEach((error: any) => {
          const fieldName = error.path;
          const errorMessage = error.message;
          errors[fieldName].error = 1;
          errors[fieldName].text = errorMessage;
        });
        console.log(errors);
        useToast("ระบุข้อมูลไม่ครบถ้วน", "error");
        return false;
      }

      return true;
    };

    const onComplete = async (is_send: number) => {
      try {
        isLoading.value = true;
        await onSavePaper(is_send);
        await onSaveResearcher();
        await onSaveMethodList();
        await onSaveBudget();
        await onSaveBudget2();
        await onSaveBudget3();
        isLoading.value = false;

        useToast("บันทึกข้อมูลเสร็จสิ้น");
        router.push({ name: "paper" });
      } catch (error) {
        isLoading.value = false;
        useToast("เกิดข้อผิดพลาดในการบันทึกข้อมูล", "error");
        console.error("Error saving data:", error);
      }
    };
    // Save Event
    const onSavePaper = async (is_send: number) => {
      let data_item: any = {
        title_th: item.title_th,
        title_en: item.title_en,
        abstract: item.abstract,
        keyword: item.keyword,
        department_id: item.department_id?.id,
        paper_type_id: item.paper_type_id?.id,
        history: item.history,
        objective: item.objective,
        scope: item.scope,
        review_literature: item.review_literature,
        method: item.method,
        benefit: item.benefit,
        location: item.location,
        references: item.references,
        status_id: 1,
        sended_at: dayjs().format("YYYY-MM-DD"),
        sended_user_id: userData.data.id,
        user_id: userData.data.id,
        is_send: is_send,
      };

      if (is_send == 1) {
        data_item["status_id"] = 2;
      }

      await ApiService.put("paper/" + item.id, data_item)
        .then(({ data }) => {
          if (data.msg != "success") {
            throw new Error("ERROR");
          }

          item.id = data.id;
        })
        .catch(({ response }) => {
          console.log(response);
        });
    };
    const onSaveResearcher = async () => {
      for (let i = 0; i < researcher.length; i++) {
        let data_researcher_item = {
          id: researcher[i].id,
          prefix_name: researcher[i].prefix_name,
          firstname: researcher[i].firstname,
          surname: researcher[i].surname,
          department_id: researcher[i].department_id?.id,
          department_text: researcher[i].department_text,
          phone_number: researcher[i].phone_number,
          expertise: researcher[i].expertise,
          researcher_type: researcher[i].researcher_type?.id,
          percentage: researcher[i].percentage,
          paper_id: item.id,
        };

        let api = {
          type: "post",
          url: "researcher/",
        };

        if (data_researcher_item.id != null) {
          api.type = "put";
          api.url = "researcher/" + data_researcher_item.id;
        }

        await ApiService[api.type](api.url, data_researcher_item)
          .then(({ data }) => {
            if (data.msg != "success") {
              throw new Error("ERROR");
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }

      //   old
      for (let i = 0; i < researcher_old.length; i++) {
        let check = researcher.find((x: any) => {
          return x.id == researcher_old[i].id;
        });

        if (!check) {
          await ApiService.delete("researcher/" + researcher_old[i].id)
            .then(({ data }) => {
              if (data.msg != "success") {
                throw new Error("ERROR");
              }
            })
            .catch(({ response }) => {
              console.log(response);
            });
        }
      }
    };

    const onSaveMethodList = async () => {
      for (let i = 0; i < method_list.length; i++) {
        let data_method_list_item = {
          id: method_list[i].id,
          start_date: method_list[i].start_date
            ? dayjs(method_list[i].start_date).format("YYYY-MM-DD")
            : undefined,
          end_date: method_list[i].end_date
            ? dayjs(method_list[i].end_date).format("YYYY-MM-DD")
            : undefined,
          detail: method_list[i].detail,
          paper_id: item.id,
        };

        let api = {
          type: "post",
          url: "method-list/",
        };

        if (data_method_list_item.id != null) {
          api.type = "put";
          api.url = "method-list/" + data_method_list_item.id;
        }

        await ApiService[api.type](api.url, data_method_list_item)
          .then(({ data }) => {
            if (data.msg != "success") {
              throw new Error("ERROR");
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }

      //   old
      for (let i = 0; i < method_list_old.length; i++) {
        let check = method_list.find((x: any) => {
          return x.id == method_list_old[i].id;
        });

        if (!check) {
          await ApiService.delete("method_list/" + method_list_old[i].id)
            .then(({ data }) => {
              if (data.msg != "success") {
                throw new Error("ERROR");
              }
            })
            .catch(({ response }) => {
              console.log(response);
            });
        }
      }
    };

    const onSaveBudget = async () => {
      for (let i = 0; i < budget.length; i++) {
        let data_budget_item = {
          id: budget[i].id,
          detail: budget[i].detail,
          amount: budget[i].amount,
          paper_id: item.id,
        };

        let api = {
          type: "post",
          url: "budget/",
        };

        if (data_budget_item.id != null) {
          api.type = "put";
          api.url = "budget/" + data_budget_item.id;
        }

        await ApiService[api.type](api.url, data_budget_item)
          .then(({ data }) => {
            if (data.msg != "success") {
              throw new Error("ERROR");
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }

      //   old
      for (let i = 0; i < budget_old.length; i++) {
        let check = budget.find((x: any) => {
          return x.id == budget_old[i].id;
        });

        if (!check) {
          await ApiService.delete("budget/" + budget_old[i].id)
            .then(({ data }) => {
              if (data.msg != "success") {
                throw new Error("ERROR");
              }
            })
            .catch(({ response }) => {
              console.log(response);
            });
        }
      }
    };

    const onSaveBudget2 = async () => {
      for (let i = 0; i < budget2.length; i++) {
        let data_budget_item = {
          id: budget2[i].id,
          detail: budget2[i].detail,
          amount: budget2[i].amount,
          paper_id: item.id,
        };

        let api = {
          type: "post",
          url: "budget2/",
        };

        if (data_budget_item.id != null) {
          api.type = "put";
          api.url = "budget2/" + data_budget_item.id;
        }

        await ApiService[api.type](api.url, data_budget_item)
          .then(({ data }) => {
            if (data.msg != "success") {
              throw new Error("ERROR");
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }

      //   old
      for (let i = 0; i < budget2_old.length; i++) {
        let check = budget2.find((x: any) => {
          return x.id == budget2_old[i].id;
        });

        if (!check) {
          await ApiService.delete("budget2/" + budget2_old[i].id)
            .then(({ data }) => {
              if (data.msg != "success") {
                throw new Error("ERROR");
              }
            })
            .catch(({ response }) => {
              console.log(response);
            });
        }
      }
    };

    const onSaveBudget3 = async () => {
      for (let i = 0; i < budget3.length; i++) {
        let data_budget_item = {
          id: budget3[i].id,
          detail: budget3[i].detail,
          amount: budget3[i].amount,
          paper_id: item.id,
        };

        let api = {
          type: "post",
          url: "budget3/",
        };

        if (data_budget_item.id != null) {
          api.type = "put";
          api.url = "budget3/" + data_budget_item.id;
        }

        await ApiService[api.type](api.url, data_budget_item)
          .then(({ data }) => {
            if (data.msg != "success") {
              throw new Error("ERROR");
            }
          })
          .catch(({ response }) => {
            console.log(response);
          });
      }

      //   old
      for (let i = 0; i < budget3_old.length; i++) {
        let check = budget3.find((x: any) => {
          return x.id == budget3_old[i].id;
        });

        if (!check) {
          await ApiService.delete("budget3/" + budget3_old[i].id)
            .then(({ data }) => {
              if (data.msg != "success") {
                throw new Error("ERROR");
              }
            })
            .catch(({ response }) => {
              console.log(response);
            });
        }
      }
    };

    onMounted(async () => {
      await fetchUser();
      await fetchItem();

      if (
        user_item.prefix_name == "" ||
        user_item.firstname == "" ||
        user_item.surname == "" ||
        user_item.email == "" ||
        user_item.department_id == null
      ) {
        useToast("โปรดระบุข้อมูลส่วนตัวให้ครบถ้วน", "error");
        router.push({ name: "paper" });
        return;
      }

      if (userData.data.id != item.user_id) {
        useToast("คุณไม่สามารถแก้ไขข้อมูลของบุคคลอื่นได้", "error");
        router.push({ name: "paper" });
        return;
      }

      if (item.status_id == 2 || item.status_id == 4) {
        useToast("สถานะรายการปัจจุบัน ไม่สามารถแก้ไขข้อมูลได้", "error");
        router.push({ name: "paper" });
        return;
      }
    });

    onUnmounted(() => {});

    // Watch

    // Return
    return {
      isLoading,
      item,
      budget,
      budget2,
      budget3,
      method_list,
      researcher,
      tab_index,
      // event
      onTabChange,
      onComplete,
      r,
    };
  },
});
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .card > .card-body {
    padding: 0px;
  }
}
.modal-content {
  background-color: #d9f4fe;
}
</style>

<style>
.wizard-icon-container {
  background-color: #800001 !important;
}

.form-check-label {
  color: #444;
}
.pac-container {
  z-index: 9999 !important;
}

.stepTitle {
  color: #800001;
  font-weight: bold;
}
</style>

<style>
.vs__dropdown-toggle {
  border: none;
}

.v-select {
  padding: 0.4em 0.5em;
}

.dp__pointer {
  border: none;
}
</style>
