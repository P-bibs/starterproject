import { observer } from "mobx-react";
import "../../styles/interface_components/NodeCreation.scss"
import { NodeCreationModalStore } from "../../stores/interface_components/NodeCreationModalStore"
import { FormInputType } from "../../stores/interface_components/FormItemInfo"
import React = require("react");

interface IProps {
    store: NodeCreationModalStore
}

@observer
export class NodeCreationModalView extends React.Component<IProps> {

    componentDidMount() {
        // Automatically create new node if no parameters necessary
        if (this.props.store.inputs.length == 0) {
            this.props.store.handleSubmit(null);
        }
    }

    render() {
        let store = this.props.store
        return (
            <div className="modal" onClick={ (e) => e.stopPropagation() }>
                <form className="modal-form" onSubmit={store.handleSubmit.bind(store)}>
                    {store.inputs.map((inputInfo, i) => {
                        if (inputInfo.Type == FormInputType.Text) {
                            return (
                                <label key={inputInfo.Title}>
                                    {inputInfo.Title}
                                    <input
                                        type="text"
                                        value={store.CurrentValues[inputInfo.Name]}
                                        name={inputInfo.Name}
                                        onChange={store.handleTextChange.bind(store)}
                                        autoFocus={i==0 ? true : false}    
                                    />
                                </label>
                            )
                        } else if (inputInfo.Type == FormInputType.TextArea) {
                            return (
                                <label key={inputInfo.Title}>
                                    {inputInfo.Title}
                                    <textarea
                                        value={store.CurrentValues[inputInfo.Name]}
                                        name={inputInfo.Name}
                                        onChange={store.handleTextChange.bind(store)}
                                        autoFocus={i==0 ? true : false}    
                                    />
                                </label>
                            )
                        }
                    })}
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
  }