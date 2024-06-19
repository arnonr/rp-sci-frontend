<template>
  <div class="row">
    <div>
      <hr class="my-6" />

      <h6 class="py-5 px-5 bg-warning rounded">งบประมาณในการดำเนินงานวิจัย</h6>
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
          <span class="fst-italic fw-bold"
            >{{
              Number(bg.amount).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }} </span
          ><span> บาท</span>
          <div class="separator separator-dotted my-2"></div>
        </div>
      </div>
      <hr class="my-6" />
    </div>

    <div v-if="budget2.length != 0">
      <h6>
        หมวดค่าใช้สอย เช่น ค่าพาหนะ ค่าจ้างเหมาต่าง ๆ เช่น ค่าจัดทำรูปเล่ม
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
      <h6 class="py-5 px-5 bg-warning rounded">
        รายการเอกสารอ้างอิงหรือบรรณานุกรม
      </h6>
      <!-- <span class="fw-bold">รายการเอกสารอ้างอิงหรือบรรณานุกรม : </span> -->
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
</template>

<script lang="ts">
import { defineComponent, onMounted, toRefs } from "vue";

export default defineComponent({
  name: "paper-detail-section1",
  props: {
    item: {
      type: Object,
      required: true,
    },
    budget: {
      type: Array as () => any[],
      required: true,
    },
    budget2: {
      type: Array as () => any[],
      required: true,
    },
    budget3: {
      type: Array as () => any[],
      required: true,
    },
    file_attach: {
      type: Array as () => any[],
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
    };
  },
});
</script>
