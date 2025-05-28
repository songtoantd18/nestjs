import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// Model Counter với ChangeNotifier
class CounterProvider with ChangeNotifier {
  int count = 0;

  void addCount() {
    count = count + 1;
    notifyListeners();
  }

  void minusCount() {
    count = count - 1;
    notifyListeners();
  }

  void mulitiple() {
    count = count * 2;
    notifyListeners();
  }
}

class CustomerProvider with ChangeNotifier {
  int numberCustomer = 0;

  void addCustomer() {
    numberCustomer = numberCustomer + 1;
    notifyListeners();
  }

  void minusCustomer() {
    numberCustomer = numberCustomer - 1;
    notifyListeners();
  }

  void mulitiple() {
    numberCustomer = numberCustomer * 2;
    notifyListeners();
  }
}

void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => CustomerProvider()),
        ChangeNotifierProvider(create: (_) => CounterProvider()),
      ],
      child: MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Provider Demo',
      home: Scaffold(
        appBar: AppBar(title: Text('Flutter Provider Example')),
        body: Parent(),
      ),
    );
  }
}

class Parent extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Lấy count từ Provider
    int count = context.watch<CounterProvider>().count;
    int customer = context.watch<CustomerProvider>().numberCustomer;
    print('customer: ${customer}');

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('Đây là count parent: $count', style: TextStyle(fontSize: 24)),
        Text(
          'Đây là CUSTOMER parent: $customer',
          style: TextStyle(fontSize: 24),
        ),

        ChildA(),
        SizedBox(height: 20),
        ChildB(),
        SizedBox(height: 20),
        ChildC(),
      ],
    );
  }
}

class ChildA extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final counter = context.read<CounterProvider>();
    final customer = context.read<CustomerProvider>();

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('CHILD A: ${context.watch<CounterProvider>().count}'),
        SizedBox(width: 20),
        ElevatedButton(
          onPressed: () => counter.addCount(),
          child: Text('add A'),
        ),
        ElevatedButton(
          onPressed: () => counter.minusCount(),
          child: Text('minus A'),
        ),
        ElevatedButton(
          onPressed: () => customer.addCustomer(),
          child: Text('add A customer'),
        ),
        ElevatedButton(
          onPressed: () => customer.minusCustomer(),
          child: Text('minus A customer'),
        ),
      ],
    );
  }
}

class ChildB extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final counter = context.read<CounterProvider>();
    final customer = context.read<CustomerProvider>();
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('CHILD B: ${context.watch<CounterProvider>().count}'),
        SizedBox(width: 20),
        ElevatedButton(
          onPressed: () => counter.addCount(),
          child: Text('add B'),
        ),
        ElevatedButton(
          onPressed: () => counter.minusCount(),
          child: Text('minus B'),
        ),
        ElevatedButton(
          onPressed: () => customer.addCustomer(),
          child: Text('add B customer'),
        ),
        ElevatedButton(
          onPressed: () => customer.minusCustomer(),
          child: Text('minus B customer'),
        ),
        ElevatedButton(
          onPressed: () => customer.mulitiple(),
          child: Text('mulitiple B customer'),
        ),
      ],
    );
  }
}

class ChildC extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final counter = context.read<CounterProvider>();
    print('counter: ${counter}');

    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text('CHILD C: ${context.watch<CounterProvider>().count}'),
        SizedBox(width: 20),
        ElevatedButton(
          onPressed: () => counter.mulitiple(),
          child: Text('muliti C'),
        ),
      ],
    );
  }
}
