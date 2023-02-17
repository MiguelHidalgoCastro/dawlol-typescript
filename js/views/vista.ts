export class Vista {
    public div: HTMLDivElement

    constructor(div: HTMLDivElement) {
        this.div = div;
    }

    mostrar(ver: boolean): void {
        if (ver)
            this.div.style.display = 'block'
        else
            this.div.style.display = 'none'
    }
}