module.exports = class Product {
    constructor(args) {
        args = [...arguments];
        this.name = args.name || args[0];
        this.name = String(this.name).replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
        this.path = args.path || args[1] || undefined;
        this.price = args.price || args[2] || undefined;
        this.description = args.description || args[3] || undefined;
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
};