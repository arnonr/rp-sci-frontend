<template>
  <div class="row">
    <h6 class="py-5 px-5 bg-warning rounded">คณะผู้วิจัย</h6>
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
          rc.department_id ? rc.department_id?.name : rc.department_text
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
  </div>

  <div>
    <hr class="my-6" />
    <h6 class="py-5 px-5 bg-warning rounded">
      ขั้นตอนและระยะเวลาของแผนดำเนินงาน
    </h6>
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
        <span class="fst-italic">{{ convertDate(ml.start_date) }}</span>
        <div class="separator separator-dotted my-2"></div>
      </div>
      <div class="col-md-6 mt-10">
        <span class="fw-bold">วันที่สิ้นสุด: </span>
        <span class="fst-italic">{{ convertDate(ml.end_date) }}</span>
        <div class="separator separator-dotted my-2"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs } from "vue";
// Composable
import useDateData from "@/composables/useDateData";

export default defineComponent({
  name: "paper-pdf-detail-section2",
  props: {
    item: {
      type: Object,
      required: true,
    },
    researcher: {
      type: Object,
      required: true,
    },
    method_list: {
      type: Object,
      required: true,
    },
  },

  components: {},
  setup(props) {
    // Variable
    const { item } = toRefs(props);

    // Mounted
    onMounted(async () => {});

  

    // Watch
    // Return
    return {
      item,
      convertDate: useDateData().convertDate,
    };
  },
});
</script>
