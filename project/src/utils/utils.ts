import { ArrayOffers, Offer } from '../types/types';

function filtredOffersByCity(offers: ArrayOffers, filter: string) {
  const filtredData = offers.filter((elem) => elem.city.name === filter);
  return filtredData;
}

function sortByLowToHigh(offers: ArrayOffers) {
  const sortedData = offers.sort((a, b) => a.price - b.price);

  return sortedData;
}

function sortByHighToLow(offers: ArrayOffers) {
  const sortedData = offers.sort((a, b) => b.price - a.price);

  return sortedData;
}

function sortByRate(offers: ArrayOffers) {
  const sortedData = offers.sort((a, b) => b.rating - a.rating);

  return sortedData;
}

function deleteFavoriteOffer(favoritesOffers: ArrayOffers, favoriteItem: Offer) {
  return favoritesOffers.filter((offer) => offer.id !== favoriteItem.id);
}

function arrayRandElement(array: string[]) {
  const rand = Math.floor(Math.random() * array.length);
  return array[rand];
}

export { filtredOffersByCity, sortByLowToHigh, sortByHighToLow, sortByRate, deleteFavoriteOffer, arrayRandElement };
