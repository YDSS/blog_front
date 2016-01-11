import React, { Component } from 'react';
import { Link } from 'react-router';

class Navbar extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * 生成指向内部路由的链接
     *
     * @param {Object} item 节点信息
     * @param {number} index 节点位置
     *
     * @return {Object} 节点元素
     */
    createInnerLink(item, index) {
        let iconClass = 'fa fa-' + item.icon;

        return (
            <Link className='item' to={item.url} key={index + item.name}>
                <i className={iconClass}/>
                <span className="nav-title">{item.name}</span>
            </Link>
        );
    }

    /**
     * 生成指向外部路由的链接
     *
     * @param {Object} item 节点信息
     * @param {number} index 节点位置
     *
     * @return {Object} 节点元素
     */
    createOuterLink(item, index) {
        let iconClass = 'fa fa-' + item.icon;

        return (
            <a className='item' href={item.url} key={index + item.name}>
                <i className={iconClass}/>
                <span className="nav-title">{item.name}</span>
            </a>
        );
    }

    /**
     * 生成带有子节点的链接, 子节点不会再有子节点，现在只有两层
     *
     * @param {Object} item 节点信息
     * @param {number} index 节点位置
     *
     * @return {Object} 节点元素
     */
    createLinkWithChildren(item, index) {
        let iconClass = 'fa fa-' + item.icon;
        let children = item.children;
                
        return (
            <div className='item has-children' key={index + item.name} onClick={this.toggleChildNode.bind(this)}>
                <div className='parent'>
                    <i className={iconClass}/>
                    <span className="nav-title">{item.name}</span>
                </div>
                <ul className='children'>
                    {children.map(this.createChildNodes)}
                </ul>
            </div>
        );
    }

    /**
     * 展开或收起子元素
     *
     * @param {Object} ev 点击事件对象
     */
    toggleChildNode(ev) {
        let $item = ev.currentTarget;
        // 标记是否展开，没有样式
        let mark = 'unfold';
        let itemClassList = $item.classList;
        let originHeight = 20;
        // 10为.children margin-top的值
        let realHeight = 10 + originHeight + $item
            .querySelector('.children')
            .getBoundingClientRect()
            .height;

        if (itemClassList.contains(mark)) {
            itemClassList.remove(mark);
            $item.style.height = originHeight + 'px';
        }
        else {
            itemClassList.add(mark);
            $item.style.height = realHeight + 'px';
        }
    }

    createChildNodes(item, index) {
        return (
            <li key={index + item.name}>
                <Link to={item.url}>
                    {item.name}
                </Link>
            </li>
        );
    }

    createItem(item, index) {
        let $item;

        switch (item.type) {
            // 指向内部路由的链接
            case 0:
                $item = this.createInnerLink(item, index);
                break;
            // 指向外部路由的链接
            case 1:
                $item = this.createOuterLink(item, index);        
                break;
            // 带有子节点的链接
            case 2:
                $item = this.createLinkWithChildren(item, index);
                break;
        }

        return $item;
    }

    render() {
        const { navItem } = this.props;

        return (
            <nav className='nav'>
                {navItem.map(this.createItem.bind(this))}
            </nav>
        );
    }
}

export default Navbar;
