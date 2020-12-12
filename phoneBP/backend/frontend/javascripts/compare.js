var socket = io();

if(socket!==undefined){
   socket.on('liveSearch', function(phones, id){
       autocomplete(document.getElementById(id), phones)
   })

socket.on('displayCompare', function(phone, input){
  card = `<img src = ${phone.phoneImage} width="100px" heigh="200px">
  <h5>${phone.brand} ${phone.model}</h5>
  <tr>
  <td class="table-row"><b>Launch</b></td>
   <td class='table-row'>
      <ul class="table-list">
          <li>${phone.launch.announced}</li>
          <li>${phone.launch.realased}</li>
      </ul>
  </td>
</tr>
<tr>
  <td class="table-row"><b>Body</b></td>
 
  <td class='table-row'>
      <ul class="table-list">
          <li>${phone.body.type}</li>
          <li>${phone.body.size} inches, ${phone.body.size * 2.5} </li>
          <li>${phone.body.resolution}</li>
          <li>${phone.body.protection}</li>
      </ul>
  </td>
</tr>
<td class="table-row"><b>Platform</b></td>

<td class='table-row'>
  <ul class="table-list">
      <li>${phone.platform.OS}</li>
      <li>${phone.platform.chipset}</li>
      <li>${phone.platform.cpu}</li>
      <li>${phone.platform.gpu}</li>
  </ul>
</td>
</tr>

  `
  


  if(input=='compareInput1'){
    document.getElementById('cardBody1').innerHTML = '';
    document.getElementById('cardBody1').insertAdjacentHTML("afterbegin",card)
  }
  else if(input == 'compareInput2'){
    document.getElementById('cardBody2').innerHTML = '';
    document.getElementById('cardBody2').insertAdjacentHTML('afterbegin', card)
  }
  else if(input == 'compareInput3'){
    document.getElementById('cardBody3').innerHTML = '';
    document.getElementById('cardBody3').insertAdjacentHTML('afterbegin',card)
  }
})

$('input').on('keyup', function(){
  socket.emit('liveSearch', $(this).val(), $(this).attr('id'));
})


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
          if (model.includes(val.toLowerCase())) {
            b = document.createElement("DIV");
           b.setAttribute('id', arr[i]._id);
            b.innerHTML =`<img src="${arr[i].phoneImage}" width="50px" height="auto"/><strong> ${arr[i].model.substr(0, val.length)}</strong>`;

            b.innerHTML += arr[i].model.substr(val.length);
            
            b.addEventListener("click", function() {
                  socket.emit('displayCompare', this.getAttribute('id'), inp.getAttribute('id'));
                  closeAllLists();
                inp.value = '';

            });
            a.appendChild(b);
          }
        }
    })
    
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
}

