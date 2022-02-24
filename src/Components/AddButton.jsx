import React from "react";
import {Button} from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

class AddButton extends React.Component {

    render() {
        return <Tooltip placement="bottom" title="Permet d'ajouter un article au blog">
            <Button
            icon={<PlusOutlined />} 
            type="default" shape="round" size="large" 
            onClick={this.props.handleClick}
            >{this.props.content}</Button>
        </Tooltip>
    }
}

export default AddButton;