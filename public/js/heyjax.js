
$(document).ready(function(){
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


});