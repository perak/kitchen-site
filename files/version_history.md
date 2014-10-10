Version History
===============


0.7.4
-----

- Added **datepicker input** control into Form component. You need to set `"type": "date"` and `"input": "datepicker"` into field definition.

- Added **export to CSV/TSV/JSON** button into DataView component. You need to set `"exportable": true` into field definitions. Clicking "Export" button will download data currently shown in DataView with fields marked as "exportable". Download is done client side using URI download and HTML5 download attribute (I didn't tested with IE, but I guess it doesn't work). See live example <a href="http://generator-dataview.meteor.com/customers" target="_blank">here</a>.


0.7.3
-----

- Added built-in **change password form**. Now along with "login", "logout", "register" and "forgot_password" pre-built templates, there is also "change_pass". See accounts example <a href="http://generator-accounts.meteor.com" target="_blank">here</a> (login and go to profile settings).

- Markup for dropdown menu item (menu item with sub-items) is now properly generated.

- DataView now can search fields that have dot inside name (for example "profile.name").
