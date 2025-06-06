import 'package:realm/realm.dart';

part 'category_realm_entity.realm.dart'; // 👈 Sửa lại đúng tên file

@RealmModel()
class $CategoryRealmEntity {
  @PrimaryKey()
  late String id;
  late String name;
  late int? iconCodePoint;
  late String? backgroundColorHex;
  late String? iconColorHex;
}
