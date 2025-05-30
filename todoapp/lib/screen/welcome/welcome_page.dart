import 'package:flutter/material.dart';

class WelcomePage extends StatelessWidget {
  final bool isFirstTimeInstall;
  const WelcomePage({super.key, required this.isFirstTimeInstall});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.red,

        leading: isFirstTimeInstall
            ? IconButton(
                onPressed: () {
                  print('ddaayyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy');
                  if (Navigator.canPop(context)) {
                    Navigator.pop(context);
                  }
                },
                icon: Icon(Icons.arrow_back_ios, size: 20, color: Colors.white),
              )
            : null,
      ),
      backgroundColor: Colors.black,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
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
      margin: EdgeInsets.symmetric(horizontal: 38),
      child: Column(
        children: [
          Text('Welcome!', style: TextStyle(fontSize: 24, color: Colors.white)),
          SizedBox(height: 16),
          Text(
            'please login to your account or create new account to continue',
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
