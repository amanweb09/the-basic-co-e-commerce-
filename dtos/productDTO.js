class ProductDTO {

    constructor(product) {
        this._id = product._id.toString();
        this.title = product.title;
        this.price = product.price;
        this.desc = product.desc;
        this.category = product.category.title;
        this.subCategory = product.subCategory.title;
        this.images = product.images;
        this.variants = product.variants;
        this.tags = product.tags;
        this.availability = product.availability;
        this.season = product.season;
    }

}

module.exports = ProductDTO