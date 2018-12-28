
var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);

    var el = document.querySelectorAll('.tabs');
    var instance2 = M.Tabs.init(el);


    var modalWindow1 = document.querySelector('#modal1');
    var modal1 = M.Modal.init(modalWindow1);


    var modalWindow2 = document.querySelector('#modal2');
    var modal2 = M.Modal.init(modalWindow2);

    var modalWindow3 = document.querySelector('#modal3');
    var modal3 = M.Modal.init(modalWindow3);

    
    var secondModalWindow = document.querySelector('#secondModal1');
    var secondModal1 = M.Modal.init(secondModalWindow);

     var secondModalWindow = document.querySelector('#secondModal2');
    var secondModal2 = M.Modal.init(secondModalWindow);

     var secondModalWindow = document.querySelector('#secondModal3');
    var secondModal3 = M.Modal.init(secondModalWindow);
    
    
    var elems777 = document.querySelectorAll('.tooltipped');
    var tooltips = M.Tooltip.init(elems777);


 
     var socket = io("http://localhost:3000");
  
     
   

  

     //окна с продуктами
     var productName = document.querySelector('#productName');
     var productWeight = document.querySelector('#productWeight');
     var productNumber = document.querySelector('#productNumber');
     var productType = document.querySelector('#productType');
     var productDate = document.querySelector('#productDate');
     var productProducer = document.querySelector('#productProducer');
     var productImporter = document.querySelector('#productImporter');
     var productStoragePlace = document.querySelector('#productStoragePlace');
     var productPrice = document.querySelector('#productPrice');
     var productDescribe = document.querySelector('#productDescribe');
    


      //блюда
     var dishesName = document.querySelector('#dishesName');
     var dishesCategory = document.querySelector('#dishesCategory');
     var dishesTime = document.querySelector('#dishesTime');
     var dishesRecipe = document.querySelector('#dishesRecipe');
     var dishesPrice = document.querySelector('#dishesPrice');
     var dishesSelfprice = document.querySelector('#dishesSelfprice');
     var dishesWeight = document.querySelector('#dishesWeight');
     var dishesExist = document.querySelector('#dishesExist');

      //кнопки добавления продуктов
     var myButton1 = document.querySelector('#myButton1');
     var myButton2 = document.querySelector('#myButton2');
     var myButton3 = document.querySelector('#myButton3');

     //таблицы
     var storageTable1 = document.querySelector('#storageTable1');
     var storageTable2 = document.querySelector('#storageTable2');
     var storageTable3 = document.querySelector('#storageTable3');

     var orderId = document.querySelector('#orderId');
     var orderTime = document.querySelector('#orderTime');
     var orderDate = document.querySelector('#orderDate');
     var orderPrice = document.querySelector('#orderPrice');
     var paymentStatus = document.querySelector('#paymentStatus');
     var orderDishes = document.querySelector('#orderDishes');




//переменные вторых модальных окон склада

      var storageProduct  = document.querySelector('#storageProduct');
      var infoProductName = document.querySelector('#infoProductName');
      var infoProductDescribe = document.querySelector('#infoProductDescribe');
      var infoProductNumber = document.querySelector('#infoProductNumber');
      var infoProductType = document.querySelector('#infoProductType');
      var infoProductStorageTime = document.querySelector('#infoProductStorageTime');
      var infoProductProducer = document.querySelector('#infoProductProducer');
      var infoProductImporter = document.querySelector('#infoProductImporter');
      var infoProductStoragePlace = document.querySelector('#infoProductStoragePlace');
      var infoProductPrice = document.querySelector('#infoProductPrice');
      var infoProductWeight = document.querySelector('#infoProductWeight');


      var buttonChange1 = document.querySelector('#buttonChange1');
      var buttonDelete1 = document.querySelector('#buttonDelete1');
 

//переменные вторых модальных окон блюд
       var infoDishName = document.querySelector('#infoDishName');
       var infoDishCategory = document.querySelector('#infoDishCategory');
       var infoDishTime = document.querySelector('#infoDishTime');
       var infoDishPrice = document.querySelector('#infoDishPrice');
       var infoDishSelfprice = document.querySelector('#infoDishSelfprice');
       var infoDishWeight = document.querySelector('#infoDishWeight');
       var infoDishExist = document.querySelector('#infoDishExist');
       var infoDishRecipe = document.querySelector('#infoDishRecipe');
 
       var buttonChange2 = document.querySelector('#buttonChange2');
      var buttonDelete2 = document.querySelector('#buttonDelete2');





      var buttonChange2 = document.querySelector('#buttonChange3');
      var buttonDelete2 = document.querySelector('#buttonDelete3');

//переменные вторых модальных окон заказов
 var infoOrderId = document.querySelector('#infoOrderId');
 var infoOrderTime = document.querySelector('#infoOrderTime');
 var infoOrderDate = document.querySelector('#infoOrderDate');
 var infoOrderPrice = document.querySelector('#infoOrderPrice');
 var infoOrderPaymentStatus = document.querySelector('#infoOrderPaymentStatus');
 var infoOrderDishesList = document.querySelector('#infoOrderDishesList');



//предыдущие значения для названий 
 var previousDishName = "";
 var previousProductName = "";

 var showFields1 = document.querySelector('#showFields');//количество отображаемых элементов
 var showFields2 = document.querySelector('#showFields2');
 var showFields3 = document.querySelector('#showFields3');

 //стрелочки в страницах
 var left1 = document.querySelector('#left1');
 var right1 = document.querySelector('#left1');



//фильтры
 var filterParam1 = document.querySelector('#filterParam1');
 var filterValue1 = document.querySelector('#filterValue1');
 var filterButton1 = document.querySelector('#filterButton1');


 var filterParam2 = document.querySelector('#filterParam2');
 var filterValue2 = document.querySelector('#filterValue2');
 var filterButton2 = document.querySelector('#filterButton2');


 var filterParam3 = document.querySelector('#filterParam3');
 var filterValue3 = document.querySelector('#filterValue3');
 var filterButton3 = document.querySelector('#filterButton3');



//поиск
var searchParam1 = document.querySelector('#searchParam1');
var searchValue1 = document.querySelector('#searchValue1');
var searchButton1 = document.querySelector('#searchButton1');

var searchParam2 = document.querySelector('#searchParam2');
var searchValue2 = document.querySelector('#searchValue2');
var searchButton2 = document.querySelector('#searchButton2');

var searchParam3 = document.querySelector('#searchParam3');
var searchValue3 = document.querySelector('#searchValue3');
var searchButton3 = document.querySelector('#searchButton3');

 //поехали!!! -------------------------------------------------------------------------------------------

 function filterEvent(table,showField,filterParam,filterValue){
  if(filterParam.value!=""&&filterValue.value!=""){
    socket.emit('forPages',{pageNumber: 1,showFields: showField.value},table,`WHERE TRIM(${filterParam.value})='${filterValue.value}'`);
    }
    else 
    socket.emit('forPages',{pageNumber: 1,showFields: showField.value},table);
 }

          filterButton1.addEventListener('click', function(){
            filterEvent("storage",showFields,filterParam1,filterValue1)
          });
          filterButton2.addEventListener('click', function() {
            filterEvent("dish",showFields2,filterParam2, filterValue2)
          });
          filterButton3.addEventListener('click', function() {
            filterEvent("clientOrder",showFields3,filterParam3, filterValue3)
          });
          
   
    function searchEvent(table,showField,searchParam,searchValue) {
     
      if(searchParam.value!=""&&searchValue.value!=""){
        socket.emit('forPages',{pageNumber: 1,showFields: showField.value},table,`WHERE TRIM(${searchParam.value}) LIKE '${searchValue.value}%'`);
        }
        else 
        socket.emit('forPages',{pageNumber: 1,showFields: showField.value},table);
    }


    searchButton1.addEventListener('click', function(){
      searchEvent("storage",showFields,searchParam1,searchValue1)
    });
    searchButton2.addEventListener('click', function(){
      searchEvent("dish",showFields,searchParam2,searchValue2)
    });
    searchButton3.addEventListener('click', function(){
      searchEvent("clientOrder",showFields,searchParam3,searchValue3)
    });

    function arrowClick(paginationSelector, arrowSelector,clickSide = "right") {
      var maxValue = document.querySelectorAll(`${paginationSelector} li`).length-1;
       
         if(clickSide == "right")
        $(`${paginationSelector} li.activate`).next().find('a').click();
         else if(clickSide == "left") 
         $(`${paginationSelector} li.activate`).prev().find('a').click();

      
      
    }

    


    $('#right1').click(function() {
        arrowClick('#myPages','#right1');
  });

    $('#right2').click(function() {
      arrowClick('#myPages2','#right2');
  });

  $('#right3').click(function() {
     arrowClick('#myPages3','#right3');
   });


   $('#left1').click(function() {
    arrowClick('#myPages','#left1',"left");
});

  $('#left2').click(function() {
  arrowClick('#myPages2','#left2',"left");
});

  $('#left3').click(function() {
  arrowClick('#myPages3','#left3',"left");
  });
          

      
      $('#storageTable1').on('click','tr',function(){
       
       storageProduct.innerHTML = $(this)[0].firstChild.innerText;
       infoProductName.value = $(this)[0].children[0].innerHTML;
       previousProductName = infoProductName.value;
       infoProductDescribe.value = $(this)[0].children[1].innerHTML;
       infoProductNumber.value = $(this)[0].children[2].innerHTML;
       infoProductType.value = $(this)[0].children[3].innerHTML;
       infoProductStorageTime.value = $(this)[0].children[4].innerHTML;
       infoProductProducer.value = $(this)[0].children[5].innerHTML;
       infoProductImporter.value = $(this)[0].children[6].innerHTML;
       infoProductStoragePlace.value = $(this)[0].children[7].innerHTML;
       infoProductPrice.value = $(this)[0].children[8].innerHTML;
       infoProductWeight.value = $(this)[0].children[9].innerHTML;
   
       secondModal1.open();
   
   
          
      });
     
   
        
   
        myButton1.onclick = function() {
           socket.emit('addInfo1',{name:productName.value,weight:productWeight.value,
           number:productNumber.value,type:productType.value,date:productDate.value,
         producer: productProducer.value, importer: productImporter.value,
       storagePlace:productStoragePlace.value,price:productPrice.value,
     describe:productDescribe.value});
          
        };  //добавление данных
   
  
   
   var pages = document.querySelector('#myPages');

   
            //  делегирование на номерах страниц
           pages.onclick = function(event){
          
             if(event.target.tagName != "A") return;
             
             
             var element = event.target; //получение текущего элемента
             socket.emit('forPages',{pageNumber: element.innerHTML,showFields: showFields1.value},"storage");
             
           
           }
    
   
   //изменение поля select
   showFields1.addEventListener ( 'change' ,function() {
     var element = document.querySelector('#test1 .activate').children[0];
     socket.emit('forPages',{pageNumber: 1,showFields: showFields1.value},"storage");
  
             
   });
   
   
   
        socket.on('updateInfo1', function(info,describes,status=false,activePage,sqlQuery="") {
     
        
           
       
         
   
         //запрос на количество
         socket.emit('fieldsCount','storage',sqlQuery);
         socket.on('getFieldsCount', function(count,id) {
          
           
         if(id=="storage"){

             fieldsCount = count[0]["COUNT(*)"];
            
        
             if(status){
         storageTable1.innerHTML = "";
         
         }
           
         
           for(let i=0; i<info.length; i++){
             
               storageTable1.insertAdjacentHTML('afterBegin',`<tr><td>${info[i].productName} </td> <td> ${describes[i]}</td>
             <td>${info[i].productNumber} </td><td>${info[i].productType} </td><td>${info[i].productDate} </td><td>${info[i].productProducer} </td><td>${info[i].productImporter} </td>
             <td> ${info[i].productStoragePlace}</td> <td>${info[i].productPrice} </td><td> ${info[i].productWeight}</td></tr>`);
   
                   }
        
             
                   
                   changeTable(Math.ceil(fieldsCount / (+showFields1.value)), pages, activePage);
                  }
       
                 });
       });
   
   
   
   
   buttonChange1.onclick = function(){
     socket.emit('changeProduct', {name:infoProductName.value,number:infoProductNumber.value,
     type:infoProductType.value,storageTime: infoProductStorageTime.value,producer: infoProductProducer.value,
    importer: infoProductImporter.value,storagePlace: infoProductStoragePlace.value,
   price: infoProductPrice.value,weight: infoProductWeight.value,describe: infoProductDescribe.value,
   previousName: previousProductName });
   
   previousProductName = infoProductName.value;
      
   };
   
   
   buttonDelete1.onclick = function(){
     socket.emit('deleteProduct', infoProductName.value);
      
   };
   
   
   
   
   
   myButton2.onclick = function() {
           socket.emit('addInfo2',{name:dishesName.value,weight:dishesWeight.value,
           category:dishesCategory.value,time:dishesTime.value,recipe:dishesRecipe.value,
         selfprice: dishesSelfprice.value, exist: dishesExist.value,price:dishesPrice.value});
        };  //добавление данных


          //изменение поля select
   showFields2.addEventListener ( 'change' ,function() {
    var element = document.querySelector('#test2 .activate').children[0];
    socket.emit('forPages',{pageNumber: 1,showFields: showFields2.value},"dish");
    
    
            
  });
   
       
   var pages2 = document.querySelector('#myPages2');
   
            //  делегирование на номерах страниц
           pages2.onclick = function(event){
          
             if(event.target.tagName != "A") return;
             
             
             var element = event.target; //получение текущего элемента
             socket.emit('forPages',{pageNumber: element.innerHTML,showFields: showFields2.value},"dish");
             
           
           }
       
        socket.on('updateInfo2', function(info,recipes,status=false,activePage,sqlQuery="") {

               //запрос на количество
         socket.emit('fieldsCount','dish',sqlQuery);
         socket.on('getFieldsCount', function(count, id) {
   
         if(id == 'dish'){
             fieldsCount = count[0]["COUNT(*)"];
          
         if(status)
         storageTable2.innerHTML = "";
   
           for(let i=0; i<info.length; i++)
           storageTable2.insertAdjacentHTML('afterBegin',`<tr><td>${info[i].dishName} </td> <td> ${info[i].dishCategory}</td>
             <td>${info[i].dishTime} </td><td>${info[i].dishPrice} </td><td>${info[i].dishSelfprice} </td><td>${info[i].dishWeight} </td><td>${info[i].dishExist} </td>
             <td> ${recipes[i]}</td> </tr>`)
     
             changeTable(Math.ceil(fieldsCount / (+showFields2.value)), pages2, activePage);
         }
       });

      });
             
       //модальное окно блюд
       $('#storageTable2').on('click','tr',function(){
      
         storageDish.innerHTML = $(this)[0].firstChild.innerText;
         
      
         infoDishName.value = $(this)[0].children[0].innerHTML;
         previousDishName = infoDishName.value;
       infoDishCategory.value = $(this)[0].children[1].innerHTML;
       infoDishTime.value = $(this)[0].children[2].innerHTML;
       infoDishPrice.value = $(this)[0].children[3].innerHTML;
       infoDishSelfprice.value = $(this)[0].children[4].innerHTML;
       infoDishWeight.value = $(this)[0].children[5].innerHTML;
       infoDishExist.value = $(this)[0].children[6].innerHTML;
       infoDishRecipe.value = $(this)[0].children[7].innerHTML;
       
   
       secondModal2.open();
   
   
          
      });
   
   
      buttonChange2.onclick = function(){
     socket.emit('changeDish', {name:infoDishName.value,category:infoDishCategory.value,
     time:infoDishTime.value,price: infoDishPrice.value,selfprice: infoDishSelfprice.value,
    weight: infoDishWeight.value,exist: infoDishExist.value,
   recipe: infoDishRecipe.value, previousName: previousDishName});
   
   previousDishName = infoDishName.value;
      
   };
   
   
   buttonDelete2.onclick = function(){
     socket.emit('deleteDish', infoDishName.value);
      
   };
   

  
   
   myButton3.onclick = function() {

                        

    var listOfDishesInfo = document.querySelectorAll('.somethingOrder');

    var sendArray = [];
    for(let i=0; i< listOfDishesInfo.length; i++)
    sendArray.push(listOfDishesInfo[i].innerHTML);
    
    // console.log(sendArray[0].split('-'));
    
           socket.emit('addInfo3',{id:orderId.value,time:orderTime.value,
           date:orderDate.value,price:orderPrice.value,payment:paymentStatus.value,
         orderDish: orderDishes.value,dishList: sendArray});


         $('.rightDish').addClass('hide').removeClass('rightDish');
         $('.somethingOrder').removeClass('somethingOrder');
        };  //добавление данных

      
        var pages3 = document.querySelector('#myPages3');

   
        //  делегирование на номерах страниц
       pages3.onclick = function(event){
      
         if(event.target.tagName != "A") return;
         
         
         var element = event.target; //получение текущего элемента
         socket.emit('forPages',{pageNumber: element.innerHTML,showFields: showFields3.value},"clientOrder");
         
       
       }



        //удаление
   buttonDelete3.onclick = function(){
    socket.emit('deleteOrder', document.querySelector('#orderTitle').innerHTML);

     
  };

//доделать
  buttonChange3.onclick = function(){
    socket.emit('changeOrder', {id:document.querySelector('#orderTitle').innerHTML,
    price:infoOrderPrice.value,
    time:infoOrderTime.value,date: infoOrderDate.value,payment: infoOrderPaymentStatus.value
  

  });
};

 
//изменение поля select
showFields3.addEventListener ( 'change' ,function() {
 var element = document.querySelector('#test3 .activate').children[0];
 socket.emit('forPages',{pageNumber: 1,showFields: showFields3.value},"clientOrder");

         
});


       
   
        socket.on('updateInfo3', function(info,status=false, activePage,sqlQuery="") {

                  //запрос на количество
         socket.emit('fieldsCount','clientOrder',sqlQuery);
         socket.on('getFieldsCount', function(count, id) {
   
         if(id == 'clientOrder'){
             fieldsCount = count[0]["COUNT(*)"];
            
         if(status)
         storageTable3.innerHTML = "";

         var sendArray = [];
         for(let i=0; i< info.length; i++)
         sendArray.push(info[i].orderId); 
         socket.emit('dishListQuery', sendArray);
         socket.on('getDishesSet', function(stringSet) {
          
                for(let i=0; i< stringSet.length; i++)
                document.getElementById(`${stringSet[i].id}`).innerHTML = stringSet[i].theText;
              
                

         });
       
           for(let i=0; i<info.length; i++)
           storageTable3.insertAdjacentHTML('afterBegin',`<tr><td>${info[i].orderId} </td> <td> ${info[i].orderTime}</td>
             <td>${info[i].orderDate} </td><td>${info[i].orderPrice} </td><td>${info[i].paymentStatus} </td></td>
             <td id="${sendArray[i]}"> </td> </tr>`)
         
             changeTable(Math.ceil(fieldsCount / (+showFields3.value)), pages3, activePage);
     
            }

       });
      });//конец update3
    



 //модальное окно заказов
 $('#storageTable3').on('click','tr',function(){
      
      storageOrder.innerHTML = `Заказ № <span id="orderTitle">${$(this)[0].firstChild.innerText}</span>`;
      
   
    infoOrderTime.value = $(this)[0].children[3].innerHTML;
    infoOrderDate.value = $(this)[0].children[1].innerHTML;
    infoOrderPrice.value = $(this)[0].children[2].innerHTML;
    infoOrderPaymentStatus.value = $(this)[0].children[4].innerHTML;
    infoOrderDishesList.value = $(this)[0].children[5].innerHTML;

    secondModal3.open();


       
   });


   String.prototype.wrapText = function(wrapClass) {
     return `<span class="${wrapClass}"><span class="somethingOrder">${this} </span><span class="deleteWrap #827717 lime darken-4 material-icons">close</span></span>`;
   }
   
  

orderDishes.addEventListener('keyup', function(){
  var regExp = /(?:\s*[а-яa-z]\s*)+\-\s*\d+(?:\.\d+)?/i;
  
    if(this.value.indexOf(';')!=-1){
       if(regExp.test(this.value)){
    
    this.insertAdjacentHTML('afterEnd', `${this.value.slice(0,-1).wrapText('rightDish')}`);
    this.value = "";       
  }
  }
}); 


document.querySelector('#modal3').addEventListener('click', function(event){
  if(!event.target.classList.contains('deleteWrap')) return;
     var elem = event.target;
     elem.parentElement.style.display= "none";

});








   function changeTable(pageNumber,pagesSelector,activePage=1){
    
   //сгенерирует общее число страничек
   pagesSelector.innerHTML = "";
    for(let i=1; i<=pageNumber;i++) {
               if(i==activePage){
   pagesSelector.insertAdjacentHTML("beforeEnd",`<li class="waves-effect activate" style="background-color:#808000" id="page${i}"><a href="#!">${i}</a></li>`);
               }
               else{ 
   pagesSelector.insertAdjacentHTML("beforeEnd",`<li class="waves-effect" id="page${i}"><a href="#!">${i}</a></li>`);
               }
     
     }
   }

