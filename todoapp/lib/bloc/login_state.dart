// login_state.dart
part of 'login_cubit.dart';

class LoginState extends Equatable {
  final String message;
  const LoginState(this.message);

  @override
  List<Object?> get props => [message];
}
