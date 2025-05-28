import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'dart:math';
import 'package:flutter/material.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
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
