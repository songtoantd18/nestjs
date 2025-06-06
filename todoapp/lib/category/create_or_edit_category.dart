import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
// import 'package:easy_localization/easy_localization.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter_colorpicker/flutter_colorpicker.dart';
import 'package:flutter_iconpicker/flutter_iconpicker.dart';
import 'package:flutter_iconpicker/flutter_iconpicker.dart'
    as FlutterIconPicker
    show showIconPicker;
import 'package:realm/realm.dart';
import 'package:todoapp/entities/category_realm_entity.dart';
import 'package:todoapp/screen/ultils.enums/color_Extension.dart';
// import 'package:flutter_iconpicker/flutter_iconpicker.dart';

class CreateOrEditCategory extends StatefulWidget {
  const CreateOrEditCategory({super.key});
  @override
  State<CreateOrEditCategory> createState() => _CreateOrEditCategoryState();
}

class _CreateOrEditCategoryState extends State<CreateOrEditCategory> {
  final _nameCategoryController = TextEditingController();
  final List<Color> _colorDataSource = [];
  Color _colorSelected = const Color(0xffc9cc41);
  Color _iconColorSelected = const Color(0xff21a300);
  IconData? _iconSelected;
  @override
  void initState() {
    super.initState();
    final storagePath = Configuration.defaultRealmPath;
    print('storagePath: ${storagePath}');

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
        backgroundColor: Colors.green,
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
                _buildCatergoryChooseIconAndTextColorField(),
                _buildCategoryPreview(),
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
          margin: const EdgeInsets.only(top: 10),
          child: TextFormField(
            controller: _nameCategoryController,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 16,
            ), // Thêm dòng này
            decoration: InputDecoration(
              hintText: 'create_category_from_category_name_placeholder'.tr(),
              hintStyle: const TextStyle(color: Colors.white, fontSize: 16),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(color: Colors.red, width: 6),
              ),
            ),
            onChanged: (String? value) {
              setState(() {});
            },
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
              _chooseIcon();
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
                child: _iconSelected == null
                    ? Center(
                        child: Text(
                          "create_category_from_category_icon_placeholder".tr(),
                          textAlign: TextAlign.left,
                        ),
                      )
                    : Icon(
                        IconData(
                          _iconSelected!.codePoint,
                          fontFamily: 'MaterialIcons',
                        ),
                        color: _iconColorSelected,
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
      children: [
        _buildFieldTitle(
          'create_category_from_category_background_color_label'.tr(),
        ),
        const SizedBox(height: 10),
        GestureDetector(
          onTap: () {
            // TODO: mở hộp chọn màu ở đây
            print("Người dùng muốn chọn màu");
            _onChooseCategoryBackgroundColor();
          },
          child: Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: _colorSelected,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: Colors.white),
            ),
            child: _colorSelected != null
                ? const Icon(Icons.check, color: Colors.white, size: 20)
                : null,
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
              _onHandleCreateCategory();
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

  void _onHandleCreateCategory() {
    print('===> Bắt đầu handle tạo category');
    final categoryName = _nameCategoryController.text;
    if (categoryName.isEmpty || _iconSelected == null) {
      print('❌ Tên category hoặc icon chưa được chọn');
      return;
    }

    // Khởi tạo Realm
    final config = Configuration.local([CategoryRealmEntity.schema]);
    final realm = Realm(config);

    // Tạo category mới
    final category = CategoryRealmEntity(
      ObjectId().toString(),
      categoryName,
      iconCodePoint: _iconSelected!.codePoint,
      backgroundColorHex: _colorSelected.toHex(),
      iconColorHex: _iconColorSelected.toHex(),
    );

    // Ghi vào Realm
    realm.write(() {
      realm.add(category);
    });

    _nameCategoryController.text = '';
    _iconSelected = null;
    _colorSelected = Color(0xffc9cc41);
    _iconColorSelected = Color(0xff21a300);
    setState(() {});
    _showAlert("Success", "Đã tạo category mới");

    print('✅ Đã lưu category: $category');

    // ✅ Truy vấn tất cả categories hiện có
    final allCategories = realm.all<CategoryRealmEntity>();
    print('📦 Danh sách tất cả category hiện có (${allCategories.length}):');
    for (var cat in allCategories) {
      print(
        '- ${cat.id}: ${cat.name}, icon: ${cat.iconCodePoint}, màu nền: ${cat.backgroundColorHex}',
      );
    }

    realm.close();
  }

  void _showAlert(String title, String message) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(title),
          content: Text(message),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('OK'),
            ),
          ],
        );
      },
    );
  }

  void _chooseIcon() async {
    // IconData? icon = await FlutterIconPicker.showIconPicker(
    //   context,
    //   iconPackModes: [IconPack.material],
    // );
    // setState(() {
    //   _iconSelected = icon;
    // });
    final IconPicker = await FlutterIconPicker.showIconPicker(
      context,
      iconPackModes: [IconPack.material],
    );
    if (IconPicker != null) {
      setState(() {
        _iconSelected = IconPicker;
      });
    }
    ;
  }

  void _onChooseCategoryBackgroundColor() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: SingleChildScrollView(
            child: MaterialPicker(
              pickerColor: _colorSelected,
              onColorChanged: (Color newColor) {
                setState(() {
                  _colorSelected = newColor; // cập nhật tạm thời trong dialog
                });
              },
            ),
          ),
        );
      },
    );
  }

  void _onChooseCategoryIconTextColor() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          content: SingleChildScrollView(
            child: MaterialPicker(
              pickerColor: _iconColorSelected,
              onColorChanged: (Color newColor) {
                setState(() {
                  _iconColorSelected =
                      newColor; // cập nhật tạm thời trong dialog
                });
              },
            ),
          ),
        );
      },
    );
  }

  Widget _buildCatergoryChooseIconAndTextColorField() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildFieldTitle(
          'create_category_from_category_icon_text_color_label'.tr(),
        ),
        const SizedBox(height: 10),
        GestureDetector(
          onTap: () {
            print("Mở hộp thoại chọn màu icon/text");
            _onChooseCategoryIconTextColor();
          },
          child: Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: _iconColorSelected,
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: Colors.white),
            ),
            child: const Icon(Icons.check, color: Colors.white, size: 20),
          ),
        ),
      ],
    );
  }

  // WIDGET
  Widget _buildCategoryPreview() {
    return Container(
      // padding: const EdgeInsets.symmetric(horizontal: 24),
      // margin: const EdgeInsets.only(top: 10),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildFieldTitle("create_category_from_category_preview_label".tr()),
          const SizedBox(height: 10),
          Column(
            children: [
              Container(
                width: 64,
                height: 64,
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: _colorSelected,
                ),
                child: Icon(_iconSelected, color: _iconColorSelected, size: 28),
              ),
              const SizedBox(height: 8),
              Text(
                _nameCategoryController.text,
                style: TextStyle(color: Colors.white, fontSize: 16),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
