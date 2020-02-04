export class Router {
    currentUri: string
    routes: object[]
    constructor(...routes: object[]) {
        this.routes = routes
        this.currentUri = window.location.pathname
        this.update()
    }
    push (uri: string, params = '') {
        window.history.pushState(null ,null, uri)
        this.update()
    }
    update () {
        this.routes.forEach( route => {
            if (route.pathname === window.location.pathname) {
                console.log("render");
                route.render()
            }
            else {
                const page = new Page('404')
                page.render()
            }
        })
    }
}

export class Route {
    pathname: string
    component: object
    constructor(pathname, component) {
        this.pathname = pathname
        this.component = component
    }
    render() {
        this.component.render()
    }
}