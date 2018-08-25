var path = require('path'); //path modülünü ekledik
var Matris = require('../model/dersprogrami');
var User = require('../model/user');
var Grup = require('../model/GrupProgrami');
var Duyuru = require('../model/duyuru');
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
    let aciklama= req.body.aciklama;
    var msg = "";
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
      let detaylar=new Array();
    if(req.user.username) i++; if(req.user.password) i++;if(req.user.ad)  i++;if(req.user.soyad) i++;
    if(req.user.yas)  i++;if(req.user.userimg)  i++;if(req.user.telno)  i++;
    if(req.user.unibolum) i++;if(req.user.bio)  i++;   if(req.user.cinsiyet)i++;
    Duyuru.find(function(err,duyurular)
  {
    if(err)
    throw err;
    if(duyurular.length==0) {
        res.render('PrivateApp/profil', {len: i,detaylar:detaylar});
    }
    let flag=true;
    let counter = 0;
    let sayac=0;
    for(let a=0;a<duyurular.length;a++)
    {
      console.log(duyurular.length);
      let grupID=duyurular[a].programId;
      let interval=duyurular[a].interval;//2 saatlik bulusma
      let gun=duyurular[a].gun;//perşembe
      let saat=duyurular[a].saat;//9+4ün saatten baslar
          query={programId: grupID}
          Grup.findOne(query,function(err,grup){
            if(err)
            throw err;
            for(const item of grup.people){
              if(req.user.username==item){
                Matris.findOne({username:req.user.username},function(err,matris){
                  if(err)
                  throw err;
                  flag=true;
                  for(let j=0;j<interval;j++){
                  if(matris.matris[gun][saat+j]){
                    flag=true;
                    break;
                  }
                  else{
                    flag=false;
                  }
                  }
                  if(!flag){
                  detaylar[sayac]={programId:grupID,interval:interval,gun:gun,saat:saat}
                  sayac++;
                  console.log("sayac  :"+sayac);
                    }
                  })
              }


            }
            counter++;
            if(counter==duyurular.length){
              console.log(detaylar);
              console.log("gonderme");
              res.render('PrivateApp/profil', {len: i,detaylar:detaylar});
            }

          })
    }
  });
    }

module.exports.post_duyuruonayla = function (req, res){
  let matris;
  let aciklama;
console.log(req.body.id);
Duyuru.findOne({programId:req.body.id},function(err,duyuru){
  if(err)
  throw err;
  if(duyuru!==null){
  Matris.findOne({username:req.user.username},function(err,dersprogrami){
matris=dersprogrami.matris;
aciklama=dersprogrami.aciklama;
    if(err)
    throw err;
    for(let i=0;i<duyuru.interval;i++){
    matris[duyuru.gun][duyuru.saat+i]=true;
    aciklama[duyuru.gun][duyuru.saat+i]="etkinlik";
  }
  Matris.findOneAndUpdate({username: req.user.username}, {
      matris: matris,
      aciklama:aciklama
    }, function(err, rawResponse) {
      if (err){
          throw err;}

   });


    //gun saat interval programId
  });
}
  });
res.redirect('/userApp/Profil');
}

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
                saatler[i][j]=0;
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
                            if(dersprogramlari[i][j][k+z]==true)
                            {
                                Yenidersprogramlari[i][j][k]=true;
                                break;
                            }
                            else
                            {
                                Yenidersprogramlari[i][j][k]=false;
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
                    if(!dersprogramlari[k][i][j]){
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
    Grup.getGrupByProjectId(req.params.programID,function(err, grup){
        if(err) throw err;
        if(grup.from === req.user.username){
            Grup.removeGrupByProjectId(req.params.programID, function(err, thisGrup){
                if(err) throw err;
                res.json({msg: "silindi"});
            })
        }
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
    let username = req.user.username;
    let title = req.body.title;
    let issue = req.body.issue;
    let startTime = req.body.startTime;
    let finishTime = req.body.finishTime;
    let people = req.body.people.split(" ");
    let secret = true;
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
                if(grup.from === username){
                    res.render('PrivateApp/GrupProgrami/detail', {grup});
                }else{
                   // res.render('PrivateApp/GrupProgrami/detail', {grup}); // Bu kısmı arama sekmesine yolayacaksın
                }
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
    if(arananID===req.user.username){
        res.redirect('/userApp/Profil');
    } else{
        User.getPeerUserByID(arananID, function(err, peer){
            if(err) throw err;
            if(peer){
                var i=0;
                i++;//pasport için
                if(peer.username) i++;  if(peer.ad)       i++; if(peer.soyad)   i++;
                if(peer.yas)      i++;  if(peer.userimg)  i++; if(peer.telno)   i++;
                if(peer.unibolum) i++;  if(peer.bio)      i++; if(peer.cinsiyet)i++;
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
}

module.exports.get_grupGirisi = function(req, res){
    Grup.getGrupLimit(function(err, gruplar){
        if(err) throw err;
        
        console.log(gruplar[0].title)
        if(gruplar){
            res.render('PrivateApp/grupgirisi',{gruplar: gruplar});
        }
    })
    
}
module.exports.get_Ajax_grupGirisi = function(req, res){
    Grup.getGrupbyIDandSecret(req.params.grupID, function(err, result){
        if(err) throw err;
        if(result){
            res.json({gruplar: result})
        }
    })
   
}
module.exports.get_grupGirisiThis = function(req, res){
    var arananID = req.url.substring(29,56);
    var username = req.user.username;
    Grup.getGrupByProjectId(arananID, function(err, grup){
        if(err) throw err;
        if(grup){ // Böyle bir grup varmı?
            if(grup.secret == false){ // Herkese açıksa
                if(grup.from === username){ // Grubun kurucusu musun?
                    res.redirect('/userApp/grup/' + arananID);
                }else{
                    var varmi = false;
                    grup.people.forEach(function(person){
                        if(person === username){ // Bu gruba ekli misin?
                            varmi = true;
                            res.render('PrivateApp/GrupProgrami/searchgrup', {grup:grup, varsin:true});
                        }
                    })        
                    if(varmi==false){
                        res.render('PrivateApp/GrupProgrami/searchgrup', {grup:grup});
                    }           
                }                
            }else{ // Gizliyse
                if(grup.from === username){ // Grubun kurucusu musun?
                    res.redirect('/userApp/grup/' + arananID);
                }else{
                    var varmi = false;
                    grup.people.forEach(function(person){
                        if(person === username){ // Bu gruba ekli misin?
                            varmi = true;
                            res.render('PrivateApp/GrupProgrami/searchgrup', {grup:grup, varsin:true});
                        }
                    }) 
                    if(varmi==false){
                        res.render('PrivateApp/GrupProgrami/searchgrup',{hata: 'Bu gruba erişim izniniz yok.'});      
                    }  
                }
            }
        }else{
            res.render('PrivateApp/GrupProgrami/detail',{hata: "Böyle bir grup yok"});
        }
    })
}
module.exports.put_grupGirisiThisAccept = function(req, res){
    var arananID = req.params.grupID; console.log(arananID)
    var username = req.user.username;
    Grup.getGrupByProjectId(arananID, function(err, grup){
       if(err) throw err;
       if(grup){
            var juiss=false;
            grup.people.forEach(function(person){
                if(username === person){
                    res.json({msg: 'Bu gruba daha önceden dahil olmuşsun.'})
                    juiss = true;
                }
            })
            if(juiss == false){
                Matris.getUserByUsername(username, function(err, matrisso){
                    if(err) throw err;
                    if(matrisso){
                        grup.people.push(username);
                        Grup.findOneAndUpdate({programId: arananID}, {
                            people:  grup.people,                   
                            }, function(err, rawResponse) {
                            if (err){ msg= 'Dahil etme işlemi yapılırken bir hata meydana geldi.';  throw err;}
                            else {msg= 'Tebrikler! Artık sende bu grubdasın.'; }
                            res.json({msg});
                        });
                    } else{
                        res.json({msg: "Önce ders programınızı girmeliniz."});
                    }
                })
            }
           
       }else{
            res.json({msg: 'Böyle Bir Grup Yok.'})
       }
    })
}
module.exports.put_grupGirisiThisDisaccept = function(req, res){
    var arananID = req.params.grupID; console.log(arananID)
    var username = req.user.username;
    Grup.getGrupByProjectId(arananID, function(err, grup){
       if(err) throw err;
       if(grup){
            var juiss=false;
            var sayac = 0;
            grup.people.forEach(function(person){
                if(username === person){
                    juiss = true;
                    grup.people.splice(sayac,1)
                    Grup.findOneAndUpdate({programId: arananID}, {
                        people:  grup.people,                   
                        }, function(err, rawResponse) {
                        if (err){ msg= 'Gruptan ayrılma işlemi yapılırken bir hata meydana geldi.';  throw err;}
                        else {msg= 'Çok üzüldük! Artık bu gruba dahil değilsin.'; }
                        res.json({msg});
                    });
                }sayac++;
            })  
            if(juiss==false){
                res.json({msg: 'İlginç! Zaten gruba dahil değilsin.'})
            }         
       }else{
            res.json({msg: 'Böyle Bir Grup Yok.'})
       }
    })
}

// dahil olmaktan kurtul :D eklenecek

module.exports.get_Ajax_searchtoPeer = function(req, res){
    var arananID = req.params.peerID;
    User.getPeerUserByID(arananID, function(err, peer){
        if(err) throw err;
        if(peer){
            Matris.getUserByUsername(arananID, function(err, dersProgrami){
                if(err) throw err;
                if(dersProgrami){
                    Matris.getUserByUsername(req.user.username, function(err, myDersProgrami){
                        if(err) throw err;
                        if(myDersProgrami){
                            var xuser = req.user;
                            xuser['password'] = undefined;
                            res.json({peer:peer, xuser:xuser, xusermatris:myDersProgrami, peermatris: dersProgrami});
                        }else{
                            res.json({msg:"Önce bir ders programı eklemelisin"});
                        }
                    });
                }else{
                    res.json({msg:"Aradığın kişinin bir dersprogramı kaydı yok"});
                }
            });
        }else{
            res.json({msg: "Böyle biri yok"})
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
