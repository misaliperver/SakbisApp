
$(document).ready(function(){
  let matris;
  let matris_peer;
  let hafta=0;
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
              matris=response.xusermatris.matris;
              matris_peer=response.peermatris.matris;
                console.log(response.xusermatris)
                var html = "<tr class='d-flex'><th class='col-2 bg-secondary text-light' scope='row'>isimler</th><td id='' class='col-1'>"+response.peer.ad+"</td><td id='' class='col-1'>"+response.xuser.ad+"</td><td id='' class='col-1'>"+response.peer.ad+"</td><td id='' class='col-1'>"+response.xuser.ad+"</td><td id='' class='col-1'>"+response.peer.ad+"</td><td id='' class='col-1'>"+response.xuser.ad+"</td><td id='' class='col-1'>"+response.peer.ad+"</td><td id='' class='col-1'>"+response.xuser.ad+"</td><td id='' class='col-1'>"+response.peer.ad+"</td><td id='' class='col-1'>"+response.xuser.ad+"</td>" ;
                for(var i=0; i<15; i++){
                    html += "<tr class='d-flex'><th class='col-2 bg-secondary text-light' scope='row'>"+ (i+7) +":00</th>";
                    for(var j=0; j<5; j++){
                      let line="";
                      let index ="";
                      if(i==10) index='A';
                      else if(i==11) index='B';
                      else if(i==12) index='C';
                      else if(i==13) index='D';
                      else if(i==14) index='E';
                      else if(i==15) index='F';

                      if(j<10) line = ""+ i  + j;
                      else line = ""+ index + j;
                        if(response.peermatris.matris[0][j][i] == true){

                            html += "<td id='p"+line+"' class='col-1' style='background-color: green'></td>";
                        }else{
                            html += "<td id='p"+line+"' class='col-1'  ></td>";
                        }
                        if(response.xusermatris.matris[0][j][i] == true){
                            html += "<td id='t"+line+"' class='col-1'  style='background-color: yellow'></td>";
                        }else{
                            html += "<td id='t"+line+"' class='col-1'></td>";
                        }
                    }

                }

                $('#modalTableMatris').append(html);

            },
            error: function(){

            }
        });

    });
    $("#date_kontrol_peer").on('click',function(){
      //console.log(hafta);
      if(event.target.id=="peer_ileri")
      {
        if(hafta<14){
          hafta=hafta+1;
          }
      }
      if(event.target.id=="peer_geri")
      {
        if(hafta>0){
          hafta=hafta-1;
          }
      }
      let line="";
      let index ="";
      for(var i=0; i<5; i++){
          for(var j=0; j<16; j++){
              if(j==10) index='A';
              else if(j==11) index='B';
              else if(j==12) index='C';
              else if(j==13) index='D';
              else if(j==14) index='E';
              else if(j==15) index='F';

              if(j<10) line = ''+ j  + i;
              else line = ''+ index + i;
              if(matris[hafta][i][j]===true){
              $("#t"+line).css("background-color", "yellow");
            }
            else {
              $("#t"+line).css("background-color", "");

            }
            if(matris_peer[hafta][i][j]===true){
            $("#p"+line).css("background-color", "green");
          }
          else {
            $("#p"+line).css("background-color", "");

          }

          }
    }


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
