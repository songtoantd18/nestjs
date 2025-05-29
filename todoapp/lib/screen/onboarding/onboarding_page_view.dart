import 'package:flutter/material.dart';
import 'package:todoapp/screen/onboarding/onboarding_child_page.dart';
import 'package:todoapp/screen/ultils.enums/onboarding_page_position.dart';

class OnboardingPageView extends StatefulWidget {
  const OnboardingPageView({Key? key}) : super(key: key);

  @override
  State<OnboardingPageView> createState() => _OnboardingPageViewState();
}

class _OnboardingPageViewState extends State<OnboardingPageView> {
  int count = 0;

  void _incrementCount() {
    setState(() {
      count++;
    });
    print('Page changed, count = $count');
  }

  final _pageController = PageController();
  @override
  Widget build(BuildContext context) {
    print(
      '_pageController----------------------------------------------------------------------------------: ${_pageController}',
    );
    return Scaffold(
      backgroundColor: Colors.red,
      body: Container(
        child: SafeArea(
          child: PageView(
            controller: _pageController,
            physics: NeverScrollableScrollPhysics(),
            onPageChanged: (index) {
              _incrementCount(); // Mỗi lần đổi trang, tăng count
            },
            children: [
              OnboardingChildPage(
                onboardingPagePosition: OnboardingPagePosition.page1,
                nextOnpressed: () {
                  print(
                    'đây là next---------------111111111111-----------------',
                  );
                  _pageController.nextPage(
                    duration: Duration(milliseconds: 300),
                    curve: Curves.easeIn,
                  );
                },
                backOnpressed: () {
                  _pageController.previousPage(
                    duration: Duration(milliseconds: 300),
                    curve: Curves.easeIn,
                  );
                },
                skippOnpressed: () {
                  print('đến màn hinh welcome');
                },
              ),
              OnboardingChildPage(
                onboardingPagePosition: OnboardingPagePosition.page2,
                nextOnpressed: () {
                  print(
                    'đây là next---------------111111111111-----------------',
                  );
                  _pageController.nextPage(
                    duration: Duration(milliseconds: 300),
                    curve: Curves.easeIn,
                  );
                },
                backOnpressed: () {
                  _pageController.previousPage(
                    duration: Duration(milliseconds: 300),
                    curve: Curves.easeIn,
                  );
                },
                skippOnpressed: () {
                  print('đến màn hinh welcome');
                },
              ),
              OnboardingChildPage(
                onboardingPagePosition: OnboardingPagePosition.page3,
                nextOnpressed: () {
                  print('đến màn hình welcome-');
                },
                backOnpressed: () {
                  _pageController.previousPage(
                    duration: Duration(milliseconds: 300),
                    curve: Curves.easeIn,
                  );
                },
                skippOnpressed: () {
                  print('đến màn hinh welcome');
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
