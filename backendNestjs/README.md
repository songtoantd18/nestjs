bài 2 : Nestjs
Nguyên tắc solid

S : single responsibility principle (mỗi class là chỉ làm 1 nhiệm vụ không gộp lại nhiều những nhiệm vụ)
O : open-closed principle
L : Liskov substitution principle
I : Interface segregation principle  
 D : Dependency inversion principle

mvc sử lý theo mô hình MVC
controller -> service -> repository
trong đó
controller có chức năng response data
service : xử lý các logic handle business logic thêm sửa xóa delete crud cơ bản
respository : xử lý các logic handle database(mongodb,mysql)
bài 4 : cách dùng dependency injection trong nestjs
tạo file test.service.ts
tạo file test.controller.ts
sau đó import vào trong app.module.ts
https://www.youtube.com/watch?v=xsFwnkXi5Sk&list=PLVgsp50vDuy04BuF6jU5FcXZt2mUoMVoK&index=4
bài 5 : cách tạo module trong nestjs
sử dụng lệnh sau
npx nest g controller user (nếu muốn tạo 1 controller của user)
npx nest g service user (nếu muốn tạo 1 service của user)

nó sẽ tự động connect lại và thêm injectedtable vào với file app.module.ts và tự động thêm vào controller,provider, service ... chúng ta chỉ cần vào đó và chỉnh code logic theo nhu cầu thôi
bài 6: tích hợp database(mysql) với nestjs bằng typeorm
file user.entity.ts có chức năng tạo table user định nghĩa các trường và dạng của các trường number hay string hay email password
không cần nhớ code chi hết vào trong docs https://docs.nestjs.com/techniques/database rồi coi cách vận hành và tải npm install --save @nestjs/typeorm typeorm mysql2
TypeOrmModule.forRoot({
type: 'mysql',
host: 'localhost',
port: 3306,
username: 'root',
password: '123123',
database: 'posts',
entities: [User],
synchronize: true,
}),
chú ý cái này cái database pots là có thể chuyển đổi được còn lại dữ nguyên
