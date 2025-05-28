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
