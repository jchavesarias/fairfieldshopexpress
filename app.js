
function loadApp(){
Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    models: [
        'Merchant',
        'Coupon',
        'PrintedCoupon',
        'DistanceModel',
        'SettingModel'
    ],
    stores: [
        'getMerchants',
        'closestMerchants',
        'couponList',
        'mycouponsStore',
        'allCoupons',
        'distanceStore',
        'settingsStore'
    ],
    views: [
        'appContainer',
        'mapa',
        'popUp',
        'mycoupons',
        'loginForm',
        'couponPopUp',
        'couponListView',
        'printedCouponDetail',
        'allCouponsList',
        'mapContainer',
        'initialScreen',
        'instructionsView'
    ],
    name: 'MyApp',

    launch: function() {
                console.log("Inciando aplicacion");
        Ext.create('MyApp.view.initialScreen', {fullscreen: true});
    }

});
}