# Dash Starter Project Readme

## Canvas Controls

* Click and drag to pan, or scroll to zoom.
* Left click on a blank area to create a new node.

## Node Types

* Static Text Node
  * Displays input text as plain-text.
* Markdown Node
  * Displays input text formatted according to the Markdown markup language.
* Image Node
  * Displays the image located at the given URL.
* PDF Node
  * Displays the PDF located at the given URL.
* Video Node
  * Displays the video located at the given URL.
* Website Node
  * Shows an embedded view of the website at the given URL (website must allow embedding).
* Text Editor Node
  * Displays a rich text editor that allows display and manipulation of decorated text.
* Node Collection
  * Displays a nested collection in which you may create more nodes.

## Node Controls
* Drag a node by its top bar to move it.
* Drag the bottom right corner of a node to resize it.
* Click the 'x' button to delete a node.
* Click the ![link icon](https://paulbiberstein.me/resources/link-icon.png) of one node and then another to link two nodes

## Node Links
* Two linked nodes have a line connecting them.
* Hover over the top bar of a node to highlight all connected nodes.
* Click a link to delete it.
* Nodes may only be linked to other nodes in the same collection.

## Other Collection Views
* Click the ![info icon](https://paulbiberstein.me/resources/info-icon.png) button in the top left of a collection to see a list of all the nodes in the collection and their titles.

## Additional Top-Level Collections
* Use the tabs at the top to create, switch between, and delete different top-level collections.

## Running locally
Install Node.js, then, from the project directory, run

* `npm install`
* `npm start`
* goto `http://localhost:1050` in Google Chrome Canary (https://www.google.com/chrome/canary/) or Firefox

Note: `npm start` compiles and runs the application in debug mode, meaning that when you edit and save the source files, it will re-compile  and reload the browser window automatically.
