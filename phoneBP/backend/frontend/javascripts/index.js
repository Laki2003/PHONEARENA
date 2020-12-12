
var socket = io();


if(socket!==undefined){
       socket.emit('displayIndex');
       socket.on('displayIndex', function(phones){
              phoneDiv = '';
              for (i = 0; i < phones.length; ++i) {
                     phoneDiv += `<div class="card position-static" id='${phones[i]._id}'>
                     <img src=${phones[i].phoneImage} width="50%" height="50%" class="card-img-top">
                     <div class="card-body position-static">
                  <h5>${phones[i].brand}  ${phones[i].model}</h5>
                  <h5>${phones[i].price}$</h5>
                  <button class="details-button" onclick="phone(this)" >Details</button></div></div>`}
                   document.getElementById('news').insertAdjacentHTML('afterbegin', phoneDiv);
       })

       socket.on('liveSearch', function(phones, id){
              autocomplete(document.getElementById(id), phones);  
       })

       $('#search-input').on('keyup', function(){
                            socket.emit('liveSearch', $(this).val(), $(this).attr('id'));
       })
}


function phone(e) {
       _id = e.parentElement.parentElement.id;
       console.log(_id);
       location.href = `./phone#${_id}`;
     }

     function autocomplete(inp, arr) {
       var currentFocus;
       inp.addEventListener("input", function(e) {
           var a, b, i, val = this.value;
           closeAllLists();
           if (!val) { return false;}
           currentFocus = -1;
           a = document.createElement("DIV");
           a.setAttribute("id", this.id + "autocomplete-list");
           a.setAttribute("class", "autocomplete-items");
           this.parentNode.appendChild(a);
           for (i = 0; i < arr.length; i++) {
             var model = arr[i].model.toLowerCase();
             if (model.substr(0, val.length)== val.toLowerCase()) {
               b = document.createElement("DIV");
              b.setAttribute('id', arr[i]._id);
               b.innerHTML =`<img src="${arr[i].phoneImage}" width="50px" height="auto"/><strong> ${arr[i].model.substr(0, val.length)}</strong>`;

               b.innerHTML += arr[i].model.substr(val.length);
               
               b.addEventListener("click", function() {
                     _id = this.id;
                     console.log(_id);
                     location.href = `./phone#${_id}`;
               });
               a.appendChild(b);
             }
           }
       });
  
       function addActive(x) {
         if (!x) return false;
         removeActive(x);
         if (currentFocus >= x.length) currentFocus = 0;
         if (currentFocus < 0) currentFocus = (x.length - 1);
         x[currentFocus].classList.add("autocomplete-active");
       }
       function removeActive(x) {
         for (var i = 0; i < x.length; i++) {
           x[i].classList.remove("autocomplete-active");
         }
       }
       function closeAllLists(elmnt) {
         var x = document.getElementsByClassName("autocomplete-items");
         for (var i = 0; i < x.length; i++) {
           if (elmnt != x[i] && elmnt != inp) {
             x[i].parentNode.removeChild(x[i]);
           }
         }
       }
       document.addEventListener("click", function (e) {
           closeAllLists(e.target);
       });
     }
     
     
    