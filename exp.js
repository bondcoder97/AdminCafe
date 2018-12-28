// {/* <table class="striped ">
// <thead>
//   <tr>
//       <th>Продукт</th>
//       <th>Описание</th>
//       <th>Количество</th>
//       <th>Тип</th>
//       <th>Срок хранения</th>
//       <th>Производитель</th>
//       <th>Поставщик</th>
//       <th>Место хранения</th>
//       <th>Цена</th>
//       <th>Вес</th>
//   </tr>
// </thead>

//  <tbody id="storageTable1">
 
         
         

//  </tbody>
// </table> */}


function createTable(id) {

document.body.insertAdjacentHTML('afterBegin',`<table class="striped"><thead> <tr> 
      <th>Продукт</th>
      <th>Описание</th>
      <th>Количество</th>
      <th>Тип</th>
      <th>Срок хранения</th>
      <th>Производитель</th>
      <th>Поставщик</th>
      <th>Место хранения</th>
      <th>Цена</th>
      <th>Вес</th>


</tr></thead>

<tbody id="${id}">
 
         
         
 </tbody>
 </table>
 <ul class="pagination">
 <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
 <span id="myPages">

 </span>
 <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
 </ul>
 `);

}


function changeTable(pageNumber,numberOfShowElements){
//будет попадать номер странички и количество отображаемых элементов
var numberOfShowData = numberOfShowElements||10;//отображение
var allInfo = [];
var counter = 1;
var numberOfPage = 1;
var operatingMemory = [];
var pages = document.querySelector('#myPages');


//сгенерирует общее число страничек
var allPages = Math.ceil(allInfo.length / numberOfShowElements);//все страницы
 for(let i=1; i<=allPages;i++) {
    pages.insertAdjacentHTML("beforeEnd",`<li class="waves-effect" id="page${i}"><a href="#!">${numberOfPage}</a></li>`);
 }


socket.emit('changePage',{pageNumber:this.innerHTML,numberOfShowElements: numberOfShowElements});



socket.on('changePage',function(info){
     continue.query(`SELECT * FROM storage limit ${info.pageNumber-1},${numberOfShowElements}`,function(){
         if(err) console.log("Ошибочка");
     });
});




for (let i = 0; i < allInfo.length; i++) {
    operatingMemory.push( allInfo.shift());
    
    if(operatingMemory.length == numberOfShowData)
     {
         
      //берем текущий элемент и засовываем в div
      for(let j=0; j<operatingMemory.length;j++){
        pages.insertAdjacentHTML('beforeEnd',``);

      }


      $(this).wrap(`div id="page${numberOfPage}"`);
      numberOfPage++;

    }
}



}







// <ul class="pagination">
// <li class="disabled"><a href="#!"><i class="material-icons">chevron_left</i></a></li>
// <li class="active"><a href="#!">1</a></li>
// <li class="waves-effect"><a href="#!">2</a></li>
// <li class="waves-effect"><a href="#!">3</a></li>
// <li class="waves-effect"><a href="#!">4</a></li>
// <li class="waves-effect"><a href="#!">5</a></li>
// <li class="waves-effect"><a href="#!"><i class="material-icons">chevron_right</i></a></li>
// </ul>
