/*
 * File: app/view/popUp.js
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

Ext.define('MyApp.view.popUp', {
    extend: 'Ext.Panel',
    alias: 'widget.popUp',

    config: {
        docked: 'top',
        height: '50%',
        id: 'menuPopUp',
        itemId: 'menuPopUp',
        left: 0,
        top: 0,
        width: '60%',
        hideOnMaskTap: true,
        layout: {
            type: 'vbox'
        },
        modal: true,
        scrollable: false,
        hideAnimation: {
            type: 'fadeOut'
        },
        showAnimation: {
            type: 'fade'
        },
        items: [
            {
                xtype: 'button',
                cls: 'generalBtn menuBtn',
                id: 'myCopuponsBtn',
                itemId: 'myCopuponsBtn',
                left: '5%',
                top: '5%',
                ui: 'action-round',
                icon: 'assets/icons/mycoupons.png',
                iconCls: 'menuIcon',
                text: ''
            },
            {
                xtype: 'button',
                centered: true,
                cls: 'generalBtn menuBtn',
                id: 'couponsBtn',
                itemId: 'couponsBtn',
                right: '5%',
                top: '5%',
                ui: 'action-round',
                icon: 'assets/icons/coupons.png',
                iconCls: 'menuIcon',
                text: ''
            },
            {
                xtype: 'button',
                bottom: '5%',
                cls: 'generalBtn menuBtn',
                id: 'allCouponsBtn',
                itemId: 'mybutton11',
                left: '5%',
                ui: 'action-round',
                icon: 'assets/icons/catalogue.png',
                iconCls: 'menuIcon',
                text: ''
            },
            {
                xtype: 'button',
                bottom: '5%',
                centered: true,
                cls: 'generalBtn menuBtn',
                id: 'settingsBtn',
                itemId: 'settingsBtn',
                right: '5%',
                ui: 'action-round',
                icon: 'assets/icons/settings.png',
                iconCls: 'menuIcon',
                text: ''
            }
        ],
        listeners: [
            {
                fn: 'onMybutton1Tap',
                event: 'tap',
                delegate: '#myCopuponsBtn'
            },
            {
                fn: 'onMybuttonTap',
                event: 'tap',
                delegate: '#couponsBtn'
            },
            {
                fn: 'onAllCouponsBtnTap',
                event: 'tap',
                delegate: '#allCouponsBtn'
            },
            {
                fn: 'onMybutton9Tap',
                event: 'tap',
                delegate: '#settingsBtn'
            }
        ]
    },

    onMybutton1Tap: function(button, e, options) {
        MyApp.inAnotherScreen = true;

        var container = Ext.getCmp('appContainer');

        var misCupones = container.getComponent("mycouponsView");

        Ext.getStore("mycouponsStore").clearFilter();

        console.log(misCupones);
        if(misCupones === undefined){
            console.log("misCupones no existe");
            misCupones = Ext.widget('mycoupons');
        }else{
            console.log("misCupones existe");
            misCupones.hide();    
            container.remove(misCupones);
            misCupones.destroy();
            misCupones = Ext.widget('mycoupons');
        }
        container.add(misCupones);
        misCupones.show();

    },

    onMybuttonTap: function(button, e, options) {
        MyApp.inAnotherScreen = true;

        var container = Ext.getCmp('appContainer');

        var couponList = container.getComponent("couponsListView");

        Ext.getStore("couponList").clearFilter();

        if(couponList === undefined){
            console.log("couponList no existe");
            couponList = Ext.widget('couponListView'); 
        }else{
            console.log("couponList existe");
            couponList.hide();    
            container.remove(couponList);
            couponList.destroy();
            couponList = Ext.widget('couponListView'); 
        }


        container.add(couponList);
        couponList.show();
    },

    onAllCouponsBtnTap: function(button, e, options) {
        MyApp.inAnotherScreen = true;

        Ext.getStore("allCoupons").clearFilter();

        var container = Ext.getCmp('appContainer');    

        var couponList = container.getComponent("allCouponsListView");

        if(couponList === undefined){
            console.log("couponList no existe");
            couponList = Ext.widget('allCouponsList');
        }else{
            console.log("couponList existe");
            couponList.hide();
            container.remove(couponList);
            couponList.destroy();
            couponList = Ext.widget('allCouponsList');
        }



        container.add(couponList);
        couponList.show();
    },

    onMybutton9Tap: function(button, e, options) {
        MyApp.inAnotherScreen = true;

        var container = Ext.getCmp('appContainer');

        var settings = container.getComponent("settingsView");

        if(settings === undefined){
            console.log("settings no existe");
            settings = Ext.create('MyApp.view.settingsView');
        }else{
            console.log("settings existe");
            settings.hide();
            container.remove(settings);
            settings.destroy();
            settings = Ext.create('MyApp.view.settingsView');
        }



        container.add(settings);
        settings.show();
    }

});