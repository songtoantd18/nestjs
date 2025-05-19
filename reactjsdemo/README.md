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
🟨 Giá trị nguyên thủy (Primitive Values)
Bao gồm: string, number, boolean, null, undefined, symbol, bigint.

Không thể chỉnh sửa giá trị nguyên thủy.

Khi thay đổi, ta đang tạo giá trị mới chứ không phải chỉnh sửa cái cũ.

Ví dụ:

js
Sao chép
Chỉnh sửa
const message = "Hello";
const newMessage = message.concat(" World"); // tạo chuỗi mới
🟦 Giá trị tham chiếu (Reference Values)
Bao gồm: object, array, function.

Khi khai báo một biến chứa đối tượng, biến chỉ lưu địa chỉ (reference) tới vùng nhớ chứa giá trị thực.

Khi thay đổi đối tượng (dùng push, pop, v.v.), là thay đổi giá trị trong bộ nhớ, không thay đổi địa chỉ.

Vì vậy có thể sửa nội dung của một const array:

js
Sao chép
Chỉnh sửa
const hobbies = ['sports', 'cooking'];
hobbies.push('reading'); // hợp lệ, vì không thay địa chỉ
✅ Const và tham chiếu
const không cho gán lại biến, nhưng nếu biến chứa địa chỉ đối tượng, ta vẫn có thể thay đổi nội dung bên trong đối tượng đó.

Không vi phạm nguyên tắc const vì chỉ địa chỉ không thay đổi, còn nội dung ở địa chỉ đó có thể bị chỉnh sửa.

🎯 Tóm gọn
Giá trị nguyên thủy: bất biến, tạo mới khi thay đổi.

Giá trị tham chiếu: có thể chỉnh sửa nội dung, miễn là không đổi địa chỉ tham chiếu.
bài 41 :cách reactjs hoạt động
🔹 1. Thành phần React và hiển thị trên trang web
Khi truy cập mã nguồn HTML, bạn không thấy nội dung React (tiêu đề, hình ảnh, v.v.).

Chỉ thấy một file JavaScript được nhúng (ví dụ: index.jsx) – đây là file gốc chứa React app.

🔹 2. index.jsx và index.html
File index.html có một <div id="root"></div>, là nơi React "gắn" toàn bộ giao diện.

File index.jsx dùng ReactDOM.createRoot(...).render(...) để hiển thị App vào div#root.

App lại import các thành phần khác như Header, tạo nên một cây thành phần (component tree).

🔹 3. JSX không phải là HTML
JSX là cú pháp giống HTML nhưng được chuyển đổi (transpile) thành mã JavaScript.

JSX chỉ chạy được sau khi được biên dịch bởi công cụ như Babel/Vite/Webpack, không phải trực tiếp trong trình duyệt.

🔹 4. Tại sao tên component phải viết hoa
React phân biệt:

✅ Header → thành phần tùy chỉnh.

❌ header → thẻ HTML gốc.

Viết hoa giúp React xử lý đúng loại (component vs. element) và tránh xung đột tên.

🔹 5. Hiển thị trong trình duyệt
Khi chạy ứng dụng, React không render component vào DOM, mà chuyển JSX thành thẻ HTML gốc rồi hiển thị.

Vì vậy bạn không thấy component như <App> hay <Header> trong mã HTML thực tế, chỉ thấy <div>, <h1>, v.v.

✅ Kết luận:
React hoạt động bằng cách:

Đọc và thực thi các component bạn viết (JSX).

Phân tích các thành phần đó thành DOM gốc.

Gắn DOM vào div#root để hiển thị toàn bộ giao diện trên trình duyệt.
bài 48 : cách gắn css từng phần vào component
bài 49 : 2 cách truyền dữ liệu từ cha sang con
cách 1 tường mình truyền props name :<Card name="Anthony Blake">...</Card>
cách 2 truyền children
Phần giữa thẻ mở và thẻ đóng <Card>...</Card>:

<Card name="Anthony Blake">
  <p>Blake is a professor...</p>
  <p><a href="mailto:...">Email</a></p>
</Card>
bài 53 cách dùng function component
✅ Sự khác biệt giữa:
❌ handleClick={handleClick("value1")}
Đây là gọi hàm ngay lập tức khi component render lần đầu.

handleClick("value1") được thực thi ngay lập tức, trả về undefined (vì handleClick không return gì).

Sau đó, React gán undefined làm onClick, nên khi bạn click thì… không có gì xảy ra nữa.

✅ handleClick={() => handleClick("value1")}
Đây là truyền một hàm callback, nghĩa là:

Khi người dùng bấm vào nút (onClick), React mới gọi hàm () => handleClick("value1").

Lúc đó handleClick("value1") mới được thực thi.
bài 54 : cách sử dụng hook
1./ chỉ gọi hook ở component function thôi
2./ chỉ gọi hook ở top level component , Chỉ được gọi Hook ở cấp cao nhất của function component hoặc custom hook, không được gọi trong các điều kiện, vòng lặp, hoặc hàm lồng nhau.
function handleClick(value) {
console.log("🚀 ~ App ~ selectedValue:", selectedValue);

    setSelectedValue(value);
    console.log("🚀 ~ App ~ selectedValue:", selectedValue);

}
chỗ này log ra kết quả giống nhau mặc dù cái sau đã thay đổi là do bất đồng bộ,setSelectedValue(value) không thay đổi giá trị ngay lập tức.

Việc cập nhật state trong React là bất đồng bộ (async) – tức là React sẽ xếp setState vào hàng đợi và cập nhật ở lần render tiếp theo, không phải ngay lúc đó.

Vì vậy, ngay sau khi gọi setSelectedValue(value), biến selectedValue vẫn là giá trị cũ khi in ra.

bài 56 cách dùng useState
bài 58 cách dùng map để render ra component
bài 69 : bài test chỗ 69 70 cách dùng ...props là truyền từ cha sang con là truyền hết những cái k liệt kê chi tiết gom hết
bài 61 :
Nếu dùng trong HTML/CSS trực tiếp → dùng public/. localhost:5173/some-image.jpg
Nếu dùng trong code JS/TS/Component → dùng src/assets/.
bài 78 cách dùng useState
trong useState có
function handleEdit() {
setEdit(!edit);
// setEdit((edit) => !edit);
console.log("🚀 ~ handleEdit ~ edit1111:", edit);
// setEdit((edit) => !edit);
setEdit(!edit);

    console.log("🚀 ~ handleEdit ~ edit222222:", edit);

}
setEdit(!edit); // nếu edit = false → true
setEdit(!edit); // vẫn là false → true (không đổi)
setEdit(!edit) Dựa vào giá trị edit tại thời điểm render ❌ Không chính xác (race condition)

setEdit((prev) => !prev); // false → true
setEdit((prev) => !prev); // true → false ✅ đúng logic toggle 2 lần
setEdit((edit) => !edit) Dựa vào giá trị mới nhất trong queue ✅ Chính xác tuyệt đối
bài 82 : tìm hiểu về lifting state up
note : coi lại bài 82 81
sự khác nhau giữa underfined và null
undefined → do JS tự gán khi biến chưa có giá trị.

null → do lập trình viên tự gán, biểu thị giá trị rỗng có chủ đích.
bài 80 : tạo giao diện của gameboard 