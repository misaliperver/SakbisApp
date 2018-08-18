
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
    /*$('#searchbyPeer').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#searchButton').click();//Trigger search button click event
        }
    });*/




});