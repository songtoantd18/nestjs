// Import thư viện Bloc để sử dụng Cubit
import 'package:bloc/bloc.dart';
// Import thư viện Equatable để so sánh trạng thái dễ dàng (tránh trùng lặp rebuild UI)
import 'package:equatable/equatable.dart';

// Kết nối file login_state.dart bằng từ khóa part
part 'login_state.dart';

// Tạo class LoginCubit kế thừa từ Cubit với kiểu trạng thái là LoginState
class LoginCubit extends Cubit<LoginState> {
  // Constructor khởi tạo với trạng thái ban đầu là LoginState có title rỗng
  LoginCubit() : super(LoginState(''));

  // Hàm login nhận email và password, hiện chỉ in ra console
  void login({required String email, required String password}) {
    // Đây là nơi bạn sẽ xử lý logic đăng nhập sau này (API, Firebase, v.v.)
    print('login with email: $email and password: $password');
  }
}
