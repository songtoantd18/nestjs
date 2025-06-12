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

bài 4.1 const space và spacebetwwen xung đột nhau nên không dùng chung được
chỗ single child scroll view và colum space co sự xung đột k dùng chung được cần phải cân đối hiểu như là single child scroll view là cuộn tròn xuống thì làm sao colun spacebetween dùng được const space() là lấy khoảng trống hết thì làm sao cuộng được
Dưới đây là nội dung bạn có thể ghi trong README.md để giải thích lý do không nên dùng Spacer() hoặc MainAxisAlignment.spaceBetween khi dùng kết hợp SingleChildScrollView và Column (không thêm LayoutBuilder hay ConstrainedBox):

❗ Lưu ý khi dùng SingleChildScrollView kết hợp với Column trong Flutter
❌ Không nên dùng Spacer() hoặc MainAxisAlignment.spaceBetween trong Column khi bọc trong SingleChildScrollView
dart
Sao chép
Chỉnh sửa
SingleChildScrollView(
child: Column(
mainAxisAlignment: MainAxisAlignment.spaceBetween, // ❌ Không hoạt động như mong muốn
children: [
...,
Spacer(), // ❌ Spacer không hoạt động đúng
...,
],
),
)
🔍 Nguyên nhân:
SingleChildScrollView không giới hạn chiều cao của Column.

Do Column không bị giới hạn chiều cao, nên:

MainAxisAlignment.spaceBetween không biết phần trống còn lại là bao nhiêu để chia đều.

Spacer() không thể xác định không gian cần chiếm → bị lỗi hoặc không render.

✅ Kết luận:
Nếu chỉ dùng SingleChildScrollView và Column, không nên dùng:

Spacer()

MainAxisAlignment.spaceBetween

MainAxisAlignment.spaceEvenly

Thay vào đó, hãy sắp xếp widget một cách tĩnh theo thứ tự mong muốn, hoặc sử dụng khoảng cách bằng SizedBox() để đảm bảo tính ổn định.

📌 Ví dụ nên dùng:
dart
Sao chép
Chỉnh sửa
SingleChildScrollView(
child: Column(
crossAxisAlignment: CrossAxisAlignment.center,
children: [
SizedBox(height: 40),
Text("Tiêu đề"),
SizedBox(height: 20),
Image.asset("assets/image.png"),
SizedBox(height: 60),
ElevatedButton(onPressed: () {}, child: Text("Next")),
],
),
)
bài 6 : tại sao lại sử dụng ảnh 1x 2 x 3 x vì mobile có nhiều màn hình nếu dùng 1 ảnh thì khi to nhỏ ảnh sẽ bị mờ bể, nên chúng ta cần tạo 3 folder alf 1x 2x 3x ảnh khi lưu về sẽ có 3 loại nên chia vào ứng với từng loại
assets/
├── icon.png (mặc định)
├── 1.0x/icon.png (dành cho thiết bị mật độ bình thường)
├── 2.0x/icon.png (dành cho thiết bị có mật độ cao hơn)
└── 3.0x/icon.png (dành cho thiết bị rất nét như iPhone Retina, Samsung cao cấp)
flutter:
assets: - assets/icon.png
khi import ảnh chỉ cần như vậy là ok
ở chỗ BottomNavigationBar trong Flutter có hai chế độ hoạt động:

1. Fixed mode (mặc định khi số item ≤ 3):
   Hiển thị tất cả các item cùng lúc.

backgroundColor hoạt động đúng.

Không cần cấu hình gì thêm.

2. Shifting mode (khi số item > 3):
   Tự động chuyển sang chế độ "shifting", và lúc này mỗi item cần có màu riêng (backgroundColor) để màu nền hiện đúng.

Nếu bạn không set type: BottomNavigationBarType.fixed, thì nó sẽ chuyển qua "shifting" và không dùng backgroundColor chung.
Các thành phần chính

1. BottomNavigationBar
   Gồm 5 mục (item), nhưng mục ở giữa (index == 2) không thực hiện chuyển trang mà để trống (Container()).

selectedItemColor và unselectedItemColor: điều chỉnh màu của label khi được chọn hoặc không.

type: BottomNavigationBarType.fixed: đảm bảo hiển thị đủ label dù số lượng item > 3.

currentIndex: điều khiển trang hiện tại.

onTap: khi chọn một item, cập nhật \_currentPage.

2. FloatingActionButton
   Nằm ở giữa (FloatingActionButtonLocation.centerDocked).

Tùy biến bằng Container và IconButton.

Khi nhấn vào sẽ in ra console dòng "đây là float button".

3. List<Widget> \_page
   Lưu danh sách các màn hình tương ứng với từng tab.

🧠 Kiến thức học được
Cách sử dụng BottomNavigationBar để chuyển trang.

Cách tuỳ biến activeIcon và icon bằng Image.asset.

Cách thay thế một mục trong navigation bar bằng FloatingActionButton.

Cách sử dụng FloatingActionButtonLocation.centerDocked để đặt nút ở giữa.

Quản lý trạng thái trang hiện tại bằng setState và biến \_currentPage.

💡 Ghi chú
BottomNavigationBar không hỗ trợ trực tiếp chèn FloatingActionButton, nên cần chừa BottomNavigationBarItem trống và đặt FAB thủ công.

Hạn chế việc nhấn vào item thứ 3 bằng cách kiểm tra if (index == 2) trong onTap.

bài 7 : logic
mở app vào màn hình splash screen kiểm tra data ở shared_preference wor flash có biến đó chưa
biến đó được đặt là check cờ "kOnboardingCompleted" có giá trị true hay false nếu true thì tới luôn màn hình chính welcome page còn nếu là false di chuyển đến màn hình onboarding nếu click vào skip thì lưu biến "kOnboardingCompleted" là true và nết click vào next thì lưu biến "kOnboardingCompleted" là true sau đó đến màn welcome page ,
sau khi GỠ APP cài lại thì vẫn hoạt động theo flow này cũng kiểm tra biến kOnboardingCompleted ==false

// Future<bool> \_isOnboardingCompleted() async {
// final SharedPreferences prefs = await SharedPreferences.getInstance();
// bool isOnboardingCompleted = prefs.getBool('kOnboardingCompleted') ?? false;
// print('isOnboardingCompleted: ${isOnboardingCompleted}');
// return isOnboardingCompleted;
// }

Future<bool> \_isOnboardingCompleted() async {
try {
final SharedPreferences prefs = await SharedPreferences.getInstance();
bool result = prefs.getBool('kOnboardingCompleted') ?? false;
return result;
} catch (e) {
return false;
}
}

nên sử dụng try catch để logic chặt chẽ vì nếu không có thì sẽ return false còn cái kia nếu không có là đơ ứng dụng luôn
ở chỗ nút quay lại welcome có nút IconButton(
onPressed: () {
print('ddaayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
if (Navigator.canPop(context)) {
Navigator.pop(context);
}
},
icon: Icon(Icons.arrow_back_ios, size: 20, color: Colors.white),
), ở đây xuất hiện 1 lỗi là khi người dùng vào rồi thì \_isOnboardingCompleted thành true, mà nút rồi bây chừ tắt app vào lại thì vào welcome click vào nút quay lại k được sẽ bị đen vì nút đó là quay lại màn hình trước đó ,mà ở đây là bạn vào thẳng luôn thành ra nó không được

        nên ở đây tạo 1 biến là isLoginFirst nếu là lần đầu thì sẽ có nút nếu không phải lần đầu thì ẩn đi ( ở đây khi lần đầu vào thì sẽ là vào onboarding, còn nếu là lần 2 thì sẽ trực tiếp vào welcomepage luôn, nên ở đây trực tiếp là vào welcomepage luôn)

chỗ void \_gotoWelcomepage() {
Navigator.push(
context,
MaterialPageRoute(
builder: (context) => WelcomePage(isFirstTimeInstall: true),
),
);
} ở đây là dùng cho nút skip và get started thì nó chính là lần đầu nên cho nó là true
. Xử lý Splash Screen kiểm tra trạng thái Onboarding
Viết hàm Future<void> \_checkAppState2(BuildContext context) để:

Lấy trạng thái đã hoàn thành Onboarding (SharedPreferences.getBool('kOnboardingCompleted'))

Nếu đã hoàn thành → chuyển sang WelcomePage

Nếu chưa hoàn thành → chuyển sang OnboardingPageView

Có kiểm tra if (!context.mounted) return; trước khi dùng Navigator để đảm bảo context còn hợp lệ

dart
Sao chép
Chỉnh sửa
Future<void> \_checkAppState2(BuildContext context) async {
try {
final isCompleted2 = await \_isOnboardingCompleted();
if (isCompleted2) {
if (!context.mounted) return;
Navigator.pushReplacement(
context,
MaterialPageRoute(
builder: (context) => WelcomePage(isFirstTimeInstall: false),
),
);
} else {
if (!context.mounted) return;
Navigator.pushReplacement(
context,
MaterialPageRoute(builder: (context) => const OnboardingPageView()),
);
}
} catch (e) {
print(' không lấy được data');
}
}
✅ 2. Hàm kiểm tra Onboarding đã hoàn thành hay chưa
dart
Sao chép
Chỉnh sửa
Future<bool> \_isOnboardingCompleted() async {
try {
final SharedPreferences prefs = await SharedPreferences.getInstance();
return prefs.getBool('kOnboardingCompleted') ?? false;
} catch (e) {
return false;
}
}
✅ 3. Hàm lưu trạng thái hoàn thành Onboarding
Gọi khi nhấn nút Get Started hoặc Skip

dart
Sao chép
Chỉnh sửa
Future<void> \_markOnboardingCompleted() async {
try {
final SharedPreferences prefs = await SharedPreferences.getInstance();
prefs.setBool('kOnboardingCompleted', true);
} catch (e) {
print('e lỗi: ${e}');
}
}
✅ 4. Điều hướng sang WelcomePage sau khi hoàn thành Onboarding
dart
Sao chép
Chỉnh sửa
void \_gotoWelcomepage() {
Navigator.push(
context,
MaterialPageRoute(
builder: (context) => WelcomePage(isFirstTimeInstall: true),
),
);
}
✅ 5. Hiển thị nút back trong WelcomePage khi vào lần đầu (đi từ onboarding)
dart
Sao chép
Chỉnh sửa
appBar: AppBar(
backgroundColor: Colors.red,
leading: isFirstTimeInstall
? IconButton(
onPressed: () {
if (Navigator.canPop(context)) {
Navigator.pop(context);
}
},
icon: Icon(Icons.arrow_back_ios, size: 20, color: Colors.white),
)
: null,
),
→ leading chỉ hiển thị nút Back khi isFirstTimeInstall == true.

🔁 Ghi chú thêm:
if (!context.mounted) return; là để đảm bảo rằng widget vẫn còn gắn với cây widget khi xử lý async → tránh lỗi khi Navigator bị gọi sau khi widget bị dispose.

bài 8 : thêm thư việc easy localization để đổi ngôn ngữ trong app, tiếng anh tiếng việt
bài 9 thay đổi ui ux theme color, có nghĩa là nhấn màu nào màu đó đổi luôn cả theme cho app
listview() cái này là fix cứng luôn chỉ dungf với ListView(
children: [
Text("Item 1"),
Text("Item 2"),
Text("Item 3"),
],
)
còn listview.builder() cái này là linh hoạt chỉ dung ListView.builder(
itemCount: 1000,
itemBuilder: (context, index) {
return Text('Item $index');
},
)
so sánh 2 cách 2 báo sau
final List<Color> \_colorCategory = [];

@override
void initState() {
super.initState();
\_colorCategory.add(Colors.red);
\_colorCategory.add(Colors.green);
\_colorCategory.add(Colors.blue);
}
và
final List<Color> \_colorCategory = [
Colors.red,
Colors.green,
Colors.blue,
];

## Trang Tạo/Danh mục (Create Category)

### 🛠 Kỹ thuật đã áp dụng:

- Sử dụng `StatefulWidget` để quản lý trạng thái khi người dùng nhập hoặc chọn.
- Sử dụng `TextEditingController` để lấy giá trị từ TextFormField.
- Render danh sách màu bằng `ListView.builder` kết hợp `GestureDetector` để chọn màu.
- Dùng `easy_localization` để hỗ trợ đa ngôn ngữ cho giao diện.
- Tùy chỉnh giao diện nút với `ElevatedButton.styleFrom` (viền, màu nền, bo góc).
- Thiết kế bố cục UI tách riêng từng widget thành các hàm riêng để dễ bảo trì.
- Áp dụng `Expanded` và `Column` để giữ nút luôn ở dưới cùng màn hình.

### 📦 Ghi chú:

- Có thể mở rộng thêm lựa chọn icon bằng `showModalBottomSheet` hoặc `Dialog` khi nhấn vào phần chọn icon.
  bài 10 : hướng dẫn sử dụng realm để lưu trữ dữ liệu
  tạo hàm choose icon của thư việc flutter_iconpicker ở đây hỗ trợ nhiều kiểu như matrial (android),cupertino (ios),font_awesome_flutter (web),line_awesome_icons (web) thực hiện logic :tạo 1 biến là \_iconSelected rồi lưu icon thay đổi vào đó , nếu nó khác null thì hiển thị icon, nếu là null thì hiển thị text
  thay đổi hàm colorPicker: mục đích là cho người dùng tự do chọn color chứ k phải kiểu cố điịnh 7 màu như ban đầu

feat: Thêm chức năng tạo danh mục với lựa chọn màu sắc và biểu tượng

- Cập nhật bản dịch tiếng Anh và tiếng Việt để bao gồm nhãn tạo danh mục mới.
- Cải tiến tiện ích CreateOrEditCategory để cho phép người dùng chọn màu biểu tượng và văn bản danh mục.
- Triển khai tích hợp cơ sở dữ liệu Realm để lưu trữ thông tin chi tiết về danh mục.
- Thêm tính năng xem trước cho biểu tượng danh mục và màu nền đã chọn.
- Tạo CategoryRealmEntity mới để quản lý dữ liệu danh mục trong cơ sở dữ liệu Realm.
- Giới thiệu hộp thoại chọn màu và biểu tượng để người dùng có trải nghiệm tốt hơn.
- Cập nhật pubspec.yaml để bao gồm các phụ thuộc cần thiết cho Realm, bộ chọn màu và bộ chọn biểu tượng.
  bài 20 :https://bloclibrary.dev/tutorials/flutter-firebase-login/ sử dụng bloc để xử lý login
