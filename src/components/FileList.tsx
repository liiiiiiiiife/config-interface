import React from "react"
import { List } from "semantic-ui-react"
import { Node } from "../share/searchApi";
import { File } from "./File"
import styled from "styled-components"

type Props = {
    projectPath: string
    fileName: string[]
    pathProject: string[]
    onSelect: (Node) => void;
    isSelected: (Node) => boolean;
    folder: Node
    nodes: Node[]
}

const FileDiv = styled.div`
  padding: 5px;
`

export class FileList extends React.Component<Props> {
    constructor(props) {
        super(props)
    }

    private getFiles = (node: Node) => {
        return this.props.nodes.filter(x => x.parent === node.id && x.isFile)
    }

    private getFolders = (node: Node) => {
        return this.props.nodes.filter(x => x.parent === node.id && !x.isFile)
    }

    public render() {
        let { folder, nodes } = this.props;
        /*let isSelected = (file) => {
            return this.props.projectPath.indexOf(file) !== -1
        }*/
        let setFalse = false;
        const ListMain = ({ }) => (
            <List.Item>
                <List.Icon color="yellow" name="folder" size="large" verticalAlign="middle" />
                <List.Content>
                    <List.Header>
                        {this.props.folder.name}
                    </List.Header>
                </List.Content>
                <List.List>
                    {this.getFolders(folder).map(x => <FileList projectPath={this.props.projectPath} fileName={this.props.fileName} pathProject={this.props.pathProject} isSelected={this.props.isSelected} onSelect={this.props.onSelect} folder={x} nodes={nodes} />)}
                    <List selection divided relaxed >
                        {this.getFiles(folder).map(x => <File projectPath={this.props.projectPath} fileName={this.props.fileName} pathProject={this.props.pathProject} isSelected={this.props.isSelected} onSelect={this.props.onSelect} file={x} />)}
                    </List>
                </List.List>
            </List.Item>

        )
        // _______________สร้างlist_____________|
        return (

            <List divided relaxed >
                <ListMain />
            </List>

        )
    }
}