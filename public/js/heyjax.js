
$(document).ready(function(){

    $.ajax({
        url: '/userApp/duyuru',
        method: 'GET',
        dataType:'json',
        success: function(response){
            console.log(response)
            duyurular = response.detaylar;
            $('#duyurusayisi').text(response.lenght)
            for(let k in duyurular){
                $('#dropduyuru').append('<a id='+ duyurular[k]['programId'] +' class="dropdown-item" href="/userApp/grupgirisi/this/?grupGirisi='+ duyurular[k]['programId']+'">'+'<small class="text-primary"> saat:'+duyurular[k]['saat']  +':00</small><small class="text-danger"> '+
                duyurular[k]['interval']+ 'saat için.</small><br>'+ duyurular[k]['programId'] +'<br><button  id="'+duyurular[k]['programId']+'"  class="btn btn-outline-success mr-1 butonsecici">Onayla</button><button id="duyuruayril" class="btn btn-outline-danger ">Ayril</button></a>')
            }

        }
    })


    $('#dropduyuru').on('click', function(){
      let id = event.target.id;//event.target.id;
      console.log(id);
  $.ajax({
     url: '/userApp/duyuruonayla',
     method: 'POST',
     contentType: 'application/json',
     data: JSON.stringify({id: id}),
     success: function(response) {
         console.log(response);

     },
     error: function() {

     }
  });
});


    $('#searchbyPeer').keypress(function(e){
        $.ajax({
            url: '/userApp/searchtoPeer/' + $('#searchbyPeer').val() + String.fromCharCode(e.which),
            method: 'GET',
            dataType: 'json',
            success: function(response){
                console.log(response);
                $("#searchbyPeerLIST").html('');
                for(var i=0; i< response.result.length; i++){
                    console.log('girdi')

                    $("#searchbyPeerLIST").append("<option value='"+response.result[i].username +"'>");
                }

            },
            error: function() {
                alert("Server'la bağlantı kurulamadı!")
            }
        });

    });


    $('#btn_WithPeer').on('click', function(){
        $.ajax({
            url: '/userApp/search/modal/' + $(location).attr('href').split('/')[5].substring(14,24),
            method: 'GET',
            dataType: 'json',
            success: function(response){
                console.log(response.xusermatris)
                var html = "<tr class='d-flex'><th class='col-2 bg-secondary text-light' scope='row'>isimler</th><td id='' class='col-1'>"+response.peer.ad+"</td><td id='' class='col-1'>"+response.xuser.ad+"</td><td id='' class='col-1'>"+response.peer.ad+"</td><td id='' class='col-1'>"+response.xuser.ad+"</td><td id='' class='col-1'>"+response.peer.ad+"</td><td id='' class='col-1'>"+response.xuser.ad+"</td><td id='' class='col-1'>"+response.peer.ad+"</td><td id='' class='col-1'>"+response.xuser.ad+"</td><td id='' class='col-1'>"+response.peer.ad+"</td><td id='' class='col-1'>"+response.xuser.ad+"</td>" ;
                for(var i=0; i<15; i++){
                    html += "<tr class='d-flex'><th class='col-2 bg-secondary text-light' scope='row'>"+ (i+7) +":00</th>";
                    for(var j=0; j<5; j++){
                        if(response.peermatris.matris[j][i] == true){
                            html += "<td id='' class='col-1' style='background-color: green'></td>";
                        }else{
                            html += "<td id='' class='col-1'  ></td>";
                        }
                        if(response.xusermatris.matris[j][i] == true){
                            html += "<td id='' class='col-1'  style='background-color: yellow'></td>";
                        }else{
                            html += "<td id='' class='col-1'></td>";
                        }
                    }

                }

                $('#modalTableMatris').append(html);

            },
            error: function(){

            }
        });
    });


    $('#grupGirisiCek').keypress(function(e){
        $.ajax({
            url: '/userApp/searchtoGrup/' + $('#grupGirisiCek').val() + String.fromCharCode(e.which),
            method: 'GET',
            dataType: 'json',
            success: function(response){
                console.log(response);
                $("#grupGirisiList").html('');
                for(var i=0; i< response.gruplar.length; i++){
                    console.log('girdi')

                    $("#grupGirisiList").append("<option value='"+response.gruplar[i].programId+"'>"+response.gruplar[i].title+ "</option>");
                }
            },
            error: function() {
                alert("Server'la bağlantı kurulamadı!")
            }
        });

    });

    $('#btn_grupgirisiDahilol').on('click', function(){
        console.log($(location).attr('href').split('/')[6].substring(12,39))
        $.ajax({
            url: '/userApp/grupgirisi/thisac/' + $(location).attr('href').split('/')[6].substring(12,39),
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function(response) {
                console.log(response);
                alert(response.msg)
            },
            error: function() {
                alert(response.msg)
            }
        });
    })
    $('#btn_grupgirisiAyril').on('click', function(){
        console.log($(location).attr('href').split('/')[6].substring(12,39))
        $.ajax({
            url: '/userApp/grupgirisi/thisdisac/' + $(location).attr('href').split('/')[6].substring(12,39),
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({}),
            success: function(response) {
                console.log(response);
                alert(response.msg)
            },
            error: function() {
                alert(response.msg)
            }
        });
    })
});
