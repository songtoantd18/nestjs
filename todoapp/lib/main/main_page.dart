import 'package:flutter/material.dart';

class MainPage extends StatefulWidget {
  const MainPage({super.key});

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  int _currentPage = 0;
  List<Widget> _page = [];
  @override
  void initState() {
    super.initState();
    _page = [
      Container(color: Colors.blue),
      Container(color: Colors.red),
      Container(color: Colors.purple),
      Container(color: Colors.yellow),
      Container(color: Colors.white),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue,
      body: _page.elementAt(_currentPage),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.green,
        unselectedItemColor: Colors.red,
        selectedItemColor: Colors.purple,
        currentIndex: _currentPage,
        onTap: (index) {
          print('index: ${index}');
          if (index == 2) {
            return;
          }
          setState(() {
            // _currentIndex = index;
            _currentPage = index;
          });
        },
        type: BottomNavigationBarType.fixed,
        items: [
          BottomNavigationBarItem(
            icon: Image.asset(
              'assets/images/your-star-icon1.png',
              height: 24,
              width: 24,
              fit: BoxFit.contain,
            ),
            activeIcon: Image.asset(
              'assets/images/your-star-icon1.png',
              height: 24,
              width: 24,
              fit: BoxFit.contain,
              color: Colors.yellow,
            ),
            label: 'Star',
          ),
          BottomNavigationBarItem(
            icon: Image.asset(
              'assets/images/gift-icon1.png',
              height: 24,
              width: 24,
              fit: BoxFit.contain,
            ),
            activeIcon: Image.asset(
              'assets/images/gift-icon1.png',
              height: 24,
              width: 24,
              fit: BoxFit.contain,
              color: Colors.yellow,
            ),
            label: 'Gift',
          ),
          BottomNavigationBarItem(
            icon: Container(),
            label: '',
            backgroundColor: Colors.transparent,
          ),
          BottomNavigationBarItem(
            icon: Image.asset(
              'assets/images/yt.png',
              height: 24,
              width: 24,
              fit: BoxFit.contain,
            ),
            activeIcon: Image.asset(
              'assets/images/yt.png',
              height: 24,
              width: 24,
              fit: BoxFit.contain,
              color: Colors.yellow,
            ),
            label: 'YouTube',
          ),
          BottomNavigationBarItem(
            icon: Image.asset(
              'assets/images/fb.png',
              height: 24,
              width: 24,
              fit: BoxFit.contain,
            ),
            activeIcon: Image.asset(
              'assets/images/fb.png',
              height: 24,
              width: 24,
              fit: BoxFit.contain,
              color: Colors.yellow,
            ),
            label: 'Facebook',
          ),
        ],
      ),
      floatingActionButton: Container(
        width: 64,
        height: 64,
        decoration: BoxDecoration(
          color: Colors.red,
          borderRadius: BorderRadius.circular(32),
        ),
        child: IconButton(
          onPressed: () {
            print('đây là float button');
          },
          icon: Icon(Icons.add, size: 30),
        ),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
    );
  }
}
