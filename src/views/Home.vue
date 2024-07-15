<template>
  <!--begin::Wrapper-->
  <div class="container p-10 mt-2 pb-0">
    <section>
      <h2 class="mt-5 mb-10 text-black">ข้ันตอนการส่งข้อเสนอโครงการ</h2>
      <!-- <div v-html="description_steps"></div> -->
      <div>
        <table
          class="mx-auto table table-bordered table-striped"
          style="border-collapse: collapse; border: none"
        >
          <tbody>
            <tr>
              <td colspan="3" class="text-center">
                <h3>ขั้นตอนการขอทุนวิจัยคณะวิทยาศาสตร์ประยุกต์</h3>
              </td>
            </tr>
            <tr>
              <td colspan="2" class="text-center">
                <h4>กิจกรรม</h4>
              </td>
              <td colspan="2" class="text-center">
                <h4>ระยะเวลาดำเนินการ</h4>
              </td>
            </tr>
            <tr>
              <td class="text-center">1</td>
              <td>
                <span class="fs-5">
                  นักวิจัยยื่นขอทุนผ่านระบบส่งข้อเสนอ
                  <a href="http://sci.kmutnb.ac.th/rp/"
                    >www.sci.kmutnb.ac.th/rp/</a
                  >
                </span>
              </td>
              <td class="text-center">
                <span class="fs-5"> 15 ก.ค. - 15 ส.ค. 67 </span>
              </td>
            </tr>
            <tr>
              <td class="text-center">2</td>
              <td>
                <span class="fs-5">
                  คณะกรรมการวิจัย/ผู้ทรงคุณวุฒิพิจารณาโครงการ​​
                </span>
              </td>
              <td class="text-center">
                <span class="fs-5"> 16 ส.ค. - 9 ก.ย. 67 </span>
              </td>
            </tr>

            <tr>
              <td class="text-center">3</td>
              <td>
                <span class="fs-5">
                  อนุมัติงบประมาณจากคณะกรรมการประจำส่วนงานวิชาการคณะวิทยาศาสตร์ประยุกต์​
                </span>
              </td>
              <td class="text-center">
                <span class="fs-5"> ต.ค. 67 </span>
              </td>
            </tr>

            <tr>
              <td class="text-center">4</td>
              <td>
                <span class="fs-5"> ผู้รับทุนทำสัญญารับทุนวิจัย​​​​​​​​ </span>
              </td>
              <td class="text-center">
                <span class="fs-5"> ต.ค. 67 </span>
              </td>
            </tr>

            <tr>
              <td class="text-center">5</td>
              <td>
                <span class="fs-5">
                  ผู้รับทุนรับเงินทุนวิจัย
                  (โดยงานคลังจะประสานงานกับผู้ที่ได้รับทุน)​​</span
                >
              </td>
              <td class="text-center">
                <span class="fs-5"> ม.ค. 68 </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr class="mt-10 mb-10" />
    </section>

    <section v-for="(it, idx) in annouce" :key="idx">
      <h2 class="mt-5 mb-10 text-black">{{ it.topic }}</h2>
      <div v-html="it.detail"></div>
      <hr class="mt-10 mb-10" />
    </section>
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, reactive } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "home",
  components: {},
  setup() {
    const router = useRouter();
    const description_steps =
      ref<any>(`<table class="mx-auto table table-bordered" style="border-collapse:collapse; border:none; width:750pt">
	<tbody>
		<tr>
			<td colspan="3" style="height:28.5pt; text-align:center; vertical-align:middle; white-space:nowrap; width:1322pt"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:red"><strong>ขั้นตอนการขอทุนวิจัยคณะวิทยาศาสตร์ประยุกต์</strong></span></span></span></td>
		</tr>
		<tr>
			<td colspan="2" style="height:24.75pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:#002060"><strong>กิจกรรม</strong></span></span></span></td>
			<td style="height:24.75pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:#002060"><strong>ระยะเวลาดำเนินการ</strong></span></span></span></td>
		</tr>
		<tr>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">1</span></span></span></td>
			<td style="height:22.5pt; vertical-align:middle; white-space:normal; width:734pt">
			<p><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">นักวิจัยยื่นขอทุนผ่านระบบ คลิก <a href="http://sci.kmutnb.ac.th/rp/">www.rp.sci.kmutnb.ac.th/?page=login</a></span></span></span></p>
			</td>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">15 ก.ค. - 15 ส.ค. 67</span></span></span></td>
		</tr>
		<tr>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">2</span></span></span></td>
			<td style="height:22.5pt; vertical-align:middle; white-space:normal; width:734pt"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">นักวิจัยพิมพ์เอกสารบันทึกข้อความจากระบบ โดยลงนามหัวหน้าโครงการ และให้หัวหน้าภาควิชาลงนามกำกับ</span></span></span></td>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">3 ก.ค. - 4 ส.ค. 66</span></span></span></td>
		</tr>
		<tr>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">3</span></span></span></td>
			<td style="height:22.5pt; vertical-align:middle; white-space:normal; width:734pt"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">ส่งเอกสารบันทึกที่ลงนามแล้ว มายังหน่วยวิจัย คณะวิทยาศาสตร์ประยุกต์ ชั้น 2</span></span></span></td>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">3 ก.ค. - 4 ส.ค. 66</span></span></span></td>
		</tr>
		<tr>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">4</span></span></span></td>
			<td style="height:22.5pt; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">คณะกรรมการวิจัย/ผู้ทรงคุณวุฒิพิจารณาโครงการ</span></span></span></td>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">7 ส.ค. - 31 ส.ค. 66</span></span></span></td>
		</tr>
		<tr>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">5</span></span></span></td>
			<td style="height:22.5pt; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">อนุมัติงบประมาณจากกรรมการส่วนงาน</span></span></span></td>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">ก.ย. 66 - 20 ก.ย. 66</span></span></span></td>
		</tr>
		<tr>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">6</span></span></span></td>
			<td style="height:22.5pt; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">ผู้รับทุนทำสัญญา&nbsp;</span></span></span></td>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">ต.ค.</span></span></span></td>
		</tr>
		<tr>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">7</span></span></span></td>
			<td style="height:22.5pt; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">ผู้รับทุนรับเงินทุนวิจัย (โดยงานคลังจะประสานงานกับผู้ที่ได้รับทุน)</span></span></span></td>
			<td style="height:22.5pt; text-align:center; vertical-align:middle; white-space:nowrap"><span style="font-size:16px"><span style="font-family:Verdana,Geneva,sans-serif"><span style="color:black">ม.ค 67</span></span></span></td>
		</tr>
	</tbody>
</table>`);

    const home_menus = [
      {
        id: 1,
        name: "ร้องเรียน (ประชาชนร้องเรียนตำรวจ)",
        name_short: "ร้องเรียน",
        subName: "",
        route: "/appeal",
        icon: "document",
        textColor: "white",
        textHoverColor: "dark",
        iconColor: "white",
        bgColor: "primary",
      },
      {
        id: 2,
        name: "แจ้งเบาะแส (ประชาชนแจ้งเบาะแส)",
        name_short: "แจ้งเบาะแส",
        subName: "",
        route: "/appeal",
        icon: "message-text-2",
        textColor: "white",
        textHoverColor: "dark",
        iconColor: "white",
        bgColor: "primary",
      },
      {
        id: 3,
        name: "แจ้งเบาะแสยาเสพติด (ทุกคนแจ้งได้)",
        name_short: "แจ้งเบาะแสยาเสพติด",
        subName: "",
        route: "/appeal",
        icon: "virus",
        textColor: "white",
        textHoverColor: "dark",
        iconColor: "white",
        bgColor: "danger",
      },
      {
        id: 4,
        name: "ตำรวจร้องเรียนตำรวจ",
        name_short: "ร้องเรียน",
        subName: "",
        route: "/appeal",
        icon: "address-book",
        textColor: "white",
        textHoverColor: "dark",
        iconColor: "white",
        bgColor: "warning",
      },
      {
        name: "ติดตามเรื่องร้องเรียน",
        subName: "",
        route: "/tracking",
        icon: "notification-on",
        textColor: "white",
        textHoverColor: "dark",
        iconColor: "white",
        bgColor: "success",
      },
      {
        name: "คู่มือการใช้งานระบบ",
        subName: "",
        route: "/tracking",
        icon: "book",
        textColor: "white",
        textHoverColor: "dark",
        iconColor: "white",
        bgColor: "info",
      },
    ];

    const onRouterLink = (hm: any) => {
      router.push({
        path: hm.route,
        query: {
          type_id: hm.id,
        },
      });
    };

    const annouce = reactive<any>([]);

    Object.assign(annouce, [
      {
        id: 1,
        level: 1,
        topic: "รายละเอียดหลักเกณฑ์การขอสนับสนุนทุนวิจัย รูปแบบโครงการวิจัย",
        detail: `<ul>
	<li><span style="font-family:Verdana,Geneva,sans-serif"><span style="font-size:16px"><strong><a href="https://drive.google.com/file/d/1ed01rJPLbg0XzwfSsCZu65l4HNit1Ou6/view" target="_blank">รายละเอียดหลักเกณฑ์การขอสนับสนุนทุนวิจัย รูปแบบโครงการวิจัย ประจำปีงบประมาณ 2567</a></strong>&nbsp;<img alt="" src="https://www.fg-a.com/new/new06p.gif" style="height:17px; width:48px"></span></span></li>
	<li><span style="font-family:Verdana,Geneva,sans-serif"><span style="font-size:16px"><a href="https://drive.google.com/file/d/1RKPEhVgohbC75uUWB7EcezIzDjuwiw1Y/view?usp=sharing" target="_blank"><strong>รายละเอียดหลักเกณฑ์การขอสนับสนุนทุนวิจัย รูปแบบโครงการวิจัย ประจำปีงบประมาณ 256</strong></a><strong><a href="https://drive.google.com/file/d/1RKPEhVgohbC75uUWB7EcezIzDjuwiw1Y/view?usp=sharing">6</a></strong>&nbsp;</span></span></li>
	<li><span style="font-family:Verdana,Geneva,sans-serif"><span style="font-size:16px"><a href="https://drive.google.com/file/d/11X_StJp_pK13sYy9VUrNObKb5f8k0yWj/view?usp=sharing" target="_blank"><strong>รายละเอียดหลักเกณฑ์การขอสนับสนุนทุนวิจัย รูปแบบโครงการวิจัย ประจำปีงบประมาณ 2565&nbsp;</strong></a>&nbsp;</span></span></li>
	<li><span style="font-family:Verdana,Geneva,sans-serif"><span style="font-size:16px"><a href="https://drive.google.com/file/d/1ZqwOcibEHF4Lqm2lmtyjV8HmnCmPdvjt/view?usp=sharing" target="_blank"><strong>รายละเอียดหลักเกณฑ์การขอสนับสนุนทุนวิจัย ประจำปีงบประมาณ&nbsp;2564</strong></a></span></span></li>
	<li><span style="font-family:Verdana,Geneva,sans-serif"><span style="font-size:16px"><a href="https://drive.google.com/file/d/1JldVsIguU5CsqjGRxegJ3wYCe0lni6yf/view?usp=sharing" target="_blank"><strong>รายละเอียดหลักเกณฑ์การขอสนับสนุนทุนวิจัย ประจำปีงบประมาณ&nbsp;</strong><strong>2563</strong></a>&nbsp;</span></span></li>
</ul>`,
      },
      {
        id: 2,
        level: 2,
        topic: "รายละเอียดหลักเกณฑ์การขอสนับสนุนทุนวิจัย รูปแบบโครงการวิจัย",
        detail: `<ul>
	<li><span style="font-family:Verdana,Geneva,sans-serif"><span style="font-size:16px"><strong><a href="https://drive.google.com/file/d/1lmp05MN-PJ3TCXizdNuZzE5xMBA3HNz0/view" target="_blank">รายละเอียดหลักเกณฑ์การขอสนับสนุนทุนวิจัย&nbsp;รูปแบบโครงการนวัตกรรม ประจำปีงบประมาณ 2567&nbsp;</a>&nbsp;</strong><img alt="" src="https://www.fg-a.com/new/new06p.gif" style="height:17px; width:48px"></span></span></li>
	<li><span style="font-family:Verdana,Geneva,sans-serif"><span style="font-size:16px"><strong><a href="https://drive.google.com/file/d/1SBK-vrQpW7azjLqZwukCwxdJBRi0pVmS/view?usp=sharing" target="_blank">รายละเอียดหลักเกณฑ์การขอสนับสนุนทุนวิจัย&nbsp;รูปแบบโครงการนวัตกรรม ประจำปีงบประมาณ 2566&nbsp;</a>&nbsp;</strong></span></span></li>
	<li><span style="font-family:Verdana,Geneva,sans-serif"><span style="font-size:16px"><strong><a href="https://drive.google.com/file/d/1BNiAxMJxeMsxBLUFcmRVK43GiqcObOV4/view?usp=sharing" target="_blank">รายละเอียดหลักเกณฑ์การขอสนับสนุนทุนวิจัย&nbsp;รูปแบบโครงการนวัตกรรม ประจำปีงบประมาณ 2565&nbsp;</a>&nbsp;</strong></span></span></li>
</ul>`,
      },
      {
        id: 3,
        level: 3,
        topic: "ประกาศระเบียบ ทุนวิจัยคณะวิทยาศาสตร์ประยุกต์",
        detail: `<ul>
	<li><a href="https://drive.google.com/file/d/1YPklHtKsuwdynfAUZR5cDMBbbJ3_LYup/view?usp=sharing" target="_blank"><span style="font-size:16px" ><strong>ประกาศคณะวิทยาศาสตร์ประยุกต์ เรื่องหลักเกณฑ์การจัดสรรและการจ่ายเงินทุนสนุบสนุนการวิจัย</strong></span></a>&nbsp;</li>
</ul>`,
      },
      {
        id: 4,
        level: 4,
        topic: "หนังสือยืนยันการร่วมโครงการจากหน่วยงานภายนอกมหาวิทยาลัย",
        detail: `<ul>
	<li><a href="https://drive.google.com/file/d/1dhzAWt0fecTVG0doLTLudZgxZ6qN0EWb/view?usp=sharing" target="_blank"><span style="font-size:16px"><strong>แบบฟอร์มหนังสือยืนยันการร่วมโครงการจากหน่วยงานภายนอกมหาวิทยาลัย&nbsp;<span style="color:#ecf0f1"><span style="background-color:#3498db">(Word)</span></span></strong></span></a></li>
	<li><span style="font-size:16px"><strong><a href="https://drive.google.com/file/d/1b9SW_I6xutoTyBKPfXooXuK-lLcUMI8W/view?usp=sharing" target="_blank">แบบฟอร์มหนังสือยืนยันการร่วมโครงการจากหน่วยงานภายนอกมหาวิทยาลัย</a>&nbsp;<span style="color:#ffffff"><span style="background-color:#e74c3c">(Pdf.)</span></span></strong></span></li>
</ul>`,
      },
    ]);

    return {
      getAssetPath,
      home_menus,
      onRouterLink,
      description_steps,
      annouce,
    };
  },
});
</script>
