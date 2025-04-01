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
