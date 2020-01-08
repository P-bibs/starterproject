import { StaticTextNodeStore } from "../stores/StaticTextNodeStore";
import { ImageNodeStore } from "../stores/ImageNodeStore";
import { VideoNodeStore } from "../stores/VideoNodeStore";
import { WebsiteNodeStore } from "../stores/WebsiteNodeStore";
import { TextEditorNodeStore } from "../stores/TextEditorNodeStore";
import { NodeCollectionStore } from "../stores/NodeCollectionStore";

type Class_t = new (...args: any[]) => any;

export enum FormInputType {
    Text,
    TextArea
}

// Contains all info necessary to render one element of a form
export class FormItemInfo {
    constructor(initializer: Required<FormItemInfo>) {
        Object.assign(this, initializer);
    }

    public Title: string;
    public Type: FormInputType;
    public Name: string;
}

export enum NodeType {
    StaticTextNode,
    ImageNode,
    VideoNode,
    WebsiteNode,
    NodeCollection,
    TextEditorNode,
}

export function NodeTypeToNodeClass(nodeType: NodeType): Class_t {
    if (nodeType == NodeType.StaticTextNode) {
        return StaticTextNodeStore
    } else if (nodeType == NodeType.ImageNode) {
        return ImageNodeStore
    } else if (nodeType == NodeType.VideoNode) {
        return VideoNodeStore
    } else if (nodeType == NodeType.WebsiteNode) {
        return WebsiteNodeStore
    } else if (nodeType == NodeType.TextEditorNode) {
        return TextEditorNodeStore
    } else if (nodeType == NodeType.NodeCollection) {
        return NodeCollectionStore
    }
}

export const NodeEditInfo: { [key in NodeType]: FormItemInfo[]} = {
    [NodeType.StaticTextNode]: [
        new FormItemInfo({ Title: "Title", Type: FormInputType.Text, Name: "Title" }),
        new FormItemInfo({ Title: "Text", Type: FormInputType.TextArea, Name: "Text" })
    ],
    [NodeType.ImageNode]: [
        new FormItemInfo({ Title: "Title", Type: FormInputType.Text, Name: "Title" }),
        new FormItemInfo({ Title: "URL", Type: FormInputType.Text, Name: "Url" })
    ],
    [NodeType.VideoNode]: [
        new FormItemInfo({ Title: "Title", Type: FormInputType.Text, Name: "Title" }),
        new FormItemInfo({ Title: "URL", Type: FormInputType.Text, Name: "Url" })
    ],
    [NodeType.WebsiteNode]: [
        new FormItemInfo({ Title: "Title", Type: FormInputType.Text, Name: "Title" }),
        new FormItemInfo({ Title: "URL", Type: FormInputType.Text, Name: "Url" })
    ],
    [NodeType.TextEditorNode]: [
        new FormItemInfo({ Title: "Title", Type: FormInputType.Text, Name: "Title" }),
    ],
    [NodeType.NodeCollection]: [],
}