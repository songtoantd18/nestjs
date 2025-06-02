import 'package:flutter/material.dart';
// import 'package:easy_localization/easy_localization.dart';
import 'package:easy_localization/easy_localization.dart';

class CreateOrEditCategory extends StatefulWidget {
  const CreateOrEditCategory({super.key});
  @override
  State<CreateOrEditCategory> createState() => _CreateOrEditCategoryState();
}

class _CreateOrEditCategoryState extends State<CreateOrEditCategory> {
  final _nameCategoryController = TextEditingController();
  final List<Color> _colorDataSource = [];
  Color? selectedColor;
  @override
  void initState() {
    super.initState();
    _colorDataSource.addAll([
      Colors.red,
      Colors.orange,
      Colors.yellow,
      Colors.green,
      Colors.blue,
      Colors.indigo,
      Colors.purple,
      Colors.pink, // Màu thêm để đủ 8 màu
    ]);
    ;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xff121212),
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        centerTitle: true,
        title: _buildFieldTitle('create_category_page_title'.tr()),
      ),
      body: Container(
        margin: EdgeInsets.symmetric(horizontal: 24),

        child: _buildBodyPageScreen(),
      ),
    );
  }

  Widget _buildBodyPageScreen() {
    return Container(
      width: double.infinity,
      color: Colors.transparent,
      child: Column(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                _buildCatergoryNameField(),
                _buildCatergoryChoseIconField(),
                _buildCatergoryChoseBackgroundColorField(),
              ],
            ),
          ),
          _buildOnBoadingNextAndPreviousButton(),
        ],
      ),
    );
  }

  Widget _buildCatergoryNameField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        _buildFieldTitle('create_category_from_category_name_label'.tr()),

        Container(
          margin: EdgeInsets.only(top: 10),
          child: TextFormField(
            controller: _nameCategoryController,
            decoration: InputDecoration(
              hintText: 'create_category_from_category_name_placeholder'.tr(),
              hintStyle: const TextStyle(color: Colors.white, fontSize: 16),

              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: BorderSide(color: Colors.purple, width: 6),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildCatergoryChoseIconField() {
    return Container(
      color: Colors.transparent,
      width: double.infinity,
      margin: EdgeInsets.symmetric(vertical: 6),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          _buildFieldTitle('create_category_from_category_icon_label'.tr()),

          GestureDetector(
            onTap: () {
              print('xin chào 111111111111111111111111  ');
            },
            child: Container(
              margin: EdgeInsets.only(top: 10),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                color: Colors.grey,
              ),
              child: Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 10,
                  vertical: 10,
                ),
                child: Text(
                  "create_category_from_category_icon_placeholder".tr(),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCatergoryChoseBackgroundColorField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.start,
      children: [
        _buildFieldTitle(
          'create_category_from_category_background_color_label'.tr(),
        ),
        Container(
          margin: EdgeInsets.only(top: 10),
          width: double.infinity,
          height: 36,
          color: Colors.transparent,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,

            itemBuilder: (context, index) {
              final color = _colorDataSource[index];
              // final selectedColor = color;
              final isSelected = selectedColor == color;
              return GestureDetector(
                onTap: () {
                  print(' day la $index');
                  print('đây là color: $color');
                  setState(() {
                    selectedColor = color;
                  });
                },
                child: Container(
                  width: 36,
                  height: 36,
                  margin: EdgeInsets.only(right: 12),
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(18),
                    color: color,
                  ),
                  child: isSelected
                      ? const Icon(Icons.check, color: Colors.white, size: 20)
                      : null,
                ),
              );
            },
            itemCount: _colorDataSource.length,
          ),
        ),
      ],
    );
  }

  Widget _buildFieldTitle(String title) {
    return Text(
      title,
      style: TextStyle(
        // fontSize: ,
        color: Colors.white,
        fontWeight: FontWeight.bold,
      ),
    );
  }

  Widget _buildOnBoadingNextAndPreviousButton() {
    return Container(
      margin: EdgeInsets.symmetric(vertical: 20),
      color: Colors.transparent,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          ElevatedButton(
            onPressed: () {
              print('đây là cancel');
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.transparent,
              elevation: 0, // nếu muốn phẳng như TextButton
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
                side: BorderSide(
                  color: Colors.purple,
                  width: 2,
                ), // viền màu tím
              ),
            ),
            child: Text(
              'cancel',
              style: TextStyle(color: Colors.purple), // chữ cùng màu với viền
            ),
          ),

          ElevatedButton(
            onPressed: () {
              print('đây là create category');
              _onHandleNameCategory();
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0Xff8875ff),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            child: Text(
              'create category',
              style: TextStyle(fontSize: 16, color: Colors.white),
            ),
          ),
        ],
      ),
    );
  }

  void _onHandleNameCategory() {
    print('đây là handle name category');
    print('đây là name category: ${_nameCategoryController.text}');
  }
}
