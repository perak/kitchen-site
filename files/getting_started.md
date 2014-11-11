Download
========

### Mac & Linux
Open your terminal and type:

```
curl http://www.meteorkitchen.com/install | /bin/sh
```

You **need** to have <a href="https://www.meteor.com" target="_blank">Meteor >=1.0</a> installed.


### Windows
I paused work on version for Windows. You can download some old version <a href="/install/install_win.zip" target="_blank">here.</a>


Current version is 0.8.0
========================

Click <a href="{{pathFor 'version_history'}}">here</a> to see version history.


Upgrade to latest version
=========================

Just install it again.


CLI
===

meteor-kitchen comes with command line interface only (**GUI** is under construction). You can run the generator by typing:

```
meteor-kitchen
```

Common usage:

```
meteor-kitchen <input_file_or_url> <output_directory>
```

Input file can be <a href="http://www.json.org/" target="_blank">JSON</a> or <a href="http://www.yaml.org/" target="_blank">YAML</a>. If you preffer YAML, you need to install <a href="https://www.npmjs.org/package/yaml2json" target="_blank">yaml2json</a> converter.


CoffeeScript
------------

With the `--coffee` option the generator will convert all js files to coffee. For this, you need the <a href="http://js2coffee.org/" target="_blank">js2coffee</a> converter to be installed:

```
meteor-kitchen <input_file_or_url> <output_directory> --coffee
```

Jade
----

For <a href="http://jade-lang.com/" target="_blank">Jade</a> lovers, use `--jade` switch and generator will convert html files to jade:

```
meteor-kitchen <input_file_or_url> <output_directory> --jade
```

Jade converter is experimental (I wrote it in rush). It's not 100% syntaticaly clean and will be improved in future. At least, it's super fast (long live good old friend: C++).


Input file
===========

The input is just a JSON or YAML file containing the application's description. You can start with one of the minimal templates below, depending on whether you need a user account system in your app or not:

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

As you can see, the **application** object is at the root and contains **free\_zone** or both **public\_zone** and **private\_zone**:

- If the application object has only **free\_zone** then the generator will create code without a user account system and all pages will be accessible to all users.
- If the application object has both **public\_zone** and **private\_zone**, pages under **public\_zone** will be accessible only for non-authenticated users, and pages under **private\_zone** will be accessible only for authenticated users.

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

That will produce a simple application with a navbar and two pages. 

You can see a live example <a href="http://generator-minimal.meteor.com" target="_blank">here</a>

**Note:** You can find the source code for all examples <a href="https://github.com/perak/kitchen-examples" target="_blank">here</a>

###Here is the pattern for the input file structure:

* The **page** object has **name** and **title** properties. If a page is named "home" in the description file, the generator will produce a template named "Home" along with the following files: `home.html`, `home.js`, `home_controller.js`.

* **filenames** and **route names** are always written in **snake_case** (lower_case with underscores)

* **template names** are always in **CamelCase** with the first letter capitalized.

* The **menu** object has **name**, **class** and **items** properties. Each component must have a **name** property (menu is a component, more about components later).

* The property **class** will be applied to the menu's `ul` html element.

* Each menu item has **title** and **route** properties. The **title** property is the menu's label, while the **route** property is the name of the route you want this menu item to link to.


Subpages
========

Each page can have subpages: e.g. top level page can have sidebar or tab-menu with links to subpages.
Also, a subpage can have subpages and so on - to the unlimited depth.

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
Subpages will have the route name constructed from its parent's page route name and subpage name separated with dot. 

In the previous example:

- "home" route name is "home"
- "subpage\_1" route name is "home.subpage\_1"
- "subsub\_1" route name is "home.subpage\_1.subsub\_1"

Now we can have new menu items linking to the newly-created subpages:

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
The generator has several built-in examples. To try them out, you just run:

```
meteor-kitchen --example-subpages ./example-subpages
```

This will produce an application with pages and subpages. 

You can see a live example <a href="http://generator-subpages.meteor.com" target="_blank">here</a>

**Note:** The source code for all examples caan be found <a href="https://github.com/perak/kitchen-examples" target="_blank">here</a>


Visual Themes
=============

Currently, the generator will produce markup compatible with <a href="http://getbootstrap.com" target="_blank">bootstrap</a>.

Also, it comes with <a href="http://bootswatch.com/" target="_blank">bootswatch</a> visual themes.

You can easily choose a theme for your application by adding the "theme" property:

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
In this example, the application will use "bootswatch-amelia" theme. You can see a list of bootswatch themes <a href="http://bootswatch.com/" target="_blank">here</a>


Components
==========

An application with empty pages is not very useful :). That's why Meteor kitchen allows you to add **Components**. Which are predefined and customizable visual elements that can be inserted into pages. They are building the blocks of your application.

The generator comes with several built-in components. And you can also write **your own** components (which we call "plugins"). More about plugins later.

You can insert components into pages by adding **components** array into any **page** object:
```
{
	"name": "page_name",
	"title": "Page Title",

	"components": [
	]
}
```

The list of built-in components currently implemented into generator:

- `menu` - navbars, navs, side-menus and tab-menus

- `form` - for inserting/updating data (with validations)

- `dataview` - shows data from collections (with search and sort functions)

- `jumbotron` - cool big heading text with button (usually found in home pages)

- `markdown` - styled text written in <a href="http://daringfireball.net/projects/markdown/" target="_blank">markdown</a>

- `div` - simple div element


The minimal structure of any **component** object is:

```
{
	"name": "component_name",
	"type": "component_type",

	... and properties specific for component of this type...
}
```

- `name` - used by generator to construct component template name: parent template name + component name (will be in capitalized camel-case).
- `type` - used by the generator to determine the component's type. If type is not one of the built-in component types, the generator will try to find and execute a plugin with that name (more about plugins later). You can write custom component by specifying "custom" here. In that case you need to provide your custom html and js files. See "custom components" below.

### Jumbotron component

A page object with a `jumbotron` component should look like this:

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

In this example jumbotron will be shown at home page. Properties `title`, `text`, `button_title` and `button_route` are specific to the component of type `jumbotron`.

### Markdown component

The easiest way to add formated content into pages is to write text with <a href="http://daringfireball.net/projects/markdown/" target="_blank">markdown</a>, save it into separate a file and then insert the component of type `markdown` into your page.

A page object with the `markdown` component should look like this:

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
Property `source_file` is thee path to the markdown file (relative to the input JSON file).

### Div component

The component of type `div` is just a simple html div tag that will be inserted into your page (or component).

The following example shows how to add a bootstrap row with two columns into a page:

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

Before we continue with components `dataview` and `form`, let's add some **mongo** collections into your program:

Collections
===========

To define collections, add the **collections** array to your **application** object: 

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
Server publication, client subscription and other necessary code related to the collection are also created for you.

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

Fields are used by components such as `form` and `dataview` (generator will "know" what input fields to generate in forms, what columns to show in dataview etc.).

- `name` - field name
- `title` - field title shown in form labels, table headers etc.
- `required` - used in form validations
- `default` - default value in insert forms
- `type` - field datatype - used in form validations


**Note** that defining fields at collection level is not mandatory - fields can be set/overriden inside the `form` and `dataview` components.


Dataview Component
==================

The component of type `dataview` is used to show data from the database's collection with search and sort functions (other view styles such as "list" and "gallery" are under construction).

A minimal application with `dataview` component should look like this:

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

In this example we have collection `customers` and component of type `dataview` inside `home` page.

Some of `dataview` component properties are:

- `text_if_empty` - text to be shown instead of empty table if collection is empty.
- `query` - query used to filter data from collection. Must have "name", "collection" (existing collection name) and "filter" (mongo query being passed as param to `collection.find()`).
- `insert_route` - route name of existing page (usually containing form component) which will be opened when user clicks "insert" button.
- `edit_route` - route name of existing page (usually containing form component) which will be opened when user clicks "edit" icon.
- `details_route` - route name of existing page which will be opened when user clicks item.

Each page route can receive params such as document `_id`. More about that later.

You can see  **live example** (also with form components) <a href="http://generator-dataview.meteor.com" target="_blank">here</a>

**Note:** The source code for all examples can be found <a href="https://github.com/perak/kitchen-examples" target="_blank">here</a>


Form Component
==============

The `form` component has the following structure:

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

- `mode` - `insert`, `update` or `read_only`
- `query` - query used in `update` and `read_only` mode forms to filter particular document from collection to be modified/displayed
- `submit_route` - route name of existing page to be opened when user hits "submit" button
- `cancel_route` - route name of existing page to be opened when user hits "cancel" button

**Common usage** of form component is to put subpage into page containing `dataview` component, add `form` into that subpage and then in dataview component specify `insert_route`, `edit_route` or `details_route` to point to subpage containing form.
To make it more clear let's see an example application with dataview and insert form:

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

In this example we have a page named `home` with a `dataview` component and subpage named `insert`. 
Subpage `insert` has `form` component named `insert_form`.

Now look:

- `dataview` component: `insert_route` property is set to `home.insert` (subpage containing form).
- `form` component: `submit_route` and `cancel_route` properties are set to `home` (parent page).

Form has defined query `customers_empty`: this is insert form and we don't need any data from this query - `query` is used just to point generator on which collection to use for insert.

You can see **live example** <a href="http://generator-dataview.meteor.com" target="_blank">here</a>

**Note:** Source code for all examples you can find <a href="https://github.com/perak/kitchen-examples" target="_blank">here</a>


Route params
============

Sometimes you need to pass route parameters via page URL. For example, let's say we have a page for listing all customers.
On this page you want to implement an Edit button for each customer, which points to something like:
`/customers/edit/<customer_id_here>`

To do this, first let's add the `route_params` property to your `page` object:

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
**Note:** property `route_params` is an array of strings.

In this example the `page` object has a param named `customerId` and we are using it inside `form` component's `query` filter: `:customerId`.

Now, let's pass this param to our `dataview` component via `edit_route` and `edit_route_params` properties:

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

Property `edit_route_params` is a list of parameters to be passed to `edit_route`:

- `name` is parameter name
- `value` is parameter value


Here is a full example with `insert` and `update` forms:

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

Custom components
=================

You can write your own components and add them into pages. 

**Note**: This is only for simple components (components that doesn't require special processing while generating application). If you need advanced, complex components write <a href="#plugins">plugin</a> instead.

Add custom component into page and write your own HTML and JS code, like this:

```
{
  "name": "my_component",
  "title": "My cool component",
  "type": "custom",
  "custom_template": "something"
  "query": {
    "name": "some_query",
    "collection": "some_collection",
    "filter": {}
  }
}
```

- `type` is set to `custom`. That requires you to provide custom HTML and JS templates.

- In this example `custom_template` is set to `something`. That is path to template HTML and JS files without extension - you need to provide `something.html` and `something.js`. Path is relative to input json file.

Your HTML and JS file can contain anything. Your component can contain other components, can use query - the same as any other built in component.

If you want your component to be reusable in multiple pages, then you should use special tokens instead of hard-coded template name, title and similar. Following special tokens inside HTML and JS files will be replaced by generator:

```
TEMPLATE_NAME
COMPONENT_TITLE
COMPONENT_CLASS
COMPONENT_ID
QUERY_VAR
COLLECTION_VAR
APP_TITLE
```


Plugins
=======

In addition with built-in components (such as `form`, `dataview` etc.) you can write your own components called **plugins** using javascript (node.js).

Plugins are stored in the `plugins` subdirectory inside the meteor-kitchen installation dir. By default it is located in:

```
~/.meteor-kitchen/plugins/
```

You can create a subdirectory there and name it as you wish - directory name will be used as component type.

Meteor kitchen comes with two example plugins. Please navigate to first example plugin directory:

```
cd ~/.meteor-kitchen/plugins/example1/
```

Directory contains two files: 

- `plugin.js` is javascript code that is passed to node.js and executed. It should create html and js that generator will insert into page.
- `plugin.json` is JSON file with plugin settings: here you can specify which meteor and mrt packages your plugin is using.

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
Component type is set to `example1`. This type is unknown to generator and it will search plugins directory for subdirectory named `example1` that contains file named `plugin.js`. 
If a file `plugins/example1/plugin.js` is found, the generator will pass that file to "node.js" and file is executed. File will produce html and js content that will be inserted into page.

Our "example1" `plugin.js` file contains following code:

```javascript
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

Object "kitchen" is the bridge between generator and plugin code. It has two methods:

- `getInput`
- `setOutput`

Method `getInput()` returns component description - javascript object extracted from input file, in our example that is:

```
{
	"name": "example_plugin",
	"type": "example1",
	"html": "",
	"js": ""
}
```
Properties `html`, and `js` are automatically added by generator. Those are output strings that our plugin code should fill with content. 

Method `setOutput()` will pass "html" and "js" strings to generator and those will be inserted into page. 

This is a really trivial example that shows how to write custom component. Note that you can add any custom properties to component object inside input file and use them inside plugin.


You can see a live application that uses two example plugins <a href="http://generator-plugins.meteor.com" target="_blank">here</a>

**Note:** Source code for all examples you can find <a href="https://github.com/perak/kitchen-examples" target="_blank">here</a>


Server Side Routes
==================

You can add array `server_side_routes` to your `application` object and the generator will add router.map and route controllers:

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

- `name` is route name. Example: `api.show.some_data`.

- `path` is route path. Example: `/api/show/some_data`. If you leave this blank, path will be automatically created from route name.

- `source_file` is the path to the .js file (relative to input JSON) which will be inserted into controller `action` function (not mandatory).


User Roles
==========

In applications that use user account system, you can define multiple user roles and restrict access to any page to any set of user roles. Also, you can restrict access to collections.

First, you need to add `roles` array to application object:

```
{
	"application": {

		"title": "Hello world!",

		"roles": ["admin", "user"],
		"default_role": "user",

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

By default, meteor kitchen will add `roles` array to user document. If you specify `default_role`, that role will be added to new users. Each user can have multiple roles (`roles` is array of strings).

**Restrict pages to set of user roles**

You can restrict any page inside private zone to any set of user roles by adding `roles` array to your page object. **Note**: `home_private` page should be accessible to all authenticated users (don't restrict private home page to any role).


```
{
	"application": {

		"title": "Hello world!",

		"roles": ["admin", "user"],
		"default_role": "user",

		"public_zone": {

			"pages": [
				{ "name": "home_public", "title": "Public home page" },
				{ "name": "login", "template": "login.html" },
				{ "name": "register", "template": "register.html" },
				{ "name": "forgot_password", "template": "forgot_password.html" },
				{ "name": "reset_password", "template": "reset_password.html" }
			],

			"menus": [
				{
					"name": "left_menu",
					"class": "nav navbar-nav",
					"dest_selector": "#menu",
					"items": [
						{ "title": "Home", "route": "home_public" }
					]
				},

				{
					"name": "right_menu",
					"class": "nav navbar-nav navbar-right",
					"dest_selector": "#menu",
					"items": [
						{ "title": "Register", "route": "register" },
						{ "title": "Login", "route": "login" }
					]
				}
			]
		},

		"private_zone": {

			"pages": [
				{ "name": "home_private", "title": "Private home page" },
				{
					"name": "admin_panel",
					"title": "Admin panel",
					"roles": ["admin"]
				},
				{ "name": "logout", "template": "logout.html", "action_code": "App.logout();" }
			],

			"menus": [
				{
					"name": "left_menu",
					"class": "nav navbar-nav",
					"dest_selector": "#menu",
					"items": [
						{ "title": "Home", "route": "home_private" },
						{ "title": "Admin", "route": "admin_panel" }
					]
				},
				{
					"name": "right_menu",
					"class": "nav navbar-nav navbar-right",
					"dest_selector": "#menu",
					"items": [
						{ "title": "Logout", "route": "logout" }
					]
				}
			]
		}
	}
}
```

In this example we have page "admin_panel" that is restricted to role "admin" - regular users (users with role "user") cannot access this page. 
If you try this example, when you login into application you will not see "Admin panel" page because you are in role "user". Use mongo shell to add "admin" to `roles` array:

```
db.users.update({ _id: "YOUR_USER_ID" }, { $set: { roles: ["admin"] } })
```


**Restrict collections to set of user roles**

You can choose which user roles are allowed to read, update, insert and delete documents from collection:

```
{
	"application": {

		"title": "Hello world!",

		"roles": ["admin", "manager", "user"],
		"default_role": "user",

		"collections": [
			{
				"name": "customers",
				"roles_allowed_to_read": [],
				"roles_allowed_to_insert": ["admin", "manager"],
				"roles_allowed_to_update": ["admin", "manager"],
				"roles_allowed_to_delete": ["admin"],
			}
		],

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

In this example we have application with three user roles ("admin", "manager" and "user") and we defined "customers" collection with fine grained access rights:

- **read**: everybody (empty array means "everybody")
- **insert** and **update**: "admin" and "manager"
- **delete**: "admin" only


To be continued...