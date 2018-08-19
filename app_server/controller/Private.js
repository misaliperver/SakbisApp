var path = require('path'); //path modülünü ekledik
var Matris = require('../model/dersprogrami');
var User = require('../model/user');
var Grup = require('../model/GrupProgrami');
var passport = require('passport');

module.exports.get_dersProgramiEkle = function(req, res){
    res.render('PrivateApp/dersprogramiEkle');

}
module.exports.get_Ajax_dersProgramiEkle = function(req, res){
    Matris.findOne({username: req.user.username}, function (err, dersProgrami) {
        if(err) throw err;
        if(dersProgrami){
            res.json({dersProgrami: dersProgrami.matris,aciklama:dersProgrami.aciklama});
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
module.exports.put_Ajax_aciklamaEkle = function(req, res){
    let matris=req.body.matris;
    let private=req.body.private;
    let aciklama   = req.body.aciklama;
    let username = req.user.username;
    let date = Date.now();

    let msg = "";
        Matris.findOne({username: username}, function (err, dersProgrami) {
            if(dersProgrami){
                Matris.findOneAndUpdate({username: username}, {
                    matris: matris,
                    aciklama:aciklama,
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
                    aciklama:aciklama,
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
    var i=0;
    if(req.user.username) i++; if(req.user.password) i++;if(req.user.ad)  i++;if(req.user.soyad) i++;
    if(req.user.yas)  i++;if(req.user.userimg)  i++;if(req.user.telno)  i++;
    if(req.user.unibolum) i++;if(req.user.bio)  i++;   if(req.user.cinsiyet)i++;

    res.render('PrivateApp/profil', {len: i});

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
                            myMatris =   myDersProgrami.matris[i][j] && myDersProgrami.matris[i][j+1];
                            seMatris =   seDersProgrami.matris[i][j] && seDersProgrami.matris[i][j+1];
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
const getUser = async (query) => {
  const grup= await Grup.findOne(query);
    let dersprogramlariARRAY=new Array(grup.people.length);
    let i=0;
  for(const item of grup.people){
    query = {username: item};
    dersprogramlariARRAY[i] = await   Matris.findOne(query);
    i++;
   }
  return { grup:grup, dersprogramlariARRAY:dersprogramlariARRAY };
};
module.exports.post_dersProgramGrubIdIndex = function (req, res){
    let dersprogramlari;
    let sayac;
    let saatler;
    let denemedizisi;
    console.log(req.body);
    getUser({ programId: req.body.programId }).then((results)=>{
        dersprogramlari = new Array(results.grup.people.length);//grupdaki insanların sayısı kadar
        for(let i=0;i<results.grup.people.length;i++)
        {
            dersprogramlari[i]=results.dersprogramlariARRAY[i].matris;
        }
        sayac=0;
        saatler=new Array(5);
        denemedizisi=new Array(5);//5  gün
        //return asenkronIslem3(sonuc2);
        for(let i=0;i<saatler.length;i++)
        {
            saatler[i]=new Array(16-req.body.interval+1);
            denemedizisi[i]=new Array(16-req.body.interval+1);//15 saaat
            for(let j=0;j<denemedizisi[i].length;j++)
            {
                saatler[i][j]=true;
                denemedizisi[i][j]=new Array(results.grup.people.length);//insan sayısı
            }
        }
        if(req.body.interval!=1){
            let bulusmaSaati=req.body.interval;//buluşma saatine göre belirle
            let Yenidersprogramlari=new Array(results.grup.people.length);//sikiştirilmiş ders programı
            for(let i=0;i<dersprogramlari.length;i++)
            {
                Yenidersprogramlari[i]=new Array(5);
                for(let j=0;j<Yenidersprogramlari[i].length;j++)
                {
                    Yenidersprogramlari[i][j]=new Array(15-(bulusmaSaati-1));
                }
            }//yeni ders programi initilaziladim
            //formatlama islemi

            for(let i=0; i<dersprogramlari.length; i++){       //kisi sayisi
                for(let j=0; j<dersprogramlari[i].length; j++){//5 gün
                    for(let k=0; k<(dersprogramlari[i][j].length-bulusmaSaati+1); k++){//saat
                        for(let z=0; z<bulusmaSaati; z++){
                            if(dersprogramlari[i][j][k+z]!=true)
                            {
                                Yenidersprogramlari[i][j][k]=false;
                                break;
                            }
                            else
                            {
                                Yenidersprogramlari[i][j][k]=true;
                            }
                        }
                    }
                }
            }
            dersprogramlari=Yenidersprogramlari;
        }
        for (let i = 0; i<dersprogramlari[0].length; i++) {//5 gün sayisi
            for(let j=0; j<dersprogramlari[0][0].length; j++){//16 saat sayisi
                for(let k=0; k<dersprogramlari.length; k++){//2 kisi sayisi
                    if(dersprogramlari[k][i][j]){
                        sayac++;
                        denemedizisi[i][j][k]=results.grup.people[k];
                    }else{
                        denemedizisi[i][j][k]='$';
                    }
                }
                saatler[i][j]=sayac;
                sayac=0;
            }
        }
        var result = denemedizisi.filter(eleman => !isNaN(eleman));
        console.log(saatler); console.log(denemedizisi);console.log(result);
        res.json({saatler:saatler, matris:denemedizisi, result:result, toplamKisi: results.grup.people.length});
    });//then fonksiyonunun sonu
}

module.exports.delete_dersProgramGrubIdIndex = function(req, res){
    Grup.removeGrupByProjectId(req.params.programID, function(err, thisGrup){
        if(err) throw err;
        res.json({msg: "silindi"});
    })
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

module.exports.get_dersProgramGrubIdIndex = function(req, res){
    var programID = req.params.programID;
    var username = req.user.username;
    Grup.getGrupByProjectId(programID, function(err, grup){
        if(err) throw err;
        if(grup){ // Böyle bir grup varmı?
            if(grup.secret == false){ // Herkese açıksa
                res.render('PrivateApp/GrupProgrami/detail', {grup});
            }else{ // Gizliyse açıksa
                if(grup.from === username) res.render('PrivateApp/GrupProgrami/detail', {grup});
                else{
                    res.render('PrivateApp/GrupProgrami/detail',{hata: 'Bu gruba erişim izniniz yok.'});
                }
            }
        }else{
            res.render('PrivateApp/GrupProgrami/detail',{hata: "Böyle bir grup yok"});
        }
    })

}


module.exports.get_searchtoPeer = function(req, res){
    console.log('naber')
    User.getPeer(req.params.peerID, function(err, result){
        res.json({result: result})
    })
}

module.exports.get_ProfilOtherID = function(req, res){
    var arananID = req.url.substring(22,32);

    User.getPeerUserByID(arananID, function(err, peer){
        if(err) throw err;
        if(peer){
            var i=0;
            if(peer.username) i++; if(peer.password) i++;if(peer.ad)  i++;if(peer.soyad) i++;
            if(peer.yas)  i++;if(peer.userimg)  i++;if(peer.telno)  i++;
            if(peer.unibolum) i++;if(peer.bio)  i++;   if(peer.cinsiyet)i++;
            Matris.getUserByUsername(arananID, function(err, dersProgrami){
                if(err) throw err;
                if(dersProgrami){
                    peer['dersProgrami']= dersProgrami;
                }
                res.render('PrivateApp/peer', {peer: peer, len:i})
            });
        }else{
            res.render('PrivateApp/peer', {msg: "Böyle biri yok"})
        }
    })
}

module.exports.get_profilAyarlar = function(req, res){
   res.render('PrivateApp/ayarlar');
}
module.exports.post_profilAyarlar = function(req, res){
    var user = {};

    var username = req.user.username;
    var password = req.body.sifre;    if(password) user['password'] = password;
    var ad = req.body.ad;             if(ad)       user['ad'] = ad;
    var soyad = req.body.soyad;       if(soyad)    user['soyad'] = soyad;
    var yas = req.body.yas;           if(yas)      user['yas'] = yas;
    var userimg = req.body.userimg;   if(userimg)  user['userimg'] = userimg;
    var telno = req.body.telno;       if(telno)    user['telno'] = telno;
    var unibolum = req.body.unibolum; if(unibolum) user['unibolum'] = unibolum;
    var bio = req.body.bio;           if(bio)      user['bio'] = bio;
    var cinsiyet = req.body.cinsiyet; if((cinsiyet=="Erkek" || cinsiyet=="Kadın" || cinsiyet=="Karışık")) user['cinsiyet'] = cinsiyet;
    console.log(user);
    User.findOneAndUpdate({username: username}, user, function(err, rawResponse) {
        if (err){ msg= 'Güncellenemedi';  throw err;}
        else {msg= 'Güncelleme başarılı'; }
        res.redirect('/userApp/Profil');
     });

}

/*
Matris.getUserByUsername(req.user.username, function(err, myDersProgrami){
    if(err) throw err;
    if(myDersProgrami){
        user.dersProgrami = myDersProgrami;
        res.render('PrivateApp/peer',{peer: peer, user: user})
    }
});*/
