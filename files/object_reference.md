# application

Property | Type | Description
---------|------|------------
title | string | Application title
template | string | Default: "bootstrap" (you can expect more templates in the future).
theme | string | Visual theme name. With "bootstrap" template, theme can be one of bootswatch themes (e.g. "bootswatch-amelia", "bootswatch-cyborg" etc.).
footer\_text | string | Text to show in page footer
collections | array of [collection](#collection) | Mongo database collections
free\_zone | [zone](#zone) | Free zone (for application without user account system)
public\_zone | [zone](#zone) | Public zone (for app with user account system). Pages inside this zone are accessible only for non-authenticeted users.
private\_zone | [zone](#zone) | Private zone (for app with user account system). Pages inside this zone are accessible only for authenticeted users.
server\_side\_routes | array of [server\_side\_route](#server\_side\_route) | List of server side routes.
copy\_files | array of [file\_pair](#file\_pair) | List of files to copy into destination directory.
packages | [packages](#packages) | List of optional meteor and meteorite packages
router\_config | jsonobject | Optional parameter passed to Router.config()

*Example without user account system:*
```
{
	"title": "",
	"template": "",
	"theme": "",
	"footer_text": "",
	"collections": [
	],
	"free_zone": {
		"class": "",
		"menus": [
		],
		"pages": [
		]
	},
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
	"template": "",
	"theme": "",
	"footer_text": "",
	"collections": [
	],
	"public_zone": {
		"class": "",
		"menus": [
		],
		"pages": [
		]
	},
	"private_zone": {
		"class": "",
		"menus": [
		],
		"pages": [
		]
	},
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

*Example:*
```
{
	"name": "",
	"fields": [
	]
}
```


# component

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name
template | string | html and js template file name (without extension)
dest\_selector | string | destination html element selector. Only three simple formats are supported: "tagname", "#element\_id", ".class\_name"
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be created as Template's data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered

*Example:*
```
{
	"name": "",
	"type": "",
	"template": "",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
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
type | string | Component type name
dest\_selector | string | destination html element selector. Only three simple formats are supported: "tagname", "#element\_id", ".class\_name"
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be created as Template's data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
text\_if\_empty | string | Text to show if collection is empty.
text\_if\_not\_found | string | Text to show if search string is not found.
fields | array of [field](#field) | Defainition of table columns. If empty, generator will use fields defined at collection level.
insert\_route | string | Route name of page containing insert form
details\_route | string | Route name of page showing selected item details (usually page containing form of type "read\_only").
edit\_route | string | Route name of page containing edit form
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
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
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
type | string | Component type name
template | string | html and js template file name (without extension)
dest\_selector | string | destination html element selector. Only three simple formats are supported: "tagname", "#element\_id", ".class\_name"
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be created as Template's data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered

*Example:*
```
{
	"name": "",
	"type": "div",
	"template": "",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
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
input | string | Form input control type: "text", "read-only", "select", "checkbox", "textarea"

*Example:*
```
{
	"name": "",
	"title": "",
	"type": "",
	"default": "",
	"required": true,
	"searchable": true,
	"sortable": true,
	"input": ""
}
```


# file_pair

Property | Type | Description
---------|------|------------
source | string | Source file to copy. Path is relative to input JSON.
dest | string | Destination file. You can use directory alias "OUTPUT\_DIR" inside path. Example: "OUTPUT\_DIR/public/images/"

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
type | string | Component type name
dest\_selector | string | destination html element selector. Only three simple formats are supported: "tagname", "#element\_id", ".class\_name"
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be created as Template's data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
mode | string | "insert", "update" or "read\_only"
submit\_route | string | Route name of page to navigate after successfull submit
cancel\_route | string | Route name of page to navigate on form cancelation
close\_route | string | Route name of page to navigate when user clicks "OK" button in "read\_only" form
submit\_route\_params | array of [route\_param](#route\_param) | Route params to be passed to "submit\_route"
cancel\_route\_params | array of [route\_param](#route\_param) | Route params to be passed to "cancel\_route"
close\_route\_params | array of [route\_param](#route\_param) | Route params to be passed to "close\_route"
fields | array of [field](#field) | Defainition of form fields. If empty, generator will use fields defined at collection level.

*Example:*
```
{
	"name": "",
	"type": "form",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		}
	},
	"components": [
	],
	"template_rendered_code": "",
	"mode": "",
	"submit_route": "",
	"cancel_route": "",
	"close_route": "",
	"submit_route_params": [
	],
	"cancel_route_params": [
	],
	"close_route_params": [
	],
	"fields": [
	]
}
```


# jumbotron

Property | Type | Description
---------|------|------------
name | string | Object name
type | string | Component type name
dest\_selector | string | destination html element selector. Only three simple formats are supported: "tagname", "#element\_id", ".class\_name"
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be created as Template's data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
text | string | Text to be shown in jumbotron
button\_title | string | Jumbotron button title
button\_route | string | Destination route name
button\_route\_params | array of [route\_param](#route\_param) | Parameters to be passed to destination route
button\_class | string | CSS class to be added to jumbotron button

*Example:*
```
{
	"name": "",
	"type": "jumbotron",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		}
	},
	"components": [
	],
	"template_rendered_code": "",
	"text": "",
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
type | string | Component type name
dest\_selector | string | destination html element selector. Only three simple formats are supported: "tagname", "#element\_id", ".class\_name"
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be created as Template's data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
source\_file | string | Path to file containing markup (relative to input file)

*Example:*
```
{
	"name": "",
	"type": "markdown",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
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
type | string | Component type name
dest\_selector | string | destination html element selector. Only three simple formats are supported: "tagname", "#element\_id", ".class\_name"
dest\_position | string | destination position relative to destination element: "top", "bottom", "before" or "after". Default: "bottom"
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be created as Template's data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
items | array of [menu\_item](#menu\_item) | Menu items
scroll\_spy\_selector | string | "scrollspy" selector for menus with anchor links, usually "body".

*Example:*
```
{
	"name": "",
	"type": "menu",
	"dest_selector": "",
	"dest_position": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
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
url | string | URL (for external links. You can use only one of "route" or "url" properties, not both)
class | string | CSS class name to be added to item \<li\> element
items | array of [menu\_item](#menu\_item) | Subitems

*Example:*
```
{
	"title": "",
	"route": "",
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
template | string | html and js template file name (without extension)
class | string | CSS class name to be added to component
title | string | Component title
query | [query](#query) | Query to be created as Template's data context
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
text | string | Text to be inserted into page
route\_params | array of string | Route params to be passed via URL
close\_route | string | If specified, page will have close button routing to this route
close\_route\_params | array of [route\_param](#route\_param) | Params to be passed to close\_route
roles | array of string | User roles allowed to access this page
menus | array of [menu](#menu) | Menus to be inserted into this page
pages | array of [page](#page) | Subpages

*Example:*
```
{
	"name": "",
	"template": "",
	"class": "",
	"title": "",
	"query": {
		"name": "",
		"collection": "",
		"find_one": false,
		"filter": {
		}
	},
	"components": [
	],
	"template_rendered_code": "",
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
	]
}
```


# query

Property | Type | Description
---------|------|------------
name | string | Object name
collection | string | Name of existing collection
find\_one | bool | If set to true query will return single document: collection.findOne(). Default: false
filter | jsonobject | Mongo query expression. Will be passed as parameter to collection.find(). Can contain route params in form ":paramName".

*Example:*
```
{
	"name": "",
	"collection": "",
	"find_one": false,
	"filter": {
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
class | string | CSS class name to be added to component
components | array of [component](#component) | Component list
template\_rendered\_code | string | Code to be executed once template is rendered
menus | array of [menu](#menu) | Menus to be inserted into this page
pages | array of [page](#page) | Subpages

*Example:*
```
{
	"class": "",
	"menus": [
	],
	"pages": [
	]
}
```

