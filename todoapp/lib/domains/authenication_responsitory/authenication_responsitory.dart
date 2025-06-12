import 'package:todoapp/domains/data_sources/firebase_auth_service.dart';

abstract class AuthenicationResponsitory {
  Future<void> loginWithEmailAndPassword({
    required String email,
    required String password,
  });
}

class AuthenicationResponsitoryImpl implements AuthenicationResponsitory {
  final FirebaseAuthService firebaseAuthService;
  AuthenicationResponsitoryImpl({required this.firebaseAuthService});
  @override
  Future<void> loginWithEmailAndPassword({
    required String email,
    required String password,
  }) async {
    try {
      await firebaseAuthService.loginWithEmailAndPassword(
        email: email,
        password: password,
      );
      // TODO: implement loginWithEmailAndPassword
      // throw UnimplementedError();
    } catch (e) {
      print('e: $e');
    }
  }
}
