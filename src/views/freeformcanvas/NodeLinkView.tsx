import React = require("react");
import "./NodeContainer.scss"
import { NodeLinkStore } from "../../stores/NodeLinkStore";
import { observer } from "mobx-react";

interface IProps {
    store: NodeLinkStore
}

@observer
export class NodeLinkView extends React.Component<IProps> {
    render() {
        let [xPos, yPos] = this.props.store.TopLeftNodeCoords
        let rotation = this.props.store.Rotation
        let length = this.props.store.Length

        return (
            <div
                className={ "node-link" + (this.props.store.Highlighted ? " highlighted" : "") }
                style={{
                    width: length,
                    transform: ("translate(" + xPos + "px," + yPos + "px) rotate(" + rotation + "rad)")}}
                onClick={ this.props.store.Destroy }
                onMouseEnter={ this.props.store.Highlight.bind(this.props.store)}
                onMouseLeave={ this.props.store.Highlight.bind(this.props.store)}>
            </div>
        )
    }
}