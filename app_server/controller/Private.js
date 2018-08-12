var path = require('path'); //path modülünü ekledik
var Matris = require('../model/dersprogrami');
var Grup = require('../model/GrupProgrami');
var passport = require('passport');

module.exports.get_dersProgramiEkle = function(req, res){
    res.render('PrivateApp/dersprogramiEkle');
        
}
module.exports.get_Ajax_dersProgramiEkle = function(req, res){
    Matris.findOne({username: req.user.username}, function (err, dersProgrami) { 
        if(err) throw err;
        if(dersProgrami){
            res.json({dersProgrami: dersProgrami.matris});
        }else{
            res.json({dersProgrami: null});
        }
    });        
}

module.exports.put_Ajax_dersProgramiEkle = function(req, res){
    var matris   = req.body.matris;
    var private  = req.body.private;
    var username = req.user.username;
    var date = Date.now();

    var msg = "";
        Matris.findOne({username: username}, function (err, dersProgrami) { 
            if(dersProgrami){
                Matris.findOneAndUpdate({username: username}, {
                    matris: matris,
                    private: private,
                    username: username,
                    date: date
                  }, function(err, rawResponse) {
                    if (err){ msg= 'Güncellenemedi';  throw err;} 
                    else {msg= 'Güncelleme başarılı'; }
                    res.json({msg});
                 });
            }else{
                var newDersProgrami = new Matris({
                    matris: matris,
                    private: private,
                    username: username,
                    date: date
                });
                Matris.createDersProgrami(newDersProgrami, function (err, callbackDersProgrami) {
                    if (err){ msg = 'Yenisi oluşturululamadı'; throw err; }  
                    else {msg= 'Yeni kayıt oluşturuldu.'; }
                });
                res.json({msg});
            }
        });
        
}

module.exports.get_profil = function(req, res){
    res.render('PrivateApp/profil');
    
}

/*
module.exports.get_ikiKisilikKarsilastirma = function(req,res){
    var searchUsername = req.body.searchUsername; // aranacak kişi
    var saat = 17 - parseInt(req.body.saat); // 17-n
    var seMatris;
    var myMatris;
    Matris.findOne({username: searchUsername}, function (err, seDersProgrami) { 
        if(err) throw err;
        if(seDersProgrami){
            Matris.findOne({username: req.user.username}, function (err, myDersProgrami) { 
                if(err) throw err;
                if(myDersProgrami){
                    for(var i=0; i<5; i++){
                        for(var j=0; j<saat; j++){ 
                            myMatris =   myDersProgrami[i][j] && myDersProgrami[i][j+1];
                            seMatris =   seDersProgrami[i][j] && seDersProgrami[i][j+1];              
                        }
                    }  
                }else{
                    console.log('Senin kayıtlı bir ders programın yok.')
                }
            });
        }else{
            console.log('Aradığın kişinin kayıtlı bir ders programı yok. ')
        }
    }); 
   
}
*/


module.exports.get_dersProgramiKarsilastir =function (req, res){
    let dersprogramlari = new Array(10);
    let sayac=0;
    let saatler=new Array(5);
    let denemedizisi=new Array(5);
    for(let i=0;i<saatler.length;i++)
    {
        saatler[i]=new Array(15);
        denemedizisi[i]=new Array(15);
        for(let j=0;j<denemedizisi[i].length;j++)
        {
            denemedizisi[i][j]=new Array(8);
        }
    }

    for (let i = 0; i < dersprogramlari.length; i++) {
        dersprogramlari[i] = new Array(5);
        for(let j=0;j<dersprogramlari[i].length;j++)
        {
            dersprogramlari[i][j] = new Array(15);
            for(let k=0;k<dersprogramlari[i][j].length;k++){
                if(Math.random() >= 0.5)
                dersprogramlari[i][j][k]=true;
                else
                dersprogramlari[i][j][k]=false;
            }
        }
    }
    for (let i = 0; i < dersprogramlari[i].length; i++) {
        for(let j=0;j<dersprogramlari[1][0].length;j++){
            for(let k=0;k<dersprogramlari.length;k++){
                if(dersprogramlari[k][i][j]){
                sayac++;
                denemedizisi[i][j][k]=k;
                }
                else
                denemedizisi[i][j][k]='$';
            }
            saatler[i][j]=sayac;
            sayac=0;
        }

    }
    var result = denemedizisi.filter(eleman =>eleman !== undefined && !isNaN(eleman));
    console.log(saatler);
    console.log(denemedizisi);
    res.render('anasayfa');
}

module.exports.get_dersProgramGrubIndex = function(req, res){
    var username = req.user.username;
    Grup.getGrupByUsername(username, function(err, grup){
        res.render('PrivateApp/GrupProgrami/index',{gruplar: grup});
    })
   
}

var randomstring = require("randomstring");
module.exports.get_dersProgramGrubOlustur = function(req, res){
    var ran = randomstring.generate(16);
    var bugun = new Date();
    var fbugun = bugun.toJSON();
    res.render('PrivateApp/GrupProgrami/olustur', {ras: ran, date: fbugun.substring(0,16)});
}
module.exports.post_dersProgramGrubOlustur = function(req, res){
    var username = req.user.username;
    var title = req.body.title;
    var issue = req.body.issue;
    var startTime = req.body.startTime;
    var finishTime = req.body.finishTime;
    var people = req.body.people.split(" ");
    var secret = true;
    if(req.body.secret)  secret = true;
    else secret=false;
    req.checkBody('title', 'Başlık kısmı boş bırakılmamalıdır.').notEmpty();
    req.checkBody('issue', 'Açıklama kısmı boş bırakılmamalıdır.').notEmpty();
    req.checkBody('startTime', 'startTime kısmı boş bırakılmamalıdır.').notEmpty();
    req.checkBody('finishTime', 'finishTime kısmı boş bırakılmamalıdır.').notEmpty();
   
    var hatalar = req.validationErrors();
    var interval=0;
    try{interval = parseInt(req.body.interval);  if(isNaN(interval)) hatalar.push({param:'interval',msg:'Uygun aralık değeri seçiniz.', value:''})}catch(err){ 
        hatalar.push({param:'interval',msg:'Uygun aralık değeri seçiniz.', value:''})
    }
    if(interval>11 || interval<1) hatalar.push({param:'interval',msg:'Uygun aralık değeri seçiniz.', value:''})
    console.log(hatalar);
    var ran = randomstring.generate(16);
    var bugun = new Date();
    var fbugun = bugun.toJSON();
    if (hatalar) {
		res.render('PrivateApp/GrupProgrami/olustur', {
            hatalar: hatalar,
            ras: ran,
            date: fbugun.substring(0,16)
		});
    }
    else{
        var programID = username + "-" + randomstring.generate(16);
        Grup.findOne({programId: programID}, function (err, grupProgrami) { 
            if(grupProgrami){
              console.log('cakisma var yandık.');
            }else{
                var newGrupProgrami = new Grup({
                    programId: programID,
                    from: username,
                    title: title,
                    issue: issue,
                    startTime: startTime,
                    finishTime: finishTime,
                    people: people,
                    interval:interval,
                    secret: secret
                    
                });
                Grup.createGrupProgrami(newGrupProgrami, function (err, callbackGrupProgrami) {
                    if (err){ msg = 'Yenisi oluşturululamadı'; throw err; }  
                    else {msg= 'Yeni kayıt oluşturuldu.'; }
                });
                res.redirect('/userApp/grup');
            }
        });
    }
}