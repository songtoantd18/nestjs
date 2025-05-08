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
//////////////////////////
bài 23 📚 Mảng trong JavaScript

1. Giới thiệu
   Trong JavaScript, mảng (array) là một loại giá trị đặc biệt, mặc dù về mặt kỹ thuật chúng vẫn là đối tượng. Mảng cho phép bạn lưu trữ nhiều giá trị trong một biến và truy cập chúng thông qua chỉ số (index).

js
Sao chép
Chỉnh sửa
const soThich = ['Thể thao', 'Nấu ăn', 'Đọc sách'];
console.log(soThich[0]); // Thể thao
⚠️ Lưu ý: Chỉ số trong mảng bắt đầu từ 0.

2. Các phương thức phổ biến trên mảng
   2.1. push()
   Thêm phần tử mới vào cuối mảng.

js
Sao chép
Chỉnh sửa
soThich.push('Làm việc');
console.log(soThich); // ['Thể thao', 'Nấu ăn', 'Đọc sách', 'Làm việc']
2.2. findIndex()
Tìm chỉ số của phần tử theo điều kiện.

js
Sao chép
Chỉnh sửa
const viTri = soThich.findIndex(item => item === 'Thể thao');
console.log(viTri); // 0
🧠 findIndex() nhận vào một hàm (callback) và chạy qua từng phần tử để kiểm tra điều kiện.

2.3. map()
Tạo mảng mới bằng cách biến đổi từng phần tử.

Ví dụ 1: Thêm dấu chấm than vào từng phần tử
js
Sao chép
Chỉnh sửa
const soThichMoi = soThich.map(item => item + '!');
console.log(soThichMoi); // ['Thể thao!', 'Nấu ăn!', 'Đọc sách!', 'Làm việc!']
Ví dụ 2: Chuyển mỗi phần tử thành một đối tượng
js
Sao chép
Chỉnh sửa
const soThichDoiTuong = soThich.map(item => ({ text: item }));
console.log(soThichDoiTuong);
// [
// { text: 'Thể thao' },
// { text: 'Nấu ăn' },
// { text: 'Đọc sách' },
// { text: 'Làm việc' }
// ]
🧠 Khi return một đối tượng trong arrow function, hãy dùng () bao quanh {} để tránh hiểu nhầm là thân hàm.

3. Tổng kết
   Phương thức Mô tả ngắn gọn
   push() Thêm phần tử vào cuối mảng
   findIndex() Tìm vị trí phần tử thỏa điều kiện
   map() Biến đổi mảng cũ thành mảng mới

💡 Ghi nhớ
Mảng có thể chứa bất kỳ loại dữ liệu nào: chuỗi, số, boolean, đối tượng, hoặc thậm chí là mảng khác.

Mảng là một phần rất quan trọng trong lập trình JavaScript, đặc biệt là khi thao tác với danh sách dữ liệu trong các ứng dụng thực tế (ví dụ như React).

📌 Toán tử trải rộng (...) là gì?
Là một cú pháp đặc biệt dùng để trích xuất (trải) các phần tử từ:

Mảng (Array) thành các phần tử riêng lẻ.

Đối tượng (Object) thành các cặp key: value riêng lẻ.

✅ Với mảng (Array)
🎯 Mục đích: Hợp nhất nhiều mảng lại với nhau mà không bị lồng mảng
js
Sao chép
Chỉnh sửa
const hobbies = ['sports', 'cooking'];
const newHobbies = ['reading'];
const mergedHobbies = [...hobbies, ...newHobbies];
console.log(mergedHobbies);
// ➤ ['sports', 'cooking', 'reading']
📌 Nếu không dùng ..., bạn sẽ tạo ra mảng lồng nhau:

js
Sao chép
Chỉnh sửa
const merged = [hobbies, newHobbies];
// ➤ [['sports', 'cooking'], ['reading']]
✅ Với đối tượng (Object)
🎯 Mục đích: Sao chép hoặc gộp các thuộc tính từ nhiều object
js
Sao chép
Chỉnh sửa
const user = { name: 'Max', age: 30 };
const extendedUser = { isAdmin: true, ...user };
console.log(extendedUser);
// ➤ { isAdmin: true, name: 'Max', age: 30 }
📌 Nếu có trùng key, giá trị ở phía sau sẽ ghi đè giá trị phía trước.

✅ Tác dụng:
Gộp dữ liệu từ nhiều mảng/đối tượng.

Sao chép mảng/đối tượng mà không thay đổi bản gốc.

Viết code ngắn gọn, rõ ràng hơn.

🧠 Ghi nhớ:
Dữ liệu Cú pháp Kết quả
Array [...arr1, ...arr2] Mảng mới, không lồng nhau
Object {...obj1, ...obj2} Object mới, gộp thuộc tính
