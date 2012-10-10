/*
 * File: app/view/printedCouponDetail.js
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

Ext.define('MyApp.view.printedCouponDetail', {
    extend: 'Ext.Panel',
    alias: 'widget.printedCouponDetail',

    config: {
        height: '100%',
        id: 'printedCouponDetail',
        itemId: 'printedCouponDetail',
        styleHtmlContent: true,
        ui: '',
        width: '100%',
        layout: {
            type: 'vbox'
        },
        modal: true,
        scrollable: false,
        cls: [
            'generalModal'
        ],
        hideAnimation: {
            type: 'slideOut',
            direction: 'right'
        },
        showAnimation: {
            type: 'slide'
        },
        tpl: [
            '<div class="globalContainer">',
            '    <div class="couponContainer">',
            '        <img class="imageTijeras" src="assets/icons/tijeras.png"/>',
            '        <div class="titleContainer">',
            '            <div class=\'imageContainerCoupon\'>',
            '                <img src="{image}"/>',
            '            </div>',
            '            <div class="titleTextContainer">',
            '                <p class="titleName">{name}</p>',
            '                <p class="descripcionTitle">Address <span>{address}</span></p>',
            '                <div class="addressContainer">',
            '                    <p class="descripcionTitle cityText">City <span>{city}</span></p>',
            '                    <p class="descripcionTitle stateText">State <span>{state}</span></p>  ',
            '                </div>                ',
            '                <p class="descripcionTitle">Phone <span>{phone}</span></p>',
            '                <p class="descripcionTitle">ZIP Code <span>{zipCode}</span></p>',
            '            </div>',
            '        </div>    ',
            '        <div class="discountContainer">         ',
            '            <p>{discount}</p>               ',
            '        </div>                     ',
            '        ',
            '        <div class="extraData">',
            '            <p>Expiration Date: <span>{expireDate}</span></p>',
            '            <p>Coupon ID: <span>{couponCode}</span></p>',
            '        </div>',
            '        ',
            '        <div class="printedTerms">',
            '            <p>Terms: <span>{terms}</span></p>',
            '        </div>      ',
            '        ',
            '    </div>',
            '</div>',
            ''
        ],
        items: [
            {
                xtype: 'container',
                bottom: 0,
                height: '75px',
                id: 'btnContainer',
                itemId: 'btnContainer',
                left: '54%',
                style: 'position : absolute;',
                width: '52%',
                items: [
                    {
                        xtype: 'container',
                        id: 'btnContainerRelative',
                        itemId: 'btnContainerRelative',
                        left: '-50%',
                        style: 'position : relative;',
                        width: '100%',
                        items: [
                            {
                                xtype: 'button',
                                cls: 'generalBtn detailCouponBtn',
                                height: '70px',
                                id: 'okBtnDetail',
                                itemId: 'mybutton18',
                                style: 'float : left; margin-right : 5%',
                                ui: 'action-round',
                                width: '60px',
                                icon: 'assets/icons/okIcon.png',
                                iconCls: 'detailPopUpIcon'
                            },
                            {
                                xtype: 'button',
                                cls: 'generalBtn detailCouponBtn',
                                height: '70px',
                                id: 'deleteBtnDetail',
                                itemId: 'deleteBtnDetail',
                                style: 'float : left;',
                                ui: 'action-round',
                                width: '60px',
                                icon: 'assets/icons/deleteIcon.png',
                                iconCls: 'detailPopUpIcon',
                                text: ''
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'top',
                title: 'Detail',
                items: [
                    {
                        xtype: 'button',
                        cls: 'generalBtn backBtn',
                        id: 'backDetailPrinted',
                        itemId: 'mybutton9',
                        ui: 'action-round',
                        icon: 'assets/icons/backIcon.png',
                        iconCls: 'backIcon',
                        text: ''
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onOkBtnDetailTap1',
                event: 'tap',
                delegate: '#okBtnDetail'
            },
            {
                fn: 'onDeleteBtnDetailTap1',
                event: 'tap',
                delegate: '#deleteBtnDetail'
            },
            {
                fn: 'onBackDetailPrintedTap',
                event: 'tap',
                delegate: '#backDetailPrinted'
            },
            {
                fn: 'onPanelHide',
                event: 'hide'
            },
            {
                fn: 'onPanelUpdatedata',
                event: 'updatedata'
            }
        ]
    },

    onOkBtnDetailTap1: function(button, e, options) {
        this.hide();
    },

    onDeleteBtnDetailTap1: function(button, e, options) {

        var component = this;

        var appContainer = Ext.getCmp("appContainer");

        MyApp.maskComponent(appContainer,"loading...");

        MyApp.deleteCoupon(component.getData().id,function(result){                      

            var store = Ext.getStore("mycouponsStore");

            //if(comp.from === "mycoupons"){
            //     store = Ext.getStore("mycouponsStore"); 
            // }else if(comp.from === "coupons"){
            //     store = Ext.getStore("couponList");   
            // }

            var record = store.getAt(store.find("couponID",component.getData().couponID));

            store.remove(record);

            MyApp.unMaskComponent(appContainer);

            component.hide();

        });
    },

    onBackDetailPrintedTap: function(button, e, options) {
        this.hide();
    },

    onPanelHide: function(component, options) {

        Ext.getBody().un('tap',function(){console.log("sin listener");});

        Ext.getCmp("appContainer").remove(component);
        component.destroy();
    },

    onPanelUpdatedata: function(component, newData, options) {
        var comp = this;

        Ext.getBody().on('tap',function(e){
            if(e.target.className == "okBtn"){
                this.hide();
            }else if(e.target.className == "delete"){
                MyApp.deleteCoupon(newData.id,function(result){                      

                    var store = Ext.getStore("mycouponsStore");

                    //if(comp.from === "mycoupons"){
                    //     store = Ext.getStore("mycouponsStore"); 
                    // }else if(comp.from === "coupons"){
                    //     store = Ext.getStore("couponList");   
                    // }

                    var record = store.getAt(store.find("couponID",newData.couponID));

                    store.remove(record);

                    component.hide();

                });
            }

        },this);
    }

});