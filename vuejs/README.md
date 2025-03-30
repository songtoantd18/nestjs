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
