/*
 * File: app/view/mapa.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('MyApp.view.mapa', {
    extend: 'Ext.Map',
    alias: 'widget.mapa',

    config: {
        id: 'idMapa',
        itemId: 'idMapa',
        style: 'height : 100%;',
        ui: '',
        mapOptions: {
            zoom: 18
        },
        listeners: [
            {
                fn: 'onMapMaprender',
                event: 'maprender'
            }
        ]
    },

    onMapMaprender: function(map, gmap, options) {
        var mapaUI = this;
        console.log("Map rendered");
        mapaUI.inicializar(function(){

            var store = Ext.getStore('getMerchants');

            store.removeAll();

            store.getProxy().setExtraParam("finNumber",MyApp.finNumber);

            store.loadPage(1,{
                scope : this,
                callback : function(records){

                    MyApp.lastUpdate = new Date();                        

                    mapaUI.cargarMarcadores(records);
                }
            });  

            var watchID = navigator.geolocation.watchPosition(mapaUI.onLocationChange, mapaUI.onError, { frequency: 500, enableHighAccuracy: true});

            //window.setTimeout(function(){
              //  mapaUI.getPosicion(function(position){
              //      mapaUI.onLocationChange(position);
               // });
            //}, 7000);

        }); 


    },

    cargarMarcadores: function(merchants) {
        var store = Ext.getStore("allCoupons");

        var component = this;

        for(var i = 0; i < merchants.length; i++){
            var merchant = merchants[i];

            console.log("merchant: " + merchant.get("name"));

            for(var k = 0; k < merchant.coupons().getCount( ); k++){
                store.add(merchant.coupons().getAt(k));
            }

            this.agregarMarcador(merchant);    
        }

        var storeM = Ext.getStore('getMerchants');


        storeM.getProxy().setExtraParam("finNumber",MyApp.finNumber);

        storeM.nextPage({callback : function(nextMmerchants, operation, success){

            if(merchants.length > 0){
                component.cargarMarcadores(nextMmerchants);
            }else{
                MyApp.inUpdate = false;
            }

        }}); 
    },

    agregarMarcador: function(merchant) {

        var mapa = this;

        var infoWindow = new google.maps.InfoWindow();
        var marcador = new google.maps.Marker({
            position: new google.maps.LatLng(merchant.get("latitude"),merchant.get("longitude")),
            map: this.getMap()
        });

        marcador.id = merchant.get("id");

        //google.maps.event.addListener(marcador, "click", function(){
        //    infoWindow.setContent(merchant.get("name"));
        //    infoWindow.open(this.getMap(),marcador);
        //});

        google.maps.event.addListener(marcador, "click", function(){
            mapa.addCouponPopUp(merchant);
        });

        MyApp.markers.push(marcador);

        var bounds =  MyApp.globalBounds.getBounds();

        if(bounds.contains(marcador.getPosition())){
            Ext.getStore('closestMerchants').add(merchant);
        }
    },

    onLocationChange: function(position) {
        console.log("cambio de ubicacion");

        var pocisionMarcador = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        //var pocisionMarcador = position;

        if(!MyApp.inUpdate){

            var mapa = Ext.getCmp("idMapa");

            var newDate = new Date();       

            if(MyApp.lastUpdate.getDay() < newDate.getDay()){
                MyApp.inUpdate = true;

                mapa.updateDatabase();

            }else{        

                if(MyApp.marker !== null){

                    MyApp.marker.setPosition(pocisionMarcador);

                    MyApp.circle.setCenter(pocisionMarcador);

                    mapa.checkForClosestMerchants();

                    var bounds =  MyApp.circle.getBounds();

                    var merchantTmp = null;

                    var closestMerchants = Ext.getStore("closestMerchants"); 

                    for(var i = 0; i < MyApp.markers.length;i++){

                        if(bounds.contains(MyApp.markers[i].getPosition())){                        

                            merchantTmp = closestMerchants.getAt(closestMerchants.find("id",MyApp.markers[i].id));

                            mapa.addCouponPopUp(merchantTmp);
                        }
                    }
                }
            }        
        }

    },

    onError: function(error) {
        alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');

    },

    inicializar: function(callback) {

        var mapa = this.getMap();        

        MyApp.marker = null;
        MyApp.circle = null;
        MyApp.markers = [];
        MyApp.globalBounds = null;

        MyApp.convertion = 3.2808399;

        MyApp.diametro_circulo = 60 / MyApp.convertion;

        window.localStorage.setItem("distanceSelection",60);

        this.getPosicion(function(position){        

            //var image = 'img/apple.png';                                                                                                        


            var pocisionUsuario = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            //var pocisionUsuario = new google.maps.LatLng(41.246021,-73.197973);

            mapa.setCenter(pocisionUsuario);

            MyApp.circle = new google.maps.Circle({
                center: pocisionUsuario,
                fillColor:"#FF0000",
                fillOpacity: 0.5,
                strokeColor:"#FFFF00",
                strokeOpacity: 0.5,
                strokeWeight: 5,
                zIndex: 5,
                radius: MyApp.diametro_circulo
            });                                                                                                     

            MyApp.circle.setMap(mapa);

            MyApp.globalBounds = new google.maps.Circle({
                center: pocisionUsuario,
                fillColor:"#FFFFFF",
                fillOpacity: 0.5,
                strokeColor:"#FFFF00",
                strokeOpacity: 0.5,
                strokeWeight: 5,
                zIndex: 5,
                radius: MyApp.diametro_circulo + 2000
            });                                                                                                     

            MyApp.globalBounds.setMap(mapa);

            MyApp.marker = new google.maps.Marker({
                position: pocisionUsuario,
                map : mapa
            });

            MyApp.marker.id = "userPosition";  


            MyApp.printCoupon = function(couponId,callback){

                var datos = {};
                datos.idUsuario = MyApp.userId;
                datos.couponID = couponId;

                var result = -1;

                $.ajax({
                    type: "POST",
                    url: MyApp.hostUrl + "printCoupon",
                    data: datos,
                    dataType: 'json',
                    success: function(data) {
                        if(data.id == -1){                  
                            //Ext.Msg.alert('Error', data.name, Ext.emptyFn);

                            if(navigator.notification.alert !== null){

                                navigator.notification.alert(data.name,  function(){console.log("ok");},'Please Note','Ok'); 
                            }else{
                                alert(error);
                            }

                            result = 0;

                        }else{                                        
                            result = 1;
                        }

                        callback(result,data);
                    },
                    error: function(error) {
                        //Ext.Msg.alert('Error', error, Ext.emptyFn);

                        if(navigator.notification.alert !== null){

                            navigator.notification.alert(error,  function(){console.log("ok");},'Please Note','Ok'); 
                        }else{
                            alert(error);
                        }

                        callback(result);
                    }
                });                
            };

            MyApp.deleteCoupon = function(couponId,callback){

                var datos = {};
                datos.idUsuario = MyApp.userId;
                datos.couponID = couponId;

                var result = -1;

                $.ajax({
                    type: "POST",
                    url: MyApp.hostUrl + "deleteCoupon",
                    data: datos,
                    dataType: 'json',
                    success: function(data) {

                        if(data.id == -1){

                            //Ext.Msg.alert('Error', data.name, Ext.emptyFn);

                            if(navigator.notification.alert !== null){

                                navigator.notification.alert(data.name,  function(){console.log("ok");},'Please Note','Ok'); 
                            }else{
                                alert(error);
                            }

                            result = 0;

                        }else{
                            result = 1;
                        }

                        callback(result);
                    },
                    error: function(error) {
                        //Ext.Msg.alert('Error', error, Ext.emptyFn);

                        if(navigator.notification.alert !== null){

                            navigator.notification.alert(error,  function(){console.log("ok");},'Please Note','Ok'); 
                        }else{
                            alert(error);
                        }

                        callback(result);
                    }
                });                
            };

            callback();

        });


    },

    getPosicion: function(callback) {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                callback(position);
            }, function(error) { 
                console.log(error);
            });
        }
    },

    checkForClosestMerchants: function() {
        var bounds =  MyApp.globalBounds.getBounds();

        var store = Ext.getStore("closestMerchants");

        if(!bounds.contains(MyApp.marker.getPosition())){

            store.removeAll();

            MyApp.globalBounds.setCenter(MyApp.marker.getPosition());

            bounds =  MyApp.globalBounds.getBounds();

            var merchant = null;

            var globalStore = Ext.getStore("getMerchants");

            for(var i = 0; i < MyApp.markers.length;i++){

                if(bounds.contains(MyApp.markers[i].getPosition())){            

                    merchant = globalStore.getAt(globalStore.find("id",MyApp.markers[i].id));            

                    store.add(merchant);
                }
            }   

        }

    },

    addCouponPopUp: function(merchant) {
        var couponPopUp = null;

        var coupons = merchant.coupons();
        var coupon = null;

        var store = Ext.getStore("couponList");

        for(var i = 0; i < coupons.getCount();i++){

            coupon = coupons.getAt(i);       

            if(MyApp.canAddPopUp(coupon.get("couponID"))){

                couponPopUp = Ext.widget("couponPopUp");

                Ext.getCmp("appContainer").add(couponPopUp);

                couponPopUp.setId(coupon.data.id);

                couponPopUp.setData(coupon.data);

                couponPopUp.show();  
            }
        }




    },

    canAddPopUp: function(couponID) {

        var encontrado = false;
        var canAdd = false;

        for(var i = 0; i < MyApp.popUpsOnScreen.length;i++){

            if(MyApp.popUpsOnScreen[i] == couponID){
                encontrado = true;
                i = MyApp.popUpsOnScreen.length + 1;
            }  
        }

        if(!encontrado){

            MyApp.popUpsOnScreen.push(couponID);
            canAdd = true;

        }

        return canAdd;
    },

    updateDatabase: function() {
        console.log("actualizando");

        var merchants = Ext.getStore("getMerchants");
        var closestMerchants = Ext.getStore("closestMerchants");
        var couponList = Ext.getStore("couponList");
        var allCoupons = Ext.getStore("allCoupons");

        merchants.removeAll();
        closestMerchants.removeAll();
        couponList.removeAll();
        allCoupons.removeAll();  

        for(var i = 0; i < MyApp.markers.length; i ++){
            MyApp.markers[i].setMap(null);
        }

        MyApp.markers = [];


        merchants.loadPage(1,{
            scope : this,
            callback : function(records){

                MyApp.lastUpdate = new Date();                        

                this.cargarMarcadores(records);
            }
        });

    }

});