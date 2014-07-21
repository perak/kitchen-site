Download
========

### Mac & Linux
Open your terminal and type:

```
curl http://www.meteorkitchen.com/install | sh
```

You also need <a href="http://www.meteor.com" target="_blank">Meteor</a> and <a href="https://atmospherejs.com/docs/installing" target="_blank">Meteorite</a> package manager.

### Windows
Meteor kitchen uses "meteorite" package manager which is not yet available for Windows. 
However, you can download generator for Windows <a href="#">here.</a>


CLI
===

meteor-kitchen comes with command line interface only (**GUI** is under construction). You can run generator by typing:

```
meteor-kitchen
```

Common usage is:

```
meteor-kitchen <input_file.json> <output_directory>
```

Input file
===========

Input file is JSON containing application description. Depending on would your app use user account system or not, minimal input file structure is one of:

**Application without user account system**:

```
{
	"application": {

		"title": "Hello world!",

		"free_zone": {

			"pages": [
			],

			"menus": [
			]
		}
	}
}
```

Or:

**Application with user account system**:

```
{
	"application": {

		"title": "Hello world!",

		"public_zone": {

			"pages": [
			],

			"menus": [
			]
		},

		"private_zone": {

			"pages": [
			],

			"menus": [
			]
		}
	}
}
```

As you can see, **application** object is in root and contains **free\_zone** or both **public\_zone** and **private\_zone**:

- If application object has only **free\_zone** then generator will create code without user account system and all pages will be accessible to users.
- If application object has both **public\_zone** and **private\_zone**, pages under **public\_zone** will be accessible only for non-authenticated users, and pages under **private\_zone** will be accessible only for authenticated users.

Each zone has **pages** and **menus** arrays containing descriptions of top-level pages and menus under that zone.
 

Pages and Menus
===============

### Minimal example

```
{
	"application": {
		"free_zone": {
			"pages": [
				{ "name": "home", "title": "Home page" },
				{ "name": "about", "title": "About" }
			],

			"menus": [
				{ 
					"name": "main_menu",
					"class": "nav navbar-nav",
					"items": [
						{ "title": "Home page", "route": "home" },
						{ "title": "About", "route": "about" }
					]
				}
			]
		}
	}
}
```

Copy & paste it into your text editor, save it as "example-minimal.json" and run generator:

```
meteor-kitchen example-minimal.json ./example-minimal
```

That will produce simple application with navbar and two pages. See <a href="http://generator-minimal.meteor.com" target="_blank">live example</a>.

Looking at input file structure: **page** object has **name** and **title** properties. In generated application page named "home" will produce files "home.html", "home.js" and "home\_controller.js" with template named "Home". 
Page named "about" in the same fashion: **filenames and route names are allways in lower-case with underscores, template name is allways in camel-case with upper-case first letter.**

**menu** object has **name**, **class** and **items** properties. Each component must have **name** (menu is component, more about components later). 
Property **class** will be applied to menu's `<ul>` html element.
Each menu item has **title** and **route**. Property **title** is string displayed in menu, **route** is route name of page on which the link points to.


Subpages
========

Each page can have subpages: e.g. top level page can have sidebar or tab-menu with links to subpages. 
Also, subpage can have subpages and so on - to the unlimited depth.

To produce this, add **pages** array to any **page** object - in the same way as in **zone** objects:

```
...
{
	"name": "home",
	"title": "Home page",
	"pages": [
		{
			"name": "subpage_1",
			"title": "Home - Subpage 1",
			"pages": [
				{
					"name": "subsub_1",
					"title": "Home - Subpage 1 - Sub-Sub page 1",
					"pages": [

					]
				}
			]
		}
	]
}
...
```
Subpages will have route name constructed from parent page's route name and subpage name separated with dot. 
In previous example:

- "home" route name is "home"
- "subpage\_1" route name is "home.subpage\_1"
- "subsub\_1" route name is "home.subpage\_1.subsub\_1"

Now, to access subpages add menu into parent **page** object with items pointing to subpages:

```
...
{
	"name": "home",
	"title": "Home page",
	"pages": [
		{
			"name": "subpage_1",
			"title": "Home - Subpage 1",
			"pages": [
				{
					"name": "subsub_1",
					"title": "Home - Subpage 1 - Sub-Sub page 1",
					"pages": [

					]
				}
			],
			"menus": [
				{
					"name": "subpage_1_menu",
					"items": [{ "title": "Sub-Sub page 1", route: "home.subpage_1.subsub_1" }]
				}
			]
		}
	],
	"menus": [
		{
			"name": "home_menu",
			"items": [{ "title": "Subpage 1", route: "home.subpage_1" }]
		}
	]
}
...
```

### Subpages example
Generator has several built-in examples, you can run:

```
meteor-kitchen --example-subpages ./example-subpages
```

That will produce application with pages and subpages. You can see live example <a href="http://generator-subpages.meteor.com" target="_blank">here</a>.


Visual Themes
=============

Currently, generator will produce markup compatible with <a href="http://getbootstrap.com" target="_blank">bootstrap</a> and uses <a href="https://github.com/simison/bootstrap3-less" target="_blank">bootstrap-less</a> package from atmosphere.
Also, it comes with <a href="http://bootswatch.com/" target="_blank">bootswatch</a> visual themes.

You can easy choose your application theme by adding "theme" property:

```
{
	"application": {

		"title": "Hello world!",

		"theme": "bootswatch-amelia",

		"free_zone": {

			"pages": [
			],

			"menus": [
			]
		}
	}
}
```
In this example, application will use "bootswatch-amelia" theme. You can see list of bootswatch themes <a href="http://bootswatch.com/" target="_blank">here</a>.


Components
==========

Application with empty pages is not very useful :) Components are predefined and customizable visual elements which can be inserted into pages - they are building blocks of your application.
Generator comes with several built-in components. Also, you can write your own components called "plugins" (more about plugins later).

You can insert components into pages by adding **components** array into any **page** object:
```
{
	"name": "page_name",
	"title": "Page Title",

	"components": [
	]
}
```

List of built-in components currently implemented into generator:

- **jumbotron** - cool big heading text with button (usually found in home pages)
- **markdown** - styled text written in <a href="http://daringfireball.net/projects/markdown/" target="_blank">markdown</a>
- **dataview** - shows data from collections (with search and sort functions)
- **form** - for inserting/updating data (with validations)

Minimal structure of any **component** object is:

```
{
	"name": "component_name",
	"type": "component_type",

	... and properties specific for component of this type...
}
```

- **name** - used by generator to construct component template name: parent template name + component name (will be in upper-camel-case).
- **type** - used by generator to determine component type. If type is not one of built-in component types, generator will try to execute plugin with that name (more about plugins later).

### Jumbotron component

Page object with jumbotron component should look like this:

```
...
{
	"name": "home",
	"title": "Home page",

	"components": [
		{
			"name": "jumbo",
			"type": "jumbotron",

			"title": "Hello world!",
			"text": "This is just an example",
			"button_title": "Learn more",
			"button_route": "about"
		}
	]
}
...
```

In this example jumbotron will be shown at home page. Properties "title", "text", "button\_title" and "button\_route" are specific to component of type "jumbotron".

### Markdown component

Easiest way to add formated content into pages is to write text with <a href="http://daringfireball.net/projects/markdown/" target="_blank">markdown</a> syntax, save it into separate file and then insert component of type "markdown" into your page.

Page object with markdown component should look like this:

```
...
{
	"name": "home",
	"title": "Home page",

	"components": [
		{
			"name": "text",
			"type": "markdown",

			"source_file": "path_to_your_markdown_file.md"
		}
	]
}
...
```
Property "source\_file" is path to markdown file (relative to input JSON file).

### Div component

Component of type "div" is just a simple html div tag that will be inserted into your page (or component).

Following example shows how to add bootstrap row with two columns into page:

```
...
{
	"name": "home",
	"title": "Home page",

	"components": [
		{
			"name": "example_row",
			"type": "div",
			"class": "row",
			"components": [
				{
					"name": "example_column_1",
					"type": "div",
					"class": "col-md-4",
					"components": [
					]
				},
				{
					"name": "example_column_2",
					"type": "div",
					"class": "col-md-8",
					"components": [
					]
				}
			]
		}
	]
}
...
```

Components **dataview** and **form** are using collections so we will talk about them later. Now, let's see how to add some mongo collections into your program.

Collections
===========

To define collections, add **collections** array to your **application** object: 

```
{
	"application": {

		"title": "Example application",

		"collections": [
			{ "name": "customers" }
		],

		"free_zone": {

			"pages": [
			],

			"menus": [
			]
		}
	}
}

```
That will create server publications, client subscriptions and other code related to collections.

Also, you can define collection fields:

```
{
	"name": "customers",
	"fields": [
		{ "name": "name", "title": "Name", "required": true },
		{ "name": "phone", "title": "Phone", "default": "-" },
		{ "name": "email", "title": "E-mail", "type": "email" }
	]
}
```

Fields are used by components such as **form** and **dataview** (generator will "know" what input fields to generate in forms, what columns to show in dataview etc.).

- **name** - field name
- **title** - field title shown in form labels, table headers etc.
- **required** - used in form validations
- **default** - default value in insert forms
- **type** - field datatype - used in form validations


**Note** that defining fields at collection level is not mandatory - fields can be set/overriden inside **form** and **dataview** components.


Dataview Component
==================

Component of type **dataview** is used to show data from database inside table with search and sort functions (other view styles are under construction e.g. "list" and "gallery").

Minimal application with **dataview** component should look like this:

```
{
	"application": {

		"title": "Example application",

		"collections": [
			{
				"name": "customers",
				"fields": [
					{ "name": "name", "title": "Name", "required": true },
					{ "name": "phone", "title": "Phone", "default": "-" },
					{ "name": "email", "title": "E-mail", "type": "email" }
				]
			}
		],

		"free_zone": {

			"pages": [
				{
					"name": "home",
					"title": "",

					"components": [
						{
							"name": "view",
							"type": "dataview",

							"title": "Customers",
							"text_if_empty": "No customers here :(",

							"query": {
								"name": "customers",
								"collection": "customers",
								"filter": {}
							},

							"insert_route": "",
							"insert_route_params": [
							],

							"edit_route": "",
							"edit_route_params": [
							],

							"details_route": "",
							"details_route_params": [
							]
						}
					]
				}
			],

			"menus": [
				{ 
					"name": "main_menu",
					"class": "nav navbar-nav",
					"items": [
						{ "title": "Home page", "route": "home" }
					]
				}
			]
		}
	}
}
```

In this example we have collection "customers" and component of type "dataview" inside "home" page.

Some of "dataview" component properties are:

- **text\_if\_empty** - text to be shown instead of empty table if collection is empty.
- **query** - query used to filter data from collection. Must have "name", "collection" - existing collection name and "filter" - mongo query being passed as param to `collection.find()`.
- **insert\_route** - route name of existing page (usually containing form component) which will be opened when user clicks "insert" button.
- **edit\_route** - route name of existing page (usually containing form component) which will be opened when user clicks "edit" icon.
- **details\_route** - route name of existing page which will be opened when user clicks item.

Each page route can receive params such as document _id. More about that later.

You can see **live example** (also with form components) <a href="http://generator-dataview.meteor.com" target="_blank">here</a>.


Form Component
==============

Form component has following structure:

```
{
	"name": "insert_form",
	"type": "form",

	"mode": "insert",
	"title": "New customer",

	"query": {
		"name": "customers",
		"collection": "customers",
		"filter": {}
	},

	"submit_route": "",
	"cancel_route": ""
}
```

- **mode** - can be "insert", "update" or "read\_only"
- **query** - query used in "update" and "read\_only" mode forms to filter particular document from collection to be modified/displayed
- **submit\_route** - route name of existing page to be opened when user hits "submit" button
- **cancel\_route** - route name of existing page to be opened when user hits "cancel" button

**Common usage** of form component is to put subpage into page containing **dataview** component, add **form** into that subpage and then in dataview component specify "insert\_route", "edit\_route" or "details\_route" to point to subpage containing form.
To be more clear let's see example application with dataview and insert form:

```
{
	"application": {

		"title": "Example application",

		"collections": [
			{
				"name": "customers",
				"fields": [
					{ "name": "name", "title": "Name", "required": true },
					{ "name": "phone", "title": "Phone", "default": "-" },
					{ "name": "email", "title": "E-mail", "type": "email" }
				]
			}
		],

		"free_zone": {

			"pages": [
				{
					"name": "home",
					"components": [
						{
							"name": "view",
							"type": "dataview",

							"title": "Customers",
							"text_if_empty": "No customers here :(",

							"query": {
								"name": "customers",
								"collection": "customers",
								"filter": {}
							},

							"insert_route": "home.insert",
							"insert_route_params": [
							],

							"edit_route": "",
							"edit_route_params": [
							],

							"details_route": "",
							"details_route_params": [
							]
						}
					],

					"pages": [
						{
							"name": "insert",
							"components": [
								{
									"name": "insert_form",
									"type": "form",
									"mode": "insert",
									"title": "New customer",
									"query": {
										"name": "customers_empty",
										"collection": "customers",
										"filter": {"_id": null}
									},
									"submit_route": "home",
									"cancel_route": "home"
								}
							]
						}
					]
				}
			],

			"menus": [
				{ 
					"name": "main_menu",
					"class": "nav navbar-nav",
					"items": [
						{ "title": "Customers", "route": "home" }
					]
				}
			]
		}
	}
}
```

In this example we have page named "home" with **dataview** component and subpage named "insert". 
Subpage "insert" has **form** component named "insert_form".

Now look:

- **dataview** component: "insert_route" property is set to "home.insert" (subpage containing form).
- **form** component: "submit\_route" and "cancel\_route" properties are set to "home" (parent page).

Form has defined query "customers_empty": this is insert form and we don't need any data from this query - query is used just to point generator on which collection to use for insert.

You can see **live example** <a href="http://generator-dataview.meteor.com" target="_blank">here</a>.


Route params
============

Sometimes you need to pass route parameters via page URL. 
Example of that can be edit form: imagine you have a page with customers list at URL "/customers". 
When user clicks "edit" button you want to open page with edit form at URL "/customers/edit", but you need to specify ID of customer that will be edited in form. 
You can do that by adding customer ID into URL: "/customers/edit/DEb2iodREGQcwiZGm" and use that param inside your form component.

To add route parameter add "route\_params" property to your **page** object:

```
...
{
	"name": "edit",
	"route_params": ["customerId"],
	"components": [
		{
			"name": "edit_form",
			"type": "form",
			"mode": "update",
			"title": "Edit customer",
			"submit_route": "home",
			"cancel_route": "home",
			"query": {
				"name": "customer",
				"collection": "customers",
				"filter": { "_id": ":customerId" }
			}
		}
	]
}
...
```
**Note:** property "route\_params" is array of strings.

In this example **page** object has param named "customerId" and we are using it inside **form** component's **query** filter: `:customerId`.

Now, when we are reffering to page with params from another page, we need to pass param values.

Example of that is **dataview** component's "edit\_route" and "edit\_route\_params" property:

```
{
	"name": "view",
	"type": "dataview",

	"title": "Customers",
	"text_if_empty": "No customers here :(",

	"query": {
		"name": "customers",
		"collection": "customers",
		"filter": {}
	},

	"edit_route": "home.edit",
	"edit_route_params": [
		{ "name": "customerId", "value": "this._id" }
	]

}

```

Property "edit\_route\_params" is list of parameters to be passed to "edit\_route":

- **name** is parameter name
- **value** is parameter value


Now, let's see full example with "insert" and "update" forms:

```
{
	"application": {

		"title": "Example application",

		"collections": [
			{
				"name": "customers",
				"fields": [
					{ "name": "name", "title": "Name", "required": true },
					{ "name": "phone", "title": "Phone", "default": "-" },
					{ "name": "email", "title": "E-mail", "type": "email" }
				]
			}
		],

		"free_zone": {

			"pages": [
				{
					"name": "home",
					"components": [
						{
							"name": "view",
							"type": "dataview",

							"title": "Customers",
							"text_if_empty": "No customers here :(",

							"query": {
								"name": "customers",
								"collection": "customers",
								"filter": {}
							},

							"insert_route": "home.insert",
							"insert_route_params": [
							],

							"edit_route": "home.edit",
							"edit_route_params": [
								{ "name": "customerId", "value": "this._id" }
							],

							"details_route": "",
							"details_route_params": [
							]
						}
					],

					"pages": [
						{
							"name": "insert",
							"components": [
								{
									"name": "insert_form",
									"type": "form",
									"mode": "insert",
									"title": "New customer",
									"query": {
										"name": "customers_empty",
										"collection": "customers",
										"filter": {"_id": null}
									},
									"submit_route": "home",
									"cancel_route": "home"
								}
							]
						},
						{
							"name": "edit",
							"route_params": ["customerId"],
							"components": [
								{
									"name": "edit_form",
									"type": "form",
									"mode": "update",
									"title": "Edit customer",
									"submit_route": "home",
									"cancel_route": "home",
									"query": {
										"name": "customer",
										"collection": "customers",
										"filter": { "_id": ":customerId" }
									}
								}
							]
						}
					]
				}
			],

			"menus": [
				{ 
					"name": "main_menu",
					"class": "nav navbar-nav",
					"items": [
						{ "title": "Customers", "route": "home" }
					]
				}
			]
		}
	}
}
```


Server Side Routes
==================

You can add array "server\_side\_routes" to your **application** object and generator will add router.map and route controllers:

```
{
	"application": {

		"title": "Hello world!",

		"free_zone": {

			"pages": [
			],

			"menus": [
			]
		}
	},

	"server_side_routes": [
		{ "name": "example", "path": "/example", "source_file": "path_to_source_file.js" }
	]
}
```
- **name** is route name. Example: "api.show.some_data".
- **path** is route path. Example: "/api/show/some_data". If you leave this blank, path will be automatically created from route name.
- **source_file** is path to .js file (relative to input JSON) which will be inserted into controller **action** function. Not mandatory.


Plugins
=======

In addition with built-in components (such as "form", "dataview" etc.) you can write your own components called "plugins" using javascript (node.js).

Plugins are stored in "plugins" subdirectory inside meteor-kitchen installation dir. By default it is located in:

```
~/.meteor-kitchen/plugins/
```

You can create subdirectory there and name it as you wish - directory name will be used as component type.

Meteor kitchen comes with two example plugins. Please navigate to first example plugin directory:

```
cd ~/.meteor-kitchen/plugins/example1/
```

Directory contains two files: 

- **plugin.js** is javascript code that is passed to node.js and executed. It should create html and js that generator will insert into page.
- **plugin.json** is JSON file with plugin settings: here you can specify which meteor and mrt packages your plugin is using.

You can use plugin in your application by adding component into page and set component type to the same name as plugin directory:

```
...
{
	"name": "home",
	"title": "Home page",

	"components": [
		{
			"name": "example_plugin",
			"type": "example1"
		}
	]
}
...
```
Component type is set to "example1". This type is unknown to generator and it will search plugins directory for subdirectory named "example1" that contains file named "plugin.js". 
If file "plugins/example1/plugin.js" is found, generator will pass that file to "node.js" and file is executed. File will produce html and js content that will be inserted into page.

Our "example1" plugin.js file contains following code:

```
var kitchen = require("meteor-kitchen");

// read input
var component = kitchen.getInput();

// create some static html
component.html = "<p><strong>Hello! I am example plugin No.1:</strong> just a static HTML but I am pretty!</p>";

// this component doesn't need any js
component.js = "";

// write output
kitchen.setOutput(component);
```

Object "kitchen" is bridge between generator and plugin code. It has two methods:

- **getInput**
- **setOutput**

Method **getInput()** returns component description - javascript object extracted from input file, in our example that is:

```
{
	"name": "example_plugin",
	"type": "example1",
	"html": "",
	"js": ""
}
```
Properties "html", and "js" are automatically added by generator. Those are output strings that our plugin code should fill with content. 

Method **setOutput()** will pass "html" and "js" strings to generator and those will be inserted into page. 

This is really trivial example that shows how to write custom component. Note that you can add any custom properties to component object inside input file and use them inside plugin.


You can see live application that uses two example plugins <a href="http://generator-plugins.meteor.com" target="_blank">here</a>.


User Roles
==========

(under construction)

