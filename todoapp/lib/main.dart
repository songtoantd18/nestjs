import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:todoapp/screen/onboarding/onboarding_page_view.dart';
import 'package:todoapp/screen/welcome/welcome_page.dart';

import 'screen/splashScreen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Provider Demo',

      // home: SplashScreen(),
      home: OnboardingPageView(),
      // home: WelcomePage(),
    );
  }
}
