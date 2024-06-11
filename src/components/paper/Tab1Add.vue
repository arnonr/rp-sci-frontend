<template>
  <tab-content :title="`สาระสำคัญของโครงการ`" :before-change="onTab1Validate">
    <div class="row">
      <div class="mb-7 col-12 col-lg-12">
        <label for="complaint_title" class="required form-label"
          >ประเภทงานวิจัย</label
        >
        <v-select
          name="paper_type_id"
          label="name"
          placeholder="ประเภทงานวิจัย"
          :options="selectOptions.paper_types"
          class="form-control"
          :clearable="false"
          v-model="item.paper_type_id"
        >
        </v-select>
        <div class="d-block mt-1" v-if="errors.paper_type_id.error == 1">
          <span role="alert" class="text-danger">{{
            errors.paper_type_id.text
          }}</span>
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="complaint_title" class="required form-label"
          >ชื่อโครงการ ภาษาไทย</label
        >
        <input
          type="text"
          class="form-control"
          :placeholder="`ชื่อโครงการ ภาษาไทย`"
          :aria-label="`ชื่อโครงการ ภาษาไทย`"
          v-model="item.title_th"
        />
        <div class="d-block mt-1" v-if="errors.title_th.error == 1">
          <span role="alert" class="text-danger">{{
            errors.title_th.text
          }}</span>
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="complaint_title" class="required form-label"
          >ชื่อโครงการ ภาษาอังกฤษ</label
        >
        <input
          type="text"
          class="form-control"
          :placeholder="`ชื่อโครงการ ภาษาอังกฤษ`"
          :aria-label="`ชื่อโครงการ ภาษาอังกฤษ`"
          v-model="item.title_en"
        />
        <div class="d-block mt-1" v-if="errors.title_en.error == 1">
          <span role="alert" class="text-danger">{{
            errors.title_en.text
          }}</span>
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="abstract" class="required form-label"
          >บทคัดย่อ (Abstract)</label
        >
        <froala
          :tag="'textarea'"
          :config="froalaConfig.abstract"
          v-model="item.abstract"
        ></froala>
        <div class="d-block mt-1" v-if="errors.abstract.error == 1">
          <span role="alert" class="text-danger">{{
            errors.abstract.text
          }}</span>
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="complaint_detail" class="form-label">Keyword</label>
        <vue3-tags-input
          :tags="tags"
          placeholder=""
          @on-tags-changed="handleChangeTag"
        />
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="department_id" class="required form-label">ภาควิชา</label>
        <v-select
          name="department_id"
          label="name"
          placeholder="ภาควิชา"
          :options="selectOptions.departments"
          class="form-control"
          :clearable="false"
          v-model="item.department_id"
        >
        </v-select>
        <div class="d-block mt-1" v-if="errors.department_id.error == 1">
          <span role="alert" class="text-danger">{{
            errors.department_id.text
          }}</span>
        </div>
      </div>

      <div class="col-12 mb-7">
        <hr class="dotted" />

        <h6>คณะผู้วิจัย</h6>

        <div class="p-3 border border-dark-subtle rounded">
          <div
            class="row"
            :class="[idx == 0 ? '' : ' mt-7']"
            v-if="researcher"
            style="margin: 0.03rem"
            v-for="(rs, idx) in researcher"
            :key="'researcher' + idx"
          >
            <div class="">
              <h6>ลำดับที่ {{ idx + 1 }}</h6>
            </div>
            <div class="mb-3 col-12 col-lg-2">
              <label for="budget_detail" class="form-label">คำนำหน้า</label>
              <input
                type="text"
                class="form-control"
                v-model="rs.prefix_name"
              />
              <div
                class="d-block mt-1"
                v-if="researcher_errors.prefix_name == 1"
              >
                <span role="alert" class="text-danger">{{
                  researcher_errors.prefix_name.text
                }}</span>
              </div>
            </div>
            <div class="mb-3 col-12 col-lg-5">
              <label for="firstname" class="form-label">ชื่อ</label>
              <input type="text" class="form-control" v-model="rs.firstname" />
              <div
                class="d-block mt-1"
                v-if="researcher_errors.firstname.error == 1"
              >
                <span role="alert" class="text-danger">{{
                  researcher_errors.firstname.text
                }}</span>
              </div>
            </div>
            <div class="mb-3 col-12 col-lg-5">
              <label for="firstname" class="form-label">นามสกุล</label>
              <input type="text" class="form-control" v-model="rs.surname" />
              <div
                class="d-block mt-1"
                v-if="researcher_errors.surname.error == 1"
              >
                <span role="alert" class="text-danger">{{
                  researcher_errors.surname.text
                }}</span>
              </div>
            </div>
            <div class="mb-7 col-12 col-lg-6">
              <label for="department_id" class="form-label">หน่วยงาน</label>
              <v-select
                name="department_id"
                label="name"
                placeholder="หน่วยงาน"
                :options="selectOptions.departments"
                class="form-control"
                :clearable="false"
                v-model="rs.department_id"
              >
              </v-select>
              <div
                class="d-block mt-1"
                v-if="researcher_errors.department_id.error == 1"
              >
                <span role="alert" class="text-danger">{{
                  researcher_errors.department_id.text
                }}</span>
              </div>
            </div>
            <div class="mb-7 col-12 col-lg-6">
              <label for="department_text" class="form-label"
                >กรณีหน่วยงานอื่นๆ โปรดระบุ</label
              >
              <input
                type="text"
                class="form-control"
                v-model="rs.department_text"
              />
              <div
                class="d-block mt-1"
                v-if="researcher_errors.department_text.error == 1"
              >
                <span role="alert" class="text-danger">{{
                  researcher_errors.department_text.text
                }}</span>
              </div>
            </div>
            <div class="mb-7 col-12 col-lg-6">
              <label for="phone_number" class="form-label"
                >เบอร์โทรศัพท์</label
              >
              <input type="text" class="form-control" v-model="rs.phone_number" />
              <div
                class="d-block mt-1"
                v-if="researcher_errors.phone_number.error == 1"
              >
                <span role="alert" class="text-danger">{{
                  researcher_errors.phone_number.text
                }}</span>
              </div>
            </div>
            <div class="mb-7 col-12 col-lg-6">
              <label for="department_text" class="form-label"
                >ความชำนาญ/ความสนใจพิเศษ</label
              >
              <input type="text" class="form-control" v-model="rs.expertise" />
              <div
                class="d-block mt-1"
                v-if="researcher_errors.expertise.error == 1"
              >
                <span role="alert" class="text-danger">{{
                  researcher_errors.expertise.text
                }}</span>
              </div>
            </div>
            <div class="mb-7 col-12 col-lg-6">
              <label for="department_id" class="required form-label"
                >ประเภท</label
              >
              <v-select
                name="research_type"
                label="name"
                placeholder="ประเภท"
                :options="selectOptions.researcher_types"
                class="form-control"
                :clearable="false"
                v-model="rs.researcher_type"
              >
              </v-select>
              <div
                class="d-block mt-1"
                v-if="researcher_errors.researcher_type.error == 1"
              >
                <span role="alert" class="text-danger">{{
                  researcher_errors.researcher_type.text
                }}</span>
              </div>
            </div>
            <div class="mb-7 col-12 col-lg-4">
              <label for="department_text" class="form-label">สัดส่วน (%)</label>
              <input type="text" class="form-control" v-model="rs.percentage" />
              <div
                class="d-block mt-1"
                v-if="researcher_errors.percentage.error == 1"
              >
                <span role="alert" class="text-danger">{{
                  researcher_errors.percentage.text
                }}</span>
              </div>
            </div>

            <div class="mb-1 col-12 col-md-2">
              <button
                class="btn btn-danger mt-7 w-100"
                @click="onDecreaseResearcher(idx)"
              >
                <i class="fa fa-close"></i>
                <span>ลบ</span>
              </button>
            </div>
            <hr />
          </div>
        </div>

        <div class="mt-3">
          <a @click="onIncreaseResearcher" class="cursor-pointer"
            ><span>+ เพิ่ม</span></a
          >
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="abstract" class="required form-label"
          >ความเป็นมาและความสำคัญของปัญหาการวิจัยที่ทำ</label
        >
        <froala
          :tag="'textarea'"
          :config="froalaConfig.history"
          v-model="item.history"
        ></froala>
        <div class="d-block mt-1" v-if="errors.history.error == 1">
          <span role="alert" class="text-danger">{{
            errors.history.text
          }}</span>
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="abstract" class="required form-label"
          >วัตถุประสงค์ของโครงการวิจัย</label
        >
        <froala
          :tag="'textarea'"
          :config="froalaConfig.objective"
          v-model="item.objective"
        ></froala>
        <div class="d-block mt-1" v-if="errors.objective.error == 1">
          <span role="alert" class="text-danger">{{
            errors.objective.text
          }}</span>
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="abstract" class="required form-label"
          >ขอบเขตของการวิจัย</label
        >
        <froala
          :tag="'textarea'"
          :config="froalaConfig.scope"
          v-model="item.scope"
        ></froala>
        <div class="d-block mt-1" v-if="errors.scope.error == 1">
          <span role="alert" class="text-danger">{{ errors.scope.text }}</span>
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="abstract" class="required form-label"
          >ผลงานวิจัยที่เกี่ยวข้อง (Review Literature)
          ระบุความเกี่ยวเนื่องสัมพันธ์หรือความแตกต่างของโครงการวิจัยเรื่องนี้กับโครงการวิจัยอื่นทั้งในประเทศและต่างประเทศที่ได้มีการวิจัยไว้แล้ว
          รวมถึงรายละเอียดผลการวิจัยที่เกี่ยวข้อง
          ต้องเขียนแสดงรายละเอียดจากผลการวิจัยเรื่องนั้นๆ
          ไม่ใช่การเขียนเอกสารอ้างอิงหรือบรรณานุกรม</label
        >
        <froala
          :tag="'textarea'"
          :config="froalaConfig.review_literature"
          v-model="item.review_literature"
        ></froala>
        <div class="d-block mt-1" v-if="errors.review_literature.error == 1">
          <span role="alert" class="text-danger">{{
            errors.review_literature.text
          }}</span>
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="abstract" class="required form-label"
          >ระเบียบวิธีวิจัย ให้อธิบายขั้นตอนในการดำเนินการทดลอง หรือทดสอบ
          โดยอธิบาย วิธีวิเคราะห์ข้อมูล อย่างละเอียด</label
        >
        <froala
          :tag="'textarea'"
          :config="froalaConfig.method"
          v-model="item.method"
        ></froala>
        <div class="d-block mt-1" v-if="errors.method.error == 1">
          <span role="alert" class="text-danger">{{ errors.method.text }}</span>
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="abstract" class="required form-label"
          >ประโยชน์ที่คาดว่าจะได้รับ</label
        >
        <froala
          :tag="'textarea'"
          :config="froalaConfig.benefit"
          v-model="item.benefit"
        ></froala>
        <div class="d-block mt-1" v-if="errors.benefit.error == 1">
          <span role="alert" class="text-danger">{{
            errors.benefit.text
          }}</span>
        </div>
      </div>

      <div class="col-12 mb-7">
        <hr class="dotted" />

        <h6>
          ขั้นตอนและระยะเวลาของแผนดำเนินงานโดยละเอียด
          รวมทั้งแผนภูมิแสดงระยะเวลาในการดำเนินงาน (Phasing Chart)
          ภายในระยะเวลาที่ใช้ในการวิจัย
        </h6>

        <div class="p-3 border border-dark-subtle rounded">
          <div
            class="row"
            :class="[idx == 0 ? '' : ' mt-7']"
            v-if="method_list"
            style="margin: 0.03rem"
            v-for="(ml, idx) in method_list"
            :key="'method' + idx"
          >
            <div class="">
              <h6>ลำดับที่ {{ idx + 1 }}</h6>
            </div>

            <div class="mb-3 col-12 col-lg-6">
              <label for="method_start_date" class="form-label"
                >วันที่เริ่ม</label
              >
              <VueDatePicker
                v-model="ml.start_date"
                :enable-time-picker="false"
                placeholder="วันเดือนปี"
                :locale="'th'"
                auto-apply
                class="form-control"
                :format="format"
              >
                <template #year-overlay-value="{ text }">
                  {{ parseInt(text) + 543 }}
                </template>

                <template #year="{ value }">
                  {{ value + 543 }}
                </template>
              </VueDatePicker>
              <div
                class="d-block mt-1"
                v-if="method_list_errors.start_date == 1"
              >
                <span role="alert" class="text-danger">{{
                  method_list_errors.start_date.text
                }}</span>
              </div>
            </div>

            <div class="mb-3 col-12 col-lg-6">
              <label for="budget_detail" class="form-label"
                >วันที่สิ้นสุด</label
              >
              <VueDatePicker
                v-model="ml.end_date"
                :enable-time-picker="false"
                placeholder="วันเดือนปี"
                :locale="'th'"
                auto-apply
                class="form-control"
                :format="format"
              >
                <template #year-overlay-value="{ text }">
                  {{ parseInt(text) + 543 }}
                </template>

                <template #year="{ value }">
                  {{ value + 543 }}
                </template>
              </VueDatePicker>
              <div class="d-block mt-1" v-if="method_list_errors.end_date == 1">
                <span role="alert" class="text-danger">{{
                  method_list_errors.end_date.text
                }}</span>
              </div>
            </div>

            <div class="mb-3 col-12 col-lg-10">
              <label for="firstname" class="form-label">รายละเอียด</label>
              <input type="text" class="form-control" v-model="ml.detail" />
              <div
                class="d-block mt-1"
                v-if="method_list_errors.detail.error == 1"
              >
                <span role="alert" class="text-danger">{{
                  method_list_errors.detail.text
                }}</span>
              </div>
            </div>

            <div class="mb-1 col-12 col-md-2">
              <button
                class="btn btn-danger mt-7 w-100"
                @click="onDecreaseMethodList(idx)"
              >
                <i class="fa fa-close"></i>
                <span>ลบ {{ idx + 1 }}</span>
              </button>
            </div>
            <hr />
          </div>
        </div>

        <div class="mt-3">
          <a @click="onIncreaseMethodList" class="cursor-pointer"
            ><span>+ เพิ่ม</span></a
          >
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="abstract" class="required form-label"
          >สถานที่ทำการทดลอง และ/หรือเก็บข้อมูล</label
        >
        <froala
          :tag="'textarea'"
          :config="froalaConfig.location"
          v-model="item.location"
        ></froala>
        <div class="d-block mt-1" v-if="errors.location.error == 1">
          <span role="alert" class="text-danger">{{
            errors.location.text
          }}</span>
        </div>
      </div>

      <div class="col-12 mb-7">
        <hr class="dotted" />
        <h3>
          งบประมาณในการดำเนินงานวิจัย โดยระบุ
          รายละเอียดของงบประมาณค่าใช้จ่ายในรายการดังต่อไปนี้
        </h3>

        <h6>
          หมวดค่าตอบแทน เฉพาะค่าจ้างผู้ช่วยวิจัย ไม่เกินเดือนละ 3000 บาท
          (ไม่เกิน 6 เดือน)
        </h6>

        <div class="p-3 border border-dark-subtle rounded">
          <div
            class="row"
            :class="[idx == 0 ? '' : ' mt-7']"
            v-if="budget"
            style="margin: 0.03rem"
            v-for="(bg, idx) in budget"
            :key="'budget1' + idx"
          >
            <div class="">
              <h4>ลำดับที่ {{ idx + 1 }}</h4>
            </div>
            <div class="mb-3 col-12 col-lg-8">
              <label for="budget_detail" class="form-label"> รายละเอียด</label>
              <input
                type="text"
                class="form-control"
                placeholder="รายละเอียด"
                aria-label="รายละเอียด"
                v-model="bg.detail"
              />
              <div class="d-block mt-1" v-if="budget_errors.detail.error == 1">
                <span role="alert" class="text-danger">{{
                  budget_errors.detail.text
                }}</span>
              </div>
            </div>
            <div class="mb-3 col-12 col-lg-2">
              <label for="amount" class="form-label">จำนวนเงิน</label>
              <input
                type="text"
                class="form-control"
                placeholder="จำนวนเงิน"
                aria-label="จำนวนเงิน"
                v-model="bg.amount"
              />
              <div class="d-block mt-1" v-if="budget_errors.amount.error == 1">
                <span role="alert" class="text-danger">{{
                  budget_errors.amount.text
                }}</span>
              </div>
            </div>
            <div class="mb-1 col-12 col-md-2">
              <button
                class="btn btn-danger mt-7 w-100"
                @click="onDecreaseBudget(1, idx)"
              >
                <i class="fa fa-close"></i>
                <span>ลบ {{ idx + 1 }}</span>
              </button>
            </div>
            <hr />
          </div>
        </div>

        <div class="mt-3">
          <a @click="onIncreaseBudget(1)" class="cursor-pointer"
            ><span>+ เพิ่ม</span></a
          >
        </div>

        <!-- budget 2 -->
        <h6 class="mt-6">
          หมวดค่าใช้สอย เช่น ค่าพาหนะ ค่าจ้างเหมาต่าง ๆ เช่น ค่าจัดทำรูปเล่ม
        </h6>

        <div class="p-3 border border-dark-subtle rounded">
          <div
            class="row"
            :class="[idx == 0 ? '' : ' mt-7']"
            v-if="budget2"
            style="margin: 0.03rem"
            v-for="(bg, idx) in budget2"
            :key="'budget2' + idx"
          >
            <div class="">
              <h4>ลำดับที่ {{ idx + 1 }}</h4>
            </div>
            <div class="mb-3 col-12 col-lg-8">
              <label for="budget_detail" class="form-label"> รายละเอียด</label>
              <input
                type="text"
                class="form-control"
                placeholder="รายละเอียด"
                aria-label="รายละเอียด"
                v-model="bg.detail"
              />
              <div class="d-block mt-1" v-if="budget_errors.detail.error == 1">
                <span role="alert" class="text-danger">{{
                  budget_errors.detail.text
                }}</span>
              </div>
            </div>
            <div class="mb-3 col-12 col-lg-2">
              <label for="amount" class="form-label">จำนวนเงิน</label>
              <input
                type="text"
                class="form-control"
                placeholder="จำนวนเงิน"
                aria-label="จำนวนเงิน"
                v-model="bg.amount"
              />
              <div class="d-block mt-1" v-if="budget_errors.amount.error == 1">
                <span role="alert" class="text-danger">{{
                  budget_errors.amount.text
                }}</span>
              </div>
            </div>
            <div class="mb-1 col-12 col-md-2">
              <button
                class="btn btn-danger mt-7 w-100"
                @click="onDecreaseBudget(2, idx)"
              >
                <i class="fa fa-close"></i>
                <span>ลบ {{ idx + 1 }}</span>
              </button>
            </div>
            <hr />
          </div>
        </div>

        <div class="mt-3">
          <a @click="onIncreaseBudget(2)" class="cursor-pointer"
            ><span>+ เพิ่ม</span></a
          >
        </div>

        <!-- budget 3 -->
        <h6 class="mt-6">
          หมวดค่าวัสดุ (แจกแจงรายละเอียดราคาต่อหน่วยอย่างชัดเจน)
        </h6>

        <div class="p-3 border border-dark-subtle rounded">
          <div
            class="row"
            :class="[idx == 0 ? '' : ' mt-7']"
            v-if="budget3"
            style="margin: 0.03rem"
            v-for="(bg, idx) in budget3"
            :key="'budget3' + idx"
          >
            <div class="">
              <h4>ลำดับที่ {{ idx + 1 }}</h4>
            </div>
            <div class="mb-3 col-12 col-lg-8">
              <label for="budget_detail" class="form-label"> รายละเอียด</label>
              <input
                type="text"
                class="form-control"
                placeholder="รายละเอียด"
                aria-label="รายละเอียด"
                v-model="bg.detail"
              />
              <div class="d-block mt-1" v-if="budget_errors.detail.error == 1">
                <span role="alert" class="text-danger">{{
                  budget_errors.detail.text
                }}</span>
              </div>
            </div>
            <div class="mb-3 col-12 col-lg-2">
              <label for="amount" class="form-label">จำนวนเงิน</label>
              <input
                type="text"
                class="form-control"
                placeholder="จำนวนเงิน"
                aria-label="จำนวนเงิน"
                v-model="bg.amount"
              />
              <div class="d-block mt-1" v-if="budget_errors.amount.error == 1">
                <span role="alert" class="text-danger">{{
                  budget_errors.amount.text
                }}</span>
              </div>
            </div>
            <div class="mb-1 col-12 col-md-2">
              <button
                class="btn btn-danger mt-7 w-100"
                @click="onDecreaseBudget(3, idx)"
              >
                <i class="fa fa-close"></i>
                <span>ลบ {{ idx + 1 }}</span>
              </button>
            </div>
            <hr />
          </div>
        </div>

        <div class="mt-3">
          <a @click="onIncreaseBudget(3)" class="cursor-pointer"
            ><span>+ เพิ่ม</span></a
          >
        </div>
      </div>

      <div class="mb-7 col-12 col-lg-12">
        <label for="abstract" class="required form-label"
          >รายการเอกสารอ้างอิงหรือบรรณานุกรม</label
        >

        <froala
          :tag="'textarea'"
          :config="froalaConfig.references"
          v-model="item.references"
        ></froala>
        <div class="d-block mt-1" v-if="errors.references.error == 1">
          <span role="alert" class="text-danger">{{
            errors.references.text
          }}</span>
        </div>
      </div>

      <div class="col-12">
        <div class="mb-7 row">
          <div class="col-12 col-lg-12">
            <label for="formFile" class="form-label"
              >แนบไฟล์ (ถ้ามี) (แนบได้หลายไฟล์) /Attach files</label
            >
            <dashboard
              :uppy="uppy"
              :plugins="['Webcam']"
              aria-placeholder=""
              ref="dash"
              :props="{
                width: '100%',
                doneButtonHandler: null,
                hideCancelButton: true,
                showRemoveButtonAfterComplete: true,
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </tab-content>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, reactive, toRefs } from "vue";
import ApiService from "@/core/services/ApiService";
// Import Vue-select
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
// Import Datepicker
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
// Import Dayjs
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(buddhistEra);
dayjs.extend(utc);
dayjs.extend(timezone);
// Import FormWizard
import { TabContent } from "vue3-form-wizard";
// Import Yup Validate
import * as Yup from "yup";
// Use Toast Composables
import useToast from "@/composables/useToast";
// Uppy
import { Dashboard } from "@uppy/vue";
import Uppy from "@uppy/core";
import Webcam from "@uppy/webcam";
// import Preview from "@uppy/preview";
import XHRUpload from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/webcam/dist/style.css";
// Vue3 Tags
import Vue3TagsInput from "vue3-tags-input";
// import "@wiris/mathtype-froala3/wiris.js"

// Use Composables
import useBasicData from "@/composables/useBasicData";
import useMasterData from "@/composables/useMasterData";
import useFroalaConfigData from "@/composables/useFroalaConfigData";

export default defineComponent({
  name: "complaint-form-tab2",
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
    researcher: {
      type: Array as () => any[],
      required: true,
    },
    method_list: {
      type: Array as () => any[],
      required: true,
    },
    r: {
      type: String,
    },
  },
  components: {
    vSelect,
    VueDatePicker,
    dayjs,
    Dashboard,
    TabContent,
    Vue3TagsInput,
  },
  setup(props, { emit }) {
    // Variable
    const { item, budget, budget2, budget3, researcher, method_list } =
      toRefs(props);

    const format = (date: any) => {
      const day = dayjs(date).locale("th").format("DD");
      const month = dayjs(date).locale("th").format("MMM");
      const year = date.getFullYear() + 543;
      return `${day} ${month} ${year}`;
    };

    const tags = ref<string[]>([]);

    let froalaConfig: any = {
      abstract: useFroalaConfigData().froala_config,
      history: useFroalaConfigData().froala_config,
      objective: useFroalaConfigData().froala_config,
      review_literature: useFroalaConfigData().froala_config,
      method: useFroalaConfigData().froala_config,
      benefit: useFroalaConfigData().froala_config,
      location: useFroalaConfigData().froala_config,
      references: useFroalaConfigData().froala_config,
      scope: useFroalaConfigData().froala_config,
    };

    let textEditor = [
      "abstract",
      "history",
      "objective",
      "review_literature",
      "method",
      "benefit",
      "location",
      "references",
      "scope",
    ];

    textEditor.forEach((x: any) => {
      froalaConfig[x]["events"] = {
        keyup: function (inputEvent: any) {
          item.value[x] = this.html.get();
        },
        click: function (clickEvent: any) {
          item.value[x] = this.html.get();
        },
        "commands.after": function (cmd: any, param1: any, param2: any) {
          item.value[x] = this.html.get();
        },
        "paste.after": function (pasteEvent: any) {
          item.value[x] = this.html.get();
        },
        initialized: function () {
          this.html.insert(item.value[x]);
        },
      };
    });

    // Uppy
    const uppy = new Uppy({
      meta: {
        paper_id: null,
        secret_key: props.r,
        id: null,
        table_name: "paper",
      },
      debug: true,
      restrictions: {
        allowedFileTypes: ["image/*", "video/*", "application/*"],
      },
    })
      .use(XHRUpload, {
        headers: {},
        endpoint: `${import.meta.env.VITE_APP_API_URL}/froala/uppy`,
        fieldName: "file",
      })
      .use(Webcam, {
        modes: ["picture"],
      });

    uppy.on("file-added", (file) => {
      if (file.meta.id == null) {
        uppy.upload();
      }
    });

    uppy.on("upload-success", (file: any, response) => {
      uppy.setFileMeta(file.id, {
        url: response.body.link,
        complaint_id: response.body.complaint_id,
        id: response.body.id,
      });
    });

    uppy.on("file-removed", (file, reason) => {
      if (file.meta.id != null) {
        ApiService.delete(
          `${import.meta.env.VITE_APP_API_URL}/file-attach/${file.meta.id}`
        )
          .then(({ data }) => {
            if (data.msg != "success") {
              throw new Error("ERROR");
            }
          })
          .catch(({ response }) => {
            console.log(response.data.errors);
          });
      }
    });
    // End Uppy

    const selectOptions = ref({
      departments: <any>[],
      paper_types: <any>[],
      researcher_types: useBasicData().researcher_types,
    });

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

      //     rp_no: "",
      //   user_id: null,
      //   title_th: "",
      //   title_en: "",
      //   abstract: "",
      //   keyword: "",
      //   department_id: null,
      //   paper_type_id: null,
      //   history: "",
      //   objective: "",
      //   scope: "",
      //   review_literature: "",
      //   method: "",
      //   benefit: "",
      //   location: "",
      //   references: "",
      //   status_id: null,
      //   sended_at: null,
      //   sended_user_id: null,

      //   complaint_title: Yup.string()
      //     .required("${path} จำเป็นต้องระบุ")
      //     .label("หัวข้อเรื่อง"),
      //   house_number: Yup.string().nullable().label("บ้านเลขที่"),
      //   building: Yup.string().nullable().label("หมู่บ้าน"),
      //   moo: Yup.string().nullable().label("หมู่ที่"),
      //   soi: Yup.string().nullable().label("ซอย"),
      //   road: Yup.string().nullable().label("ถนน"),
      //   address_all: Yup.object()
      //     .required("${path} จำเป็นต้องระบุ")
      //     .label("จังหวัด/อำเภอ/ตำบล"),
      //   incident_location: Yup.string()
      //     .required("${path} จำเป็นต้องระบุ")
      //     .label("สถานที่เกิดเหตุ"),
      //   incident_date: Yup.date()
      //     .required("${path} จำเป็นต้องระบุ")
      //     .label("วันที่เกิดเหตุ"),
      //   incident_time: Yup.object().nullable().label("เวลาเกิดเหตุ"),
      //   day_time: Yup.object()
      //     .required("${path} จำเป็นต้องระบุ")
      //     .label("ห้วงเวลาเกิดเหตุ"),
      //   location_coordinates: Yup.string().nullable().label("coordinates"),
      //   complaint_detail: Yup.string()
      //     .required("${path} จำเป็นต้องระบุ")
      //     .label("บรรยายพฤติกรรมการกระทำความผิด"),
      //   //   complaint_channel_id: Yup.object().nullable(),
      //   complaint_topic: Yup.object()
      //     .required("${path} จำเป็นต้องระบุ")
      //     .label("ประเภทเรื่อง"),
      //   complaint_channel_all: Yup.array()
      //     .nullable()
      //     .label("เคยร้องเรียนเรื่องนี้ผ่านช่องทางใด"),
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

    // Event
    const onTab1Validate = async () => {
      Object.assign(errors, {
        ...errors_default,
      });

      Object.assign(budget_errors, {
        ...budget_errors_default,
      });

      //   try {
      //     await validationItemSchema.validate(item.value, {
      //       abortEarly: false,
      //     });
      //   } catch (err: any) {
      //     err.inner.forEach((error: any) => {
      //       const fieldName = error.path;
      //       const errorMessage = error.message;
      //       errors[fieldName].error = 1;
      //       errors[fieldName].text = errorMessage;
      //     });
      //     console.log(errors);
      //     useToast("ระบุข้อมูลไม่ครบถ้วน", "error");
      //     return false;
      //   }

      //   try {
      //     if (budget.value.length > 0) {
      //       await validationBudgetSchema.validate(budget[0], {
      //         abortEarly: false,
      //       });
      //     }
      //   } catch (err: any) {
      //     err.inner.forEach((error: any) => {
      //       const fieldName = error.path;
      //       const errorMessage = error.message;
      //       budget_errors[fieldName].error = 1;
      //       budget_errors[fieldName].text = errorMessage;
      //     });
      //     useToast("ข้อมูลไม่ครบถ้วน", "error");
      //     return false;
      //   }

      return true;
    };

    const handleChangeTag = (tags: any) => {
      tags.value = tags;
      item.value.keyword = tags.value.join(",");
    };

    // Mounted
    onMounted(async () => {
      selectOptions.value.departments = await useMasterData().fetchDepartments({
        is_active: 1,
        perPage: 500,
      });

      selectOptions.value.paper_types = await useMasterData().fetchPaperTypes({
        is_active: 1,
        perPage: 500,
      });

      tags.value = [];
    });

    const onIncreaseBudget = (type: any) => {
      if (type == 1) {
        budget.value.push({
          id: null,
          detail: "",
          amount: null,
          paper_id: null,
        });
      }
      if (type == 2) {
        budget2.value.push({
          id: null,
          detail: "",
          amount: null,
          paper_id: null,
        });
      }

      if (type == 3) {
        budget3.value.push({
          id: null,
          detail: "",
          amount: null,
          paper_id: null,
        });
      }
    };
    const onDecreaseBudget = (type: any, index: number) => {
      if (type == 1) {
        budget.value.splice(index, 1);
      }
      if (type == 2) {
        budget2.value.splice(index, 1);
      }
      if (type == 3) {
        budget3.value.splice(index, 1);
      }
    };

    const onIncreaseResearcher = () => {
      researcher.value.push({
        prefix_name: null,
        firstname: null,
        surname: null,
        department_id: null,
        department_text: null,
        phone_number: null,
        expertise: null,
        researcher_type: null,
        percentage: null,
        paper_id: null,
      });
    };

    const onDecreaseMethodList = (index: any) => {
      method_list.value.splice(index, 1);
    };

    const onIncreaseMethodList = () => {
      method_list.value.push({
        start_date: null,
        end_date: null,
        detail: null,
      });
    };

    const onDecreaseResearcher = (index: any) => {
      researcher.value.splice(index, 1);
    };

    // Return
    return {
      froalaConfig,
      format,
      selectOptions,
      tags,
      uppy,
      handleChangeTag,
      onTab1Validate,
      errors,
      budget_errors,
      researcher_errors,
      method_list_errors,
      onIncreaseBudget,
      onDecreaseBudget,
      onIncreaseResearcher,
      onDecreaseResearcher,
      onIncreaseMethodList,
      onDecreaseMethodList,
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

.form-control {
  border-color: #800001;
  border-width: 0.1em;
}

.form-check-input:not(:checked) {
  background-color: #fff;
}

.form-check-input:checked {
  background-color: #1b84ff !important;
  border-color: #1b84ff !important;
}
</style>
