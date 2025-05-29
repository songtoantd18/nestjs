enum OnboardingPagePosition { page1, page2, page3 }

extension OnboardingPagePositionExtension on OnboardingPagePosition {
  String onboardingPageImage() {
    switch (this) {
      case OnboardingPagePosition.page1:
        return 'assets/1.png';
      case OnboardingPagePosition.page2:
        return 'assets/2.png';
      case OnboardingPagePosition.page3:
        return 'assets/3.png';
    }
  }

  String onboardingPageTitle() {
    switch (this) {
      case OnboardingPagePosition.page1:
        return 'đây là title1';
      case OnboardingPagePosition.page2:
        return 'đây là title2';

      case OnboardingPagePosition.page3:
        return 'đây là title3';
    }
  }

  String onboardingPageContent() {
    switch (this) {
      case OnboardingPagePosition.page1:
        return 'đây là content1';
      case OnboardingPagePosition.page2:
        return 'đây là content2';
      case OnboardingPagePosition.page3:
        return 'đây là content3';
    }
  }
}
