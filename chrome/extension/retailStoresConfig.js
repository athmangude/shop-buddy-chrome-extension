const storesConfig = [
    {
        host: 'www.amazon.com',
        cartPage: 'https://www.amazon.com/gp/cart/view.html',
        cartContainer: 'form#activeCartViewForm > div.sc-list-body',
        cartItem: 'div.sc-list-item',
        imageNode: 'img.sc-product-image',
        productTitle: 'span.a-size-medium.sc-product-title.a-text-bold',
        productLink: 'a.a-link-normal.sc-product-link'
    }
]

export const getStoreConfig = (host) => {
    for (var storeConfig of storesConfig) {
        if (storeConfig.host.match(host)) {
            return storeConfig;
        }
    }
}
