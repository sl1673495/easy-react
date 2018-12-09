export function setAttribute(dom, name, value) {
    // 如果属性名是className，则改回class
    if (name === 'className') name = 'class'

    // 如果属性名是onXXX，则是一个事件监听方法
    if (/on\w+/.test(name)) {
        name = name.toLowerCase()
        dom[name] = value || ''
    } else if (name === 'style') {
        // 如果属性名是style，则更新style对象
        if (!value || typeof value === 'string') {
            dom.style.cssText = value || ''
        } else if (value && typeof value === 'object') {
            for (let name in value) {
                dom.style[name] = typeof value[name] === 'number' ? value[name] + 'px' : value[name]
            }
        }
    } else {
        if (name in dom) {
            dom[name] = value || ''
        }
        if (value) {
            dom.setAttribute(name, value)
        } else {
            dom.removeAttribute(name)
        }
    }
}

export function removeNode(dom) {
    if (dom && dom.parentNode) {
        dom.parentNode.removeChild(dom)
    }
}


export function isSameNodeType( dom, vnode ) {
    if ( typeof vnode === 'string' || typeof vnode === 'number' ) {
        return dom.nodeType === 3
    }

    if ( typeof vnode.tag === 'string' ) {
        return dom.nodeName.toLowerCase() === vnode.tag.toLowerCase()
    }

    return dom && dom._component && dom._component.constructor === vnode.tag
}