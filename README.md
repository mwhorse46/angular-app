# Angular-App
Simple Angular App made for learning purposes

## Setup
If you have not installed angular yet,

```
npm install -g @angular/cli
```

After installing angular globally create a new application using

```
ng new angular-tour-of-heroes
```

Next Serve the application using

```
cd angular-tour-of-heroes
ng serve --open
```

## Implementation
The angular app we just created contains ```app.component.ts``` and ```app.component.html``` files in **src/app/**. You can change replace the angular cli generated code from 
```app.component.html``` with ```{{ title }}``` which comes from ```app.component.ts``` 
file. 

On changing the ```title``` variable in ```.ts``` file the value in ```.html``` files also changes.

```
export class AppComponent {
  title = 'Tour of heroes';
}
```

Global styles for the angular app goes into **src/style.css**.

The browser page gets reloaded on each change in the app files.

Using Angular CLI we can create a new component for our app like this

```
..\angular-tour-of-heroes> ng generate component heroes
```

This command will create a new component or a new folder in **src/app/** named **heroes**
which contains **three** files for the component. Our new component **HeroesComponent** 
is imported in ```app.module.ts``` file in **src/app/**

Inside ```heroes.component.ts``` file you can see that angular CLI already imported 
```Component``` from Angular Core library and annotate the component library with 
```@Component```, this needs to be imported always.

```@Component``` is a decorator function that specifies the metadata for our component.

CLI generated three metadata properties:

1. ```selector``` -- the component CSS element selector
2. ```templateURL``` -- the location of the component template file
3. ```styleUrls``` -- the location of the component private CSS styles

The CSS element selector, ```app-heroes```, matches the name of the HTML element that 
identifies this component within a parent component's template.

Always export the component class so you can import it elsewhere like in the 
```AppModule```.

Now we will add another property to heroes component 

```
export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  hero = 'Windstorm';
}
```

We now export ```hero``` with a value of ```Windstorm``` from heroes component, so this 
means we can make use of this property in the app template file. Open 
```heroes.component.html``` file and replace the CLI generated code with

```
{{ hero }}
```

Now for displaying our heroes components in ```AppComponent``` we will use the element selector property value of heroes component which is ```app-heroes```

Simply create a html element with ```app-heroes``` in ```AppComponent``` template

```
<h1>{{ title }}</h1>
<app-heroes></app-heroes>
```

Save the file and check the browser.

Since a **hero** is not just a string, it contains more info than that like the **id** 
and the **name** of the hero.

For this we will create a ```Hero``` class in its separate file in **src/app**

**src/app/hero.ts**
```
export class Hero {
	id: number;
	name: string;
}
```

Now import this ```Hero``` class in ```heroes.component.ts```

```
import { Hero } from '../hero';
...

export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  hero: Hero = {
  	id: 1,
  	name: 'Windstorm'
  };
}
```

The browser reloads but we see a object instead of string, because ```hero``` is now a 
object of class ```Hero```. For rendering its values we need to use 

```
<h2>{{ hero.name|uppercase }}</h2>
<div><span>id: </span>{{ hero.id }}</div>
<div><span>name: </span>{{ hero.name }}</div>
```

Using ```|uppercase``` converts the string in uppercase which comes from angular along 
with many other [pipes](https://angular.io/guide/pipes)

The changes are reflected in the webpage.

Next we will use two way binding of data using input tag in html

```
<div>
	<label>name:
		<input placeholder="name" [(ngModel)]="hero.name">
	</label>
</div>
```

This way we handle the change in the title as soon as the value in input element changes.

But this will raise errors

```
Template parse errors:
Can't bind to 'ngModel' since it isn't a known property of 'input'.
```

Although ngModel is a valid Angular directive, it isn't available by default.
It belongs to the optional FormsModule and you must opt-in to using it.

Open ```AppModule (app.component.ts)``` and import ```FormsModule``` symbol from 
```@angular/forms``` library.

**app.module.ts**
```
import { FormsModule } from '@angular/forms';
```

Then add FormsModule to the @NgModule metadata's imports array, which contains a list of 
external modules that the app needs.

**app.module.ts ( @NgModule imports)**
```
imports: [
  BrowserModule,
  FormsModule
],
```

## Services
In this section we learn how to create service for components. So far we have been using 
mock data which is as it is provided to our component, but this won't happen in real 
world. We will be fetching data from a remote server like django rest API. So in that 
case we need service that let's you fetch data from anywhere.

Create a service using

```
ng generate service hero
```

This service will provide data to heroes component which then it will display and 
hero-detail will display its details.

Angular CLI generated two files ```hero.service.ts``` and ```hero.service.spec.ts``` that
uses ```import { Injectable } from '@angular/core';``` which is denoted using ```@Injectable``` with some metadata.

We can add parameters ```private``` or ```public``` in the constructor of service and 
then use those parameters in components. ```public``` parameters can be only be binded 
into the template like we did in ```message``` service.

## Routing
In this section we will generate a separate module for routing purposes of the app

```
ng generate module app-routing --flat --module=app
```

```--flat``` puts the files in **src/app** folder instead of its own folder.
```--module=app``` tell CLI to register the module in ```imports``` array of ```AppModule```

The generated files have ```NgModule.declarations``` which is not needed in routing file 
as well as ```CommonModule``` references.

We need to export ```RouterModule``` from ```@angular/router```

Routes tell the router which view to display when a user clicks a link or pastes a URL 
into the browser address bar.

A **Angular Route** needs two important parts,

1. ```path```: a string that matches the url in the address bar.
2. ```component```: a component that router should create when navigating to route.
