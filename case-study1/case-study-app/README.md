# nodejs-skelton

### NOTLAR :

Ödevde root'lara göre yaptığım bazı işlemlerin açıklaması ;<br>
1- root --> vehicle : <br>
- update işlemi, vehicle_plate alanına göre diğer bütün alanlar set edilmiştir.<br>
- delete işlemi, vehicle_plate alanına göre yapılmıştır.

2- root -> device :<br>
- get işlemi, sorguda join kullanılarak araç plakaları da getirilmiştir.<br>
- update işlemi, vehicle_id ye göre diğer alanların hepsi set edilmiştir<br>
- delete işlemi, id ye göre yapılmıştır.<br>

3- root -> device_type:<br>
- delete işlemi, id ye göre yapılmıştır.

4- Swagger modülü için :<br>
 app.js 'te  ; <br>
 const swagger = require('./app/libs/swagger/autogen'); <br>
 Satırı açıldığnda aşağıdaki hata ile uygulama kırılmıştır,<br>
 err :Router.use() requires a middleware function but got a undefined <br>
 bu satır ,<br>
 const swagger = require('./app/libs/swagger/swagger');<br>
 şeklinde değiştirilince hata düzelmiş ama,<br>
 http://localhost:3000/docs/<br>
 istek atılınca ana sayfada "No operations defined in spec!" şeklinde uyarı alınmıştır. Spefikasyonlar için yapılması gerekenler araştırılmaktadır.
 <br><br>


```
 Project setup :
    
    npm install

For runing normal :
    
    npm run start

For runing with hot reload : 
    
    npm run dev
```