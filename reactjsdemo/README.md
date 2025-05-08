📚 Bài 22 – Đối tượng trong JavaScript
✅ Mục tiêu
Hiểu cách tạo và sử dụng object trong JavaScript.

Biết sự khác nhau giữa object literal và class.

Biết cách khai báo method bên trong object và sử dụng this.

🧱 1. Cách khai báo object literal
js
Sao chép
Chỉnh sửa
const user = {
name: "Max",
age: 35,
greet() {
console.log(`Hello, I'm ${this.name}`);
}
};

user.greet(); // Hello, I'm Max
👉 Dùng khi chỉ cần tạo 1 object cụ thể. Đơn giản, nhanh gọn.

🏗️ 2. Tạo object bằng class
js
Sao chép
Chỉnh sửa
class User {
constructor(name, age) {
this.name = name;
this.age = age;
}

greet() {
console.log(`Hello, I'm ${this.name}`);
}
}

const user1 = new User("Max", 35);
user1.greet(); // Hello, I'm Max
👉 Dùng khi cần tạo nhiều object cùng cấu trúc. Có thể mở rộng bằng extends, sử dụng tốt với React khi tạo component class (dù hiện tại phổ biến hơn là function component).

🔑 3. Lưu ý về từ khóa this
Trong object hoặc class, this đại diện cho chính object đó.

Dùng this.propertyName để truy cập các thuộc tính bên trong chính object.

🧠 Kết luận
Cách tạo object Dùng khi...
Object literal Tạo object cụ thể, đơn giản, ít tái sử dụng
Class Tạo nhiều object giống nhau, có logic phức tạp
Constructor Function (tùy chọn bổ sung) Giống class nhưng cũ hơn
