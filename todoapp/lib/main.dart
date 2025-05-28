import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Lifting State Up Demo',
      home: Scaffold(
        appBar: AppBar(title: Text('Flutter Lifting State Up')),
        body: Parent(),
      ),
    );
  }
}

class Parent extends StatefulWidget {
  @override
  _ParentState createState() => _ParentState();
}

class _ParentState extends State<Parent> {
  int count = 0;
  void updateCount() {
    setState(() {
      count = count + 1;
    });
    print('đây là count addddddđ: $count');
  }

  void minusCount() {
    setState(() {
      count = count - 1;
    });
    print('đây là count minussssssssssssss: $count');
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('đây là parent: $count', style: TextStyle(fontSize: 24)),
        ChildA(count: count, addCount: updateCount, minusCount: minusCount),
        SizedBox(height: 20),
        ChildB(onUpdate: updateCount, count: count, minusCount: minusCount),
      ],
    );
  }
}

class ChildA extends StatelessWidget {
  final int count;
  final Function() addCount;
  final Function() minusCount;

  ChildA({
    required this.count,
    required this.addCount,
    required this.minusCount,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('CHILD A: $count'),
        SizedBox(width: 20),
        ElevatedButton(onPressed: () => addCount(), child: Text('add A')),
        ElevatedButton(onPressed: () => minusCount(), child: Text('minus A')),
      ],
    );
  }
}

class ChildB extends StatelessWidget {
  final Function() onUpdate;
  final int count;
  final Function() minusCount;

  ChildB({
    required this.minusCount,
    required this.onUpdate,
    required this.count,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('CHILD B: $count'),
        SizedBox(width: 20),
        ElevatedButton(onPressed: () => onUpdate(), child: Text('add B')),
        ElevatedButton(onPressed: () => minusCount(), child: Text('minus B')),
      ],
    );
  }
}
