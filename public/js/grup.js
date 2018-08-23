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
                console.log(response);

                $('#grupimg').css("display", "none");
                $('#grupmatris').css("display", "");
                $('#btn_photo').css("display", "");
                $('#btn_Karsilastir').text("Yinele");

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
                            var yuzdesi =Math.floor((response.saatler[i][j] / response.toplamKisi) * 100)
                            if(yuzdesi==100) $("#"+gline).css("background-color", "#79d37b"); 
                            else if(yuzdesi<100 && yuzdesi>=90) $("#"+gline).css("background-color", "#9af395"); 
                            else if(yuzdesi<90 && yuzdesi>=80) $("#"+gline).css("background-color", "#b2b100"); 
                            else if(yuzdesi<80 && yuzdesi>=70) $("#"+gline).css("background-color", "#ccff66"); 
                            else if(yuzdesi<70 && yuzdesi>=60) $("#"+gline).css("background-color", "#ffff66"); 
                            else if(yuzdesi<60 && yuzdesi>=50) $("#"+gline).css("background-color", "#ffcc00"); 
                            else if(yuzdesi<50 && yuzdesi>=30) $("#"+gline).css("background-color", "#ff9933"); 
                            else if(yuzdesi<30 && yuzdesi>=10) $("#"+gline).css("background-color", "#ff6600"); 
                            else if(yuzdesi<10 && yuzdesi>=0) $("#"+gline).css("background-color", "#ff0000"); 
                               
                           
                            $("#"+gline).text("%" + yuzdesi); 
                    }
                }
            },
            error: function() {

            }
        });
    });

    $('#btn_photo').on('click', function(){
        $('#grupimg').css("display", "");
        $('#grupmatris').css("display", "none");
        $('#btn_photo').css("display", "none");
        $('#btn_Karsilastir').text("Karşılaştır");
    });

    $('#btn_Sil').on('click', function(){
        $.ajax({
            url: window.location.pathname,
            type: 'DELETE',
            success: function(response){
                alert('silindi');
            },
            error: function() {

            }
        });
    });
});
