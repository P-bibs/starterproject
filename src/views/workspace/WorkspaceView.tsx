import { observer } from "mobx-react";
import { WorkspaceStore } from "../../stores/WorkspaceStore"
import { NodeContainer } from "../freeformcanvas/NodeContainer"
import "./Workspace.scss"
import React = require("react");

interface IProps {
    store: WorkspaceStore
}

@observer
export class WorkspaceView extends React.Component<IProps> {

    render() {
        let store = this.props.store

        return (
            <div className="workspace">
                <div className="tab-bar">
                    {store.Collections.map((_, i) => {
                        return (
                            <div className={"tab" + (store.CurrentCollectionIndex == i ? " active-tab" : "")}
                                key={i} onClick={ () => store.SetCurrentCollection(i)}>
                                <div className="tab-title">
                                    Collection {i+1}
                                </div>
                                <i className="material-icons delete-btn"
                                    onClick={ (e) => { e.stopPropagation(); store.RemoveCollection(i) }}>
                                        close
                                </i>
                            </div>
                        )
                    })}
                    <i className="material-icons" onClick={store.AddCollection.bind(store)}>add</i>
                </div>
                <div className="node-container">
                    <NodeContainer store={store.Collections[store.CurrentCollectionIndex]} />
                </div>
            </div>
        )
    }
}