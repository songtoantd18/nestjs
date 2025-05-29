import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:todoapp/screen/ultils.enums/onboarding_page_position.dart';

class OnboardingChildPage extends StatelessWidget {
  final OnboardingPagePosition onboardingPagePosition;
  final VoidCallback nextOnpressed;
  final VoidCallback backOnpressed;
  final VoidCallback skippOnpressed;
  const OnboardingChildPage({
    super.key,
    required this.onboardingPagePosition,
    required this.nextOnpressed,
    required this.backOnpressed,
    required this.skippOnpressed,
  });

  @override
  Widget build(BuildContext context) {
    print(
      'onboardingPagePosition111111111111111111111111111111111: ${onboardingPagePosition}',
    );
    return Scaffold(
      backgroundColor: Colors.yellow,
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          _buildSkipButton(),
          _buildOnBoadingImage(),
          _buildOnBoadingPageControl(),
          _buildOnBoadingTitleAndContent(),
          _buildOnBoadingNextAndPreviousButton(),
        ],
      ),
    );
  }

  Widget _buildSkipButton() {
    final _pageController = PageController();

    return Container(
      alignment: AlignmentDirectional.centerStart,
      margin: EdgeInsets.only(top: 20),
      color: Colors.black,
      child: TextButton(
        onPressed: () {
          skippOnpressed();
        },
        child: Text("skip", style: TextStyle(fontSize: 20, color: Colors.red)),
      ),
    );
  }

  Widget _buildOnBoadingImage() {
    return Image.asset(
      fit: BoxFit.contain,
      onboardingPagePosition.onboardingPageImage(),
    );
  }

  Widget _buildOnBoadingPageControl() {
    // ở page nào thì sáng page đó các page còn lại là tối

    return Container(
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            height: 8,
            width: 26,
            margin: EdgeInsets.only(right: 4, left: 4),
            decoration: BoxDecoration(
              color: onboardingPagePosition == OnboardingPagePosition.page1
                  ? Colors.red
                  : Colors.white,

              borderRadius: BorderRadius.circular(4),
            ),
          ),
          Container(
            height: 8,
            width: 26,
            margin: EdgeInsets.only(right: 4, left: 4),
            decoration: BoxDecoration(
              color: onboardingPagePosition == OnboardingPagePosition.page2
                  ? Colors.red
                  : Colors.white,
              borderRadius: BorderRadius.circular(4),
            ),
          ),
          Container(
            height: 8,
            width: 26,
            margin: EdgeInsets.only(right: 4, left: 4),
            decoration: BoxDecoration(
              color: onboardingPagePosition == OnboardingPagePosition.page3
                  ? Colors.red
                  : Colors.white,

              borderRadius: BorderRadius.circular(4),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildOnBoadingTitleAndContent() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 38),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Text(
            onboardingPagePosition.onboardingPageTitle(),
            style: TextStyle(fontSize: 30, color: Colors.red),
          ),
          Container(
            margin: EdgeInsets.only(top: 10),
            child: Text(
              onboardingPagePosition.onboardingPageContent(),
              style: TextStyle(fontSize: 20, color: Colors.red),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildOnBoadingNextAndPreviousButton() {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 38),
      // color: Colors.red,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          ElevatedButton(
            onPressed: () {
              backOnpressed();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.red,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            child: Text('back', style: TextStyle()),
          ),
          ElevatedButton(
            onPressed: () {
              nextOnpressed();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0Xff8875ff),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            child: Text(
              onboardingPagePosition == OnboardingPagePosition.page3
                  ? 'get started'
                  : 'next',
              style: TextStyle(fontSize: 16, color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }
}
