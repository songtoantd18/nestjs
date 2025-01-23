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
cần chú ý phân biệt 2 khái niệm là param và query
param là được truyền vào url như https://library.com/book/bookname thường la sau 1 dấu /
query là được truyền vào url như https://library.com/book?author=surbhi&category=action query thường là sau 1 dấu ? có thêm 1 cặp key value trong 1 url có thể có nhiều query như ở trên chúng kết nối với nhau bằng dấu & ở trên ta có thể thấy 2 cặp key value là authod=surbhi & category=action
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
bài 9 : tìm hiểu về pipe:
có 2 chức năng chính là
1./transform : chuyển đồi kiểu dữ liệu, ví dụ từ 5 là string sang 5 là number tùy thuộc vào yêu cầu
2./ validation : kiểm tra ví dụ trường đó là email thì phải chứa @,ví dụ số điện thoại,password thì phải có từ ký tự và số có ít nhất 8 ký tự và số có ít nhất 1 số và chỉ có chữ thường ,đại loại là vậy
nếu muốn biết hãy thử chỗ
@Get('/:id')
getUserById(@Param('id', ParseIntPipe) id: number) và dùng postman để kiểm tra http://localhost:3000/user/2xxxxxxxxxxxxx nếu có ParseIntPipe thì sẽ trả về
{
"message": "Validation failed (numeric string is expected)",
"error": "Bad Request",
"statusCode": 400
}
nếu không có ParseIntPipe thì sẽ trả về
{
"id": 2,
"email": "s22321312t123n@gmai.com",
"password": "1222222"
} như vậy nó đâu có đúng
cái parseintpipe chỉ kiểm soát đưcọ đầu vào chỗ id thôi
bây giờ chúng ta đang muốn kiểm soát chỗ put chỉnh sửa update lại data thì truyền vào requestbody:any mà trong đó thì làm sao kiểm soát thì tạo file dto createuser.dto.ts đặt điều kiện muốn dạng gì có required không. trong typescript thì nên tránh kiểu dữ liệu là any
sử dụng validationpipe để có thể áp dụng ở toàn bộ code bằng cách app.useGlobalPipes(....) ví dụ hiện tại bạn đang làm việc với module user thì bạn để global ok nhưng sau này có nhiều module ví dụ animal thì bạn phải để yêu cầu validation ở chỗ user controller chứ không được ở để ở tổng
@Controller('userdemo')
@UsePipes(new ValidationPipe()) // Áp dụng ValidationPipe cho toàn bộ controller
bài 10: tìm hiểu về serialize :
chức năng ví dụ bạn có 5 trường id , username,role,email,password bạn không muốn khi sử dụng get request nó show cái password , bạn muốn ẩn thì sử dụng cái serialize này ẩn trường muốn ẩn
tạo file updateUsser.dto.ts có chức năng lọc điều kiện của update, tại sao lại có thêm file updateUsser.dto.ts trong khi lại giống createuser.dto.ts vì hiện tại là giống nhau nhưng sau này code mở rộng ra thì có thể chỉnh sửa cho dễ create thì cho function create còn update thì cho function update
vào trong https://docs.nestjs.com/techniques/serialization thêm @Exclude() vào cái biến nào mà bạn muốn ẩn, sau đó thêm @UseInterceptors(ClassSerializerInterceptor) vào chỗ controller nếu trong controller có nhiều function thì trong đó nếu bạn muốn ẩn trường đó trong cái nào thì thêm @UseInterceptors(ClassSerializerInterceptor) vào chỗ function đó

đây là kết quả update
{
"id": 2,
"email": "s22321312t123n@gmai.com"
}
bạn có thể thấy là k thấy password đâu

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe()) nếu bạn để ở vị trí cao hơn(global) thì sẽ ap dụng cho toàn bộ
[
{
"id": 2,
"email": "s22321312t123n@gmai.com"
},
{
"id": 3,
"email": "st122222cccc2222222211"
},
{
"id": 4,
"email": "s2232131zzzzzzzzzz2t123n@gmai.com"
},
{
"id": 5,
"email": "s2232131zzzzzzzzzz2t123ngmai.com"
}
]
[
{
"id": 2,
"email": "s22321312t123n@gmai.com",
"password": "12222222222"
},
{
"id": 3,
"email": "st122222cccc2222222211",
"password": "12222222222"
},
{
"id": 4,
"email": "s2232131zzzzzzzzzz2t123n@gmai.com",
"password": "1222222"
},
{
"id": 5,
"email": "s2232131zzzzzzzzzz2t123ngmai.com",
"password": "1222222"
}
]
khác nhau hoàn toàn
bài 11 : tìm hiểu về interceptors
chức năng nó giống như 1 middleware nhưng xử lý trước và sau middleware theo thứ tự.Trong bài này chỉ tạo và log nó ra thôi chứ chưa thấy gì mới nhé :
tạo 1 file tên logging.interceptor.ts copy trong docs ra sau đó thêm console.log vào để có thể biết được thứ tự là chúng ta sẽ hiểu
cái đoạn @UseInterceptors(ClassSerializerInterceptor) cái ClassSerializerInterceptor cũng là 1 interceptor đó nhưng là của hệ thống định nghĩa mình chỉ lấy ra để dùng mà thôi bây giờ mình đang tạo ra tên là LoggingInterceptor nên sử dụng trong controller như bth
sử dụng get với http://localhost:3000/user sẽ log ra kết quả
Before...
đây là getAllUser
đây là find all tất cả value
After... 5ms

qui trình chạy ban đầu sẽ vào loggin interceptor sau đó log before trước sau đó vào function getAlluser trong controller và sau đó vào service lấy find all cuối cùng là vào after cái đây nó vừa mở và cũng đóng

https://docs.nestjs.com/interceptors
bài 12 : tìm hiểu về middleware
tương tự vào https://docs.nestjs.com/middleware tìm hiểu
qui trình là client side ->middleware-> router handler -> controller handler
lưu ý là phải có hàm next() để có thể chuyển qua hàm tiếp theo nếu không sẽ treo máy
tạo file logger.middleware.ts trong folder middleware sau đó improt vào app.module.ts
export class UserModule implements NestModule {
configure(consumer: MiddlewareConsumer) {
consumer.apply(LoggerMiddleware).forRoutes(UserController);
}
} chỗ này forrouter bạn muốn áp dụng middleware cho cái nào thì bỏ controller của cái đó vào vì có nhiều module muốn áp dụng moduel controller cái nào thì bỏ vào muốn toàn bộ thì '\*' là ok
đây là middleware
Before...
đây là getAllUser
đây là find all tất cả value
After... 5ms
theo thứ tự là middleware->interceptors -> controller -> interceptors
