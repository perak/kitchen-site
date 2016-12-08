# application

Property | Type | Description
---------|------|------------
title | string | Application title
meta\_description | string | Default meta\_description for pages without meta\_description
meta\_title | string | Default meta\_title for pages without meta\_title
templating | string | "blaze" or "react". Default: "blaze". Note: "react" is not fully implemented yet.
frontend | string | "bootstrap3", "semantic-ui", "materialize" or "aframe". Default: "bootstrap3". "semantic-ui", "materialize" and "aframe" are not fully implemented yet. "aframe" can only be used with "react" app.
theme | string | Visual theme name. With "bootstrap" frontend theme can be "flat-ui" or one of bootswatch themes: "bootswatch-amelia", "bootswatch-cerulean", "bootswatch-cosmo", "bootswatch-cyborg", "bootswatch-darkly", "bootswatch-flatly", "bootswatch-journal", "bootswatch-lumen", "bootswatch-paper", "bootswatch-readable", "bootswatch-simplex", "bootswatch-slate", "bootswatch-spacelab", "bootswatch-superhero", "bootswatch-united", "bootswatch-yeti"
animate | bool | If set to true, animate.css will be included and all elements with "animated" css class will be animated when they reach viewport (on scroll and on resize)
footer\_text | string | Text to show in page footer
roles | array of string | List of user roles for applications with user account system. There are two predefined roles "nobody" and "owner" (see collection object for more info).
default\_role | string | Default role for new users
use\_collection2 | bool | Experimental feature. If set to true, schema will be generated and Collection2 package will be used for collections. Default: false
collections | array of <a href="#collection">collection</a> | Mongo database collections
queries | array of <a href="#query">query</a> | List of database queries (publications).
free\_zone | <a href="#zone">zone</a> | Free zone (for application without user account system)
public\_zone | <a href="#zone">zone</a> | Public zone (for app with user account system). Pages inside this zone are accessible only for non-authenticeted users.
private\_zone | <a href="#zone">zone</a> | Private zone (for app with user account system). Pages inside this zone are accessible only for authenticeted users.
login\_with\_password | bool | Allow login with password (for app with user account system only). Default: true
send\_verification\_email | bool | After user account registration, e-mail with verification link will be sent to user. Default: false
login\_with\_google | bool | Allow OAuth login with google account (for app with user account system only). Default: false
login\_with\_github | bool | Allow OAuth login with github account (for app with user account system only). Default: false
login\_with\_linkedin | bool | Allow OAuth login with linkedin account (for app with user account system only). Default: false
login\_with\_facebook | bool | Allow OAuth login with facebook account (for app with user account system only). Default: false
login\_with\_twitter | bool | Allow OAuth login with twitter account (for app with user account system only). Default: false
login\_with\_meteor | bool | Allow OAuth login with meteor developer account (for app with user account system only). Default: false
server\_startup\_code | string | javascript code to execute at server startup
client\_startup\_code | string | javascript code to execute at client startup
on\_user\_created\_code | string | javascript code to execute when new user is created (Accounts.onCreateUser)
on\_user\_logged\_code | string | javascript code to execute when user is logged in (Accounts.onLogin)
global\_on\_rendered\_code | string | javascript code to execute when any page is rendered
server\_startup\_source\_file | string | File that contains javascript code to execute at server startup (relative to input file)
client\_startup\_source\_file | string | File that contains javascript code to execute at client startup (relative to input file)
on\_user\_created\_source\_file | string | File that contains javascript code to execute when new user is created (relative to input file)
on\_user\_logged\_source\_file | string | File that contains javascript code to execute when user is logged in (relative to input file)
mobile\_config | string | If non-empty: will be written to mobile-config.js in app root
stylesheet | string | CSS/LESS stylesheet. If non-empty, will be written to CLIENT\_STYLES\_DIR/user\_styles.less
server\_side\_routes | array of <a href="#server_side_route">server\_side\_route</a> | List of server side routes.
copy\_files | array of <a href="#file_pair">file\_pair</a> | List of files to copy into destination directory. You can use directory aliases. See <a href="#file\_pair">file\_pair</a> for more details.
packages | <a href="#packages">packages</a> | List of additional meteor and meteorite packages that will be automatically added by generator
router\_config | <a href="#object">object</a> | Optional parameter passed to Router.config()

Example:
```json
{
	"title": "",
	"meta_description": "",
	"meta_title": "",
	"templating": "blaze",
	"frontend": "bootstrap3",
	"theme": "",
	"animate": false,
	"footer_text": "",
	"roles": [
	],
	"default_role": "",
	"use_collection2": false,
	"collections": [
	],
	"queries": [
	],
	"free_zone": {
	},
	"public_zone": {
	},
	"private_zone": {
	},
	"login_with_password": true,
	"send_verification_email": false,
	"login_with_google": false,
	"login_with_github": false,
	"login_with_linkedin": false,
	"login_with_facebook": false,
	"login_with_twitter": false,
	"login_with_meteor": false,
	"server_startup_code": "",
	"client_startup_code": "",
	"on_user_created_code": "",
	"on_user_logged_code": "",
	"global_on_rendered_code": "",
	"server_startup_source_file": "",
	"client_startup_source_file": "",
	"on_user_created_source_file": "",
	"on_user_logged_source_file": "",
	"mobile_config": "",
	"stylesheet": "",
	"server_side_routes": [
	],
	"copy_files": [
	],
	"packages": {
	},
	"router_config": {
	}
}
```

# collection

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Collection type. Can be "collection" or "file\_collection" (FS.Collection). Default: "collection".
storage\_adapters | array of string | For collection of type "file\_collection": list of CollectionFS storage adapters: "gridfs", "filesystem", "s3" or "dropbox". If not specified, generator will assume "gridfs".
fields | array of <a href="#field">field</a> | Field list. Not mandatory, used by components such as form, dataview etc.
owner\_field | string | Field name used to store user ID of document owner. Only for apps using user accounts. Value of this field will be automatically set server side by "before.insert" hook.
roles\_allowed\_to\_read | array of string | List of user roles that can subscribe to this collection. You can use special roles "nobody" (nobody can read) and "owner" (only owner/creator can read).
roles\_allowed\_to\_insert | array of string | List of user roles that can insert documents into this collection. You can use special role "nobody" (nobody can insert).
roles\_allowed\_to\_update | array of string | List of user roles that can update documents. You can use special roles "nobody" (nobody can update) and "owner" (only owner/creator can update).
roles\_allowed\_to\_delete | array of string | List of user roles that can delete documents. You can use special roles "nobody" (nobody can remove) and "owner" (only owner/creator can remove).
roles\_allowed\_to\_download | array of string | For collection of type "file\_collection": List of user roles that can download files. You can use special roles "nobody" (nobody can download) and "owner" (only owner/creator can download).
before\_insert\_code | string | Code to be executed before new document is inserted into collection. Should be only body of a function with args: (userId, doc). See <a href="https://github.com/matb33/meteor-collection-hooks" target="_blank">meteor-collection-hooks</a> package for more details.
before\_update\_code | string | Code to be executed before document is updated. Should be only body of a function with args: (userId, doc, fieldNames, modifier, options)
before\_remove\_code | string | Code to be executed before document is removed. Should be only body of a function with args: (userId, doc)
after\_insert\_code | string | Code to be executed after new document is inserted into collection. Should be only body of a function with args: (userId, doc). See <a href="https://github.com/matb33/meteor-collection-hooks" target="_blank">meteor-collection-hooks</a> package for more details.
after\_update\_code | string | Code to be executed after document is updated. Should be only body of a function with args: (userId, doc, fieldNames, modifier, options)
after\_remove\_code | string | Code to be executed after document is removed. Should be only body of a function with args: (userId, doc)
before\_insert\_source\_file | string | File that contains code to be executed before new document is inserted (relative to input JSON file). See "before\_insert\_code".
before\_update\_source\_file | string | File that contains code to be executed before document is updated (relative to input JSON file). See "before\_update\_code".
before\_remove\_source\_file | string | File that contains code to be executed before document is removed (relative to input JSON file). See "before\_remove\_code".
after\_insert\_source\_file | string | File that contains code to be executed after new document is inserted (relative to input JSON file). See "after\_insert\_code".
after\_update\_source\_file | string | File that contains code to be executed after document is updated (relative to input JSON file). See "after\_update\_code".
after\_remove\_source\_file | string | File that contains code to be executed after document is removed (relative to input JSON file). See "after\_remove\_code".

Example:
```json
{
	"name": "",
	"type": "collection",
	"storage_adapters": [
	],
	"fields": [
	],
	"owner_field": "",
	"roles_allowed_to_read": [
	],
	"roles_allowed_to_insert": [
	],
	"roles_allowed_to_update": [
	],
	"roles_allowed_to_delete": [
	],
	"roles_allowed_to_download": [
	],
	"before_insert_code": "",
	"before_update_code": "",
	"before_remove_code": "",
	"after_insert_code": "",
	"after_update_code": "",
	"after_remove_code": "",
	"before_insert_source_file": "",
	"before_update_source_file": "",
	"before_remove_source_file": "",
	"after_insert_source_file": "",
	"after_update_source_file": "",
	"after_remove_source_file": ""
}
```

# custom_component

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
custom\_template | string | Custom html and js template filename (without extension). Path is relative to input JSON file.
html | string | Custom HTML code (for "blaze" applications only - ignored if "react" is used)
js | string | Custom JS code (for "blaze" applications only - ignored if "react" is used)
jsx | string | Custom JSX code (for "react" applications only - ignored if "blaze" is used)
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list

Example:
```json
{
	"name": "",
	"type": "custom_component",
	"custom_template": "",
	"html": "",
	"js": "",
	"jsx": "",
	"imports": [
	],
	"dest_selector": "",
	"dest_position": "",
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	]
}
```

# data_view

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
title\_icon\_class | string | If present, "span" with this class name will be added to title (if title is set)
events\_code | string | Content of Template.TEMPLATE\_NAME.events({ ... });
helpers\_code | string | Content of Template.TEMPLATE\_NAME.helpers({ ... });
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
text\_if\_empty | string | Text to show if collection is empty.
text\_if\_not\_found | string | Text to show if search string is not found.
insert\_route | string | Route name of page containing insert form
details\_route | string | Route name of page showing selected item details (usually page containing form of type "read\_only").
edit\_route | string | Route name of page containing edit form. Makes edit\_route\_params field mandatory in most cases to be functional.
delete\_route | string | Route name to execute when user clicks "delete". Not mandatory - generator will automatically produce code for delete operation.
insert\_route\_params | array of <a href="#param">param</a> | Parameters to be passed to "insert\_route"
details\_route\_params | array of <a href="#param">param</a> | Parameters to be passed to "details\_route"
edit\_route\_params | array of <a href="#param">param</a> | Parameters to be passed to "edit\_route"
delete\_route\_params | array of <a href="#param">param</a> | Parameters to be passed to "delete\_route"
insert\_button\_title | string | Insert button title
on\_item\_clicked\_code | string | Code to execute when item is clicked (before redirect if DetailsRoute is specified)
views | array of string | View styles: "table", "list" or "cards". Default: "table".
fields | array of <a href="#field">field</a> | Defainition of table columns. If empty, generator will use fields defined at collection level.

Example:
```json
{
	"name": "",
	"type": "data_view",
	"imports": [
	],
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"title_icon_class": "",
	"events_code": "",
	"helpers_code": "",
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	],
	"template_rendered_code": "",
	"text_if_empty": "No data here",
	"text_if_not_found": "",
	"insert_route": "",
	"details_route": "",
	"edit_route": "",
	"delete_route": "",
	"insert_route_params": [
	],
	"details_route_params": [
	],
	"edit_route_params": [
	],
	"delete_route_params": [
	],
	"insert_button_title": "",
	"on_item_clicked_code": "",
	"views": [
	],
	"fields": [
	]
}
```

# div

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list
text | string | this text will be added into div

Example:
```json
{
	"name": "",
	"type": "div",
	"imports": [
	],
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	],
	"text": ""
}
```

# field

Property | Type | Description
---------|------|------------
name | string | Object name
title | string | Field title (used in form labels, table column headers etc.)
type | string | Field data type used in form validations. Examples: "string", "integer", "float", "date", "time", "bool", "array", "email", "random\_string". Default: "string"
default | string | Default value. For date fields you can use special constant "today", for time fields you can use "now". Also, you can set helper here "{{myHelper}}".
min | string | Minimum value (only for numeric fields)
max | string | Maximum value (only for numeric fields)
required | bool | Is field input required? Default: false
format | string | Currently used only with data types "date" and "time". Contains date or time format such as "MM/DD/YYYY" or "hh:mm:ss"
searchable | bool | Is field searchable? Default: true
sortable | bool | Is field sortable? Default: true
exportable | bool | If true field will be exported to CSV/JSON (used in dataview component). Default: false
input | string | Form input control type: "text", "password", "datepicker", "read-only", "textarea", "radio", "checkbox", "select", "crud", "file", "custom"
input\_template | string | Template for "custom" input field (relative to input file)
input\_group\_class | string | This CSS class will be added to field input group container in forms.
input\_control\_class | string | This CSS class will be added to input control in forms.
input\_items | array of <a href="#input_item">input\_item</a> | Item list for input type "radio" and "select"
lookup\_query\_name | string | Query name used for form input type "select".
lookup\_query\_params | array of <a href="#param">param</a> | Lookup query params
lookup\_key | string | Field name from lookup\_query used as option value in input type "select". Mandatory field if lookup\_query is defined
lookup\_field | string | Field name from lookup\_query used as option title in input type "select". Mandatory field if lookup query is defined
display\_helper | string | Helper name used to display value from this field (used in DataView, Forms etc.)
array\_item\_type | string | If "type" is set to "array" then you can define array item type here. Format is the same as for "type" property.
crud\_fields | array of <a href="#field">field</a> | If "array\_item\_type" is set to "object" then you can define fields for input type "crud".
crud\_insert\_title | string | For fields with "input": "crud" - insert button and insert form title
file\_collection | string | For fields with "input": "file". Name of FS.Collection where file is stored. Generator will automatically join this collection with file\_collection.
file\_container | string | For fields with "input": "file". Field name where FS.File object from joined FS.Collection will be stored.
join\_collection | string | Collection name to join with. If set then this field acts as foreign key. For generic join don't set this field (see "join\_collection\_field" instead).
join\_collection\_field | string | Used in generic joins only. Field name (from this collection) containing collection name to join with. If set then this field acts as foreign key.
join\_container | string | Field name where document from joined collection will be stored
join\_fields | array of string | Field list to fetch from joined collection. Ignored in generic joins.
show\_in\_dataview | bool | If set to "false", field will not be shown in dataview components. Default: true
show\_in\_insert\_form | bool | If set to "false", field will not be included in forms with mode "insert". Default: true
show\_in\_update\_form | bool | If set to "false", field will not be included in forms with mode "update". Default: true
show\_in\_read\_only\_form | bool | If set to "false", field will not be included in forms with mode "read\_only". Default: true

Example:
```json
{
	"name": "",
	"title": "",
	"type": "string",
	"default": "",
	"min": "",
	"max": "",
	"required": false,
	"format": "",
	"searchable": true,
	"sortable": true,
	"exportable": false,
	"input": "text",
	"input_template": "",
	"input_group_class": "",
	"input_control_class": "",
	"input_items": [
	],
	"lookup_query_name": "",
	"lookup_query_params": [
	],
	"lookup_key": "",
	"lookup_field": "",
	"display_helper": "",
	"array_item_type": "",
	"crud_fields": [
	],
	"crud_insert_title": "",
	"file_collection": "",
	"file_container": "",
	"join_collection": "",
	"join_collection_field": "",
	"join_container": "",
	"join_fields": [
	],
	"show_in_dataview": true,
	"show_in_insert_form": true,
	"show_in_update_form": true,
	"show_in_read_only_form": true
}
```

# file_pair

Property | Type | Description
---------|------|------------
source | string | Source file to copy. Can be path to local file relative to input JSON or URL (starts with "http://" or "https://").
source\_content | string | If source file is not specified, this content will be written into destination file.
dest | string | Destination file. You can use directory aliases: OUTPUT\_DIR, CLIENT\_DIR, CLIENT\_LIB\_DIR, CLIENT\_COMPONENTS\_DIR, CLIENT\_STYLES\_DIR, CLIENT\_STYLES\_DEFAULT\_DIR, CLIENT\_STYLES\_THEME\_DIR, CLIENT\_VIEWS\_DIR, CLIENT\_VIEWS\_NOT\_FOUND\_DIR, CLIENT\_VIEWS\_LOADING\_DIR, LIB\_DIR, SETTINGS\_DIR, BOTH\_DIR, BOTH\_LIB\_DIR, BOTH\_COLLECTIONS\_DIR, PUBLIC\_DIR, PUBLIC\_IMAGES\_DIR, PUBLIC\_FONTS\_DIR, PRIVATE\_DIR, SERVER\_DIR, SERVER\_LIB\_DIR, SERVER\_COLLECTIONS\_DIR, SERVER\_PUBLISH\_DIR, SERVER\_ROUTER\_DIR, SERVER\_METHODS\_DIR

Example:
```json
{
	"source": "",
	"source_content": "",
	"dest": ""
}
```

# form

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
title\_icon\_class | string | If present, "span" with this class name will be added to title (if title is set)
events\_code | string | Content of Template.TEMPLATE\_NAME.events({ ... });
helpers\_code | string | Content of Template.TEMPLATE\_NAME.helpers({ ... });
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
mode | string | "insert", "update" or "read\_only"
layout | string | "default", "horizontal" or "inline"
submit\_route | string | Route name of page to navigate after successfull submit. Mandatory field for submit button to appear
cancel\_route | string | Route name of page to navigate on form cancelation. Mandatory field for cancel button to appear
close\_route | string | Route name of page to navigate when user clicks "OK" button in "read\_only" form. Mandatory field for close button to appear
back\_route | string | Route name of page to navigate on form back button. Mandatory field for back button to appear
submit\_code | string | Custom code to execute on form submit
cancel\_code | string | Custom code to execute on form cancel
submit\_button\_title | string | Text to show in submit button, default "Save"
cancel\_button\_title | string | Text to show in cancel button, default "Cancel"
close\_button\_title | string | Text to show in close button, default "OK"
submit\_route\_params | array of <a href="#param">param</a> | Route params to be passed to "submit\_route"
cancel\_route\_params | array of <a href="#param">param</a> | Route params to be passed to "cancel\_route"
close\_route\_params | array of <a href="#param">param</a> | Route params to be passed to "close\_route"
back\_route\_params | array of <a href="#param">param</a> | Route params to be passed to "back\_route"
fields | array of <a href="#field">field</a> | Defainition of form fields. If empty, generator will use fields defined at collection level.
hidden\_fields | array of <a href="#hidden_field">hidden\_field</a> | Fields (not shown in a form) that will be automatically written on submit.

Example:
```json
{
	"name": "",
	"type": "form",
	"imports": [
	],
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"title_icon_class": "",
	"events_code": "",
	"helpers_code": "",
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	],
	"template_rendered_code": "",
	"mode": "",
	"layout": "default",
	"submit_route": "",
	"cancel_route": "",
	"close_route": "",
	"back_route": "",
	"submit_code": "",
	"cancel_code": "",
	"submit_button_title": "",
	"cancel_button_title": "",
	"close_button_title": "",
	"submit_route_params": [
	],
	"cancel_route_params": [
	],
	"close_route_params": [
	],
	"back_route_params": [
	],
	"fields": [
	],
	"hidden_fields": [
	]
}
```

# hidden_field

Property | Type | Description
---------|------|------------
name | string | Field name
value | string | Field value

Example:
```json
{
	"name": "",
	"value": ""
}
```

# input_item

Property | Type | Description
---------|------|------------
value | string | select, radio or checkbox item value written on submit
title | string | select, radio or checkbox item title shown to user

Example:
```json
{
	"value": "",
	"title": ""
}
```

# jumbotron

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
title\_icon\_class | string | If present, "span" with this class name will be added to title (if title is set)
events\_code | string | Content of Template.TEMPLATE\_NAME.events({ ... });
helpers\_code | string | Content of Template.TEMPLATE\_NAME.helpers({ ... });
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
text | string | Text to be shown in jumbotron
image\_url | string | Background image URL
button\_title | string | Jumbotron button title
button\_route | string | Destination route name
button\_route\_params | array of <a href="#param">param</a> | Parameters to be passed to destination route
button\_class | string | CSS class to be added to jumbotron button

Example:
```json
{
	"name": "",
	"type": "jumbotron",
	"imports": [
	],
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"title_icon_class": "",
	"events_code": "",
	"helpers_code": "",
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	],
	"template_rendered_code": "",
	"text": "",
	"image_url": "",
	"button_title": "",
	"button_route": "",
	"button_route_params": [
	],
	"button_class": ""
}
```

# markdown

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list
source | string | Markdown here
source\_file | string | Path to file containing markdown (relative to input file)

Example:
```json
{
	"name": "",
	"type": "markdown",
	"imports": [
	],
	"dest_selector": "",
	"dest_position": "",
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	],
	"source": "",
	"source_file": ""
}
```

# menu

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
title\_icon\_class | string | If present, "span" with this class name will be added to title (if title is set)
events\_code | string | Content of Template.TEMPLATE\_NAME.events({ ... });
helpers\_code | string | Content of Template.TEMPLATE\_NAME.helpers({ ... });
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
items | array of <a href="#menu_item">menu\_item</a> | Menu items.
items\_container\_class | string | CSS class for div containing menu items.
scroll\_spy\_selector | string | "scrollspy" selector for menus with anchor links, usually "body".

Example:
```json
{
	"name": "",
	"type": "menu",
	"imports": [
	],
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"title_icon_class": "",
	"events_code": "",
	"helpers_code": "",
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	],
	"template_rendered_code": "",
	"items": [
	],
	"items_container_class": "",
	"scroll_spy_selector": ""
}
```

# menu_item

Property | Type | Description
---------|------|------------
title | string | Item title as appears in menu
route | string | Route name of destination page
route\_params | array of <a href="#param">param</a> | Parameters to be passed to "route"
url | string | URL (for external links. You can use only one of "route" or "url" properties, not both)
target | string | Anchor "target" attribute value e.g. "_blank"
class | string | CSS class name to be added to item `li` element
items\_container\_class | string | CSS class for div containing subitems.
icon\_class | string | If present, generator will add `span` into menu item and assign this CSS class to it
items | array of <a href="#menu_item">menu\_item</a> | Subitems

Example:
```json
{
	"title": "",
	"route": "",
	"route_params": [
	],
	"url": "",
	"target": "",
	"class": "",
	"items_container_class": "",
	"icon_class": "",
	"items": [
	]
}
```

# packages

Property | Type | Description
---------|------|------------
meteor | array of string | List of meteor packages. Packages listed here will be added to your application.
npm | array of string | List of npm packages.
mrt | array of string | List of meteorite packages (deprecated)

Example:
```json
{
	"meteor": [
	],
	"npm": [
	],
	"mrt": [
	]
}
```

# page

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
template | string | Built-in html and js template file name (without extension) contained in kitchen templates directory.
custom\_template | string | Custom html and js template filename (without extension). Path is relative to input JSON file.
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
class | string | CSS class name to be added to component
title | string | Component title
title\_icon\_class | string | If present, "span" with this class name will be added to title (if title is set)
events\_code | string | Content of Template.TEMPLATE\_NAME.events({ ... });
helpers\_code | string | Content of Template.TEMPLATE\_NAME.helpers({ ... });
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
meta\_description | string | Meta description
meta\_title | string | Head title tag and meta title
text | string | Text to be inserted into page
background\_image | string | Background image URL
container\_class | string | Class to be added to page container. Example: "container-fluid". Default "container".
route\_params | array of string | Route params to be passed via URL
close\_route | string | If specified, page will have close button routing to this route
close\_route\_params | array of <a href="#param">param</a> | Params to be passed to close\_route
back\_route | string | Route name of page to navigate on back button click. Mandatory field for back button to appear
back\_route\_params | array of <a href="#param">param</a> | Route params to be passed to "back\_route"
roles | array of string | User roles allowed to access this page
pages | array of <a href="#page">page</a> | Subpages
related\_queries | array of <a href="#subscription">subscription</a> | List of additional queries (publications) to subscribe
force\_yield\_subpages | bool | Subpages will be rendered in "subcontent" area even if this page doesn't contains menu pointing to subpages
zoneless | bool | Deprecated - will be removed soon. For applications with user account system: make this page visible for both authenticated and non-authenticated users
parent\_layout | bool | If set to true parent page will be used as layoutTemplate. Default: false
layout\_template | string | Custom layout template name
controller\_before\_action | string | code to execute inside route controller "onBeforeAction" hook
controller\_after\_action | string | code to execute inside route controller "onBeforeAction" hook

Example:
```json
{
	"name": "",
	"type": "page",
	"template": "",
	"custom_template": "",
	"imports": [
	],
	"class": "",
	"title": "",
	"title_icon_class": "",
	"events_code": "",
	"helpers_code": "",
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	],
	"template_rendered_code": "",
	"meta_description": "",
	"meta_title": "",
	"text": "",
	"background_image": "",
	"container_class": "",
	"route_params": [
	],
	"close_route": "",
	"close_route_params": [
	],
	"back_route": "",
	"back_route_params": [
	],
	"roles": [
	],
	"pages": [
	],
	"related_queries": [
	],
	"force_yield_subpages": false,
	"zoneless": false,
	"parent_layout": false,
	"layout_template": "",
	"controller_before_action": "",
	"controller_after_action": ""
}
```

# param

Property | Type | Description
---------|------|------------
name | string | Parameter name
value | string | Parameter value

Example:
```json
{
	"name": "",
	"value": ""
}
```

# plugin

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list
properties | <a href="#object">object</a> | Custom properties. This object will be provided to plugin processing code.

Example:
```json
{
	"name": "",
	"type": "",
	"imports": [
	],
	"dest_selector": "",
	"dest_position": "",
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	],
	"properties": {
	}
}
```

# query

Property | Type | Description
---------|------|------------
name | string | Object name
collection | string | Name of existing collection
find\_one | bool | If set to true query will return single document: findOne(). Default: false
filter | string | Mongo query expression. Will be passed as first argument to find() or findOne(). Can contain route params in form ":paramName".
options | string | Options parameter passed as second argument to find() or findOne().
related\_queries | array of <a href="#subscription">subscription</a> | Page which subscribes to this query will also subscribe to related queries (for example: this is useful if you are using transform function that uses data from other collection).

Example:
```json
{
	"name": "",
	"collection": "",
	"find_one": false,
	"filter": "",
	"options": "",
	"related_queries": [
	]
}
```

# section

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list
text | string | this text will be added into section

Example:
```json
{
	"name": "",
	"type": "section",
	"imports": [
	],
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	],
	"text": ""
}
```

# server_side_route

Property | Type | Description
---------|------|------------
name | string | Object name
route\_params | array of string | Route params to be passed via URL
path | string | Route path. Not mandatory: if ommited path is constructed from route name and route\_params.
source\_file | string | path to external file containing route action code (relative to input JSON file).
source\_content | string | path to external file containing route action code (relative to input JSON file).

Example:
```json
{
	"name": "",
	"route_params": [
	],
	"path": "",
	"source_file": "",
	"source_content": ""
}
```

# subscription

Property | Type | Description
---------|------|------------
name | string | Publication name
params | array of <a href="#param">param</a> | Params

Example:
```json
{
	"name": "",
	"params": [
	]
}
```

# tree_view

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
title\_icon\_class | string | If present, "span" with this class name will be added to title (if title is set)
events\_code | string | Content of Template.TEMPLATE\_NAME.events({ ... });
helpers\_code | string | Content of Template.TEMPLATE\_NAME.helpers({ ... });
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
item\_name\_field | string | Collection field shown as folder and item title
item\_type\_field | string | Collection field that stores item type. Can be "dir" or "item".
collapsed\_icon\_class | string | CSS class for collapsed folder icon. Default: "fa fa-caret-right"
expanded\_icon\_class | string | CSS class for expanded folder icon. Default: "fa fa-caret-down"
item\_route | string | Navigate to this route when item is clicked
item\_route\_params | array of <a href="#param">param</a> | Parameters to be passed to "item\_route"
folder\_route | string | Navigate to this route when folder is clicked
folder\_route\_params | array of <a href="#param">param</a> | Parameters to be passed to "folder\_route"

Example:
```json
{
	"name": "",
	"type": "tree_view",
	"imports": [
	],
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"title_icon_class": "",
	"events_code": "",
	"helpers_code": "",
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	],
	"template_rendered_code": "",
	"item_name_field": "",
	"item_type_field": "",
	"collapsed_icon_class": "",
	"expanded_icon_class": "",
	"item_route": "",
	"item_route_params": [
	],
	"folder_route": "",
	"folder_route_params": [
	]
}
```

# zone

Property | Type | Description
---------|------|------------
type | string | Component type name.
imports | array of string | list of modules to import. Example: `import {X} from "Y";` ("react" applications only)
query\_name | string | Query (publication) name from application.queries used as main data context. Page's router will subscribe to this publication automatically.
query\_params | array of <a href="#param">param</a> | Query (publication) params
custom\_data\_code | string | Code to execute just before data from database is returned (executes before iron-router `data` function returns or in React apps before `getMeteorData` returns). You can modify `data` variable here.
components | array of <a href="#component">component</a> | Component list
background\_image | string | Background image URL
container\_class | string | Class to be added to page container. Example: "container-fluid". Default "container".
pages | array of <a href="#page">page</a> | Subpages
layout\_template | string | Custom layout template name
layout | string | Built-in layout template name: "empty", "navbar" or "sticky\_footer". Default: "navbar"
default\_route | string | "home" route for this zone.
navbar\_class | string | CSS class name to be added to navbar.
footer\_class | string | CSS class name to be added to footer.

Example:
```json
{
	"type": "zone",
	"imports": [
	],
	"query_name": "",
	"query_params": [
	],
	"custom_data_code": "",
	"components": [
	],
	"background_image": "",
	"container_class": "",
	"pages": [
	],
	"layout_template": "",
	"layout": "",
	"default_route": "",
	"navbar_class": "",
	"footer_class": ""
}
```

