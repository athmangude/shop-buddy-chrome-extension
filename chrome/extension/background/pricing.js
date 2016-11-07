function getPricing(batch, exchangeRate) {
  const pricedItems = batch.map((item, i) => {
    let volumetricWeight = getVolumetricWeight(item);
    item.pricing = {
      volumetricWeight: volumetricWeight,
    }

    if (item.rawPrice >= 0 && item.rawPrice < 100) {
      item.pricing.totalCost = ((volumetricWeight * 10) + (item.rawPrice)) * 1.3;
      item.pricing.convertedTotalCost = item.pricing.totalCost * exchangeRate;
    } else if (item.rawPrice >= 100 && item.rawPrice < 250) {
      item.pricing.totalCost = ((volumetricWeight * 10) + (item.rawPrice)) * 1.25;
      item.pricing.convertedTotalCost = item.pricing.totalCost * exchangeRate;
    } else if (item.rawPrice >= 250 && item.rawPrice < 500) {
      item.pricing.totalCost = ((volumetricWeight * 10) + (item.rawPrice)) * 1.2;
      item.pricing.convertedTotalCost = item.pricing.totalCost * exchangeRate;
    } else if (item.rawPrice >= 500 && item.rawPrice < 700) {
      item.pricing.totalCost = ((volumetricWeight * 10) + (item.rawPrice)) * 1.15;
      item.pricing.convertedTotalCost = item.pricing.totalCost * exchangeRate;
    } else if (item.rawPrice > 700) {
      item.pricing.totalCost = ((volumetricWeight * 10) + (item.rawPrice)) * 1.10;
      item.pricing.convertedTotalCost = item.pricing.totalCost * exchangeRate;
    }

    return item;
  });

  return pricedItems;
}

function getVolumetricWeight(item) {
  // DHL vw = l X w X h / 5000 (kg) // rounded up to the nearest 0.5 kg
  const packageDimensions = item.ItemAttributes.PackageDimensions;
  const height = (Number(packageDimensions.Height.value) / 100) * 2.54;
  const width = (Number(packageDimensions.Width.value) / 100) * 2.54;
  const length = (Number(packageDimensions.Length.value) / 100) * 2.54;

  return (length * width * height) / 5000
}

module.exports = getPricing;
