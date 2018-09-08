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
                  aciklama_matris=response.aciklama[0];

                console.log(aciklama_matris);
              }
              else {
                aciklama_matris=aciklamakur();
                console.log(aciklama_matris);
              }
               if(response.dersProgrami!==null){
                    matris = response.dersProgrami[0];
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

                            if(j<10) line = ""+ j  + i;
                            else line = ""+ index + i;
                            if(matris[i][j]===true){
                            $("#t"+line).css("background-color", "yellow");
                            $("#b"+line).prop('checked', true);
                            }
                            if(typeof aciklama_matris[i]!='undefined'&&aciklama_matris[i]!=null){
                              if(typeof aciklama_matris[i][j]!='undefined'&&aciklama_matris[i][j]!=null)
                              if(matris[i][j]==true)
                              $("#a"+line).text(aciklama_matris[i][j]);
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


        // $( "#tableMatris" ).mouseover(function() {
        //   let ID = event.target.id;
        //   let id="txt"+ID
        //   let value=$("#"+ID).text();
        //   console.log(value);
        //   $("#"+ID).replaceWith('<input type="text" id="'+id+'" value="'+value+'"/>');
        //   $("#"+"txt"+ID).focus();
        // //  $("#"+"txt"+ID ).blur(function() {              });
        //     });
        //     $( "#tableMatris" ).mouseout(function() {
        //               let ID = event.target.id;
        //               var indis = [2];
        //               console.log(aciklama_matris);
        //               indis[0] = parseInt(ID[2]); //Sadece 5'e kadar değer alır.
        //               if(parseInt(ID[1])<10) indis[1] = parseInt(ID[1]);
        //               else if(ID[1]=='A') indis[1] = 10;
        //               else if(ID[1]=='B') indis[1] = 11;
        //               else if(ID[1]=='C') indis[1] = 12;
        //               else if(ID[1]=='D') indis[1] = 13;
        //               else if(ID[1]=='E') indis[1] = 14;
        //               else if(ID[1]=='F') indis[1] = 15;
        //
        //       let value=$( "#"+"txt"+ID ).val();
        //       aciklama_matris[indis[0]][indis[1]]=value;
        //       console.log(aciklama_matris[indis[0]][indis[1]]);
        //       $("#"+ID).text(value);
        //       $( "#"+"txt"+ID).remove();
        //       });
        let area = null;
        let aciklama;
        $('#tableMatris').on('click',function(){
            var ID = event.target.id;
            var indis = [2];
            console.log(ID);
            indis[0] = parseInt(ID[2]); //Sadece 5'e kadar değer alır.
            if(parseInt(ID[1])<10) indis[1] = parseInt(ID[1]);
            else if(ID[1]=='A') indis[1] = 10;
            else if(ID[1]=='B') indis[1] = 11;
            else if(ID[1]=='C') indis[1] = 12;
            else if(ID[1]=='D') indis[1] = 13;
            else if(ID[1]=='E') indis[1] = 14;
            else if(ID[1]=='F') indis[1] = 15;
            if(ID[0]=='b'){
              if(matris[indis[0]][indis[1]] == false){

                  matris[indis[0]][indis[1]] = true;
                  $("#t"+ID[1]+ID[2]).css("background-color", "yellow");
              }else{
                  matris[indis[0]][indis[1]] = false;
                  $("#t"+ID[1]+ID[2]).css("background-color", "");
              }
            }
            if(ID[0]=='a'&&matris[indis[0]][indis[1]] == true){
            aciklama = document.getElementById(ID);
            editStart();
            }
            function editStart() {

              area = document.createElement("INPUT");
              area.setAttribute("type", "text");
              area.className = 'edit';
              area.value = aciklama.innerHTML;

              area.onkeydown = function(event) {
                if (event.key == 'Enter') {
                  this.blur();
                }
              };

              area.onblur = function() {
                editEnd();
              };

              aciklama.replaceWith(area);
              area.focus();
            }

            function editEnd() {
              aciklama.innerHTML = area.value;
              aciklama_matris[indis[0]][indis[1]]=area.value
              area.replaceWith(aciklama);
            }
        });
        $('#otomatikguncellebutton').on('click', function(){
            $.ajax({
                url: 'http://localhost:3000/' + $('#otoUsername').val() + " " + $('#otoPassword').val(),
                method: 'GET',
                success: function(response) {
                    console.log(response);
                    alert(response)
                },
                error: function() {
                    alert(response)
                }
            });
        })
        $("#btn_matrisGonder").on('click',function(){
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
        });

    });
}
else if(windowLoc === '/userApp/Profil'){
    $(document).ready(function(){


        let tumdP;
        let aciklamalar;
        var matris = new Array();
        let aciklama_matris;
        let secili_tarih=new Date();
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
                let donembasi=new Date(2018, 6, 2); //2 temmuz 2018
                 let bugun=new Date();//bugunun tarihi
                 bugun= Date.now();
                 let date1_ms = donembasi.getTime();
                 //let date2_ms = bugun.getTime();

                 // Calculate the difference in milliseconds
                 let difference_ms = bugun - date1_ms;
                 //take out milliseconds
                 difference_ms = difference_ms/1000;
                 difference_ms = difference_ms/60;
                 difference_ms = difference_ms/60;
                 difference_ms=difference_ms/24;
                 let week = Math.floor(difference_ms/7);
                 if(week<14){
                   week=week;
                 }
                   else {
                     week=13;
                   }
                if(response.aciklama!= undefined && response.aciklama.length > 0)
                {
                  aciklama_matris=response.aciklama[week];
                  aciklamalar=response.aciklama;
                }
                else {
                  aciklama_matris=aciklamakur();
                  for (let i = 0; i < 14; i++) {
                    aciklamalar[i]=aciklama_matris
                  }
                  console.log(aciklama_matris);
                }

                //  tumdPKur();
                  tumdP=response.dersProgrami;
                 if(response.dersProgrami!==null){
                    if(week<14){
                      matris = response.dersProgrami[week];
                    }
                      else {
                        matris = response.dersProgrami[13];
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

                              if(j<10) line = 't'+ j  + i;
                              else line = 't'+ index + i;
                              if(matris[i][j]===true){
                              $("#"+line).css("background-color", "yellow");
                            }
                            else {

                            }
                              if (typeof aciklama_matris!='undefined'&&aciklama_matris!=null) {


                              if(typeof aciklama_matris[i]!='undefined'&&aciklama_matris[i]!=null){
                              if(typeof aciklama_matris[i]!='undefined'){
                                if(typeof aciklama_matris[i][j]!='undefined'&&aciklama_matris[i][j]!=null&&matris[i][j]==true)
                                $("#"+line).text(aciklama_matris[i][j]);
                              }
                            }
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
              $("#date_kontrol").on('click',function(){
                if(secili_tarih!=null){

                      console.log("secili tarh  "+secili_tarih);
                      if(event.target.id=="ileri")
                      {

                        let day=secili_tarih.getDate();
                        day=day+7;
                        secili_tarih.setDate(day);
                        console.log("secili tarh  get2  "+secili_tarih);
                      }
                      if(event.target.id=="geri")
                      {
                        secili_tarih.setDate(secili_tarih.getDate()-7);

                      }
                      let donembasi=new Date(2018, 6, 2); //2 temmuz 2018

                       let date1_ms = donembasi.getTime();
                       //let date2_ms = bugun.getTime();
                       console.log("secili tarh 3 "+secili_tarih);
                       // Calculate the difference in milliseconds
                       let difference_ms = secili_tarih - date1_ms;
                       //take out milliseconds
                       difference_ms = difference_ms/1000;
                       difference_ms = difference_ms/60;
                       difference_ms = difference_ms/60;
                       difference_ms=difference_ms/24;
                       let week = Math.floor(difference_ms/7);
                       if(week<14){
                         matris = tumdP[week];
                         aciklama_matris=aciklamalar[week];
                       }
                         else {
                           matris = tumdP[13];
                            aciklama_matris=aciklamalar[13];
                            week=13;
                         }
                         console.log("SU haftaya bakiliyor  "+week);
                         console.log("matriss"+matris);
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
                                 if(matris[i][j]===true){
                                 $("#"+line).css("background-color", "yellow");
                               }
                               else {
                                 $("#"+line).css("background-color", "");
                                   $("#"+line).text("");
                               }
                                 if(typeof aciklama_matris[i]!='undefined'){
                                   if(typeof aciklama_matris[i][j]!='undefined'&&aciklama_matris[i][j]!=null&&matris[i][j]==true)
                                   $("#"+line).text(aciklama_matris[i][j]);
                                 }
                                   else{
                                  
                                   }
                             }
                       }

                }



              });



      });
  }
