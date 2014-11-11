# application

Property | Type | Description
---------|------|------------
title | string | Application title
meta\_title | string | Default meta\_title for pages without meta\_title
meta\_description | string | Default meta\_description for pages without meta\_description
template | string | Default: "bootstrap" (you can expect more templates in the future).
theme | string | Visual theme name. With "bootstrap" template, theme can be one of <a href="http://bootswatch.com/" target="\_blank">bootswatch</a> themes: bootswatch-amelia, bootswatch-cerulean, bootswatch-cosmo, bootswatch-cyborg, bootswatch-darkly, bootswatch-flatly, bootswatch-journal, bootswatch-lumen, bootswatch-paper, bootswatch-readable, bootswatch-simplex, bootswatch-slate, bootswatch-spacelab, bootswatch-superhero, bootswatch-united, bootswatch-yeti
footer\_text | string | Text to show in page footer
roles | array of string | List of user roles for applications with user account system
default\_role | string | Default role for new users
collections | array of [collection](#collection) | Mongo database collections
free\_zone | [zone](#zone) | Free zone (for application without user account system)
public\_zone | [zone](#zone) | Public zone (for app with user account system). Pages inside this zone are accessible only for non-authenticeted users.
private\_zone | [zone](#zone) | Private zone (for app with user account system). Pages inside this zone are accessible only for authenticeted users.
server\_startup\_code | string | javascript code to execute at server startup
client\_startup\_code | string | javascript code to execute at client startup
on\_user\_created\_code | string | javascript code to execute when new user is created (Accounts.onCreateUser)
on\_user\_logged\_code | string | javascript code to execute when user is logged in (Accounts.onLogin)
server\_startup\_source\_file | string | File that contains javascript code to execute at server startup (relative to input file)
client\_startup\_source\_file | string | File that contains javascript code to execute at client startup (relative to input file)
on\_user\_created\_source\_file | string | File that contains javascript code to execute when new user is created (relative to input file)
on\_user\_logged\_source\_file | string | File that contains javascript code to execute when user is logged in (relative to input file)
server\_side\_routes | array of [server\_side\_route](#server\_side\_route) | List of server side routes.
copy\_files | array of [file\_pair](#file\_pair) | List of files to copy into destination directory. You can use directory aliases. See <a href="#file\_pair">file\_pair</a> for more details.
packages | [packages](#packages) | List of additional meteor and meteorite packages that will be automatically added by generator
router\_config | jsonobject | Optional parameter passed to Router.config()

*Example without user account system:*
```
{
	"title": "",
	"meta_title": "",
	"meta_description": "",
	"template": "",
	"theme": "",
	"footer_text": "",
	"collections": [
	],
	"free_zone": {
		"menus": [
		],
		"pages": [
		]
	},
	"server_startup_code": "",
	"client_startup_code": "",
	"server_startup_source_file": "",
	"client_startup_source_file": "",
	"server_side_routes": [
	],
	"copy_files": [
	],
	"packages": {
		"meteor": [
		],
		"mrt": [
		]
	},
	"router_config": {
	}
}
```

*Example with user account system:*
```
{
	"title": "",
	"meta_title": "",
	"meta_description": "",
	"template": "",
	"theme": "",
	"footer_text": "",
	"roles": [
	],
	"default_role": "",
	"collections": [
	],
	"public_zone": {
		"menus": [
		],
		"pages": [
		]
	},
	"private_zone": {
		"menus": [
		],
		"pages": [
		]
	},
	"server_startup_code": "",
	"client_startup_code": "",
	"on_user_created_code": "",
	"on_user_logged_code": "",
	"server_startup_source_file": "",
	"client_startup_source_file": "",
	"on_user_created_source_file": "",
	"on_user_logged_source_file": "",
	"server_side_routes": [
	],
	"copy_files": [
	],
	"packages": {
		"meteor": [
		],
		"mrt": [
		]
	},
	"router_config": {
	}
}
```


# collection

Property | Type | Description
---------|------|------------
name | string | Object name
fields | array of [field](#field) | Field list. Not mandatory, used by components such as form, dataview etc.
owner\_field | string | Field name used to store user ID of document owner. Only for apps using user accounts. Value of this field will be automatically set server side by "before.insert" hook.
read\_owner\_only | bool | If "owner\_field" specified, user can fetch/view only own documents.
write\_owner\_only | bool | If "owner\_field" specified, document can be updated or removed only by owner.
roles\_allowed\_to\_read | array of string | List of user roles that can subscribe to this collection.
roles\_allowed\_to\_insert | array of string | List of user roles that can insert documents into this collection.
roles\_allowed\_to\_update | array of string | List of user roles that can update documents.
roles\_allowed\_to\_delete | array of string | List of user roles that can delete documents.
before\_insert\_code | string | Code to be executed before new document is inserted into collection. Should be only body of a function with args: (userId, doc). See <a href="https://github.com/matb33/meteor-collection-hooks" target="\_blank">meteor-collection-hooks</a> package for more details.
before\_update\_code | string | Code to be executed before document is updated. Should be only body of a function with args: (userId, doc, fieldNames, modifier, options)
before\_remove\_code | string | Code to be executed before document is removed. Should be only body of a function with args: (userId, doc)
after\_insert\_code | string | Code to be executed after new document is inserted into collection. Should be only body of a function with args: (userId, doc). See <a href="https://github.com/matb33/meteor-collection-hooks" target="\_blank">meteor-collection-hooks</a> package for more details.
after\_update\_code | string | Code to be executed after document is updated. Should be only body of a function with args: (userId, doc, fieldNames, modifier, options)
after\_remove\_code | string | Code to be executed after document is removed. Should be only body of a function with args: (userId, doc)
before\_insert\_source\_file | string | File that contains code to be executed before new document is inserted (relative to input JSON file). See "before\_insert\_code".
before\_update\_source\_file | string | File that contains code to be executed before document is updated (relative to input JSON file). See "before\_update\_code".
before\_remove\_source\_file | string | File that contains code to be executed before document is removed (relative to input JSON file). See "before\_remove\_code".
after\_insert\_source\_file | string | File that contains code to be executed after new document is inserted (relative to input JSON file). See "after\_insert\_code".
after\_update\_source\_file | string | File that contains code to be executed after document is updated (relative to input JSON file). See "after\_update\_code".
after\_remove\_source\_file | string | File that contains code to be executed after document is removed (relative to input JSON file). See "after\_remove\_code".

*Example:*
```
{
	"name": "",
	"fields": [
	],
	"owner_field": "",
	"read_owner_only": false,
	"write_owner_only": false,
	"roles_allowed_to_read": [
	],
	"roles_allowed_to_insert": [
	],
	"roles_allowed_to_update": [
	],
	"roles_allowed_to_delete": [
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


# component

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
template | string | Built-in html and js template file name (without extension) contained in kitchen templates directory.
custom\_template | string | Custom html and js template filename (without extension). Path is relative to input JSON file.
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be added to Template data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered

*Example:*
```
{
	"name": "",
	"type": "",
	"template": "",
	"custom_template": "",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		},
		"options": {
		}
	},
	"components": [
	],
	"template_rendered_code": ""
}
```


# dataview

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
custom\_template | string | Custom html and js template filename (without extension). Path is relative to input JSON file.
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be added to Template data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
text\_if\_empty | string | Text to show if collection is empty.
text\_if\_not\_found | string | Text to show if search string is not found.
fields | array of [field](#field) | Defainition of table columns. If empty, generator will use fields defined at collection level.
insert\_route | string | Route name of page containing insert form
details\_route | string | Route name of page showing selected item details (usually page containing form of type "read\_only").
edit\_route | string | Route name of page containing edit form. Makes edit\_route\_params field mandatory in most cases to be functional
delete\_route | string | Route name to execute when user clicks "delete". Not mandatory - generator will automatically produce code for delete operation.
insert\_route\_params | array of [route\_param](#route\_param) | Parameters to be passed to "insert\_route"
details\_route\_params | array of [route\_param](#route\_param) | Parameters to be passed to "details\_route"
edit\_route\_params | array of [route\_param](#route\_param) | Parameters to be passed to "edit\_route"
delete\_route\_params | array of [route\_param](#route\_param) | Parameters to be passed to "delete\_route"
views | array of string | View styles: "table", "list" or "gallery". Default: "table".

*Example:*
```
{
	"name": "",
	"type": "dataview",
	"custom_template": "",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		},
		"options": {
		}
	},
	"components": [
	],
	"template_rendered_code": "",
	"text_if_empty": "",
	"text_if_not_found": "",
	"fields": [
	],
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
	"views": [
	]
}
```


# div

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
template | string | Built-in html and js template file name (without extension) contained in kitchen templates directory.
custom\_template | string | Custom html and js template filename (without extension). Path is relative to input JSON file.
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be added to Template data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered

*Example:*
```
{
	"name": "",
	"type": "div",
	"template": "",
	"custom_template": "",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		},
		"options": {
		}
	},
	"components": [
	],
	"template_rendered_code": ""
}
```


# field

Property | Type | Description
---------|------|------------
name | string | Object name
title | string | Field title (used in form labels, table column headers etc.)
type | string | Field data type (used in form validations). Default: string
default | string | Default value
required | bool | Is field input required? Default: false
searchable | bool | Is field searchable? Default: true
sortable | bool | Is field sortable? Default: true
exportable | bool | If true field will be exported to CSV/JSON (used in dataview component). Default: false
format | string | Currently used only with data types "date" and "time". Contains date or time format such as "MM/DD/YYYY" or "hh:mm:ss"
input | string | Form input control type: "text", "password", "datepicker", "read-only", "textarea", "radio", "checkbox", "select"
input\_items | array of [field\_item](#field\_item) | Item list for input type "radio" and "select"
lookup\_query | [query](#query) | Lookup query - data source for input type "select" items
lookup\_key | string | Field name from lookup\_query used as option value in input type "select". Mandatory field if lookup query is defined
lookup\_field | string | Field name from lookup\_query used as option title in input type "select". Mandatory field if lookup query is defined
display\_helper | string | Helper name used to display value from this field (used in DataView, Forms etc.)
show\_in\_dataview | bool | If set to "false", field will not be shown in dataview components. Default: true
show\_in\_insert\_form | bool | If set to "false", field will not be included in forms with mode "insert". Default: true
show\_in\_update\_form | bool | If set to "false", field will not be included in forms with mode "update". Default: true
show\_in\_read\_only\_form | bool | If set to "false", field will not be included in forms with mode "read\_only". Default: true

*Example:*
```
{
	"name": "",
	"title": "",
	"type": "",
	"default": "",
	"required": false,
	"searchable": true,
	"sortable": true,
	"exportable": true,
	"format": "",
	"input": "",
	"input_items": [
	],
	"lookup_query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		},
		"options": {
		}
	},
	"lookup_key": "",
	"lookup_field": "",
	"display_helper": "",
	"show_in_dataview": true,
	"show_in_insert_form": true,
	"show_in_update_form": true,
	"show_in_read_only_form": true
}
```


# field_item

Property | Type | Description
---------|------|------------
value | string | select, radio or checkbox item title shown to user
title | string | select, radio or checkbox item value written on submit

*Example:*
```
{
	"value": "",
	"title": ""
}
```


# file_pair

Property | Type | Description
---------|------|------------
source | string | Source file to copy. Path is relative to input JSON.
dest | string | Destination file. You can use directory aliases: OUTPUT\_DIR, CLIENT\_DIR, CLIENT\_LIB\_DIR, CLIENT\_STYLES\_DIR, CLIENT\_STYLES\_DEFAULT\_DIR, CLIENT\_VIEWS\_DIR, CLIENT\_VIEWS\_NOT\_FOUND\_DIR, CLIENT\_VIEWS\_LOADING\_DIR, LIB\_DIR, SETTINGS\_DIR, BOTH\_DIR, BOTH\_LIB\_DIR, BOTH\_COLLECTIONS\_DIR, BOTH\_ROUTER\_DIR, PUBLIC\_DIR, PUBLIC\_IMAGES\_DIR, PRIVATE\_DIR, SERVER\_DIR, SERVER\_LIB\_DIR, SERVER\_COLLECTIONS\_DIR, SERVER\_PUBLISH\_DIR, SERVER\_CONTROLLERS\_DIR, SERVER\_METHODS\_DIR

*Example:*
```
{
	"source": "",
	"dest": ""
}
```


# form

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
custom\_template | string | Custom html and js template filename (without extension). Path is relative to input JSON file.
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be added to Template data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
mode | string | "insert", "update" or "read\_only"
layout | string | "default", "horizontal" or "inline"
submit\_route | string | Route name of page to navigate after successfull submit. Mandatory field for submit button to appear
cancel\_route | string | Route name of page to navigate on form cancelation. Mandatory field for cancel button to appear
close\_route | string | Route name of page to navigate when user clicks "OK" button in "read\_only" form. Mandatory field for close button to appear
back\_route | string | Route name of page to navigate on form back button. Mandatory field for back button to appear
submit\_route\_params | array of [route\_param](#route\_param) | Route params to be passed to "submit\_route"
cancel\_route\_params | array of [route\_param](#route\_param) | Route params to be passed to "cancel\_route"
close\_route\_params | array of [route\_param](#route\_param) | Route params to be passed to "close\_route"
back\_route\_params | array of [route\_param](#route\_param) | Route params to be passed to "back\_route"
fields | array of [field](#field) | Defainition of form fields. If empty, generator will use fields defined at collection level.
hidden\_fields | array of [hidden\_field](#hidden\_field) | Fields (not shown in a form) that will be automatically written on submit.

*Example:*
```
{
	"name": "",
	"type": "form",
	"custom_template": "",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		},
		"options": {
		}
	},
	"components": [
	],
	"template_rendered_code": "",
	"mode": "",
	"layout": "",
	"submit_route": "",
	"cancel_route": "",
	"close_route": "",
	"back_route": "",
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

*Example:*
```
{
	"name": "",
	"value": ""
}
```


# jumbotron

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
custom\_template | string | Custom html and js template filename (without extension). Path is relative to input JSON file.
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be added to Template data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
text | string | Text to be shown in jumbotron
image\_url | string | Picture URL
button\_title | string | Jumbotron button title
button\_route | string | Destination route name
button\_route\_params | array of [route\_param](#route\_param) | Parameters to be passed to destination route
button\_class | string | CSS class to be added to jumbotron button

*Example:*
```
{
	"name": "",
	"type": "jumbotron",
	"custom_template": "",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		},
		"options": {
		}
	},
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
custom\_template | string | Custom html and js template filename (without extension). Path is relative to input JSON file.
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be added to Template data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
source\_file | string | Path to file containing markup (relative to input file)

*Example:*
```
{
	"name": "",
	"type": "markdown",
	"custom_template": "",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		},
		"options": {
		}
	},
	"components": [
	],
	"template_rendered_code": "",
	"source_file": ""
}
```


# menu

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name.
custom\_template | string | Custom html and js template filename (without extension). Path is relative to input JSON file.
dest\_selector | string | destination html element selector. Similar to jQuery selector, but only three simple formats are supported: "tagname", "#element\_id" and ".class\_name".
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be added to Template data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
items | array of [menu\_item](#menu\_item) | Menu items
scroll\_spy\_selector | string | "scrollspy" selector for menus with anchor links, usually "body".

*Example:*
```
{
	"name": "",
	"type": "menu",
	"custom_template": "",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		},
		"options": {
		}
	},
	"components": [
	],
	"template_rendered_code": "",
	"items": [
	],
	"scroll_spy_selector": ""
}
```


# menu_item

Property | Type | Description
---------|------|------------
title | string | Item title as appears in menu
route | string | Route name of destination page
route\_params | array of [route\_param](#route\_param) | Parameters to be passed to "route"
url | string | URL (for external links. You can use only one of "route" or "url" properties, not both)
class | string | CSS class name to be added to item `li` element
items | array of [menu\_item](#menu\_item) | Subitems

*Example:*
```
{
	"title": "",
	"route": "",
	"route_params": [
	],
	"url": "",
	"class": "",
	"items": [
	]
}
```


# packages

Property | Type | Description
---------|------|------------
meteor | array of string | List of meteor packages
mrt | array of string | List of meteorite (atmosphere) packages

*Example:*
```
{
	"meteor": [
	],
	"mrt": [
	]
}
```


# page

Property | Type | Description
---------|------|------------
name | string | Object name
template | string | Built-in html and js template file name (without extension) contained in kitchen templates directory.
custom\_template | string | Custom html and js template filename (without extension). Path is relative to input JSON file.
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be added to Template data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
meta\_description | string | Meta description
meta\_title | string | Head title tag and meta title
text | string | Text to be inserted into page
route\_params | array of string | Route params to be passed via URL
close\_route | string | If specified, page will have close button routing to this route
close\_route\_params | array of [route\_param](#route\_param) | Params to be passed to close\_route
roles | array of string | User roles allowed to access this page
menus | array of [menu](#menu) | Menus to be inserted into this page
pages | array of [page](#page) | Subpages
queries | array of [query](#query) | List of queries to add into template data context
force\_yield\_subpages | bool | Subpages will be rendered in "subcontent" area even if this page doesn't contains menu pointing to subpages

*Example:*
```
{
	"name": "",
	"template": "",
	"custom_template": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		},
		"options": {
		}
	},
	"components": [
	],
	"template_rendered_code": "",
	"meta_description": "",
	"meta_title": "",
	"text": "",
	"route_params": [
	],
	"close_route": "",
	"close_route_params": [
	],
	"roles": [
	],
	"menus": [
	],
	"pages": [
	],
	"queries": [
	],
	"force_yield_subpages": false
}
```


# query

Property | Type | Description
---------|------|------------
name | string | Object name. Must be unique per given set of parameters
collection | string | Name of existing collection
find\_one | bool | If set to true query will return single document: collection.findOne(). Default: false
filter | jsonobject | Mongo query expression. Will be passed as parameter to collection.find(). Can contain route params in form ":paramName".
options | jsonobject | Options parameter passed to collection.find().

*Example:*
```
{
	"name": "",
	"collection": "",
	"find_one": false,
	"filter": {
	},
	"options": {
	}
}
```


# route_param

Property | Type | Description
---------|------|------------
name | string | Parameter name
value | string | Parameter value

*Example:*
```
{
	"name": "",
	"value": ""
}
```


# server_side_route

Property | Type | Description
---------|------|------------
name | string | Object name
path | string | Route path. Not mandatory: if ommited path is constructed from route name.
source\_file | string | path to external file containing route action code (relative to input JSON file).

*Example:*
```
{
	"name": "",
	"path": "",
	"source_file": ""
}
```


# zone

Property | Type | Description
---------|------|------------
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
menus | array of [menu](#menu) | Menus to be inserted into this page
pages | array of [page](#page) | Subpages

*Example:*
```
{
	"menus": [
	],
	"pages": [
	]
}
```

