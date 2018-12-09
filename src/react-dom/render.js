import { setAttribute } from "./dom";
import { diff, createComponent, setComponentProps } from './diff'
import Component from "../react/component";

function render(vnode, container) {
    return container.appendChild(_render(vnode));
}

function _render(vnode) {
    if (vnode === undefined
        || vnode === null
        || typeof vnode === 'boolean') {
        vnode = ''
    }
    if (typeof vnode === 'number') {
        vnode = String(vnode)
    }
    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode)
        return textNode
    }
    if (typeof vnode.tag === 'function') {
        const component = createComponent(vnode.tag, vnode.attrs)
        setComponentProps(component, vnode.attrs)
        return component.base
    }

    const dom = document.createElement(vnode.tag)
    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key]
            setAttribute(dom, key, value)
        })
    }

    vnode.children.forEach(child => render(child, dom))
    return dom
}

function render( vnode, container, dom ) {
    return diff( dom, vnode, container );
}

export default render;