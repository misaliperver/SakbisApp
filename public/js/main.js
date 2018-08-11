var windowLoc = $(location).attr('pathname');
if(windowLoc === '/userApp/dersprogramiekle'){
    $(document).ready(function(){

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
        });
        
        $("#btn_matrisGonder").on('click',(function(){
            $.ajax({
                url: '/userApp/dersprogramiekle',
                method: 'PUT',
                contentType: 'application/json',
                data: JSON.stringify({matris: matris, private: false}),
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