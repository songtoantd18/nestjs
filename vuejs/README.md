đây là phần readme của front end sử dụng vue.js có các chức năng và logic như sau
1./có chức năng login , khi login xong sẽ tạo ra token có thời gian cố định khoảng 2 ngày và được lưu trong localStorage trong này sẽ show tất cả các bài post được tạo ra bởi user đang đăng nhập
2./ có nút logout để xoá token
3./ chỗ router thì có các dduwognf dẫn /login /register /dashboard và khi người dùng đã đăng nhập mà muốn quay lại /login là k được vì đã chặn rồi , và nếu đã đănn nhập rồi thì khi vào/login nó sẽ kiểm tra token đó có trong localStorage để xem nó hợp lệ hay không nếu đúng thì chuyển sang trang dashboard , nếu không thì chuyển sang trang /login
4./ có chức năng đăng ký user và đăng nhập user
5./ cấu trúc cây thư mục
src/
├── page/
│ ├── LoginPage.vue
│ ├── RegisterPage.vue
│ └── DashboardPage.vue
├── router/
│ └── router.js
├── utilities/
│ └── config.js

trong đó router.js được dùng để cấu hình router của vue.js
config.js được dùng để cấu hình các url của api lưu các tên biến của domain

//////////////////////////
tìm hiểu về vuejs cách truyền data pass data to antother components
Mục tiêu
Ví dụ này minh họa cách truyền dữ liệu từ component cháu → cha → ông bằng sự kiện @emit trong Vue 3, sử dụng mô hình props và emit.

🧱 Cấu trúc component
bash
Sao chép
Chỉnh sửa
src/
├── components/
│ ├── ComponentChau.vue
│ ├── ComponentCha.vue
│ └── ComponentOng.vue
├── App.vue
└── main.js
📄 Chi tiết từng component

1. ComponentChau.vue
   Hiển thị danh sách checkbox vật tư.

Khi nhấn nút Xác nhận, sẽ gửi danh sách đã chọn qua this.$emit('chon-vat-tu', selectedItems) lên component cha.

vue
Sao chép
Chỉnh sửa
<template>

  <div>
    <h4>Component Cháu</h4>
    <ul>
      <li v-for="item in tableData" :key="item.id">
        <input type="checkbox" v-model="item.selected" /> {{ item.name }}
      </li>
    </ul>
    <button @click="xacNhan">Xác nhận chọn vật tư</button>
  </div>
</template>
2. ComponentCha.vue
Nhận tableData từ ông.

Nhận sự kiện chon-vat-tu từ cháu và truyền tiếp lên ông bằng $emit.

vue
Sao chép
Chỉnh sửa
<ComponentChau :tableData="tableData" @chon-vat-tu="chuyenLenOng" /> 3. ComponentOng.vue
Là component cấp cao nhất.

Chứa dữ liệu vật tư (dsVatTu) và nhận kết quả vật tư được chọn (vatTuDaChon).

Truyền dsVatTu xuống cha bằng props.

vue
Sao chép
Chỉnh sửa
<ComponentCha :tableData="dsVatTu" @chon-vat-tu="luuVatTuDaChon" />
▶️ Kết quả hiển thị
Người dùng chọn checkbox trong Cháu.

Dữ liệu được truyền lên Cha, sau đó lên Ông.

Component Ông hiển thị danh sách vật tư đã chọn.

Đổi tên app:
bash
Sao chép
Chỉnh sửa
dart run rename setAppName --value="Prime"
✅ Đổi bundle ID:
bash
Sao chép
Chỉnh sửa
dart run rename setBundleId --value="com.prime.prpo"
Để thay đổi ảnh logo từ "logo_DMS.png" sang "so2.png" trong cấu hình của bạn, bạn chỉ cần đổi đường dẫn đến tệp hình ảnh mới. Dưới đây là cách bạn có thể sửa đổi cấu hình của bạn:

yaml
Copy code
flutter_launcher_icons:
android: "launcher_icon"
ios: true
image_path: "assets/so2.png" # Đường dẫn đến hình ảnh mới là "assets/so2.png"
min_sdk_android: 21 # android min sdk min:16, default 21
web:
generate: true
image_path: "assets/so2.png"
background_color: "#hexcode"
theme_color: "#hexcode"
windows:
generate: true
image_path: "assets/so2.png"
icon_size: 48 # min:48, max:256, default: 48
macos:
generate: true
image_path: "assets/so2.png"
Sau khi bạn đã thay đổi đường dẫn, hãy chạy lại lệnh flutter pub run flutter_launcher_icons:main để cập nhật biểu tượng ứng dụng với hình ảnh mới. Lệnh này sẽ chuyển đổi hình ảnh mới và cập nhật biểu tượng ứng dụng trên tất cả các nền tảng khác nhau theo cấu hình mới. cách thay đổi logo app trong flutter
