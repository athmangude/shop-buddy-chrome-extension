import { getStoreConfig } from './retailStoresConfig';

export const scrapStoreCheckoutPage = (host, exchangeRate) => {
    let cartItems = [];
    let storeConfig = getStoreConfig(host);
    let cartItemNodes = $(storeConfig.cartContainer).find(storeConfig.cartItem);

    let convertedPrice, cartItem;
    for (var cartItemNode of cartItemNodes) {
        cartItem = {
            title: $(cartItemNode).find(storeConfig.productTitle).text().replace(/(\r\n|\n|\r)/gm,""),
            productLink: `https://www.amazon.com${$(cartItemNode).find(storeConfig.productLink).attr('href')}`,
            price: exchangeRate * parseFloat(cartItemNode.dataset.price),
            rawPrice: parseFloat(cartItemNode.dataset.price),
            quantity: cartItemNode.dataset.quantity,
            asin: cartItemNode.dataset.asin,
            outOfStock: cartItemNode.dataset.outofstock,
            imageUrl: $(cartItemNode).find(storeConfig.imageNode).attr('src'),
        }

        cartItems.push(cartItem);
    }

    return cartItems;
}
