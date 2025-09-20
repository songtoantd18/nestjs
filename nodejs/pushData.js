import axios from "axios";
import { v_md_internal_order } from "./masterData.js"; // thay bằng file của bạn

const API_URL = "https://onfleek.unicjsc.com/api/save_multi";

async function postTableData(tableName, data) {
  try {
    const res = await axios.post(API_URL, {
      schema: "epur_req",
      table: tableName,
      data: data,
    });
    console.log("🚀 ~ postTableData ~ res:", res);
    console.log(`✅ Upload ${tableName} thành công:`, res);
  } catch (err) {
    console.error(`❌ Lỗi khi upload ${tableName}:`, err.message);
  }
}

async function uploadAll() {
  const datasets = {
    // v_md_business_area,
    v_md_internal_order,
  };

  for (const [tableName, data] of Object.entries(datasets)) {
    console.log("🚀 ~ uploadAll ~ data:", data);
    console.log("🚀 ~ uploadAll ~ tableName:", tableName);
    await postTableData(tableName, data);
  }
}

uploadAll();
