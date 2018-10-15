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
