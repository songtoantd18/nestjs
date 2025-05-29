import 'package:flutter/material.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.yellow,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildSkipButton(),
            _buildContent(),
            const Spacer(),
            _buildButtonLogin(),

            _buildButtonRegister(),
          ],
        ),
      ),
    );
  }

  Widget _buildSkipButton() {
    return Container(color: Colors.red, child: Text('đây là skippppp'));
  }

  Widget _buildContent() {
    return Container(
      color: Colors.green,
      margin: EdgeInsets.symmetric(horizontal: 38),
      child: Column(
        children: [
          Text('Welcome!', style: TextStyle(fontSize: 24, color: Colors.white)),
          SizedBox(height: 16),
          Text(
            'This is the content section.',
            style: TextStyle(fontSize: 16, color: Colors.white70),
          ),
        ],
      ),
    );
  }

  Widget _buildButtonLogin() {
    return Container(
      width: double.infinity,
      height: 50,
      padding: EdgeInsets.symmetric(horizontal: 24),
      margin: EdgeInsets.symmetric(vertical: 10),

      child: ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          backgroundColor: Color(0xff8875ff),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          side: BorderSide(width: 1, color: Color(0xff8875ff)),
        ),
        child: Text('login', style: TextStyle()),
      ),
    );
  }

  Widget _buildButtonRegister() {
    return Container(
      width: double.infinity,
      height: 50,
      padding: EdgeInsets.symmetric(horizontal: 24),
      margin: EdgeInsets.symmetric(vertical: 10),
      child: ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(10),
          ),
          side: BorderSide(width: 1, color: Color(0xff8875ff)),
        ),
        child: Text('create new account', style: TextStyle()),
      ),
    );
  }
}
