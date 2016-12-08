What's Up?
==========

### Latest News

#### New GUI is comming soon!

**See preview video:**

<iframe width="420" height="315" src="https://www.youtube.com/embed/NBtFs1c4qhQ" frameborder="0" allowfullscreen></iframe>


#### Preparing to open meteor-kitchen CLI source code.

**Currently, cleaning up the code and writing docs - stay tuned.**

You can cheer for me by adding the star <span class="fa fa-star" style="color: yellow"></span> to this repositories:

- <a href="https://github.com/perak/kitchen-cli" target="_blank">https://github.com/perak/kitchen-cli</a>
- <a href="https://github.com/perak/kitchen-site" target="_blank">https://github.com/perak/kitchen-site</a>

Many stars == many thanks!


Version History
===============

0.9.73
------

- Fixed multiple bugs related to <a href="https://facebook.github.io/react/" target="_blank">React</a>

- Added `animate` property to application object. If you set `"animate": true` then <a href="https://daneden.github.io/animate.css/" target="_blank">animate.css</a> will be included into project. You can use standard animate.css classes, but if you set `animate` class instead `animated` with effects prefixed with `a-` then elements will animate on window scroll and resize. For example `<h1 class="animate a-bounce">Hello World</h1>` will animate when visible (scrolled into view), but `<h1 class="animated bounce">Hello World</h1>` will animate when page is rendered (animate.css default behavior). See <a href="http://example-onepage.meteorfarm.com" target="_blank">One Page Site</a> example.


0.9.72
------

- Added more support for <a href="https://facebook.github.io/react/" target="_blank">React</a> - "dataview" component is now implemented and functional (except search and sort functions). See <a href="{{pathFor 'compatibility'}}">Blaze vs React compatibility table</a> for example apps.

- Improved support for A-Frame (actually nothing spectacular: "Enter VR" control is now visible)

- When kitchen creates new meteor app it automatically executes "meteor npm install".

- Fixed few bugs and produced few new bugs ;)


0.9.71
------

- Implementing support for react - almost there! Most of examples now can be built without errors (with `--react` switch) but not all of them works... work still in progress...

## 0.9.70 <span class="label label-danger">New!</span>

- Added experimental support for <a href="https://aframe.io/" target="_blank">A-Frame</a> (Virtial Reality). See <a href="http://example-aframe-iss.meteorfarm.com" target="_blank">live example</a>  - it's International Space Station mini tour. Source code is <a href="https://github.com/perak/kitchen-examples/tree/master/example-aframe-iss" target="_blank">here</a>.


0.9.69
------

- Added windows installer. You can download it <a href="/install/install_win.exe" _target="blank">here</a>.


0.9.68
------

- Fixed bug with FlowRouter and user roles (react app)


0.9.67
------

- Fixed compatibility issues with Meteor 1.4


0.9.66
------

- Compatible with Meteor 1.4


0.9.65
------

- CLI creates file `.meteor-kitchen.json` in the root directory of generated application. It contains list of all generated files with checksums. Using this file, CLI is able to remove files generated in previous iteration which are not required anymore. Also, this file will be used to detect manually changed files to avoid overwriting and possibly allow merging (but this feature is not implemented yet).

- query.filter and query.options are now strings (stringified JSON). CLI still accepts object for backward compatibility.

- Preparing psychophysically to replace this site with the new "kitchen-GUI"...


0.9.64
------

- Fixed few bugs and added some internal features required by the new GUI


0.9.63
------

- Fixed few bugs and added some internal features required by the new GUI


0.9.62
------

- Fixed few minor bugs and added some internal features required by the new GUI


0.9.61
------

- Both Blaze and React app works with `Meteor 1.3`


0.9.60
------

- Both Blaze and React app works with `Meteor 1.3-rc.11`

- Markdown component implemented for React (and now React version of `example-subpages` can be built)

- Added <a href="{{pathFor 'compatibility'}}">Blaze vs React compatibility table</a>.


0.9.59
------

- Generated react app will work with `Meteor 1.3-rc.11`


0.9.58
------

### React (experimental)

- Still under development, but now you can generate (very simple) Meteor+React app (for example, try to build `example-minimal` and `example-accounts` applications).

This is how:
```
meteor-kitchen <input_file_or_url> <output_directory> --meteor-release 1.3-rc.11 --react
```


0.9.57
------

### React (soon!)

- Started adding support for <a href=\"https://facebook.github.io/react/\" target=\"_blank\">React</a>. You can expect something useful in next version 0.9.58 (in a week or two).


### New features

Now you can instruct meteor-kitchen which meteor version to use with command line switch `--meteor-release`.

Example:
```
meteor-kitchen <input_file> <output_dir> --meteor-release 1.3-modules-beta.8
```


Now you can specify list of npm modules to install:

Example:
```
{
	"application": {
	    ...
		"packages": {
			"meteor": ["random", "check"],
			"npm": ["react", "react-dom"]
		}
		...
	}
}
``` 

### Bugfixes

- Improved `semantic-ui` templates.

- Fixed small bugs in HTML parser.


0.9.56
------

- Now you can set `on_item_clicked_code` in DataView. Code will be executed when table item (row) is clicked. If you have `details_route` set then this code will be executed before redirect to details route.

Example:
```
"on_item_clicked_code": "alert(this._id);"
```


0.9.55
------

- Improved <a href="http://semantic-ui.com/" target="_blank">semantic-ui</a> templates.

- Fixed bugs related to CollectionFS: storage adapters are now properly created for `filesystem`, `S3` and `Dropbox`

- Fixed this bug: (It was showing first time you start app using bootstrap3)

```
=> Errors prevented startup:
   
   While processing files with less (for target web.browser):
   client/styles/styles/styles.less:1: Unknown import:
   /client/styles/framework/bootstrap3/custom.bootstrap.less
```


0.9.54
------

- Improved <a href="http://semantic-ui.com/" target="_blank">semantic-ui</a> and <a href="http://materializecss.com/" target="_blank">materialize</a> templates.


0.9.53
------

- Windows XP & 7: you don't need "where.exe" anymore.

- Fixed few small bugs.


0.9.52
------

- Now you can build and download **Android** .apk from GUI (single click!)


0.9.51
------

- More bugfixes


0.9.50
------

- Just a few bugfixes


0.9.49
------

### New features

- Now compatible with <a href="http://info.meteor.com/blog/announcing-meteor-1.2" target="_blank">Meteor 1.2</a>

- Improved <a href="http://semantic-ui.com/" target="_blank">semantic-ui</a> templates: now you can build app using semantic-ui without errors, but not all components are properly styled, no datepicker etc.

- Added early support for <a href="http://materializecss.com/" target="_blank">Materialize</a> front-end framework (incomplete). Just specify `"frontend": "materialize"`. See "getting started" for more details.


0.9.48
------

### New features

**Input file structure is changed** 

**Why it is changed?**

We are preparing for the new GUI and some redundancies and mistakes by design should be fixed before we dive too far into it.

**Compatibility with previous versions**

GUI

All your applications that resides in GUI are automatically converted to the new structure.

CLI

Don't worry - CLI is backward compatible and your apps with old structure will be built correctly but you'll experience warning messages. Please consider converting your input file structure into new format.


**How to convert?**

- **option 1** - automatically using GUI: login into GUI, create new application (any, minimal), goto "Edit source" page, clear JSON editor and paste your input file here. Click "Save", navigate to any page and come back to JSON editor - your file will be converted. You'l be sure that everything went fine if generator builds application without warnings.

- **option 2** - manually. You can follow instructions you get from warnings printed while generating application, and here is what is changed:


**What is changed?**

**Menus** - no more `menus` array in "zone" and "page" objects. Menu is just a component as any other, so put your menus into `components` array.

Old:
```json
{
	"application": {

		"free_zone": {
			
			"pages": [
			],

			"menus": [
				{ ...your menu was here... }
			]
		}
	}
}
```

New:
```json
{
	"application": {

		"free_zone": {
			
			"pages": [
			],

			"components": [
				{ ...your menu is now here... }
			]
		}
	}
}
```
*(don't forget to set your menu object's `"type": "menu"`)*


**Queries** - defining query in each page and/or component leads to redundant code - the same query can appear in many pages and components and you was forced to repeat it's definition. Also, it was hard to maintain redundant queries.

Now, all queries are defined in `application.queries` array:

```
{
	"application": {
		"collections": [
			{ "name": "customers" }
		],

		"queries": [
			{
				"name": "all_customers",
				"collection": "customers",
				"filter": {},
				"options": {}
			}
		]
	}
}
```
Once defined, query can be referenced from any page and component just by name:

```
{
	"name": "my_cool_page",
	"query_name": "all_customers",
	"query_params": []
}
```
*(please check "Getting started" page about queries for more details)*


### Bugfixes

- There was a bug in a GUI - if application created with GUI contains any collection, you couldn't built app from GUI (error was: collection "collection_name" is of unknown type "string"). Application still can be built from CLI. Problem was that GUI sets wrong `"type": "string"` to collection object (instead `"type": "collection"`).

- A lot of small bugs are fixed (and maybe a lot of fresh new bugs are produced :)


0.9.47
------

### New features

- In zone object, you can specify one of 3 layouts: `empty`, `sticky_footer` and `navbar` (both for "bootstrap3" and "semantic-ui"). 

  - **empty** layout is empty.
  - **sticky_footer** is layout without menu with footer (footer is allways at the bottom of viewport).
  - **navbar** is layout with top menu and sticky footer (this is default layout).

- Zone object have "components" array - you can add any components into your layout.


0.9.46
------

### New features

- Now using <a href="https://atmospherejs.com/nemo64/bootstrap" target="_blank">nemo64:bootstrap</a> package (instead including raw bootstrap-less directory).

- Started adding support for <a href="http://semantic-ui.com/" target="_blank">semantic-ui</a>. You'l be able to choose frontend framework by setting application object's property `frontend` to `bootstrap3` or `semantic-ui`. Not yet fully implemented - expect it in next few days.


### Bugfixes

- After automatic redirect to page's first subpage, back button now works (using `replaceState`).

- There was problem with escape-ing json strings - fixed.

- In some circumstances generator didn't report missing component template file - fixed.


0.9.45
------

### New features

- Tags input in forms: now you can set field input property to `"input": "tags"` and you'l get tags input control. Field type can be string or array. If it is string then result is string with comma separated values ("tag1,tag2,tag3"). 

### Bugfixes

- Menu item class for home subpages is now properly set.


0.9.44
------

- Now using <a href="https://www.npmjs.com/package/human2machine" target="_blank">human2machine</a> npm module to translate from everyday english to json. **Contributions are welcome!**

0.9.43
------

### New features

- <span class="label label-danger">New!</span> Input file now can be application description written in everyday **human language**. See example <a href="https://github.com/perak/kitchen-examples/tree/master/example-human" target="_blank">here</a>.

- In application with user account system, now you can set `"send_verification_email": true` and add verify e-mail page into public zone: `{ "name": "verify_email", "template": "verify_email", "route_params": ["verifyEmailToken"] }`. See updated <a href="https://github.com/perak/kitchen-examples/tree/master/example-admin" target="_blank">"admin" example</a>.

### Bugfixes

- If you use collection2, boolean field now have correct type in generated SimpleSchema


0.9.42
------

### New features

- Application with user account system now can have "free_zone" too. Pages inside "free_zone" are accessible for both authenticated and non-authenticated users. See updated <a href="https://github.com/perak/kitchen-examples/tree/master/example-photosharing" target="_blank">photosharing example</a>. In example application, main page with photos is inside free_zone.

- Page object's `zoneless` property is now deprecated and exists only for backward compatibility. Will be removed soon.


### New example

- **IoT - Geiger**: see it <a href="http://example-geiger.meteorfarm.com" target="_blank">live</a>, source is <a href="https://github.com/perak/kitchen-examples/tree/master/example-geiger" target="_blank">here</a>.


0.9.41
------

### New example

- **Minimalistic IDE**: see it <a href="http://example-ide.meteorfarm.com" target="_blank">live</a>, source is <a href="https://github.com/perak/kitchen-examples/tree/master/example-ide" target="_blank">here</a>. Application demonstrates how to use built-in "tree_view" component (and more).


0.9.40
------

### New features

- **GUI**: first step in integration with **GitHub** - now you can push code to GitHub directly from Kitchen-GUI.


### Bugfixes

- Changed e-mail regex check in forms - e-mail address now can contain `+` sign.

- Removed deprecated `action_code` property from examples.

- Fixed: collection hooks are generated twice


0.9.39
------

#### New features

- **Upload**: at last! Using <a href="https://github.com/CollectionFS/Meteor-CollectionFS" target="_blank">CollectionFS</a>. See <a href="http://example-upload.meteorfarm.com" target="_blank">live example</a>, source is <a href="https://github.com/perak/kitchen-examples/tree/master/example-upload" target="_blank">here</a>. See [getting started](/getting_started#file-uploads) for more info.


0.9.38
------

#### New features

- **Collection joins**: now you can define joins between collections. This is experimental feature. Currently uses [perak:joins](https://atmospherejs.com/perak/joins) package written in rush. See [getting started](/getting_started#joins) for more info.


#### New example

- **IoT - Sensors**. See it <a href="http://example-iot.meteorfarm.com" target="_blank">live</a>, source is <a href="https://github.com/perak/kitchen-examples/tree/master/example-iot" target="_blank">here</a>.


#### Bugfixes

- Fixed few minor bugs


0.9.37
------

#### New features

- **OAuth**: added more OAuth providers, now we got login with **google**, **github**, **linkedin**, **facebook**, **twitter** and **meteor**. See [getting started](/getting_started#oauth) for more info.

- Small but usefull: boolean fields with `"input": "checkbox"` are now shown in dataview (table) as checkbox and user can check/uncheck it directly here. See updated [example-dataview](http://example-dataview.meteorfarm.com).


#### Bugfixes

- Built-in form component validation: if your field is for example of type "email" but *not required* and user leaves form field blank it was regEx validated - that was a bug and is fixed now. Non-required fields are not validated if blank.


0.9.36
------

#### OAuth

Now you can generate code with OAuth login (currently only "google" and "github", other providers will be added soon). Just set `login_with_google` and/or `login_with_github` to `true` in application object. You'l need to add `clientId` and `secret` in settings passed to meteor. See "getting started" for more details.


#### Collection2

If you set `use_collection2` to `true` in your application object then simple-schema will be generated and Collection2 will be used for all collections. Note: inside collection object, you need to define all fields that will be inserted/modified - collection2 will automatically remove unlisted fields passed to `Collection.insert` and `Collection.update`.


#### GUI - sitemap diagram

Is now automatically drawn - plan is to enable drag&drop to add/remove/move pages - one step closer to "draw & generate app" ;)


0.9.35
------

- Query parameter value now can be `Meteor.anything`, `this.anything`, `Session.anything` and `function() { anything }`

- **GUI - now you can build application in the cloud** (without installing and running meteor-kitchen locally). But, application cannot be run in the cloud yet - server (<a href="http://www.meteorfarm.com" target="_blank">meteorfarm.com</a> setup is in progress.


0.9.34
------

- **Fixed bug related to special role "owner"**. Publication code, `userCanUpdate` and `userCanRemove` functions are now properly generated.

- Markdown component - now you can directly set markdown source (before was possible only to reffer external file).


0.9.33
------

- Deprecated properties in `collection` object: `read_owner_only` and `write_owner_only` (still functional due to backward compatibility). Now you can set special role `owner` in `roles_allowed_to_read`, `roles_allowed_to_update` and `roles_allowed_to_delete`. See "Getting started" guid about user roles.

- GUI: in form for editing object properties, "route" input is now dropdown - list of all existing routes.

- New loading template - now with animated spinner. Thanks to <a href="https://github.com/Billybobbonnet" target="_blank"><b>Antoine Cordelois</b></a>.

- Fixed bug with integer query params. If your query filter uses params in form `{ "someIntField": "#staticValue" }` and you define staticValue in list of query params: `{ "name": "staticValue", "value": 1 }` that value is now properly passed as integer (before it was string).


0.9.32
------

- GUI: in form for editing collection fields, radio buttons with large number of choices are changed to "select"

- GUI: in form for editing queries, "collection" input is now dropdown - list of existing collections


0.9.31
------

- Started refactoring GUI

- GUI: added popover help to object editor


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

- Added new example - single-page website. Source code is <a href="https://github.com/perak/kitchen-examples/tree/master/example-onepage" target="_blank">here</a>, live example is <a href="http://example-onepage.meteorfarm.com" target="_blank">here</a>.

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

- There was bug preventing user to change own profile. Fixed now. Check <a href="http://example-accounts.meteorfarm.com" target="_blank">example-accounts</a>.

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

- Added new example: simple **invoicing application**. See it <a href="http://example-invoices.meteorfarm.com" target="_blank">live</a>, source is <a href="https://github.com/perak/kitchen-examples/tree/master/example-invoices" target="_blank">here</a>.

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

- Added **export to CSV/TSV/JSON** button into DataView component. You need to set `"exportable": true` into field definitions. Clicking "Export" button will download data currently shown in DataView with fields marked as "exportable". Download is done client side using URI download and HTML5 download attribute (I didn't tested with IE, but I guess it doesn't work). See live example <a href="http://example-dataview.meteorfarm.com/customers" target="_blank">here</a>.


0.7.3
-----

- Added built-in **change password form**. Now along with "login", "logout", "register" and "forgot_password" pre-built templates, there is also "change_pass". See accounts example <a href="http://example-accounts.meteorfarm.com" target="_blank">here</a> (login and go to profile settings).

- Markup for dropdown menu item (menu item with sub-items) is now properly generated.

- DataView now can search fields that have dot inside name (for example "profile.name").
