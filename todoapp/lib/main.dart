import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:todoapp/main/main_page.dart';
import 'package:todoapp/screen/onboarding/onboarding_page_view.dart';
import 'package:todoapp/screen/welcome/welcome_page.dart';

import 'screen/splashScreen.dart';

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
      home: SplashScreen(),

      // home: OnboardingPageView(),
      // home: WelcomePage(),
      // home: MainPage(),
    );
  }
}
