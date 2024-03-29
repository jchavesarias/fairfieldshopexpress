/*
 * File: app/view/loginForm.js
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

Ext.define('MyApp.view.loginForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginForm',

    config: {
        id: 'loginForm',
        itemId: 'loginForm',
        ui: '',
        layout: {
            type: 'vbox'
        },
        modal: false,
        scrollable: false,
        showAnimation: {
            type: 'pop'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                title: '',
                items: [
                    {
                        xtype: 'image',
                        flex: 1,
                        id: 'loginImgToolbar',
                        itemId: 'loginImgToolbar',
                        styleHtmlContent: true,
                        src: 'assets/login/fondoToolbarLogin.png'
                    }
                ]
            },
            {
                xtype: 'container',
                html: '<img id=\'loginLogo\' src=\'assets/login/loginLogo.png\'/>',
                id: 'logoContainerLogin',
                styleHtmlContent: true,
                layout: {
                    type: 'card'
                },
                modal: false,
                scrollable: false
            },
            {
                xtype: 'fieldset',
                id: 'loginFieldSet',
                width: '80%',
                layout: {
                    type: 'default'
                },
                instructions: 'Please enter your username and password to continue',
                title: '',
                items: [
                    {
                        xtype: 'textfield',
                        id: 'userTxt',
                        itemId: 'userTxt',
                        label: 'User Id',
                        labelCls: 'defaultLabel userLabel',
                        labelWidth: '40%',
                        name: 'username'
                    },
                    {
                        xtype: 'passwordfield',
                        itemId: 'password',
                        label: 'Password',
                        labelCls: 'defaultLabel passwordLabel',
                        labelWidth: '40%',
                        name: 'password'
                    }
                ]
            },
            {
                xtype: 'button',
                id: 'loginBtn',
                itemId: 'loginBtn',
                ui: 'action',
                text: 'Login'
            }
        ],
        listeners: [
            {
                fn: 'loginBtnTap',
                event: 'tap',
                delegate: '#loginBtn'
            }
        ]
    },

    loginBtnTap: function(button, e, options) {
        var datos = {};

        datos.username = this.getValues().username;
        datos.password = this.getValues().password;

        //datos.username = "Test.012";
        //datos.password = "Password.01";

        var comp = this;

        this.setMasked({xtype: 'loadmask', message: "Loading..."});

        $.ajax({
            type: "POST",
            url: MyApp.hostUrl + "login",
            data: datos,
            dataType: 'json',
            success: function(data) {

                if(data.userName === null){

                    comp.setMasked(false);

                    //Ext.Msg.alert('Login Failed', 'The username or password are invalid', Ext.emptyFn);
                    //alert('The username or password are invalid');

                    if(navigator.notification !== null && navigator.notification !== undefined){

                        navigator.notification.alert('The username or password are invalid',  function(){console.log("ok");},'Login Failed','Ok'); 
                    }else{
                        alert('The username or password are invalid');
                    }

                }else{

                    MyApp.userId = data.id;


                    MyApp.finNumber = data.finumber;

                    var storage = window.localStorage;

                    storage.setItem("userId", data.id);

                    storage.setItem("finNumber", data.finumber);                                              

                    var appContainer;

                    if(storage.getItem("firstInstall") === null || storage.getItem("firstInstall") === "true" ){                                              
                        appContainer = Ext.create('MyApp.view.instructionsView');
                        //storage.setItem("firstInstall", "false");
                    }else{
                        appContainer = Ext.create('MyApp.view.appContainer');
                    }


                    Ext.Viewport.add(appContainer);
                    appContainer.show();
                    Ext.getCmp("loginForm").hide();
                    Ext.getCmp("loginForm").destroy();

                }       
            },
            error: function(error) {
                //Ext.Msg.alert('Error', error, Ext.emptyFn);

                if(navigator.notification !== null){

                    navigator.notification.alert(error,  function(){console.log("ok");},'Error','Ok'); 
                }else{
                    alert(error);
                }

            }
        });


    }

});