var windowLoc = $(location).attr('pathname');
if(windowLoc === '/userApp/dersprogramiekle'){
    $(document).ready(function(){
      let aciklama_matris;
      function aciklamakur(){
               aciklama_matris=new Array();
              aciklama_matris[0] = new Array(16);
              aciklama_matris[1] = new Array(16);
              aciklama_matris[2] = new Array(16);
              aciklama_matris[3] = new Array(16);
              aciklama_matris[4] = new Array(16);
              return aciklama_matris;
      }
        var matris = new Array();
        function matrisKur(){
            console.log('a');
            matris[0] = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false)
            matris[1] = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false)
            matris[2] = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false)
            matris[3] = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false)
            matris[4] = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false)
            console.log('aaa');
        }

       $.ajax({
            url: '/userApp/dersprogramivarmi',
            method: 'GET',
            dataType: 'json',
            success: function(response){
              if(response.aciklama!= undefined && response.aciklama.length > 0)
              {
                  aciklama_matris=response.aciklama;

                console.log(aciklama_matris);
              }
              else {
                aciklama_matris=aciklamakur();
                console.log(aciklama_matris);
              }
               if(response.dersProgrami!==null){
                    matris = response.dersProgrami;
                    var line="";
                    var index ="";
                    for(var i=0; i<5; i++){
                        for(var j=0; j<16; j++){
                            if(j==10) index='A';
                            else if(j==11) index='B';
                            else if(j==12) index='C';
                            else if(j==13) index='D';
                            else if(j==14) index='E';
                            else if(j==15) index='F';

                            if(j<10) line = 't'+ j  + i;
                            else line = 't'+ index + i;
                            if(matris[i][j]===true)
                            $("#"+line).css("background-color", "yellow");
                            if(typeof aciklama_matris[i]!='undefined'){
                              if(typeof aciklama_matris[i][j]!='undefined'&&aciklama_matris[i][j]!=null)
                              $("#"+line).text(aciklama_matris[i][j]);
                            }
                              else {
                              //    $("#"+line).text("aciklama");
                              }
                        }
                    }
               }else{
                matrisKur();
               }
            },
            error: function() {
                alert("Server'la bağlantı kurulamadı!")
            }
        });
        $('#tableMatris').on('click',function(){
            var ID = event.target.id;
            if(ID != ""){
                    var indis = [2];
                    console.log(aciklama_matris);
                    indis[0] = parseInt(ID[2]); //Sadece 5'e kadar değer alır.
                    if(parseInt(ID[1])<10) indis[1] = parseInt(ID[1]);
                    else if(ID[1]=='A') indis[1] = 10;
                    else if(ID[1]=='B') indis[1] = 11;
                    else if(ID[1]=='C') indis[1] = 12;
                    else if(ID[1]=='D') indis[1] = 13;
                    else if(ID[1]=='E') indis[1] = 14;
                    else if(ID[1]=='F') indis[1] = 15;

                    console.log(indis[0],indis[1],matris[indis[0]][indis[1]])

                    if(matris[indis[0]][indis[1]] == false){

                        matris[indis[0]][indis[1]] = true;

                        $("#"+ID).css("background-color", "yellow");
                    }else{
                        matris[indis[0]][indis[1]] = false;
                        $("#"+ID).css("background-color", "");
                    }
                    console.log(indis[0],indis[1],matris[indis[0]][indis[1]])
            }
            let id="txt"+ID
            let value=$("#"+ID).text();
            console.log(value);
            $("#"+ID).append('<input type="text" id="'+id+'" value="'+value+'"/>');
            $("#"+"txt"+ID).focus();
            $("#"+"txt"+ID ).blur(function() {
              let value=$( this ).val();
              aciklama_matris[indis[0]][indis[1]]=value;
              console.log(aciklama_matris[indis[0]][indis[1]]);
              $("#"+ID).text(value);
              $( this ).remove();
            });
        });

        $("#btn_matrisGonder").on('click',(function(){
            $.ajax({
                url: '/userApp/dersprogramiekle',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({matris: matris, private: false,aciklama:aciklama_matris}),
                success: function(response) {
                    console.log(response);
                    alert('Başarıyla Kaydedildi.')
                },
                error: function() {
                    alert('Kaldedilemedi!')
                }
            });
        }));

    });
}
else if(windowLoc === '/userApp/Profil'){
    $(document).ready(function(){


        var matris = new Array();
        let aciklama_matris;
        function matrisKur(){
            console.log('a');
            matris[0] = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false)
            matris[1] = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false)
            matris[2] = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false)
            matris[3] = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false)
            matris[4] = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false)
            console.log('aaa');
        }
        function aciklamakur(){
                let aciklama_matris=new Array();
                aciklama_matris[0] = new Array(16);
                aciklama_matris[1] = new Array(16);
                aciklama_matris[2] = new Array(16);
                aciklama_matris[3] = new Array(16);
                aciklama_matris[4] = new Array(16);
                return aciklama_matris;
}


  $('#duyurular').on('click', function(){
    let id = event.target.id;
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
// $.ajax({
//      url: '/profil/duyuru',
//      method: 'GET',
//      dataType: 'json',
//      success: function(response){
//        response.detaylar;
//
//      },
//      error: function() {
//          alert("Server'la bağlantı kurulamadı!")
//      }
//  });

       $.ajax({
            url: '/userApp/dersprogramivarmi',
            method: 'GET',
            dataType: 'json',
            success: function(response){
              console.log(response.aciklama);

              if(response.aciklama!= undefined && response.aciklama.length > 0)
              {
                  aciklama_matris=response.aciklama;

                console.log(aciklama_matris);
              }
              else {
                aciklama_matris=aciklamakur();
                console.log(aciklama_matris);
              }
               if(response.dersProgrami!==null){
                    matris = response.dersProgrami;
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

                            if(j<10) line = 't'+ j  + i;
                            else line = 't'+ index + i;
                            if(matris[i][j]===true)
                            $("#"+line).css("background-color", "yellow");

                            if(typeof aciklama_matris[i]!='undefined'){
                              if(typeof aciklama_matris[i][j]!='undefined'&&aciklama_matris[i][j]!=null&&matris[i][j]==true)
                              $("#"+line).text(aciklama_matris[i][j]);
                            }
                              else{
                              //    $("#"+line).text("aciklama");
                              }
                        }
                  }
}

               else{
                matrisKur();
               }
            },
            error: function() {
                alert("Server'la bağlantı kurulamadı!")
            }
        });


    });
}
