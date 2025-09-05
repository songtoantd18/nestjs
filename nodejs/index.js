const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

// Đường dẫn file
const pathData = "C:/Users/PC/Desktop/tieudao/filedataT7Toan2025.xlsx";
const pathTemplate = "C:/Users/PC/Desktop/tieudao/template1.xlsx";
const pathSave = "C:/Users/PC/Desktop/tieudao/t7/";

if (!fs.existsSync(pathSave)) {
  fs.mkdirSync(pathSave, { recursive: true });
}

async function run() {
  // Đọc file data
  const wbData = new ExcelJS.Workbook();
  await wbData.xlsx.readFile(pathData);
  const wsData = wbData.worksheets[0]; // sheet đầu tiên

  // Lấy dữ liệu
  const rows = wsData.getSheetValues().slice(2); // bỏ header
  const grouped = {};

  rows.forEach((row) => {
    if (!row) return;
    const soHD = row[1]; // cột 1 = số HĐ
    const ngay = row[2]; // cột 2 = ngày
    console.log("🚀 ~ run ~ ngay:", ngay);
    if (!grouped[soHD]) {
      grouped[soHD] = { ngay, data: [] };
    }
    grouped[soHD].data.push(row);
  });

  // Xuất từng file
  for (const soHD of Object.keys(grouped)) {
    const wbTemplate = new ExcelJS.Workbook();
    await wbTemplate.xlsx.readFile(pathTemplate);
    const wsTemplate = wbTemplate.worksheets[0];

    // ===== Ghi ngày kiểu Nhật vào B3 =====
    const ngayData = new Date(grouped[soHD].ngay);
    console.log("🚀 ~ run ~ ngayData:", ngayData);
    const nam = ngayData.getFullYear();
    const thang = ngayData.getMonth() + 1;
    console.log("🚀 ~ run ~ thang:", thang);
    const ngaySo = ngayData.getDate();
    wsTemplate.getCell("B3").value = `${nam}年 ${thang}月 ${ngaySo}日`;

    // Ghi số HĐ vào G3
    wsTemplate.getCell("G3").value = ` ${soHD}`;

    // Ghi chi tiết từ dòng 6
    let rowIndex = 6;
    for (const r of grouped[soHD].data) {
      if (wsTemplate.getRow(rowIndex).getCell(1).value !== null) {
        wsTemplate.insertRow(rowIndex, []);
      }

      wsTemplate.getCell(`A${rowIndex}`).value = r[5]; // Tên khoản chi
      wsTemplate.getCell(`B${rowIndex}`).value = r[4]; // Mục đích
      wsTemplate.getCell(`C${rowIndex}`).value = r[7]; // Đơn giá
      wsTemplate.getCell(`D${rowIndex}`).value = `${r[6]} ${r[8]}`; // Số lượng + đơn vị
      wsTemplate.getCell(`E${rowIndex}`).value = r[9]; // Tổng cộng
      wsTemplate.getCell(`F${rowIndex}`).value = ""; // Biên lai
      wsTemplate.getCell(`G${rowIndex}`).value = ""; // Ghi chú

      rowIndex++;
    }

    // ===== Gán công thức SUM nếu có dữ liệu =====
    const startRow = 6;
    const endRow = rowIndex - 1;
    if (endRow >= startRow) {
      wsTemplate.getCell("E12").value = {
        formula: `SUM(E${startRow}:E${endRow})`,
        result: null,
      };
    }

    // Ghi file ra ổ cứng
    const fileName = `支出傳票_2025_Th${thang}_Chứng từ chi tiêu_HD${soHD}.xlsx`;
    console.log("🚀 ~ run ~ fileName:", fileName);

    await wbTemplate.xlsx.writeFile(path.join(pathSave, fileName));
  }

  console.log("✅ Xuất file xong!");
}

run().catch(console.error);
