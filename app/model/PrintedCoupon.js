/*
 * File: app/model/PrintedCoupon.js
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

Ext.define('MyApp.model.PrintedCoupon', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            {
                name: 'id',
                type: 'int'
            },
            {
                name: 'couponID',
                type: 'int'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'address',
                type: 'string'
            },
            {
                name: 'city',
                type: 'string'
            },
            {
                name: 'state',
                type: 'string'
            },
            {
                name: 'zipCode',
                type: 'string'
            },
            {
                name: 'phone',
                type: 'string'
            },
            {
                name: 'siteURL',
                type: 'string'
            },
            {
                name: 'categoryA',
                type: 'string'
            },
            {
                name: 'categoryB',
                type: 'string'
            },
            {
                name: 'discount',
                type: 'string'
            },
            {
                name: 'terms',
                type: 'string'
            },
            {
                name: 'image',
                type: 'string'
            },
            {
                name: 'cashierInstructions',
                type: 'string'
            },
            {
                name: 'expireDate',
                type: 'string'
            },
            {
                name: 'couponCode',
                type: 'string'
            },
            {
                name: 'couponHTML',
                type: 'string'
            },
            {
                name: 'shortDiscount'
            }
        ]
    }
});