import axios from "axios";

export async function fetchData({ apiUrl, columns = [], conditions = {} }) {
  try {
    const token = localStorage.getItem("accessToken");
    const url = `${apiUrl}?columns=${encodeURIComponent(
      JSON.stringify(columns)
    )}&conditions=${encodeURIComponent(JSON.stringify(conditions))}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi gọi API:", error);
    return [];
  }
}
export async function postData({ apiUrl, data }) {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    return null;
  }
}
// src/ultilies/jwtHelper.js
export function decodeJwt(token) {
  try {
    // Kiểm tra token hợp lệ
    if (!token || typeof token !== "string" || !token.includes(".")) {
      throw new Error("Token không hợp lệ");
    }

    // Tách phần payload từ JWT (phần thứ 2)
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Token không đúng định dạng JWT");
    }

    const payloadBase64 = parts[1];
    const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64);
    const decodedPayload = JSON.parse(jsonPayload);

    return decodedPayload;
  } catch (error) {
    console.error("Lỗi khi decode JWT:", error.message);
    return null;
  }
}
