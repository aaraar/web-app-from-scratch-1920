export class Page {
    markup: string
    app: HTMLElement
    constructor(markup) {
        this.app = document.getElementById('app')
        this.markup = markup.trim()
    }
    destroy() {
        while (this.app.firstChild) this.app.removeChild(this.app.firstChild);
    }
    render(){
        this.destroy()
        this.app.insertAdjacentHTML('afterbegin', this.markup)
    }
}
