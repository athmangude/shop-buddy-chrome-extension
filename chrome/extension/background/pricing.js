function getPricing(batch, exchangeRate) {
  const pricedItems = batch.map((item, i) => {
    let volumetricWeight = getVolumetricWeight(item);
    item.pricing = {
      volumetricWeight: volumetricWeight,
    }

    if (item.rawPrice >= 0 && item.rawPrice < 100) {
      item.pricing.totalCost = ((volumetricWeight * 10) + (item.rawPrice)) * 1.27;
      item.pricing.convertedTotalCost = item.pricing.totalCost * exchangeRate;
    } else if (item.rawPrice >= 100 && item.rawPrice < 250) {
      item.pricing.totalCost = ((volumetricWeight * 10) + (item.rawPrice)) * 1.22;
      item.pricing.convertedTotalCost = item.pricing.totalCost * exchangeRate;
    } else if (item.rawPrice >= 250 && item.rawPrice < 500) {
      item.pricing.totalCost = ((volumetricWeight * 10) + (item.rawPrice)) * 1.17;
      item.pricing.convertedTotalCost = item.pricing.totalCost * exchangeRate;
    } else if (item.rawPrice >= 500 && item.rawPrice < 700) {
      item.pricing.totalCost = ((volumetricWeight * 10) + (item.rawPrice)) * 1.12;
      item.pricing.convertedTotalCost = item.pricing.totalCost * exchangeRate;
    } else if (item.rawPrice > 700) {
      item.pricing.totalCost = ((volumetricWeight * 10) + (item.rawPrice)) * 1.07;
      item.pricing.convertedTotalCost = item.pricing.totalCost * exchangeRate;
    }

    return item;
  });

  return pricedItems;
}

function getVolumetricWeight(item) {
  if (item.ItemAttributes.PackageDimensions) {
    const packageDimensions = item.ItemAttributes.PackageDimensions;
    const height = (Number(packageDimensions.Height.value) / 100) * 2.54;
    const width = (Number(packageDimensions.Width.value) / 100) * 2.54;
    const length = (Number(packageDimensions.Length.value) / 100) * 2.54;

    const volumetricWeight = (length * width * height) / 6000; // (Kgs)
    const packageWeight = item.ItemAttributes.PackageDimensions.Weight.value * 0.001 * 0.453592; // (Kgs)

    if (packageWeight > volumetricWeight) {
      // if the package weight is greater than volumtric weight, use package weight
      return Math.ceil(packageWeight) < 1 ? 1 : Math.ceil(volumetricWeight);
    }

    return Math.ceil(volumetricWeight) < 1 ? 1 : Math.ceil(volumetricWeight);
  } else {
    return 0;
  }
}

module.exports = getPricing;
