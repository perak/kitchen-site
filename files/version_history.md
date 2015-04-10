Version History
===============

0.9.30
------

- Changed directory layout: client controllers are moved from `/both/` to `/client/` directory (and server controllers are moved to '/server/').

- Changed (simplified) metadata format - preparing to refactor kitchen-GUI

- Now you can specify custom template for any page. Set `custom_template` and write your own HTML and JS. See getting started page for more info.


0.9.29
------

- **Windows**: Meteor kitchen is now available for Windows.


0.9.28
------

- Improved DataView component - insert/update/delete buttons are shown only if user is allowed to perform operation (only if user have correct role/owenership)



0.9.27
------

- Changed "jumbotron" component - now you can set background image

- Simplified input file for "one page site" example and added fancy header picture

- Changed www.meteorkitchen.com visual theme to "bootswatch-darkly"


0.9.26
------

- Meteor Kitchen for linux is now compiled with older glibc 2.12

- Fixed few small bugs (kitchen-site.json is now valid json etc.)


0.9.25
------

- `query.options` object now can contain params in the same way and syntax as `query.filter` object.

- `<title>` tag is now automatically added into layout template.

- One small step for (a) man, one giant leap for mankind: added `favicon.ico` to this site :)

- Fixed few minor bugs.


0.9.24
------

- Changes related to page layout:

    - Now you can set `simple` or `navbar` layout (`zone` object, property `layout`). `simple` layout doesn't have navbar (but still can have menu - it is wrapped into simple container). Default layout (if not specified) is `navbar`.

    - If your layout have navbar then you can define class to be added to main navbar (`zone` object, property `navbar_class`). For example "navbar-inverse" (or anything else).

- Fixed small html parser issue: in some circumstances generated html code indentation was incorrect.


0.9.23
------

- Fixed bug related to user account system: if page was refreshed or url was manually entered, user was logged out. Fixed now.


0.9.22
------

- Fixed bug with forms that doesn't close on submit (message "Saved" was not shown). Fixed now.

- Removed some unnecessary events code that was generated in each page


0.9.21
------

- Fixed small bug with "scrollspy" functionality in menus

- Added new example - single-page website. Source code is <a href="https://github.com/perak/kitchen-examples/tree/master/example-onepage" target="_blank">here</a>, live example is <a href="http://generator-onepage.meteor.com" target="_blank">here</a>.

- Changed site theme from "bootswatch-amelia" to "bootswatch-superhero"


0.9.20
------

- Fixed small bug with menu items having subitems


0.9.19
------

- Fixed few small bugs related to custom components - now your component can contain multiple templates.

- Added <a href="//www.youtube.com/embed/9k5YRxjP58Y" target="_blank">Quick Start Video</a>. Thanks to <a href="https://github.com/robmoggach" target="_blank">Robert Moggach</a>.


0.9.18
------

Form input now can be "custom" and you can provide custom template.

Example field definition:

```
{
	"name": "someField",
	"title": "Some Field",

	"input": "custom",
	"input_template": "some_field.html"
}
```

Custom template:

```
<div class="form-group FIELD_GROUP_CLASS FIELD_ID">
	<label for="FIELD_NAME">FIELD_TITLE</label>
	<div class="input-div">
		<input type="text" name="FIELD_NAME" value="FIELD_VALUE" class="form-control">
		<span id="help-text" class="help-block"></span>
		<span id="error-text" class="help-block"></span>
	</div>
</div>
```


0.9.17
------

- Fixed few minor bugs (related to form input type "crud")


0.9.16
------

Now you can set query params. See <a href="{{urlFor 'api_reference'}}">API docs</a> `query` object `params` property.

Example query with params:

```
{
	"name": "example",
	"collection": "invoices",
	"filter": { "date": ":theDate" },
	"params": [
		{ "name": "theDate", "value": "Session.get('something');" }
	]
}
```

In this example `theDate` is query param.

Resulting controller code:

```
var theDate = Session.get('something');
...
Meteor.subscribe("example", theDate);
```

Params that are not listed in `params` array are treated as route params and resulting controller code will be:

```
Meteor.subscribe("example", this.params.theDate);
``` 


0.9.15
------

- Improved spacebars to jade converter - pages containing markdown blocks are now properly converted


0.9.14
------

- Field object now have `min` and `max` property. Useful in form validations.

- Removed control-label from single checkbox form fields


0.9.13
------

- Fixed ugly bug preventing any application without user account system to work (including "example-minimal").

- Changed controllers code related to "loadingTemplate". now "Loading..." renders only in part of the screen that is actually loading (no more entire page flickering).


0.9.12
------

- Fixed bugs in form input type "crud"


0.9.11
------

- Fixed bug in forms: required checkbox fields are now really required

- Vertical menus `.nav-stacked` : menu item can have subitems (and parent item is collapsible)

- Fixed small issue with html parser: textarea had extra tab characted inside content


0.9.10
------

- Forms: for input type "select" now you can combine items from collection (lookup) with static items (input_items). Useful if you need first item to be static (usually empty) and rest of items from collection.

- Forms: added new input type: "crud". For fields with `"type": "array"` and `"array_item_type": "object"` you can define `"input": "crud"` and define `"crud_fields": [...]` - that will produce CRUD inside your form.

- Fixed few bugs and maybe made new ones :)


0.9.9
-----

- Looks like I am close to 1.0 but I am not: Next version will be 0.9.10 :)

- There was bug preventing user to change own profile. Fixed now. Check <a href="http://generator-accounts.meteor.com" target="_blank">example-accounts</a>.

- Built-in "form" component will show error (if any occurs) while writing data

- "page" object now have "back_route" property and if you set this, button with left arrow will appear just before page title

- "component" and "page" objects now have "title_icon_class" property, so you can add for example "fa fa-home" and that will appear before page title



0.9.8
-----

- Minor bugfixes


0.9.7
-----

- CLI: Fixed bug in forms with checkbox when field type is "bool" (checkbox was not displayed)

- CLI: Fixed bug with accessing restricted pages: in some circumstances, authenticated user without access rights was able to access restricted page by directly entering page url (user was not able to see data if your collection is properly secured)


0.9.6
-----

- Added "container_class" property to "page" and "zone" objects. CSS class to be added to page container. For example "container-fluid". Default: "container"

- Added "icon_class" property to "menu_item" object. If set, "span" with this class will be added to menu item before title. So, now you can set menu item icons.


0.9.5
-----

- GUI: Fixed bug - sometimes multiple editors for single field appeared

- GUI: Added javascript hints in editor

- CLI: Fixed bugs in HTML to JADE converter


0.9.4
-----

- GUI: Added two examples

- GUI: Added syntax check (lints) into JSON and JS editors

- CLI: Fixed json parser bug: if key name is a string it's now properly stringified to javascript: { "\"x.y\"": 1 } now becomes { "x.y": 1 }

- CLI: Fixed bug related to query object: if some component's query doesn't have a name, generator reported error. Now it just ignores queries without names.


0.9.3
-----

- GUI: integrated <a href="http://codemirror.net/" target="_blank">CodeMirror</a> editor

- GUI: few improvements

- GUI: tree editor and object editor pages were generator plugins - now they are changed to regular components. 

- CLI: Page now can have "zoneless" property. If set to true page will be accessible both for authenticated and non-authenticated users.


0.9.2
-----

- GUI: fixed **many bugs**

- GUI: added possibility to delete object from array (that was somehow missing)

- Added new component type "custom_component" with possibility to provide custom HTML and JS code. Component of type "custom" is deprecated now (still working for backward compatibility). 

- Changed how plugins work


0.9.1
-----

- Reset password form was broken. It's fixed now.

- GUI - object properties form: while form submit is in progress, button is now in disabled state.


0.9.0
-----

- Added <a href="{{urlFor 'login'}}">kitchen-GUI</a> - visual application generator. Built (of course) with meteor-kitchen itself. Just <a href="{{urlFor 'login'}}">login</a> and enjoy! :)

- Fixed some bugs with HTML parser


0.8.0
-----

- Added new example: simple **invoicing application**. See it <a href="http://generator-invoices.meteor.com" target="_blank">live</a>, source is <a href="https://github.com/perak/kitchen-examples/tree/master/example-invoices" target="_blank">here</a>.

- Fixed some bugs


0.7.9
-----

- Added "bootswatch-paper" theme


0.7.8
-----

- First run is now much faster - meteor-kitchen now adds all packages in a single "meteor add ..." command.

- Added "route_params" property to MenuItem object.


0.7.7
-----

- Input file now can be in <a href="http://www.yaml.org/" target="_blank">YAML</a> format. Input YAML file must have extension ".yml" or ".yaml". You need to install <a href="https://www.npmjs.org/package/yaml2json" target="_blank">yaml2json</a>.

- Fixed few bugs


0.7.6
-----

- Input file argument now can be URL

- Improved processing custom components

- Fixed some minor bugs related to Meteor 1.0


0.7.5
-----

- Meteor 1.0 support

- Query object now has "options" member (second argument to collection.find and collection.findOne). See <a href="http://www.meteorkitchen.com/api_reference#query">query</a> object.

- You can specify date format for "datepicker" form controls. See <a href="http://www.meteorkitchen.com/api_reference#field">field</a> object, property "format".

- Collection field "default" property now can be "today" (current date) and "now" (current date and time).

- Fixed some bugs in HTML parser and improved parsing performance.


0.7.4
-----

- Added **datepicker input** control into Form component. You need to set `"type": "date"` and `"input": "datepicker"` into field definition.

- Added **export to CSV/TSV/JSON** button into DataView component. You need to set `"exportable": true` into field definitions. Clicking "Export" button will download data currently shown in DataView with fields marked as "exportable". Download is done client side using URI download and HTML5 download attribute (I didn't tested with IE, but I guess it doesn't work). See live example <a href="http://generator-dataview.meteor.com/customers" target="_blank">here</a>.


0.7.3
-----

- Added built-in **change password form**. Now along with "login", "logout", "register" and "forgot_password" pre-built templates, there is also "change_pass". See accounts example <a href="http://generator-accounts.meteor.com" target="_blank">here</a> (login and go to profile settings).

- Markup for dropdown menu item (menu item with sub-items) is now properly generated.

- DataView now can search fields that have dot inside name (for example "profile.name").
