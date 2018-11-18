# SureFit - Calorie Tacker

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Available Links

* /text
* /camera

### Working

The project uses Tensorflow.js [Tensorflow](https://js.tensorflow.org/) at its heart for classifying the food items

The classified image item is then fead to a `nutrinix	API` that generates per unit serve nutrient content for the food. 

Users are provided to ways to get a nutrient content. 
* By clicking an image of the food item
* By typing the name of that food item. 
	* Users can also type in phrases like `today I eat potatoes and rice` in the text based system.
	* The `nutrinix	API` uses NLP to generated valid food names from vague/general phrase and returs result for all the matched food items