$(document).ready(function(){
    $('#btn_Karsilastir').on('click', function(){
        var text = window.location.pathname.split('/');
        var programID = text[3];
        var intervaL = $('#interval').text();
         $.ajax({
            url: window.location.pathname,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({programId: programID, interval: intervaL}),
            success: function(response) {
                console.log(response)
                $('#grupimg').css("display", "none")
                $('#grupmatris').css("display", "")

                for(var i=0; i<response.saatler.length; i++){
                    for(var j=0; j<response.saatler[i].length; j++){
                        var gline="";
                        var gindex ="";
                        console.log(response.saatler[i][j])
                        if(j==10) gindex='A';
                        else if(j==11) gindex='B';
                        else if(j==12) gindex='C';
                        else if(j==13) gindex='D';
                        else if(j==14) gindex='E';
                        else if(j==15) gindex='F';

                            if(j<10) gline = 't'+ j  + i;
                            else gline = 't'+ gindex + i;
                            if(response.saatler[i][j]=="1")  
                            $("#"+gline).text("%" + Math.floor((response.saatler[i][j] / response.toplamKisi) * 100))
                    }
                }
            },
            error: function() {
               
            }
        }); 
    })
});