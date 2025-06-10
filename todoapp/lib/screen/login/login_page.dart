import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.black,
        leading: IconButton(
          onPressed: () {
            print('xin chào 123');
          },
          icon: const Icon(Icons.arrow_back_ios, size: 20, color: Colors.white),
        ),
      ),
      body: SingleChildScrollView(
        child: SafeArea(
          top: false,
          child: Container(
            color: Colors.black,
            constraints: BoxConstraints(
              minHeight: MediaQuery.of(context).size.height,
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildPageTitle(),
                _buildFormLogin(),
                _buildOrSplitDivider(),
                _buildButtonLoginGoogle(),
                _buildButtonLoginApple(),
                _buildNoAccountRegisterButton(),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildPageTitle() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 20),
      // color: Colors.green,
      child: Text(
        'LOGIN',
        style: TextStyle(fontSize: 24, color: Colors.white),
        textAlign: TextAlign.left,
      ),
    );
  }

  Widget _buildFormLogin() {
    return Form(
      child: Container(
        margin: EdgeInsets.symmetric(horizontal: 20),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,

          children: [
            _buildUsernameField(),
            SizedBox(height: 20),
            _buildPasswordField(),
            _buildButtonLogin(),
          ],
        ),
      ),
    );
  }

  Widget _buildUsernameField() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Username',
          style: TextStyle(color: Colors.white.withOpacity(0.87), fontSize: 16),
        ),
        Container(
          margin: EdgeInsets.only(top: 10),
          child: TextFormField(
            decoration: InputDecoration(
              hintText: "enter your email",
              hintStyle: TextStyle(color: Color(0xff535353), fontSize: 16),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              fillColor: Color(0xff1d1d1d),
              filled: true,
            ),
            style: TextStyle(color: Colors.white, fontSize: 16),
          ),
        ),
      ],
    );
  }

  Widget _buildPasswordField() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Password',
          style: TextStyle(color: Colors.white.withOpacity(0.87), fontSize: 16),
        ),
        Container(
          margin: EdgeInsets.only(top: 10),
          child: TextFormField(
            obscureText: true,
            decoration: InputDecoration(
              hintText: "enter your password",
              hintStyle: TextStyle(color: Color(0xff535353), fontSize: 16),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
              fillColor: Color(0xff1d1d1d),
              filled: true,
            ),
            style: TextStyle(color: Colors.white, fontSize: 16),
          ),
        ),
      ],
    );
  }

  Widget _buildButtonLogin() {
    return Container(
      width: double.infinity,
      height: 48,
      margin: EdgeInsets.only(top: 70),
      child: ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          backgroundColor: const Color(0xff8875ff),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(4)),
          disabledBackgroundColor: const Color(0xff8875ff).withOpacity(0.5),
        ),
        child: const Text(
          'Login',

          style: TextStyle(fontSize: 16, color: Colors.white),
        ),
      ),
    );
  }

  Widget _buildButtonLoginGoogle() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      width: double.infinity,
      height: 48,
      // margin: EdgeInsets.only(top: 70),
      child: ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(4),
            side: BorderSide(color: Color(0xff8875ff)),
          ),
          disabledBackgroundColor: const Color(0xff8875ff).withOpacity(0.5),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset(
              "assets/images/google.png",
              height: 24,
              width: 24,
              fit: BoxFit.contain,
            ),
            SizedBox(width: 10),
            Text(
              'Login with Google',
              style: TextStyle(fontSize: 16, color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildButtonLoginApple() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      width: double.infinity,
      height: 48,
      // margin: EdgeInsets.only(top: 70),
      child: ElevatedButton(
        onPressed: () {},
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.transparent,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(4),
            side: BorderSide(color: Color(0xff8875ff)),
          ),
          disabledBackgroundColor: const Color(0xff8875ff).withOpacity(0.5),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Image.asset(
              "assets/images/apple.png",
              height: 24,
              width: 24,
              fit: BoxFit.contain,
            ),
            SizedBox(width: 10),
            Text(
              'Login with Apple',
              style: TextStyle(fontSize: 16, color: Colors.white),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildNoAccountRegisterButton() {
    return Center(
      child: RichText(
        text: TextSpan(
          text: "Don't have an account? ",
          style: const TextStyle(color: Colors.white, fontSize: 16),
          children: [
            TextSpan(
              text: "Register",
              style: const TextStyle(
                color: Colors.blue,
                fontSize: 16,
                fontWeight: FontWeight.bold,
                decoration: TextDecoration.underline,
              ),
              recognizer: TapGestureRecognizer()
                ..onTap = () {
                  // Điều hướng đến trang đăng ký
                },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOrSplitDivider() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      // color: Colors.yellow,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Expanded(
            flex: 1,
            child: Container(
              width: double.infinity,
              height: 1,
              color: Colors.white,
            ),
          ),

          Text('or', style: TextStyle(color: Colors.white, fontSize: 16)),
          Expanded(
            flex: 1,
            child: Container(
              width: double.infinity,
              height: 1,
              color: Colors.white,
            ),
          ),
        ],
      ),
    );
  }
}
