import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:todoapp/domains/authenication_responsitory/authenication_responsitory.dart';
part 'login_state.dart';

class LoginCubit extends Cubit<LoginState> {
  final AuthenicationResponsitory authenicationResponsitory;

  LoginCubit({required this.authenicationResponsitory})
    : super(const LoginState(""));

  Future<void> login({required String email, required String password}) async {
    try {
      await authenicationResponsitory.loginWithEmailAndPassword(
        email: email,
        password: password,
      );
    } catch (e) {
      print('e: $e');
    }
  }
}
