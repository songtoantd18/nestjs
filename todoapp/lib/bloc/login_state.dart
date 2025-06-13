// Liên kết ngược với file login_cubit.dart
part of 'login_cubit.dart';

// Tạo class LoginState kế thừa từ Equatable để hỗ trợ so sánh giá trị
class LoginState extends Equatable {
  // Thuộc tính title (ở đây có thể dùng làm trạng thái đơn giản, ví dụ thông báo lỗi, trạng thái hiện tại)
  final String title;

  // Constructor nhận giá trị title
  const LoginState(this.title);

  // Override props để Equatable biết khi nào 2 đối tượng LoginState giống nhau (dựa trên title)
  @override
  List<Object?> get props => [title];
}
