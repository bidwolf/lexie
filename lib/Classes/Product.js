class Product {
    constructor(name, path, price, description) {

        this.name = name.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        this.path = path || undefined;
        this.price = price || undefined;
        this.description = description || undefined;
    }
    getDescription() {
        if (this.description) return this.description;

        else return 'O produto consultado se chama: ' + this.name +
            ' custa um total de :' + this.price +
            '\n Para mais informações acesse: ' + this.path;
    }
    setDescription(description) {
        this.description = description;
    }
}