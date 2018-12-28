var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var express = require("express");
var mysql = require('mysql');

var conn = mysql.createConnection({
    database: 'cafe',
    host: "localhost",
    user: "root",
    password: "yourPassword",
    insecureAuth : true
  });

  
conn.connect(function(err) {
    if (err) throw err;
    console.log("Соединение прошло успешно");
  });


  app.use(express.static(__dirname));

  app.get('/', function(req,res) {
       res.sendFile(__dirname+'/cafe.html');
  });

  
//глобальная переменная для количества отображаемых полей
app.set("showFields1", 10);
app.set("showFields2", 10);
app.set("showFields3", 10);



  io.on('connection', function(socket){


  // socket.on('filter1',function(info) {
  //   console.log(`SELECT * FROM storage WHERE ${info.param}='${info.value}'`);
  //        conn.query(`SELECT * FROM storage WHERE ${info.param}='${info.value}'`, function(err, result) {
  //              if(err) console.log("Ошибка в первом фильтре");
               
  //              var sendArray = [];
  //              for(var i=0; i<result.length;i++)
  //              sendArray.push(result[i].productDescribe.toString());
  //             //  app.set('showFields1', info.showFields);
             
                
  //             socket.emit('updateInfo1',result,sendArray,true,1);
  //        });
  // });


  socket.on('fieldsCount', function(param,sqlQuery=""){
    conn.query(`SELECT COUNT(*) FROM ${param} ${sqlQuery}`,function(err,results) {
      if(err)
      console.log("Вышла ошибочка при получении выборки!");

    socket.emit('getFieldsCount',results,param);
    });
  }); 
 

    
    socket.on('addInfo1', function(info) {
       conn.query(`INSERT INTO storage VALUES("${info.name}","${info.number}","${info.type}",
        "${info.date}","${info.producer}","${info.importer}","${info.storagePlace}","${info.price}","${info.weight}",
        "${info.describe}");`, function(err,results){
            if(err) console.log(err.message);
            
            var sendArray = [];
            sendArray.push(info.describe);

            updateInfo1();

            


      
   });//конец запроса
        });//конец запроса
    

 
        socket.on('forPages', function(info,param,myQuery=""){
          var sqlQuery = `${myQuery}`;        
         switch(param){
           //склад 
   
         case 'storage':
        conn.query(`SELECT * FROM storage ${myQuery} limit ${(info.pageNumber-1)*info.showFields},${info.showFields}`,function(err,results){
            if(err) console.log("Ошибка при обновлении страниц");
            

          var sendArray = [];
        for(var i=0; i<results.length;i++)
        sendArray.push(results[i].productDescribe.toString());
        app.set('showFields1', info.showFields);
      
         
       socket.emit('updateInfo1',results,sendArray,true,info.pageNumber,sqlQuery);

          });

          
           break;
       //блюда
        case 'dish': 
          conn.query(`SELECT * FROM dish ${myQuery} limit ${(info.pageNumber-1)*info.showFields},${info.showFields}`,function(err,results){
            if(err) console.log("Ошибка при обновлении страниц");

                  var sendArray = [];
            
     
        for(var i=0; i<results.length;i++)
        sendArray.push(results[i].dishRecipe.toString());
         
        app.set('showFields2', info.showFields);

       socket.emit('updateInfo2',results,sendArray,true,info.pageNumber,sqlQuery);

          });
  
  
          break;



          case 'clientOrder': 
          conn.query(`SELECT * FROM  clientOrder ${myQuery} limit ${(info.pageNumber-1)*info.showFields},${info.showFields}`,function(err,results){
            if(err) console.log("Ошибка при обновлении страниц");

         console.log("Это здесь"+sqlQuery);
        app.set('showFields3', info.showFields);

       socket.emit('updateInfo3',results,true,info.pageNumber,sqlQuery);

          });
  
  
          break;
        }

        });//конец запроса для страниц


function updateInfo1(firstElement = 0){
     

  
    conn.query(`SELECT * FROM storage limit ${firstElement},${app.get('showFields1')}`,function(err,results) {
        if(results.length == 0)
        console.log("Вышла ошибочка при получении выборки!");

        var sendArray = [];
       for(var i=0; i<results.length;i++)
       sendArray.push(results[i].productDescribe.toString());
     

       socket.broadcast.emit('updateInfo1',results,sendArray,true);
      socket.emit('updateInfo1',results,sendArray,true);
      

     

      
   });//конец запроса
  
}//конец update

updateInfo1();




   socket.on('changeProduct',function(info){

    conn.query(` UPDATE storage set productName ='${info.name}'
   , productNumber= '${info.number}',productType = '${info.type}', productDate = '${info.storageTime}',
   productProducer = '${info.producer}',productImporter = '${info.importer}',productStoragePlace = '${info.storagePlace}',
   productPrice = '${info.price}',productWeight = '${info.weight}',productDescribe = '${info.describe}'
   WHERE productName='${info.previousName}'`,function(err,info){
     if(err) console.log("Ошибка при изменении в складе");
     
     updateInfo1();
    });



 
  });//конец delete




  socket.on('deleteProduct',function(info){
    conn.query(`DELETE FROM storage WHERE productName='${info}'`,function(err,info){
     if(err) console.log("Возникла ошибка при удалении в складе");
     
     updateInfo1();
    });
 
  });//конец delete





//второе окно

   socket.on('addInfo2', function(info) {

    
    conn.query(`INSERT INTO dish VALUES("${info.name}","${info.category}","${info.time}",
     "${info.price}","${info.selfprice}","${info.weight}","${info.exist}","${info.recipe}");`, function(err,results){
        if(err) console.log(err.message);
      
         
     

     var sendArray = [];
   
        
    sendArray.push(info.recipe);
   

   socket.emit('updateInfo2',[{dishName:info.name, dishCategory: info.category,
    dishTime: info.time, dishPrice: info.price, dishSelfprice: info.selfprice,
    dishWeight: info.weight, dishExist:info.exist

   }],sendArray);
   
   socket.broadcast.emit('updateInfo2',[{dishName:info.name, dishCategory: info.category,
    dishTime: info.time, dishPrice: info.price, dishSelfprice: info.selfprice,
    dishWeight: info.weight, dishExist:info.exist

   }],sendArray);

  
});
   
});//конец запроса
     

 

function updateInfo2(firstElement = 0) {

 conn.query(`SELECT * FROM dish limit ${firstElement},${app.get('showFields2')}`,function(err,results) {
     if(results.length == 0)
     console.log("Вышла ошибочка при получении выборки!");

     var sendArray = [];
    for(var i=0; i<results.length;i++)
    sendArray.push(results[i].dishRecipe.toString());

    socket.broadcast.emit('updateInfo2',results,sendArray,true);
   socket.emit('updateInfo2',results,sendArray,true);
   
 
 });

}

updateInfo2();
  



    socket.on('changeDish',function(info){
       console.log(info);
    
    conn.query(` UPDATE dish set dishName ='${info.name}'
   , dishCategory= '${info.category}',dishTime = '${info.time}', dishPrice = '${info.price}',
   dishSelfprice = '${info.selfprice}',dishWeight = '${info.weight}',dishExist = '${info.exist}',
   dishRecipe = '${info.recipe}' WHERE dishName='${info.previousName}'`,function(err,info){
     if(err) console.log("Ошибка при изменении в блюдах");
     
     updateInfo2();
    });



 
  });//конец change




  socket.on('deleteDish',function(info){
    conn.query(`DELETE FROM dish WHERE dishName='${info}'`,function(err,info){
     if(err) console.log("Возникла ошибка при удалении в блюдах");
     
     updateInfo2();
    });
 
  });//конец delete







//третье окно

socket.on('addInfo3', function(info) {

  return new Promise(function(resolve, reject){
    console.log(`INSERT INTO clientOrder VALUES("${info.id}","${info.price}","${info.time}",
    "${info.date}","${info.payment}");`);
    conn.query(`INSERT INTO clientOrder VALUES(TRIM("${info.id}"),"${info.price}","${info.time}",
     "${info.date}","${info.payment}");`, function(err,results){
       
        if(err) console.log(err.message);
      
         
//     socket.broadcast.emit('updateInfo3',[{orderId: info.id, orderPrice: info.price,orderTime:info.time,
//             orderDate:info.date, paymentStatus: info.payment}]);

//    socket.emit('updateInfo3',[{orderId: info.id, orderPrice: info.price,orderTime:info.time,
// orderDate:info.date, paymentStatus: info.payment}]);
   
  var resultArray = [info.dishList, info];

  resolve(resultArray);

   
});//конец запроса

    
})//конец промиса;

   .then(function(resultArray){
  
     let [dishList, info] = resultArray;
  

   var resultQuery = "INSERT INTO dishList VALUES";

   return new Promise(function(resolve,reject) {

    for(let i=0; i< dishList.length; i++){

     

     var currentString = dishList[i].split('-');
     if(currentString.length==3){
     var theWord = [];
      theWord.push(currentString[0]);
      theWord.push(currentString[1]);
      resultQuery+=  `("${theWord.join("-")}","${currentString[2]}","${info.id}"),`;
      continue;
    }


      resultQuery+= `("${currentString[0]}","${currentString[1]}","${info.id}"),`;
    
    }

    resultQuery = resultQuery.slice(0,-1);
    console.log(resultQuery);


    conn.query(resultQuery, function(err,results){
       if(err) console.log(err.message);

       
     
        
   socket.broadcast.emit('updateInfo3',[{orderId: info.id, orderPrice: info.price,orderTime:info.time,
           orderDate:info.date, paymentStatus: info.payment}]);

  socket.emit('updateInfo3',[{orderId: info.id, orderPrice: info.price,orderTime:info.time,
orderDate:info.date, paymentStatus: info.payment}]);
  


  
});//конец запроса
resolve();
});//конец промиса

   })
   .catch(function(err) {
    console.log("Ошибочка в промисе");
   });


     });
  


 socket.on('deleteOrder',function(info){

    Promise.resolve()
    .then(function(){
      return new Promise(function(resolve, reject) {

     
      conn.query(`DELETE FROM clientOrder WHERE orderId='${info}'`,function(err,result){
        if(err) console.log("Возникла ошибка при удалении в блюдах");
        
        resolve(info);
        updateInfo3();
       });
      })//конец промиса; 


    })
    
    .then(function(info) {
      return new Promise(function(resolve, reject) {

        conn.query(`DELETE FROM dishList WHERE orderId='${info}'`,function(err,result){
          if(err) console.log("Возникла ошибка при удалении в блюдах");
          resolve();
        
         });
        })
    })
 
    .catch(function(err){
        console.log("Ошибочка в промисе :" +  err.message);
    });

   
 
 
  });



  socket.on('changeOrder',function(info){
  
 conn.query(` UPDATE clientOrder SET orderPrice ='${info.price}'
, orderTime= '${info.time}',orderDate = '${info.date}', paymentStatus = '${info.payment}'
 WHERE orderId='${info.id}'`,function(err,info){
  if(err) console.log("Ошибка при изменении в заказах");
  
  updateInfo3();
 });
});
//-------------------------------------------------------------------------


   

   function updateInfo3(firstElement = 0) {

    conn.query(`SELECT * FROM clientOrder  limit ${firstElement},${app.get('showFields3')} `,function(err,results) {
        if(results.length == 0)
        console.log("Вышла ошибочка при получении выборки!");
   
   
       socket.broadcast.emit('updateInfo3',results,true);
      socket.emit('updateInfo3',results,true);
      
    
    });
   
   }
   
   updateInfo3();

// ------------------------------------------------------------------------



socket.on('dishListQuery', function(idArray) {

  var resultQuery = `SELECT dl.dishName, dl.dishNumber, dl.orderId  FROM clientOrder as co natural join dishList as dl where `;
  
  
  for(let i=0; i<idArray.length; i++){
     if(i==0){
      resultQuery+=`co.orderId="${idArray[i]}"`;
      continue;
    }
    resultQuery+=`or co.orderId="${idArray[i]}"`;
}
  

if(idArray.length == 0)
resultQuery = `SELECT dl.dishName, dl.dishNumber, dl.orderId  FROM clientOrder as co natural join dishList as dl`;


 
  conn.query (resultQuery,function(err, result){
  if(err) console.log("Ошибка при получении списка блюд");

  if(result.length != 0) {
    
  var dishesStrings = [];
  var defaultValue = "";

  
  function SendObject(id, name, number) {
       this.id = id;
       this.theText = `${name} (${number})`;
       
  }

  SendObject.prototype.addText = function(name,number) {
        this.theText+=` ${name} (${number})`;
  };


dishesStrings.push(new SendObject(result[0].orderId,result[0].dishName,result[0].dishNumber));
 
for(let i=1; i< result.length; i++)
{
   
    var isEqualObj = false;
    for(let j=0; j< dishesStrings.length; j++){
    if(result[i].orderId == dishesStrings[j].id){
    dishesStrings[j].addText(result[i].dishName,result[i].dishNumber);
    isEqualObj = true;
    break;
    }
    
  }
   
  if(!isEqualObj)
  dishesStrings.push(new SendObject(result[i].orderId,result[i].dishName,result[i].dishNumber));

}

      socket.emit('getDishesSet', dishesStrings);
  }
});

});



});//конец io

http.listen(3000,function(){
    console.log("Соединено успешно!");
});

