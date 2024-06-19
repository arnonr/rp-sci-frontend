<template>
  <div class="row">
    <div class="col-md-12">
      <span class="fw-bold">ประเภทงานวิจัย : </span>
      <span class="fst-italic">{{ item.paper_type_id?.name }}</span>
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
        {{ item.keyword }}
      </span>
      <div class="separator separator-dotted my-2"></div>
    </div>
    <div class="col-md-12">
      <span class="fw-bold">ภาควิชา : </span>
      <span class="fst-italic">{{ item.department_id?.name }}</span>
      <div class="separator separator-dotted my-2"></div>
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

    <div class="col-md-12">
      <span class="fw-bold">สถานที่ทำการทดลอง และ/หรือเก็บข้อมูล : </span>
      <div class="fst-italic" v-html="item.location"></div>
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
