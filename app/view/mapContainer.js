/*
 * File: app/view/mapContainer.js
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

Ext.define('MyApp.view.mapContainer', {
    extend: 'Ext.Panel',
    alias: 'widget.mapContainer',

    config: {
        id: 'mapContainer',
        itemId: 'mapContainer',
        layout: {
            type: 'fit'
        },
        modal: false,
        items: [
            {
                xtype: 'toolbar',
                cls: [
                    'commonToolbar'
                ],
                docked: 'top',
                id: 'mapToolbar',
                itemId: 'mapToolbar',
                items: [
                    {
                        xtype: 'image',
                        flex: 1,
                        cls: [
                            'commonToolbarIcon'
                        ],
                        id: 'mapToolbarIcon',
                        styleHtmlContent: true,
                        src: 'assets/general/commonToolbarIcon.png'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onMapContainerInitialize',
                event: 'initialize'
            }
        ]
    },

    onMapContainerInitialize: function(component, options) {
        var map = Ext.widget('mapa');
        component.add(map);
        map.show();

        Ext.Viewport.on('orientationchange', function(){
            console.log("orientantion change");
            component.show();
        }, this, {buffer: 50 });
    }

});