import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "./Main.scss";
import * as ReadMe from "../README.md";
import { NodeCollectionStore } from './stores/nodes/NodeCollectionStore';
import { StaticTextNodeStore } from './stores/nodes/StaticTextNodeStore';
import { VideoNodeStore } from './stores/nodes/VideoNodeStore';
import { WebsiteNodeStore } from './stores/nodes/WebsiteNodeStore';
import { TextEditorNodeStore } from './stores/nodes/TextEditorNodeStore';
import { WorkspaceView } from './views/workspace/WorkspaceView';
import { WorkspaceStore } from './stores/workspace/WorkspaceStore';
import { MarkdownNodeStore } from './stores/nodes/MarkdownNodeStore';

const welcomeNodeCollection = new NodeCollectionStore({X: 0, Y: 0, isTopLevel: true, GetParentScale: () => 1 });
const demoNodeCollection = new NodeCollectionStore({X: 0, Y: 0, isTopLevel: true, GetParentScale: () => 1 });
const mainWorkspace = new WorkspaceStore({ Collections: [welcomeNodeCollection, demoNodeCollection]})
ReactDOM.render((
    <div>
        <h1 className="dash-title">Dash Web</h1>
        <WorkspaceView store={mainWorkspace} />
    </div>), document.getElementById('root'));

// Greet the user with the Readme
let windowWidth = document.documentElement.clientWidth;
let windowHeight = document.documentElement.clientHeight;
welcomeNodeCollection.AddNodes([
    new MarkdownNodeStore({
        X: windowWidth / 4, Y: windowHeight / 6,
        Width: windowWidth / 2, Height: windowHeight * (4/6),
        Title: "Welcome", Markdown: ReadMe.default
    })
])

// Include a second collection with some pre-existing nodes to play with
let nodes = []
nodes.push(new StaticTextNodeStore({ X: 100, Y: 200, Title: "Lorem Ipsum", Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" }));
nodes.push(new WebsiteNodeStore({ X: 500, Y: 200, Title: "Embedded web site", Url: "http://paulbiberstein.me" }));
nodes.push(new WebsiteNodeStore({ X: 100, Y: 600, Title: "Lorem Ipsum PDF", Url: "https://paulbiberstein.me/resources/lorem-ipsum.pdf" }));
nodes.push(new VideoNodeStore({ X: 500, Y: 600, Title: "Demo video", Url: "http://cs.brown.edu/people/peichman/downloads/cted.mp4" }));
nodes.push(new TextEditorNodeStore({ X: 100, Y: 1000, Width: 700, Title: "Rich Text Editor" }));

const nestedNodeCollection = new NodeCollectionStore({ X: 900, Y: 200, Width: 1000, Height: 1000, })

const doubleNestedNodeCollection = new NodeCollectionStore({ X: 400, Y: 100, Width: 500, Height: 500 })
doubleNestedNodeCollection.AddNodes([new StaticTextNodeStore({ X: 0, Y: 0, Title: "Lorem Ipsum", Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" })])

nestedNodeCollection.AddNodes([doubleNestedNodeCollection])
nestedNodeCollection.AddNodes([new StaticTextNodeStore({ X: 0, Y: 100, Title: "Lorem Ipsum", Text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" })])
nodes.push(nestedNodeCollection)

demoNodeCollection.AddNodes(nodes);