/*
 * Created with https://medium.com/javascript-by-doing/create-a-modern-javascript-router-805fc14d084d
 * Edited for typescript to increase comprehension
 * Check sourcecode at https://github.com/javascript-by-doing/create-a-modern-javascript-router
 */

import Timeout = NodeJS.Timeout

export interface Route {
    path: RegExp | '',
    callback: any
}

export class Router {
    currentUri: string
    routes: Route[]
    interval: Timeout

    constructor(...routes: Route[]) {
        this.routes = routes
        this.listen()
    }

    add(path, callback) {
        this.routes.push({path, callback})
    }

    remove(path) {
        this.routes.forEach((route, index) => {
            if (route.path === path) {
                this.routes.slice(index, 1)
                return this
            }
            return this
        })
    }

    flush() {
        this.routes = []
    }

    clearSlashes = path => path.toString().replace(/\/$/, '').replace(/^\//, '')

    getEndpoint(url: string = window.location.href) {
        let endpoint = ''
        const match = url.match(/#(.*)$/)
        endpoint = match ? match[1] : ''
        return this.clearSlashes(endpoint)
    }

    navigate(path = '') {
        window.location.href = `${window.location.href.replace(/#(.*)$/, '')}#${path}`
        return this
    }

    listen() {
        clearInterval(this.interval)
        // @ts-ignore
        this.interval = setInterval(this.checkRoute, 50)
    }

    checkRoute = () => {
        if (this.currentUri === this.getEndpoint()) return
        this.currentUri = this.getEndpoint()

        this.routes.some( route => {
            const match = this.currentUri.match(route.path)
            if (match) {
                match.shift()
                route.callback.apply({}, match)
                return match
            }
            return false
        })
    }
}