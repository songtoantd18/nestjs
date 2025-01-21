cái này được tạo ra để note lại những thứ cần thiết cho bài học và quan trọng nhất là hiểu được vấn đề cốt lõi của Nestjs và không sử dụng chatgpt

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
bài 7 : tạo 1 cái crud để có thể thao tác với typeorm làm việc với database
nếu bạn muốn sử dụng typeorm cho folder user, bạn tạo user.entity.ts sau đó import vào trong user.module.ts
imports: [TypeOrmModule.forFeature([User])],
user.service.ts cần tiêm 1 repository (user enity) vào để dùng ( có phải service là nơi xử lý các logic đúng không, bây giờ lưu ở đâu, lưu ở mysql mà mysql thì chính là user.entity.ts đó nên tiêm cái User entity đó vào là ok )
https://docs.nestjs.com/techniques/database và đây đọc chỗ users.service.ts để hiểu cách tiêm injected user entity vào dùng
logic như thế này khi người ta vào create thì controller sẽ nhận và sẽ nhận được 1 function createUser và thầy rằng userservice đã được injected vào và trong userservice thì có creaetuser() và có injected là của bên databse nên được return this.usersRepository.save(requestBody); là thao tác với databse đó
kiểm tra lại các file import module chưa vì nếu khoongg sẽ bị lỗi thiếu
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
//add comment in the line above
@Module({
imports: [
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
UserModule,
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
chỗ này chú ý nhé vì nếu k import đúng thì sẽ sai nếu ví dụ sau này chúng ta làm việc với 1 module demo databse demo thì ta thêm vào nhưu thế này
@Module({
imports: [
TypeOrmModule.forRoot({
name: 'postsConnection', // Tên kết nối cho database 'posts'
type: 'mysql',
host: 'localhost',
port: 3306,
username: 'root',
password: '123123',
database: 'posts', // Cơ sở dữ liệu 'posts'
entities: [User],
synchronize: true,
}),
TypeOrmModule.forRoot({
name: 'demoDatabaseConnection', // Tên kết nối cho database 'demoDatabase'
type: 'mysql',
host: 'localhost',
port: 3306,
username: 'root',
password: '123123',
database: 'demoDatabase', // Cơ sở dữ liệu 'demoDatabase'
entities: [Demo],
synchronize: true,
}),
UserModule,
DemoModule,
],
controllers: [AppController],
providers: [AppService],
})
export class AppModule {}
bài 8 : thêm 1 số chức năng như show detail, show all, delete, update, create của crud
findAll là show all
findOne là show detail nếu có thì showdetail nếu không có thì thông báo throw new NotFoundException('Not Found')
update : nếu có thì update luôn nếu không có thì thông báo throw new NotFoundException('User does not exist')
chú ý chỗ update trong database mysql có 2 cách
1./ nếu sử dụng return this.usersRepository.update(id, requestBody); thí nó sẽ update trong database không có sai gì hết nhưng nó sẽ trả về {
"generatedMaps": [],
"raw": [],
"affected": 1
} vậy muốn nó trả về dữ liệu mới thì dùng cách sau
2./ updateById(id,requestBody) trước như bình thường nhưng sau đó return thì phải có return this.usersRepository.findOneBy({ id }); nó mới show ra trong postman
{
"id": 1,
"email": "st1111@gmail.com",
"password": "12222222222"
} như vậy mới đúng
delete là delete
tùy vào mỗi chức năng có thể có tham số thêm như id, hay sao tùy vào cách mình cài đặt cái này thì có thể tìm hiểu theo tùy vào
