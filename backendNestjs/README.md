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
Bản chất của Pipe trong NestJS là một cơ chế để xử lý và biến đổi dữ liệu trước khi nó được sử dụng trong các route handler hoặc sau khi nó được trả về từ route handler.
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
bản chất thật sự của interceptors :can thiệp vào luồng xử lý request/response, cho phép bạn thêm logic tùy chỉnh TRƯỚC hoặc SAU khi một request được xử lý bởi route handler

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
bài 13 : tìm hiểu về guard
bản chất : Guard trong NestJS là một cơ chế để bảo vệ các route (đường dẫn) bằng cách kiểm tra các điều kiện cụ thể trước khi cho phép request tiếp tục được xử lý bởi route handler. Guard thường được sử dụng để xác thực (authentication) và phân quyền (authorization), đảm bảo rằng chỉ những request hợp lệ và được phép mới có thể truy cập vào tài nguyên.Hiểu đơn giản là bạn chưa đăng nhập thì không vào được (xác thực) bạn không có quyền với role yếu hơn thì không được truy cập vào( phân quyền)
truy cập vào https://docs.nestjs.com/guards để tìm hiểu về guard
tạo 1 folder guard sau đó taijo auth.guard.ts, sau đó sử dụng trong controller tương tự như pipe vậy ấy , muốn dùng cái nào thì để đó muốn dùng hết thì để global search trong docs binding guard
kết quả
đây là middleware
đây là authguard
Before interceptors...
đây là getAllUser
đây là find all tất cả value
After.. interceptor. 6ms
middleware -> guard-> interceptors -> controller -> interceptors
bài 14: vào dự án chính của nestjs
role : admin,user,moderator
authentication : json web token (tìm hiểu về cấu trúc jwt)
post : thêm sửa xóa ở đây
comment : đi theo bài post
hastag: của bài post
1 user tạo nhiều bài post, mỗi bài post thì có nhiều comment , mối quan hệ ở đây user và post là one to many,post và commnent là one to many
hastag và post là many to many : 1 cái hatag có nhioeeuf bài post , 1 bài post có nhiều cái hatag
bài 15 : tạo 1 file env rồi sau đó import nó vào , vì env liên quan đến database cần bảo mật nên k thể up lên github https://docs.nestjs.com/techniques/database truy cập đọc docs để tìm hiểu về cách tạo env
chú ý cần có ConfigModule.forRoot({
isGlobal: true,
}), để có thể đẩy env lên global mới dùng được
ConfigModule là gì?
ConfigModule là một module trong NestJS giúp quản lý cấu hình ứng dụng, thường được sử dụng để load các biến môi trường từ file .env và truy xuất chúng thông qua ConfigService.
bài 16 : authenication với jwt, khi bạn đăng ký 1 tài khoản thì bạn sẽ nhận được 1 token, sau đó khi nào đăng nhập thì bạn sẽ đính kèm token đó với header, còn username và password sẽ được gửi ở body,
https://docs.nestjs.com/security/authentication

-tạo auth.service.ts sau đó import vào user.module.ts chỗ provider
-search nestjs jwt cài package cài npm install --save @nestjs/jwt coi hướng dẫn sử dụng
-vào file env tạo 1 jwt_secret=demo1
-vào docs đọc chỗ jwt có liên quan đến jwt rồi copy đó vào auth/auth.service.ts
-hiện tại bên entity chỉ có 3 trường là email password và id bây giờ sẽ thêm firstName lastName role, sử dụng enum để tạo role với admin ,user,moderator để mặc định nếu người dùng không điền role thì mặc định là user
-copy cái createuser.dto.ts vào cái registeruser.dto.ts thêm firstName lastName
-ở trong user.service thêm 1 hàm findbyemail sử dụng findoneby({email}) rồi sau đó trong auth.service ịnjected user.service vào thì có thể sử dụng được hết functio ntrong đó
-xử lý các logic trong auth.service.ts kiểm tra email đã được có chưa trogn database bằng các dùng hàm findbyemail nếu chưa thì tiếp tục nếu có rồi thì throw BadGatewayException('Email already exists')
nếu chưa có thì chúng ta sẽ hashpassword và save to db
-search hashpassword nestjs để coi hdsd
-sau đó lưu bằng cách dùng hàm createUserJwt
-sau đó generate jwt token có nghĩa là mã hóa cái combo cần gởi đi và được gửi đến client gồm id firstname lastname role sau đó
-bây giờ làm thêm chức năng login nữa , tạo 1 loginuser.dto.ts chỉ có 2 trường là email password sau đó xử lý code logic nếu login thành công thì return accessToken
kết quả :
{
"msg": "User has been login successfully",
"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDAsImZpcnN0TmFtZSI6ImZpcnN0TmFtZXd3dyBzYXZlMTExMjIyMjIiLCJsYXN0TmFtZSI6Imxhc3ROYW1lIGV3cWV3cWVzYXZlMTExMzMzMzMzIiwicm9sZSI6InVzZXIiLCJwYXNzd29yZCI6IiQyYiQxMCQ4a2tHeTZMUmUxVTFHamViS29KRzllSTAzRlNtMkh1ZTdiSVpqMGs0U01hZ2lVVWw5czRkaSIsImlhdCI6MTczODkxNDA2M30.737Gp6jx3TvPpYPN6SeAU6D9eNj4DQNiVoLS6CdFwO8"
}
tìm hiểu về jwt gồm 3 phần header.payload.signature
bài 17 : xác thực jwt token (phần 2 )
vấn đề : ví dụ đăng nhập vào 1 trang web thì bạn là user thì khi vào trrang khác /profile , thì nó sẽ k biết bạn đã đăng nhập chưa , nên cần duy trì đăng nhập bằng cách lấy jwt token ở trên header về giải ra và kiểm tra xem có đúng không kiểm tra email có không mới cho truy cập được
//1 lấy token từ header ( TÌM HIỂU VỀ CÁC LOẠI CỦA AUTHENICATION)
//2 jwtverify validate toke
//3 tìm user trong database dựa vào jwtverify
//4 lấy user gắn vào request
bài 18: viết decorator lấy thông tin user
ban đầu login rồi lấy được cái token , sau đó vào get trong current-user lúc đó sẽ chạy qua use guard và gắn currentuser vào trong request và sử dụng được ở trong hàm getCurrentUser và sử dụng được req.currentuser đó là cách 1
cách 2 : search nestjs decorated tạo folder decorate sau đó tạo file user.decorator.ts sau đó import vào user.controller.ts @Get('/curent-user')
@UseGuards(AuthGuard)
getCurrentUser(@CurrentUser() currentUser) {

    return currentUser;

} cách này sử dụng thư viện nestjs
bài 19:phân quyền user phần 1 :
mục tiêu:
1./chỉ có role admin mới có thể lấy tất cả getAllUser
2./ bạn đăng nhập tài khoản nào thì chỉ có thể update, hoặc delete tài khoản có id đó thôi và khi update thì chỗ passsword cần phải hash lại những trường cần thay đổi là firstName lastName role password, email thì giữ nguyên
tạo 1 cái là permission.helper.ts có chức năng check để so sánh với currentUser.id và id có trùng nhau khoogn thì mới có thể edit đưcọ
tạo roleguard rồi sau đó truyền yêu cầu phân quyền mình đến @UseGuards(new RoleGuard(['admin','user'])) : ở đây là chỉ cho user và admin được vào để coi DANH SÁCH SHOW ALL thôi
chỗ @UseGuards(new RoleGuard(['admin','user'])) có 2 ý nghĩa . 1 là kiểm tra cấp quyền cho admin và user có thể xem SHOW ALL DANH SÁCH TRONG DATABASE MODERATOR KHÔNG COI ĐƯỢC
2./ còn chuyện thực hiện các tác vụ khác ( update và delete) thì chỉ có admin và tài khoản của mình mới có thể thực hiện được ở trong hàm checkPermission.helper.ts
tạo permission.helper.ts truyền 2 tham số là id và currentUser để kiểm tra có phải user có thể edit được như vậy hoặc nếu có currentUser.role là admin thì có thể update và delete
bài 20: phân quyền user phần 2 :
chỗ thay đổi cái role thì trong update.dto.ts thì chúng ta đang định nghĩa là string nhưng trong entity thì nó lại thuộc enum với admin,user,moderator như vậy 2 bên xung đột vì vậy chúng ta cần chuyển string thành enum
-chú ý cần mã hóa bcrypt.hash để làm hash password mới giải mã được( ví dụ nếu mật khẩu mới là abc nhưng k mã hóa thì nó k giải ra thành ra nó k so sánh mật khẩu login được )
bài 22: tìm hiểu về tư duy thiết kế database - xây dựng mối quan hệ /restful api với nestjs
vấn đề : ở đây có 2 module là user và post, thì 1 user có nhiều bài post nên cần 1 cái khóa ngoài.
mối quan hệ giữa user và post là one to many, user ở đây là one many ở đây là post vì 1 cái user có nhiều bài post
Một sinh viên có thể đăng ký nhiều khóa học, và một khóa học cũng có thể có nhiều sinh viên tham gia.
Một nhân viên có thể tham gia nhiều dự án, và một dự án cũng có thể có nhiều nhân viên.vào trang chủ https://typeorm.io/ để coi có 2 mẫu là photo và user cũng tương tự như vậy
📌 Ghi chú về việc tạo CRUD cho Post và xử lý các logic liên quan

1. Tạo CRUD cho Post
   Trong post.controller.ts, tạo hàm createPost() để xử lý việc tạo bài viết mới.
   Trong post.service.ts, viết hàm createPost() để nhận dữ liệu từ DTO, gán currentUser vào bài viết rồi lưu vào database.
   DTO (Data Transfer Object) dùng để validate dữ liệu đầu vào khi tạo bài viết.
2. Xác định User tạo bài viết
   Trong API tạo bài viết (POST /post), cần biết bài viết này thuộc về ai.
   Sử dụng @CurrentUser() để lấy thông tin User hiện tại từ AuthGuard và truyền vào createPost().
   Khi lưu vào database, gán user: currentUser cho bài viết.
3. Cấu trúc app.module.ts và post.module.ts
   Trong app.module.ts, chỉ cần import PostModule, không cần đăng ký PostController và PostService vì PostModule đã quản lý chúng.

typescript
Sao chép
Chỉnh sửa
imports: [
UserModule,
PostModule, // Đã import PostModule nên không cần đăng ký PostController và PostService riêng lẻ
]
Trong post.module.ts, cần export PostService nếu module khác cần sử dụng nó.

typescript
Sao chép
Chỉnh sửa
@Module({
imports: [TypeOrmModule.forFeature([Post, User])],
providers: [PostService],
controllers: [PostController],
exports: [PostService], // Export nếu cần dùng ở module khác
}) 4. Xử lý dữ liệu trả về bằng @Transform
Trong post.entity.ts, bài viết có quan hệ ManyToOne với User, nhưng không muốn trả về toàn bộ thông tin User mà chỉ cần id và email.

Dùng @Transform để thay đổi cách dữ liệu được trả về:

typescript
Sao chép
Chỉnh sửa
@ManyToOne(() => User, (user) => user.posts)
@Transform(({ obj }) => obj.user ? { id: obj.user.id, email: obj.user.email } : null)
user: User;
bài 24: CRUD Post phần 2 :
🚀 Xây dựng CRUD cho bài Post - Phần 2
Trong bài này, chúng ta sẽ tiếp tục hoàn thiện CRUD cho bài Post với các yêu cầu sau:

1️⃣ Create (C) - Tạo bài Post
Người dùng có thể tạo một bài viết mới.
Khi tạo bài viết, hệ thống sẽ tự động gán người tạo (user) vào post.
Chỉ người dùng đã đăng nhập mới có thể tạo bài post.
2️⃣ Read (R) - Lấy danh sách bài viết
Xem tất cả bài post:

Bất kỳ ai cũng có thể xem danh sách bài post, không cần đăng nhập.
Để thực hiện, ta tạo hàm getAllPosts() trong post.service.ts, sử dụng:
ts
Sao chép
Chỉnh sửa
return this.postRepository.find();
Sau đó, khai báo phương thức @Get trong post.controller.ts để gọi API.
Lấy chi tiết một bài post:

Người dùng có thể xem chi tiết một bài viết theo id.
Khi lấy dữ liệu bài post, cần đính kèm thông tin userId, nhưng không cần trả về toàn bộ thông tin user.
3️⃣ Update (U) - Cập nhật bài viết
Chỉ admin hoặc chính chủ bài viết mới có quyền chỉnh sửa.
Khi cập nhật bài post, hệ thống sẽ kiểm tra quyền hạn của người dùng bằng checkPermission().
Nếu không có quyền, hệ thống sẽ từ chối cập nhật.
4️⃣ Delete (D) - Xóa bài viết
Chỉ admin hoặc chính chủ mới có thể xóa post.
Khi xóa thành công, API sẽ trả về thông báo:
json
Sao chép
Chỉnh sửa
{
"message": "Xóa bài post thành công",
"postId": 42
}
Nếu không tìm thấy bài viết, trả về lỗi 404 Not Found.
🛠 Tóm tắt quy tắc CRUD
Chức năng Quyền truy cập
Tạo bài post Chỉ người dùng đã đăng nhập
Xem danh sách bài post Ai cũng có thể xem (không cần đăng nhập)
Xem chi tiết bài post Ai cũng có thể xem
Cập nhật bài post Chỉ admin hoặc chủ bài viết
Xóa bài post Chỉ admin hoặc chủ bài viết
✅ Kết luận
Với các quy tắc trên, hệ thống vừa đảm bảo tính bảo mật, vừa giúp người dùng dễ dàng truy cập thông tin mà không cần đăng nhập. Bây giờ, chúng ta có thể bắt tay vào code để hoàn thiện các chức năng CRUD cho bài Post! 🚀

tạo module commnet có chức năng như sau , mỗi user có nhiều bài post mỗi bài post có nhiều comment thì mối quan hệ trong entity là one to many
Đúng rồi! Mối quan hệ trong entity sẽ như sau:

Tóm lại cả hai chiều:
User - Post:

Một User có nhiều Post (One-to-Many).

Một Post chỉ có một User (Many-to-One).

Post - Comment:

Một Post có nhiều Comment (One-to-Many).

Một Comment chỉ thuộc về một Post (Many-to-One).

User - Comment:

Một User có thể viết nhiều Comment (One-to-Many).

Một Comment chỉ có một User viết (Many-to-One).

Như vậy, mỗi quan hệ One-to-Many luôn có chiều ngược lại là Many-to-One. 🚀
