import { observer } from "mobx-react";
import "../../styles/interface_components/NodeCreation.scss"
import { NodeCreationDropdownStore } from "../../stores/interface_components/NodeCreationDropdownStore"
import { NodeType } from "../../stores/interface_components/FormItemInfo";
import React = require("react");


interface IProps {
    store: NodeCreationDropdownStore
}

@observer
export class NodeCreationDropdownView extends React.Component<IProps> {

    onClick = (nodeType: NodeType) => {
        let store = this.props.store;
        store.Container.CreateNodeCreationModal(store.X, store.Y, store.Collection, store.Container, nodeType);
        store.Container.HideDropdown();
    }

    render() {
        let store = this.props.store
        return (
            <div className="dropdown" style={{ transform: store.Translate }} onPointerDown={ (e) => e.stopPropagation() }>
                {Object.keys(store.Options).map((nodeName) => {
                    return (
                        <div className="dropdown-item" key={store.OptionKeys[nodeName]} onClick={ () => this.onClick(store.Options[nodeName]) }>
                            {nodeName}
                        </div>
                    )
                })}
            </div>
        );
    }
  }