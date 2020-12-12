 var socket = io()
   
   
      if(socket!==undefined){
          socket.emit('displayPhone', getId());
         
          socket.on('displayPhone', function(phone, review, comments, replies){
           
            var memory = ``;
            for (i = 0; i < phone.memory.rom.length; ++i) {
              memory += `${phone.memory.rom[i]}GB ${phone.memory.ram}RAM `;
            }
            var youtubeUrl = 'https://www.youtube.com/embed/' + youtube_parser(review.reviewYoutubeUrl);
            var experiences = ``;
            for (i = 0; i < comments.length; ++i) {
              paraf = comments[i].authorName.substring(0, 2);
              experiences += `<div class="comment-content">
        <div class="comment-header comment-div">
            <h2>${paraf}</h2>
        </div>
        <div class="comment-div">
            <div class="comment-text">
                <p>${comments[i].authorName}</p>
                <p>${comments[i].text}</p>
                <button class="comment-button" id="like" onclick="like('${comments[i]._id}')"><i class="fas fa-thumbs-up"></i></button><span id="${comments[i]._id}likes">${comments[i].likes}</span>
                <button class="comment-button" id="dislike" onclick="dislike('${comments[i]._id}')"><i class="fas fa-thumbs-down"></i></button><span id="${comments[i]._id}dislikes">${comments[i].dislikes}</span>
                <button class="comment-button" id="reply" onclick="replyButton('${comments[i]._id}')"><i class="fas fa-reply"></i></button></span>
                <p id="view-reply">${replies[i].length} odgovora</p>
            </div>`
              for (j = 0; j < replies[i].length; ++j) {
                replyparaf = replies[i][j].authorName.substring(0, 2);
                experiences += ` <div class="reply-content">
            <div class="reply-header">
                <h2>${replyparaf}</h2>
            </div>
            <div class="reply-text">
                <p>${replies[i][j].authorName}</p>
                <p>${replies[i][j].text}</p>
                <button class="comment-button" id="like" onclick="liker('${replies[i][j]._id}')"><i class="fas fa-thumbs-up"></i></button><span id="${replies[i][j]._id}rlikes">${replies[i][j].likes}</span>
                <button class="comment-button" id="dislike" onclick="disliker('${replies[i][j]._id}')"><i class="fas fa-thumbs-down"></i></button><span id="${replies[i][j]._id}rdislikes">${replies[i][j].dislikes}</span>
                <button class="comment-button" id="reply" onclick="replyButton('${comments[i]._id}')"><i class="fas fa-reply"></i></button>
            </div>
        
        </div>`
              }
              experiences += `<div class="reply-form-div" id="${comments[i]._id}comment">
              <h2>Dodajte odgovor</h2>
              <form class="reply-form">
                  <div class="form-input">
                      <label for="name">Ime</label>
                      <input type="text" name="name" id="${comments[i]._id}reply-name-input">
                  </div>
                  <div class="form-input">
                      <label for="text">Vas Komentar</label>
                      <textarea name="text" id="${comments[i]._id}reply-text-input"></textarea>
                  </div>
                  <button type="button" id="add-comment-btn" onclick="addReply('${comments[i]._id}')">Dodaj komentar</button>
              </form> </div>
        </div>
            </div>`;
            }
            phoneDiv = `<div class="phone-h2-div">
            <h2>${phone.brand} ${phone.model}</h2>
        </div>
        <div class="general-specs">
            <img class="general-specs-img" src='${phone.phoneImage}' height="auto">
            <div class="general-specs-text">
                <div class="general-spec-text"><i class="fas fa-tablet-alt"></i>
                    <h2>${phone.body.size}"</h2>
                    <p>${phone.body.resolution}</p>
                </div>
                <div class="general-spec-text"><i class="fas fa-camera"></i>
                    <h2>${phone.camera.MP}MP</h2>
                    <p>${phone.camera.p}p</p>
                </div>
                <div class="general-spec-text">
                    <i class="fas fa-microchip"></i>
                    <h2>${phone.memory.ram}RAM</h2>
                    <p>${phone.platform.chipset}</p>
                </div>
                <div class="general-spec-text">
                <i class="fas fa-dollar-sign"></i>
                <h2>${phone.price}</h2>
                <p>dolara</p>
            </div>
                <div class="general-spec-text">
                    <i class="fas fa-battery-full"></i>
                    <h2>${phone.battery.number}mAH</h2>
                    <p>${phone.battery.material}</p>
                </div>
              
        
            </div>
        </div>
        <div class="review">`
          for(var i=0;i<review.reviewText.length;++i){
        phoneDiv+=`<h2>${review.reviewText[i].heading}</h2>
            <div class='review-text'>
                <p>${review.reviewText[i].text}</p>
            </div>`
          }
          phoneDiv+= `<span class="heading">User Rating</span><span class="rating">
            <span id="star1" class="fa fa-star ${getAverageFromMongo(review) >= 0.5 ? 'checked' : ""}" onclick="ratePhone(this)" value="1"></span>
            <span id="star2" class="fa fa-star ${getAverageFromMongo(review) >= 1.5 ? 'checked' : ""}" onclick="ratePhone(this)" value="2"></span>
            <span id="star3" class="fa fa-star ${getAverageFromMongo(review) >= 2.5 ? 'checked' : ""}"  onclick="ratePhone(this)" value="3"></span>
            <span id="star4" class="fa fa-star ${getAverageFromMongo(review) >= 3.5 ? 'checked' : ""}" onclick="ratePhone(this)" value="4"></span>
            <span id="star5" class="fa fa-star ${getAverageFromMongo(review) >= 4.5 ? 'checked' : ""}" onclick="ratePhone(this)" value="5"></span>
            <p id="yourmark" class="yourRate"></p>
            <p><span id="average" value="${getAverageFromMongo(review)}">${getAverageFromMongo(review)}</span> bazirana na  <span id="rate-length">${review.ratings.length}</span> odgovora.</p>
            <iframe width="600" height="400" style="border:none" src=${youtubeUrl}
                allowfullscreen id="youtubevideo">
            </iframe>
        </div>
        <div class="spec-table">
            <table>
                <tbody>
                    <th class="table-header">Specifications</th>
                    <tr>
                        <td class="table-row"><b>Launch</b></td>
                        <td class='table-row'>
                            <ul class="table-list">
                                <li>Announced</li>
                                <li>Realased</li>
                            </ul>
                        </td>
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
                                <li>Type</li>
                                <li>Size</li>
                                <li>Resolution</li>
                                <li>Protection</li>
                            </ul>
                        </td>
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
                            <li>OS</li>
                            <li>Chipset</li>
                            <li>CPU</li>
                            <li>GPU</li>
                        </ul>
                    </td>
                    <td class='table-row'>
                        <ul class="table-list">
                            <li>${phone.platform.OS}</li>
                            <li>${phone.platform.chipset}</li>
                            <li>${phone.platform.cpu}</li>
                            <li>${phone.platform.gpu}</li>
                        </ul>
                    </td>
                    </tr>
                    <tr>
                        <td class="table-row"><b>Memory</b></td>
                        <td class='table-row'>
                            Internal
                        </td>
                        <td class='table-row'>
                        ${memory}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div id="comment">
           <h2>Komentari  <i class="fas fa-sort" onclick=sortComments()></i></h2>
          <div id="comments"> ${experiences} </div>
            <h2>Dodajte komentar</h2>
            <form class="comment-form">
                <div class="form-input">
                    <label for="name">Ime</label>
                    <input type="text" name="name" id="comment-name-input">
                </div>
                <div class="form-input">
                    <label for="text">Vas Komentar</label>
                    <textarea name="text" id="comment-text-input"></textarea>
                </div>
                <button type="button" id="add-comment-btn" onclick="addComment('${review._id}')">Dodaj komentar</button>
            </form>
        </div>
        
        `
            document.getElementById('phone-general').insertAdjacentHTML('afterbegin', phoneDiv);
            




            $("#star1").hover(function () {
                $("#star1").removeClass('checked');
                $("#star2").removeClass('checked');
                $("#star3").removeClass('checked');
                $("#star4").removeClass('checked');
                $("#star5").removeClass('checked');
                $("#star1").addClass('checked');
          
              }, function () {
                if (getAverage() < 0.5) {
                  $("#star1").removeClass('checked');
                }
                if (getAverage() >= 1.5) {
                  $("#star2").addClass('checked');
                }
                if (getAverage() >= 2.5) {
                  $("#star3").addClass('checked');
                }
                if (getAverage() >= 3.5) {
                  $("#star4").addClass('checked');
                }
                if (getAverage() >= 4.5) {
                  $("#star5").addClass('checked');
                }
              })
          
              $("#star2").hover(function () {
                $("#star1").removeClass('checked');
                $("#star2").removeClass('checked');
                $("#star3").removeClass('checked');
                $("#star4").removeClass('checked');
                $("#star5").removeClass('checked');
                $("#star1").addClass('checked');
                $("#star2").addClass('checked');
          
              }, function () {
                if (getAverage() < 0.5) {
                  $("#star1").removeClass('checked');
                }
                if (getAverage() < 1.5) {
                  $("#star2").removeClass('checked');
                }
                if (getAverage() >= 2.5) {
                  $("#star3").addClass('checked');
                }
                if (getAverage() >= 3.5) {
                  $("#star4").addClass('checked');
                }
                if (getAverage() >= 4.5) {
                  $("#star5").addClass('checked');
                }
              })
              $("#star3").hover(function () {
                $("#star1").removeClass('checked');
                $("#star2").removeClass('checked');
                $("#star3").removeClass('checked');
                $("#star4").removeClass('checked');
                $("#star5").removeClass('checked');
                $("#star1").addClass('checked');
                $("#star2").addClass('checked');
                $("#star3").addClass('checked');
              }, function () {
                if (getAverage() < 0.5) {
                  $("#star1").removeClass('checked');
                }
                if (getAverage() < 1.5) {
                  $("#star2").removeClass('checked');
                }
                if (getAverage() < 2.5) {
                  $("#star3").removeClass('checked');
                }
                if (getAverage() >= 3.5) {
                  $("#star4").addClass('checked');
                }
                if (getAverage() >= 4.5) {
                  $("#star5").addClass('checked');
                }
              })
              $("#star4").hover(function () {
                $("#star1").removeClass('checked');
                $("#star2").removeClass('checked');
                $("#star3").removeClass('checked');
                $("#star4").removeClass('checked');
                $("#star5").removeClass('checked');
                $("#star1").addClass('checked');
                $("#star2").addClass('checked');
                $("#star3").addClass('checked');
                $("#star4").addClass('checked');
          
              }, function () {
                if (getAverage() < 0.5) {
                  $("#star1").removeClass('checked');
                }
                if (getAverage() < 1.5) {
                  $("#star2").removeClass('checked');
                }
                if (getAverage() < 2.5) {
                  $("#star3").removeClass('checked');
                }
                if (getAverage() < 3.5) {
                  $("#star4").removeClass('checked');
                }
                if (getAverage() >= 4.5) {
                  $("#star5").addClass('checked');
                }
              })
              $("#star5").hover(function () {
                $("#star1").removeClass('checked');
                $("#star2").removeClass('checked');
                $("#star3").removeClass('checked');
                $("#star4").removeClass('checked');
                $("#star5").removeClass('checked');
                $("#star1").addClass('checked');
                $("#star2").addClass('checked');
                $("#star3").addClass('checked');
                $("#star4").addClass('checked');
                $("#star5").addClass('checked');
          
              }, function () {
                if (getAverage() < 0.5) {
                  $("#star1").removeClass('checked');
                }
                if (getAverage() < 1.5) {
                  $("#star2").removeClass('checked');
                }
                if (getAverage() < 2.5) {
                  $("#star3").removeClass('checked');
                }
                if (getAverage() < 3.5) {
                  $("#star4").removeClass('checked');
                }
                if (getAverage() < 4.5) {
                  $("#star5").removeClass('checked');
                }
              })
              
              
          })
          
          
    console.log(getId());
      
        socket.on('addReply', function(reply, comment){
            console.log(reply);
            paraf = reply.authorName.substring(0, 2);
            var re = `<div class="reply-content">
          <div class="reply-header">
              <h2>${paraf}</h2>
          </div>
          <div class="reply-text">
              <p>${reply.authorName}</p>
              <p>${reply.text}</p>
              <button class="comment-button" id="like" onclick="liker('${reply._id}')"><i class="fas fa-thumbs-up"></i></button><span id="${reply._id}rlikes">${reply.likes}</span>
              <button class="comment-button" id="dislike" onclick="disliker('${reply._id}')"><i class="fas fa-thumbs-down"></i></button><span id="${reply._id}rdislikes">${reply.dislikes}</span>
              <button class="comment-button" id="reply" onclick="replyButton('${comment}')"><i class="fas fa-reply"></i></button>
          </div>
          
          </div>`
          
            document.getElementById(`${comment}comment`).insertAdjacentHTML('beforebegin', re);
          })
     
        }
socket.on('addComment', function(comment){
    paraf = comment.authorName.substring(0, 2);
    var com = `<div class="comment-content">
  <div class="comment-header comment-div">
      <h2>${paraf}</h2>
  </div>
  <div class="comment-div">
      <div class="comment-text">
          <p>${comment.authorName}</p>
          <p>${comment.text}</p>
          <button class="comment-button" id="like" onclick="like('${comment._id}')"><i class="fas fa-thumbs-up"></i></button><span id="${comment._id}likes" >${comment.likes}</span>
          <button class="comment-button" id="dislike" onclick="dislike('${comment._id}')"><i class="fas fa-thumbs-down"></i></button><span id="${comment._id}dislikes">${comment.dislikes}</span>
          <button class="comment-button" id="reply" onclick="replyButton('${comment._id}')"><i class="fas fa-reply"></i></button></span>
          <p id="view-reply"> 0 odgovora</p>
      </div>`
  
    com += `<div class="reply-form-div" id="${comment._id}comment">
    <h2>Dodajte odgovor</h2>
    <form class="reply-form">
        <div class="form-input">
            <label for="name">Ime</label>
            <input type="text" name="name" id="${comment._id}reply-name-input">
        </div>
        <div class="form-input">
            <label for="text">Vas Komentar</label>
            <textarea name="text" id="${comment._id}reply-text-input"></textarea>
        </div>
        <button type="button" id="add-comment-btn" onclick="addReply('${comment._id}')">Dodaj komentar</button>
    </form>
    </div>
    </div></div>`
    document.getElementById('comments').insertAdjacentHTML('afterbegin', com);
})
socket.on('likeComment', function(comment){
    var likespan = `${comment._id}likes`;
    document.getElementById(likespan).textContent = comment.likes;
    
})
socket.on('dislikeComment', function(comment){
    var dislikespan = `${comment._id}dislikes`
    document.getElementById(dislikespan).textContent = comment.dislikes;
    
})
socket.on('dislikeCommentCancel', function(comment){
    var dislikespan = `${comment._id}dislikes`
    document.getElementById(dislikespan).textContent = comment.dislikes;
    
})
socket.on('likeCommentCancel', function(comment){
    var likespan = `${comment._id}likes`;
    document.getElementById(likespan).textContent = comment.likes;
    
})
socket.on('likeReply', function(reply){
    var likespan = `${reply._id}rlikes`;
    document.getElementById(likespan).textContent = reply.likes;
    console.log(reply.likes);
})
socket.on('dislikeReply', function(reply){
    var dislikespan = `${reply._id}rdislikes`
    document.getElementById(dislikespan).textContent = reply.dislikes;
    
})
socket.on('dislikeReplyCancel', function(reply){
    var dislikespan = `${reply._id}rdislikes`
    document.getElementById(dislikespan).textContent = reply.dislikes;
    
})
socket.on('likeReplyCancel', function(reply){
    var likespan = `${reply._id}rlikes`;
    document.getElementById(likespan).textContent = reply.likes;
    
})

socket.on('sortComments', function(comments, replies){
  var experiences = ``;
  for (i = 0; i < comments.length; ++i) {
    paraf = comments[i].authorName.substring(0, 2);
    experiences += `<div class="comment-content">
<div class="comment-header comment-div">
  <h2>${paraf}</h2>
</div>
<div class="comment-div">
  <div class="comment-text">
      <p>${comments[i].authorName}</p>
      <p>${comments[i].text}</p>
      <button class="comment-button" id="like" onclick="like('${comments[i]._id}')"><i class="fas fa-thumbs-up"></i></button><span id="${comments[i]._id}likes" class="${$(`#${comments[i]._id}likes`).hasClass('liked')?'liked':''}">${comments[i].likes}</span>
      <button class="comment-button" id="dislike" onclick="dislike('${comments[i]._id}')"><i class="fas fa-thumbs-down"></i></button><span id="${comments[i]._id}dislikes" class="${$(`#${comments[i]._id}dislikes`).hasClass('liked')?'liked':''}">${comments[i].dislikes}</span>
      <button class="comment-button" id="reply" onclick="replyButton('${comments[i]._id}')"><i class="fas fa-reply"></i></button></span>
      <p id="view-reply">${replies[i].length} odgovora</p>
  </div>`
    for (j = 0; j < replies[i].length; ++j) {
      replyparaf = replies[i][j].authorName.substring(0, 2);
      experiences += ` <div class="reply-content">
  <div class="reply-header">
      <h2>${replyparaf}</h2>
  </div>
  <div class="reply-text">
      <p>${replies[i][j].authorName}</p>
      <p>${replies[i][j].text}</p>
      <button class="comment-button" id="like" onclick="liker('${replies[i][j]._id}')"><i class="fas fa-thumbs-up"></i></button><span id="${replies[i][j]._id}rlikes" class="${$(`#${replies[i][j]._id}rlikes`).hasClass('liked')?'liked':''}">${replies[i][j].likes}</span>
      <button class="comment-button" id="dislike" onclick="disliker('${replies[i][j]._id}')"><i class="fas fa-thumbs-down"></i></button><span id="${replies[i][j]._id}rdislikes" class="${$(`#${replies[i][j]._id}rdislikes`).hasClass('liked')?'liked':''}">${replies[i][j].dislikes}</span>
      <button class="comment-button" id="reply" onclick="replyButton('${comments[i]._id}')"><i class="fas fa-reply"></i></button>
  </div>

</div>`
    }
    experiences += `<div class="reply-form-div" id="${comments[i]._id}comment">
    <h2>Dodajte odgovor</h2>
    <form class="reply-form">
        <div class="form-input">
            <label for="name">Ime</label>
            <input type="text" name="name" id="${comments[i]._id}reply-name-input">
        </div>
        <div class="form-input">
            <label for="text">Vas Komentar</label>
            <textarea name="text" id="${comments[i]._id}reply-text-input"></textarea>
        </div>
        <button type="button" id="add-comment-btn" onclick="addReply('${comments[i]._id}')">Dodaj komentar</button>
    </form> </div>
</div>
  </div>`;
  
  }
  document.getElementById('comments').innerHTML = experiences;

})

socket.on('ratePhone', function(review){
  document.getElementById('average').setAttribute('value', review.averageRating);
  document.getElementById("average").textContent = review.averageRating
  document.getElementById('rate-length').textContent = review.ratings.length;
  document.getElementById("yourmark").textContent = `Vasa ocena: ${review.ratings[review.ratings.length-1]}`
  $("#star1").removeClass('checked');
  $("#star2").removeClass('checked');
  $("#star3").removeClass('checked');
  $("#star4").removeClass('checked');
  $("#star5").removeClass('checked');
  getAverage() >= 0.5 ? $("#star1").addClass('checked') : $("#star1").removeClass('checked');
  getAverage() >= 1.5 ? $("#star2").addClass('checked') : $("#star2").removeClass('checked');
  getAverage() >= 2.5 ? $("#star3").addClass('checked') : $("#star3").removeClass('checked');
  getAverage() >= 3.5 ? $("#star4").addClass('checked') : $("#star4").removeClass('checked');
  getAverage() >= 4.5 ? $("#star5").addClass('checked') : $("#star5").removeClass('checked');
  })

function sortComments() {

  socket.emit('sortComments', getId())
  
}



        function addReply(comment) {
            var txt =  $(`#${comment}reply-text-input`).val()
 var author = $(`#${comment}reply-name-input`).val()
 socket.emit('addReply', txt, author, comment)
     
}

function like(commentID) {
    var likespan = `${commentID}likes`;
    var dislikespan = `${commentID}dislikes`
    if (!$(`#${likespan}`).hasClass('liked')) {
      socket.emit('likeComment', commentID)
           $(`#${likespan}`).addClass('liked')
     if ($(`#${dislikespan}`).hasClass('liked')) {
         socket.emit('dislikeCommentCancel', commentID);
         $(`#${dislikespan}`).removeClass('liked')
      }
    } else {
     socket.emit('likeCommentCancel',commentID)
     $(`#${likespan}`).removeClass('liked')
    }
}
function dislike(commentID) {
    var likespan = `${commentID}likes`;
    var dislikespan = `${commentID}dislikes`
    if (!$(`#${dislikespan}`).hasClass('liked')) {
      socket.emit('dislikeComment', commentID)
      $(`#${dislikespan}`).addClass('liked')
     if ($(`#${likespan}`).hasClass('liked')) {
         socket.emit('likeCommentCancel', commentID);
         $(`#${likespan}`).removeClass('liked')
      }
    } else {
     socket.emit('dislikeCommentCancel', commentID)
     $(`#${dislikespan}`).removeClass('liked')
    }
  
  }
function liker(replyID) {
    var likespan = `${replyID}rlikes`;
    var dislikespan = `${replyID}rdislikes`
    if (!$(`#${likespan}`).hasClass('liked')) {
      socket.emit('likeReply', replyID)
           $(`#${likespan}`).addClass('liked')
     if ($(`#${dislikespan}`).hasClass('liked')) {
         socket.emit('dislikeReplyCancel', replyID);
         $(`#${dislikespan}`).removeClass('liked')
      }
    } else {
     socket.emit('likeReplyCancel', replyID)
     $(`#${likespan}`).removeClass('liked')
    }
  
  }
  function disliker(replyID) {
    var likespan = `${replyID}rlikes`;
    var dislikespan = `${replyID}rdislikes`
    if (!$(`#${dislikespan}`).hasClass('liked')) {
      socket.emit('dislikeReply', replyID)
      $(`#${dislikespan}`).addClass('liked')
     if ($(`#${likespan}`).hasClass('liked')) {
         socket.emit('likeReplyCancel', replyID);
         $(`#${likespan}`).removeClass('liked')
      }
    } else {
     socket.emit('dislikeReplyCancel', replyID)
     $(`#${dislikespan}`).removeClass('liked')
    }
  
  }

function addComment(review) {

    txt = $("#comment-text-input").val()
    author = $("#comment-name-input").val()
    socket.emit('addComment', txt, author, review)
    $("#comment-text-input").val('') 
    $("#comment-name-input").val('') 
  }

function replyButton(id) {
    if ($(`#${id}comment`).hasClass('reply-form-div-visible')) {
      $(`#${id}comment`).removeClass('reply-form-div-visible')
    } else {
      $(`#${id}comment`).addClass('reply-form-div-visible')
    }
    console.log("Radi!!")
  }
function getId() {
    url = location.href.toString();
    for (i = 0; i < url.length; ++i) {
      if (url[i] == '#')
        break;
    }
    var _id = url.substring(i + 1, url.length);
    return _id;
  }
  function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
  
  }
  function getAverageFromMongo(review) {
    var average = 0;
     for (i = 0; i <review.ratings.length; ++i) {
      average +=review.ratings[i];
    }
    average = (average / review.ratings.length).toFixed(2);
    return parseFloat(average);
  }
  
  function getAverage(){
   var average =  parseFloat(document.getElementById('average').getAttribute('value'));
   return average;
  }
  
function ratePhone(e){

                var number = parseFloat(e.getAttribute('value'));
            var id = getId()
                if(!$('#yourmark').hasClass('yourRate-visible')){
                                 socket.emit('ratePhone', id, number)
                                 $('#yourmark').addClass('yourRate-visible')
                    } else if(!($('#warning').length>0)){
                  document.getElementById("yourmark").insertAdjacentHTML('beforebegin', `<p id="warning">Vec ste ocenili ovaj telefon!</p>`);
                }
                                   
              }
  