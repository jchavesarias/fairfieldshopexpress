/*
 * File: app/view/instructionsView.js
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

Ext.define('MyApp.view.instructionsView', {
    extend: 'Ext.Panel',
    alias: 'widget.instructionsView',

    config: {
        height: '100%',
        id: 'instructionsView',
        itemId: 'instructionsView',
        left: 0,
        top: 0,
        width: '100%',
        layout: {
            animation: 'slide',
            type: 'card'
        },
        modal: true,
        cls: [
            'generalModal'
        ],
        hideAnimation: {
            type: 'fadeOut'
        },
        showAnimation: {
            type: 'fade'
        },
        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                id: 'instructionsToolbar',
                itemId: 'instructionsToolbar',
                title: 'Instructions',
                items: [
                    {
                        xtype: 'button',
                        cls: 'generalBtn backBtn',
                        hideAnimation: {
                            type: 'fade'
                        },
                        id: 'backInstructions',
                        itemId: 'backInstructions',
                        showAnimation: {
                            type: 'fade'
                        },
                        ui: 'action-round',
                        icon: 'assets/icons/backIcon.png',
                        iconCls: 'backIcon'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        cls: 'generalBtn backBtn',
                        id: 'nextInstructions',
                        itemId: 'nextInstructions',
                        ui: 'action-round',
                        icon: 'assets/icons/backIcon.png',
                        iconCls: 'backIcon nextIcon'
                    },
                    {
                        xtype: 'button',
                        cls: 'generalBtn backBtn',
                        hidden: true,
                        id: 'closeBtn',
                        itemId: 'closeBtn',
                        ui: 'action-round',
                        icon: 'assets/icons/close.png',
                        iconCls: 'backIcon nextIcon',
                        text: ''
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'contenido1',
                itemId: 'contenido1',
                items: [
                    {
                        xtype: 'image',
                        cls: [
                            'instructionsImage'
                        ],
                        itemId: 'myimage1',
                        src: 'assets/instructions/1.png'
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'contenido2',
                itemId: 'contenido2',
                items: [
                    {
                        xtype: 'image',
                        cls: [
                            'instructionsImage'
                        ],
                        src: 'assets/instructions/2.png'
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'contenido3',
                itemId: 'contenido3',
                items: [
                    {
                        xtype: 'image',
                        cls: [
                            'instructionsImage'
                        ],
                        src: 'assets/instructions/3.png'
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'contenido4',
                itemId: 'contenido4',
                items: [
                    {
                        xtype: 'image',
                        cls: [
                            'instructionsImage'
                        ],
                        src: 'assets/instructions/4.png'
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'contenido5',
                itemId: 'contenido5',
                items: [
                    {
                        xtype: 'image',
                        cls: [
                            'instructionsImage'
                        ],
                        src: 'assets/instructions/5.png'
                    }
                ]
            },
            {
                xtype: 'container',
                id: 'contenido6',
                itemId: 'contenido6',
                items: [
                    {
                        xtype: 'image',
                        cls: [
                            'instructionsImage'
                        ],
                        src: 'assets/instructions/6.png'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onBackInstructionsTap',
                event: 'tap',
                delegate: '#backInstructions'
            },
            {
                fn: 'onNextInstructionsTap',
                event: 'tap',
                delegate: '#nextInstructions'
            },
            {
                fn: 'onCloseBtnTap',
                event: 'tap',
                delegate: '#closeBtn'
            },
            {
                fn: 'onPanelHide',
                event: 'hide'
            },
            {
                fn: 'onPanelInitialize',
                event: 'initialize'
            }
        ]
    },

    onBackInstructionsTap: function(button, e, options) {
        this.currentItem = this.currentItem - 1;

        if(this.currentItem === -1){
            this.hide();
        }if(this.currentItem == this.maxItems - 2){

            this.getComponent("instructionsToolbar").getComponent("closeBtn").hide();
            this.getComponent("instructionsToolbar").getComponent("nextInstructions").show();
            this.animateActiveItem(this.currentItem, {type: 'slide', direction: 'right'});

        }else{
            this.animateActiveItem(this.currentItem, {type: 'slide', direction: 'right'});
        }
    },

    onNextInstructionsTap: function(button, e, options) {
        this.currentItem = this.currentItem + 1;

        if(this.currentItem == this.maxItems - 1){

            button.hide();

            this.getComponent("instructionsToolbar").getComponent("closeBtn").show();

        }

        this.animateActiveItem(this.currentItem, {type: 'slide', direction: 'left'});   




    },

    onCloseBtnTap: function(button, e, options) {
        this.hide();
    },

    onPanelHide: function(component, options) {

        component.getEventDispatcher().removeListener('element','#instructionsView','swipe',component.containerSwipe,this);

        var storage = window.localStorage;

        if(storage.getItem("firstInstall") === null || storage.getItem("firstInstall") === "true" ){                                              
            Ext.Viewport.remove(component);
            storage.setItem("firstInstall", "false");

            var appContainer = Ext.create('MyApp.view.appContainer');

            Ext.Viewport.add(appContainer);
            appContainer.show();

        }else{        
            Ext.getCmp("appContainer").remove(component);    
        }

        component.destroy();

    },

    onPanelInitialize: function(component, options) {
        component.currentItem = 0;

        component.maxItems = 6;

        component.getEventDispatcher().addListener('element','#instructionsView','swipe',component.containerSwipe,this);
    },

    nextSlide: function() {
        this.currentItem = this.currentItem + 1;

        if(this.currentItem == this.maxItems - 1){

            this.getComponent("instructionsToolbar").getComponent("closeBtn").show();
            this.getComponent("instructionsToolbar").getComponent("nextInstructions").hide();

        }

        if(this.currentItem < this.maxItems){
            this.animateActiveItem(this.currentItem, {type: 'slide', direction: 'left'});  
        }else{
            this.currentItem = this.maxItems - 1;
        }



    },

    prevSlide: function() {

        this.currentItem = this.currentItem - 1;

        if(this.currentItem < 0){
            this.currentItem = 0;
        }if(this.currentItem == this.maxItems - 2){

            this.getComponent("instructionsToolbar").getComponent("closeBtn").hide();
            this.getComponent("instructionsToolbar").getComponent("nextInstructions").show();
            this.animateActiveItem(this.currentItem, {type: 'slide', direction: 'right'});

        }else{
            this.animateActiveItem(this.currentItem, {type: 'slide', direction: 'right'});
        }
    },

    containerSwipe: function(e, target, options, eventController) {
        var direction = e.direction;

        if(direction !== undefined){
            if(direction === "left"){
                this.nextSlide(); 
            }else{
                this.prevSlide();        
            }
        }



    }

});