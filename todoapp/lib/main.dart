// import 'package:easy_localization/easy_localization.dart';
// import 'package:flutter/material.dart';
// import 'package:flutter_bloc/flutter_bloc.dart';
// import 'package:provider/provider.dart';
// import 'package:todoapp/bloc/login_cubit.dart';
// import 'dart:math';
// import 'package:todoapp/category/create_or_edit_category.dart';
// import 'package:todoapp/domains/authenication_responsitory/authenication_responsitory.dart';
// import 'package:todoapp/domains/data_sources/firebase_auth_service.dart';
// import 'package:todoapp/main/main_page.dart';
// import 'package:todoapp/screen/login/login_page.dart';
// import 'package:todoapp/screen/onboarding/onboarding_page_view.dart';
// import 'package:todoapp/screen/welcome/welcome_page.dart';
// import 'screen/splashScreen.dart';
//
// import 'package:firebase_core/firebase_core.dart';
// import 'firebase_options.dart';
//
// void main() async {
//   WidgetsFlutterBinding.ensureInitialized();
//
//   await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
//
//   await EasyLocalization.ensureInitialized();
//
//   runApp(
//     EasyLocalization(
//       supportedLocales: const [Locale('vi'), Locale('en')],
//       path: "assets/translations",
//       fallbackLocale: Locale('en'),
//       child: App(),
//     ),
//   );
// }
//
// class App extends StatefulWidget {
//   const App({super.key});
//   @override
//   State<App> createState() => _AppState();
// }
//
// class _AppState extends State<App> {
//   late final AuthenicationResponsitory _authenicationResponsitory;
//   late final FirebaseAuthService _firebaseAuthService;
//
//   @override
//   void initState() {
//     super.initState();
//     _authenicationResponsitory = AuthenicationResponsitoryImpl(
//       firebaseAuthService: FirebaseAuthService(),
//     );
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return MultiRepositoryProvider(
//       providers: [
//         RepositoryProvider(create: (context) => _authenicationResponsitory),
//       ],
//       child: MyApp(),
//     );
//   }
// }
//
// class MyApp extends StatelessWidget {
//   const MyApp({super.key});
//
//   @override
//   Widget build(BuildContext context) {
//     return BlocProvider(
//       create: (_) => LoginCubit(
//         authenicationResponsitory: context.read<AuthenicationResponsitory>(),
//       ),
//       child: MaterialApp(
//         title: 'Provider Demo',
//         localizationsDelegates: context.localizationDelegates,
//         locale: context.locale,
//         supportedLocales: context.supportedLocales,
//         home: LoginPage(),
//       ),
//     );
//   }
// }

import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:todoapp/screen/login/login_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await EasyLocalization.ensureInitialized();
  runApp(
    EasyLocalization(
      supportedLocales: const [Locale('vi'), Locale('en')],
      path: "assets/translations",

      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Provider Demo',
      localizationsDelegates: context.localizationDelegates,
      locale: context.locale,
      supportedLocales: context.supportedLocales,

      home: LoginPage(),
    );
  }
}
