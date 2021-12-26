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



```
 Project setup :
    
    npm install

For runing normal :
    
    npm run start

For runing with hot reload : 
    
    npm run dev
```