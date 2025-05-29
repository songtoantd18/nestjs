///////////////////////////////////////////////

import 'package:flutter/material.dart';

void main() {
runApp(MyApp());
}

class MyApp extends StatelessWidget {
@override
Widget build(BuildContext context) {
return MaterialApp(
title: 'Lifting State Up Demo',
home: Scaffold(
appBar: AppBar(title: Text('Flutter Lifting State Up')),
body: Parent(),
),
);
}
}

class Parent extends StatefulWidget {
@override
\_ParentState createState() => \_ParentState();
}

class \_ParentState extends State<Parent> {
int count = 0;
void updateCount() {
setState(() {
count = count + 1;
});
print('đây là count addddddđ: $count');
}

void minusCount() {
setState(() {
count = count - 1;
});
print('đây là count minussssssssssssss: $count');
}

@override
Widget build(BuildContext context) {
return Column(
mainAxisAlignment: MainAxisAlignment.center,
children: [
Text('đây là parent: $count', style: TextStyle(fontSize: 24)),
ChildA(count: count, addCount: updateCount, minusCount: minusCount),
SizedBox(height: 20),
ChildB(onUpdate: updateCount, count: count, minusCount: minusCount),
],
);
}
}

class ChildA extends StatelessWidget {
final int count;
final Function() addCount;
final Function() minusCount;

ChildA({
required this.count,
required this.addCount,
required this.minusCount,
});

@override
Widget build(BuildContext context) {
return Row(
mainAxisAlignment: MainAxisAlignment.center,
children: [
Text('CHILD A: $count'),
SizedBox(width: 20),
ElevatedButton(onPressed: () => addCount(), child: Text('add A')),
ElevatedButton(onPressed: () => minusCount(), child: Text('minus A')),
],
);
}
}

class ChildB extends StatelessWidget {
final Function() onUpdate;
final int count;
final Function() minusCount;

ChildB({
required this.minusCount,
required this.onUpdate,
required this.count,
});

@override
Widget build(BuildContext context) {
return Row(
mainAxisAlignment: MainAxisAlignment.center,
children: [
Text('CHILD B: $count'),
SizedBox(width: 20),
ElevatedButton(onPressed: () => onUpdate(), child: Text('add B')),
ElevatedButton(onPressed: () => minusCount(), child: Text('minus B')),
],
);
}
}
/////////////////////////////////////////////////
dưới đây là cách thực hiện lifitng state up trong flutter
////////////////////////////
dưới đây là cách sử dụng provider trong flutter, cái này kiểu mỗi state sẽ quản lý một đối tượng ví dụ :counter sẽ có counter provider , customer là có custromer provider, và bên trong sẽ có những function để sử lỹ những đối tượng này thêm xóa sửa , và còn 1 điều nữa là không cần phải truyền từng cấp bậc, mà truyền từ thằng myapp xuống thẳng thằng child C luôn chỉ cần khai báo lấy ra thôi, và
bước 1 : thêm thư viện provider vào
bước 2 : định nghĩa từng đối tượng provider ví dụ counter,customer ,hàng hóa, con người, con vật,animal, thêm các function
bước 4 : list ra
void main() {
runApp(
MultiProvider(
providers: [
ChangeNotifierProvider(create: (_) => CustomerProvider()),
ChangeNotifierProvider(create: (_) => CounterProvider()),
],
child: MyApp(),
),
);
}
bước 5 xử dụng ở component child của parent,
DƯỚI ĐÂY LÀ CODE ĐÃ HOÀN THIỆN CHẠY LÀ OK
/////
TÓM TẮT THEO GPT
✅ KẾT LUẬN NGẮN GỌN
✅ Provider là cách quản lý state đơn giản, hiệu quả cho Flutter.

✅ Mỗi Provider nên quản lý một đối tượng riêng biệt.

✅ Dùng MultiProvider để bọc toàn app, không cần truyền cấp bậc.

✅ Tất cả các component bên trong MyApp đều truy cập được state mà không cần props.

/////////////////////////////////////////
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Model Counter với ChangeNotifier
class CounterProvider with ChangeNotifier {
int count = 0;

void addCount() {
count = count + 1;
notifyListeners();
}

void minusCount() {
count = count - 1;
notifyListeners();
}

void mulitiple() {
count = count \* 2;
notifyListeners();
}
}

class CustomerProvider with ChangeNotifier {
int numberCustomer = 0;

void addCustomer() {
numberCustomer = numberCustomer + 1;
notifyListeners();
}

void minusCustomer() {
numberCustomer = numberCustomer - 1;
notifyListeners();
}

void mulitiple() {
numberCustomer = numberCustomer \* 2;
notifyListeners();
}
}

void main() {
runApp(
MultiProvider(
providers: [
ChangeNotifierProvider(create: (_) => CustomerProvider()),
ChangeNotifierProvider(create: (_) => CounterProvider()),
],
child: MyApp(),
),
);
}

class MyApp extends StatelessWidget {
@override
Widget build(BuildContext context) {
return MaterialApp(
title: 'Provider Demo',
home: Scaffold(
appBar: AppBar(title: Text('Flutter Provider Example')),
body: Parent(),
),
);
}
}

class Parent extends StatelessWidget {
@override
Widget build(BuildContext context) {
// Lấy count từ Provider
int count = context.watch<CounterProvider>().count;
int customer = context.watch<CustomerProvider>().numberCustomer;
print('customer: ${customer}');

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('Đây là count parent: $count', style: TextStyle(fontSize: 24)),
        Text(
          'Đây là CUSTOMER parent: $customer',
          style: TextStyle(fontSize: 24),
        ),

        ChildA(),
        SizedBox(height: 20),
        ChildB(),
        SizedBox(height: 20),
        ChildC(),
      ],
    );

}
}

class ChildA extends StatelessWidget {
@override
Widget build(BuildContext context) {
final counter = context.read<CounterProvider>();
final customer = context.read<CustomerProvider>();

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('CHILD A: ${context.watch<CounterProvider>().count}'),
        SizedBox(width: 20),
        ElevatedButton(
          onPressed: () => counter.addCount(),
          child: Text('add A'),
        ),
        ElevatedButton(
          onPressed: () => counter.minusCount(),
          child: Text('minus A'),
        ),
        ElevatedButton(
          onPressed: () => customer.addCustomer(),
          child: Text('add A customer'),
        ),
        ElevatedButton(
          onPressed: () => customer.minusCustomer(),
          child: Text('minus A customer'),
        ),
      ],
    );

}
}

class ChildB extends StatelessWidget {
@override
Widget build(BuildContext context) {
final counter = context.read<CounterProvider>();
final customer = context.read<CustomerProvider>();
return Column(
mainAxisAlignment: MainAxisAlignment.center,
children: [
Text('CHILD B: ${context.watch<CounterProvider>().count}'),
SizedBox(width: 20),
ElevatedButton(
onPressed: () => counter.addCount(),
child: Text('add B'),
),
ElevatedButton(
onPressed: () => counter.minusCount(),
child: Text('minus B'),
),
ElevatedButton(
onPressed: () => customer.addCustomer(),
child: Text('add B customer'),
),
ElevatedButton(
onPressed: () => customer.minusCustomer(),
child: Text('minus B customer'),
),
ElevatedButton(
onPressed: () => customer.mulitiple(),
child: Text('mulitiple B customer'),
),
],
);
}
}

class ChildC extends StatelessWidget {
@override
Widget build(BuildContext context) {
final counter = context.read<CounterProvider>();
print('counter: ${counter}');

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('CHILD C: ${context.watch<CounterProvider>().count}'),
        SizedBox(width: 20),
        ElevatedButton(
          onPressed: () => counter.mulitiple(),
          child: Text('muliti C'),
        ),
      ],
    );

}
}
///////////////////////////
dùng cái này body: SafeArea(
child: Center(
child: Column(
mainAxisSize: MainAxisSize.min,
children: [
Image.asset('assets/logo1.png', fit: BoxFit.contain),
Text('Splash Screen'),
],
),
),
), để đưa ra giữa màn hình ngang dọc
ở splashscreen : tách 2 cái child thành 2 cái wigdet nhỏ sau đó import vào nó như compoent ấy ,sau này code dự án mở rộng thì cũng sẽ giúp quản lý dễ hơn
bài 4 :cách dùng page view
Phân biệt StatelessWidget và StatefulWidget trong Flutter

1. StatelessWidget:
   Không thay đổi trạng thái trong suốt vòng đời.

Dùng khi giao diện không cần cập nhật (chỉ render 1 lần).

Ví dụ: hiển thị text, icon, logo tĩnh.

Tương đương với function component không dùng useState hooks trong React.

2. StatefulWidget:
   Có thể thay đổi trạng thái (state) trong quá trình sử dụng.

Dùng khi giao diện cần cập nhật theo hành động người dùng.

Ví dụ: checkbox, form, giỏ hàng, animation.

Tương đương với function component có dùng useState, useEffect trong React.

🔄 So sánh ReactJS và Flutter
ReactJS:

Function component không có state → giống StatelessWidget.

Function component có useState → giống StatefulWidget.

Flutter:

Không có hook như React.

Nếu muốn dùng state → phải dùng StatefulWidget hoặc quản lý qua Provider, Riverpod, v.v.

📌 Khi nào dùng gì?
Trang profile (chỉ hiển thị thông tin tĩnh) → dùng StatelessWidget.

Trang đăng nhập (có nhập liệu, hiển thị lỗi, loading) → dùng StatefulWidget.

Trang sản phẩm có nút “Thêm vào giỏ hàng” → dùng StatefulWidget (hoặc Stateless + quản lý state qua Provider).

Trang Dashboard có danh sách, filter → nên dùng StatefulWidget hoặc quản lý state bên ngoài.

✅ Kết luận ngắn gọn dễ nhớ
StatelessWidget = tĩnh, không thay đổi
StatefulWidget = động, có thay đổi, có logic tương tác
React có hook nên function component vẫn quản lý state
Flutter chưa có hook → muốn state thì phải dùng StatefulWidget
vì chưa hiểu về class compoent nên không so sánh được với nó , nên tạm thời so sánh với function compoent
mẫu StatelessWidget – Không có trạng thái (giống function component không có useState trong React):
dart

import 'package:flutter/material.dart';

class MyStatelessPage extends StatelessWidget {
const MyStatelessPage({super.key});

@override
Widget build(BuildContext context) {
return Scaffold(
appBar: AppBar(title: Text('Stateless Example')),
body: Center(
child: Text('Tôi là Stateless Widget'),
),
);
}
}

✅ copy ở đây StatefulWidget – Có trạng thái (giống function component có useState trong React):
import 'package:flutter/material.dart';

class MyStatefulPage extends StatefulWidget {
const MyStatefulPage({super.key});

@override
State<MyStatefulPage> createState() => \_MyStatefulPageState();
}

class \_MyStatefulPageState extends State<MyStatefulPage> {
int \_count = 0;

void \_increment() {
setState(() {
\_count++; // cập nhật lại UI mỗi khi bấm nút
});
}

@override
Widget build(BuildContext context) {
return Scaffold(
appBar: AppBar(title: Text('Stateful Example')),
body: Center(
child: Column(
mainAxisAlignment: MainAxisAlignment.center,
children: [
Text('Giá trị hiện tại: $_count'),
ElevatedButton(
onPressed: _increment,
child: Text('Tăng'),
),
],
),
),
);
}
}
quy ước đặt tên
_ trong Dart là gì?
Trong Dart (ngôn ngữ dùng cho Flutter), khi một tên bắt đầu bằng dấu gạch dưới _, thì:

Nó chỉ được sử dụng bên trong file hiện tại (khác với các ngôn ngữ như JavaScript hay Python).

Đây là cách làm cho class, hàm, biến, hoặc getter/setter trở thành private (riêng tư).

Kiến Thức Kỹ Thuật Áp Dụng - Onboarding Page Flutter

1. enum và extension trong Dart
   Dùng enum OnboardingPagePosition để định nghĩa các trang: page1, page2, page3.

Tạo extension OnboardingPagePositionExtension để ánh xạ enum sang:

hình ảnh (onboardingPageImage)

tiêu đề (onboardingPageTitle)

nội dung mô tả (onboardingPageContent)

✅ Giúp code gọn hơn, dễ mở rộng khi thêm trang mới.

2. PageView & PageController
   Sử dụng PageView để tạo onboarding dạng vuốt từng trang.

Dùng PageController để điều khiển chuyển trang qua nextPage() và previousPage().

physics: NeverScrollableScrollPhysics() để người dùng không vuốt mà chỉ dùng nút.

3. Stateless và Stateful Widgets
   OnboardingChildPage là một StatelessWidget nhận dữ liệu và callback từ ngoài.

OnboardingPageView là StatefulWidget để xử lý điều khiển trang và setState.

4. Callback (VoidCallback) truyền hàm
   Truyền callback nextOnpressed, backOnpressed, skippOnpressed để kiểm soát hành động từ ngoài component.

5. Giao diện (UI)
   Dùng Column và Row để xây dựng giao diện layout.

Sử dụng Container, Text, Image.asset, ElevatedButton để tạo phần nội dung.

Sử dụng BoxDecoration để tạo hiệu ứng chỉ báo trang (dot indicator).

6. Logic điều hướng
   Ở nút next, nếu là page3 thì đổi nút thành "get started" và thực hiện điều hướng đến trang chính.

Ở skip, có thể điều hướng luôn đến trang welcome hoặc login.

7. Debug
   In log để debug giá trị enum và trạng thái PageController.
