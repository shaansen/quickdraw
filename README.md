# Quickdraw Exercise

This is a simple drawing app written in React and Redux. Please make the enhancements described below and return your finished exercise by zip as soon as you can. (Please exclude the `node_modules` folder since it gets large.) You should feel free to use any online or print resources you want except someone else's answer to this same exercise.

## Background technologies
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Node/npm
If you are new to Node and npm, you should probably start with an online tutorial. There are thousands. Node and npm are the base technologies you'll need to have installed to complete the exercise.

### React
To learn React, check out the [React documentation](https://reactjs.org/).

The [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) contains some very useful sections about adding features.


### Redux
Redux is a nice state container for React. If you are new to Redux, the official [getting-started page](https://redux.js.org/introduction/getting-started) has some good links. 

And [this tutorial](https://medium.freecodecamp.org/understanding-redux-the-worlds-easiest-guide-to-beginning-redux-c695f45546f6) is pretty good too: 

## Getting started
With Node and npm already installed, in the project directory, start with

### `npm install`

That will install everything you need to get up and running.
You can then run

### `npm start`

which runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you save edits to the source.<br>
You will also see any lint errors in the console.

## Debugging tools

### React developer tools
I strongly suggest you install and activate the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en). If you have trouble getting it to connect to the app, their [troubleshooting section should](https://github.com/facebook/react-devtools/blob/master/README.md#faq) help.

### Redux developer tools
The [Redux developer tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) on top of the React ones are fantastic. I really would not suggest trying to make substantial progress without getting this to work. It will save you tons of time and headaches.

### Visual studio code
The project is set up to launch from the debugger in Visual Studio Code in a way that it can be debugged remotely while running in Chrome. You can use any development environment you want, but this setup is very convenient. After you have started the dev server (`npm start`) just run the default debugging configuration in VS Code, and it should connect.

# Enhancement 1: Add rectangles
Right now Quickdraw only draws lines. It has a button for a rectangle tool, but it's disabled. Add rectangle drawing when that button is clicked.

# Enhancement 2: Add undo/redo
Quickdraw is designed to make it easy to implement undo/redo. Add undo/redo capability and hook it up to the buttons provided.

# Enhancement 3: Add delete mode
Implement a "delete" mode and hook it up to the button provided. When in delete mode, clicking on or near an element should get rid of it. Only delete the topmost element that is hit. Remain in delete mode until another mode is selected. Make sure undo/redo continues to work.

# Enhancement 4: Add move mode
Implement a "move" mode and hook it up to the button provided. Clicking and dragging on an element should drag the topmost one. Remain in move mode until another mode is selected. Make sure move works with undo/redo.

# Enhancement 5: (Optional) Add server-side data persistence
Up until now, you have not had to implement any server; the React dev server has been sufficient. Enhance the app and the minimal server provided so that it saves the current state of the drawing automatically as you go. Reloading the page ando/or restarting the server should load the saved drawing including its undo/redo state. Feel free to use any sort of persistent server-side datastore. You may also use any npm module that is helpful, but keep it simple, and don't worry too much about efficiency as long as it's correct.

You may have to build the application in order to serve it properly:

### `npm run build`

But do note that there are ways to continue to use the dev server for convenience even while you are communicating with your own server under development. The [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started) describes how to do that.

## Good luck
Please feel free to ask any questions you have, and don't hesitate to improve the program overall as you go. Thanks for taking the time to do the exercise. I hope you find it worthwhile.