import { getStoreConfig } from './retailStoresConfig';

export const scrapStoreCheckoutPage = (host) => {
    let cartItems = [];
    let storeConfig = getStoreConfig(host);
    let cartItemNodes = $(storeConfig.cartContainer).find(storeConfig.cartItem);

    for (var cartItemNode of cartItemNodes) {
        let cartItem = {
            price: cartItemNode.dataset.price,
            quantity: cartItemNode.dataset.quantity,
            price: cartItemNode.dataset.price,
            asin: cartItemNode.dataset.asin,
            outOfStock: cartItemNode.dataset.outofstock,
            imageUrl: $(cartItemNode).find(storeConfig.imageNode).attr('src'),
            title: $(cartItemNode).find(storeConfig.productTitle).text().replace(/(\r\n|\n|\r)/gm,""),
        }

        cartItems.push(cartItem);
    }

    return cartItems;
}
