var windowLoc = $(location).attr('pathname');
if(windowLoc !== '/userApp/dersprogramiekle'){
$(document).ready(function(){
    let selector = new Array(-1,-1);

    $('#tableMatris').on('click',function(){
        console.log("selector0  "+selector[0]);
        console.log("selector1  "+selector[1]);
        let index,line;
        if(selector[1]==10) index='A';
        else if(selector[1]==11) index='B';
        else if(selector[1]==12) index='C';
        else if(selector[1]==13) index='D';
        else if(selector[1]==14) index='E';
        else if(selector[1]==15) index='F';

        if(selector[1]<10) line = 't'+ selector[1]  + selector[0];
        else line = 't'+ index+ selector[0];
    let yuzde  =$("#"+line).text();
    yuzde=yuzde.split('%');
    yuzde=yuzde[1];
    console.log(  "yuzde     "+yuzde);
    if(yuzde==100) $("#"+line).css("background-color", "#79d37b");
    else if(yuzde<100 && yuzde>=90) $("#"+line).css("background-color", "#9af395");
    else if(yuzde<90 && yuzde>=80) $("#"+line).css("background-color", "#b2b100");
    else if(yuzde<80 && yuzde>=70) $("#"+line).css("background-color", "#ccff66");
    else if(yuzde<70 && yuzde>=60) $("#"+line).css("background-color", "#ffff66");
    else if(yuzde<60 && yuzde>=50) $("#"+line).css("background-color", "#ffcc00");
    else if(yuzde<50 && yuzde>=30) $("#"+line).css("background-color", "#ff9933");
    else if(yuzde<30 && yuzde>=10) $("#"+line).css("background-color", "#ff6600");
    else if(yuzde<10 && yuzde>=0) $("#"+line).css("background-color", "#ff0000");
        var ID = event.target.id;
        console.log(ID);
        if($("#"+ID).text()=="%0")
        {
            alert("Kimsenin boş olmadığı bir vakit seçtiniz. Seçiminizi değiştiriniz.");
        }else{
        if(ID != ""){

                selector[0] = parseInt(ID[2]); //Sadece 5'e kadar değer alır.
                if(parseInt(ID[1])<10) selector[1] = parseInt(ID[1]);
                else if(ID[1]=='A') selector[1] = 10;
                else if(ID[1]=='B') selector[1] = 11;
                else if(ID[1]=='C') selector[1] = 12;
                else if(ID[1]=='D') selector[1] = 13;
                else if(ID[1]=='E') selector[1] = 14;
                else if(ID[1]=='F') selector[1] = 15;

                $("#"+ID).css("background-color", "white");
            }
            }
    });
    var tableI = -1;
    var tableJ = -1;
    var TUMMATRIS;
    $('#tableMatris').bind("contextmenu", function (event) {
        var ID = event.target.id;
        var j = parseInt(ID[1]);
        var i= parseInt(ID[2]);
        if(j==10) gindex='A';
        else if(j==11) gindex='B';
        else if(j==12) gindex='C';
        else if(j==13) gindex='D';
        else if(j==14) gindex='E';
        else if(j==15) gindex='F';
        console.log(j + "  " + i)
        tableI = i; tableJ = j;
        event.preventDefault();
        $(".custom-menu").finish().toggle(100).
        css({
            top: event.pageY + "px",
            left: event.pageX + "px"
        });
    });
    $('#tableMatris').bind("mousedown", function (e) {
        if (!$(e.target).parents(".custom-menu").length > 0) {
            $(".custom-menu").hide(100);
        }
    });
    $(".custom-menu li").click(function(){
        var xtext= "<strong>Gelenler</strong> <i>"+ $("#t"+tableJ+""+tableI).text() +"</i> <br> <ul class='list-group'>";
        TUMMATRIS[tableI][tableJ].forEach(function(person){
            if(person !== '$')
            xtext += "<li class='list-group-item'>" + person + "</li>";
        })
        xtext += "</ul>";
        switch($(this).attr("data-action")) {
            case "second": $('.modal-body').html(xtext); break;
            case "third":  break;
        }
        $(".custom-menu").hide(100);
    });

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
                TUMMATRIS = response.matris;
                $('#grupimg').css("display", "none");
                $('#grupmatris').css("display", "");
                $('#btn_photo').css("display", "");
                $('#btn_onayla').css("display", "");
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
        $('#btn_onayla').css("display", "none");
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
    $('#btn_onayla').on('click', function(){
      var text = window.location.pathname.split('/');
      var programID = text[3];
      var intervaL = $('#interval').text();
      if(selector[0]==-1){
        alert('Önce etkinlik için tablodan tarih seçiniz.')
      }else{
        $.ajax({
            url: window.location.pathname,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({programId: programID, interval: intervaL,gun:selector[0],saat:selector[1]}),
            success: function(response){
                alert('olusturuldu');
            },
            error: function() {

            }
        });
      }
    });//duyuru onayla son
});
}
