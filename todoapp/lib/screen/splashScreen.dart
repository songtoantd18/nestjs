import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:todoapp/screen/onboarding/onboarding_page_view.dart';
import 'package:todoapp/screen/welcome/welcome_page.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({Key? key}) : super(key: key);



  Future<void> _checkAppState2(BuildContext context) async {
    try {
      final isCompleted2 = await _isOnboardingCompleted();
      if (isCompleted2) {
        if (!context.mounted) return;
        print('đây là check completed');
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(
            builder: (context) => WelcomePage(isFirstTimeInstall: false),
          ),
        );
      } else {
        if (!context.mounted) return;
        print('chuyển đến trang onboarding');
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const OnboardingPageView()),
        );
      }
    } catch (e) {
      print(' không lấy được data');
    }
  }

  Future<bool> _isOnboardingCompleted() async {
    try {
      final SharedPreferences prefs = await SharedPreferences.getInstance();
      bool result = prefs.getBool('kOnboardingCompleted') ?? false;
      return result;
    } catch (e) {
      return false;
    }
  }

  @override
  Widget build(BuildContext context) {
    _checkAppState2(context);
    return Scaffold(
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [_buildIconSplash(), _buildTextSplash()],
          ),
        ),
      ),
    );
  }
}

Widget _buildIconSplash() {
  return Image.asset('assets/logo1.png', fit: BoxFit.contain);
}

Widget _buildTextSplash() {
  return Container(
    margin: EdgeInsets.only(top: 20),
    child: Text('uptodoapp', style: TextStyle(color: Colors.red, fontSize: 30)),
  );
}

class ScaleSize {
  static double textScaleFactor(
    BuildContext context, {
    double maxTextScaleFactor = 2,
  }) {
    final width = MediaQuery.of(context).size.width;
    double val = (width / 540) * maxTextScaleFactor;
    print('val: ${val}');
    double value = max(1, min(val, maxTextScaleFactor));
    print('value: ${value}');
    return value;
  }
}
