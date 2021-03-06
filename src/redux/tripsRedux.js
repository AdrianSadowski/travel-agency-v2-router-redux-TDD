/* SELECTORS */


export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // TODO - filter by duration
  if (filters.duration) {
    output = output.filter(trip => (trip.days <= filters.duration.to && trip.days >= filters.duration.from));
  }

  // TODO - filter by tags

  if (filters.tags) {
    output = output.filter(trip => filters.tags.every(tag => trip.tags.includes(tag)));
  }

  // TODO - sort by cost descending (most expensive goes first)
  output = output.sort((tripA, tripB) => {
    const [priceA, priceB] = [tripA, tripB].map((trip) =>
      Number(trip.cost.replace(/[^0-9.]+/g, ''))
    );

    if (priceA > priceB) {
      return -1;
    }
    if (priceA < priceB) {
      return 1;
    } else {
      return 0;
    }
  });

  return output;
};

export const getTripById = ({trips}, tripId) => {
  const filtered = trips.filter(trip => trip.id === tripId);

  // [DONE] TODO - filter trips by tripId

  console.log('filtering trips by tripId:', tripId, filtered);
  return filtered.length ? filtered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips.filter(trip => trip.country.code === countryCode);

  // [DONE] TODO - filter trips by countryCode

  console.log('filtering trips by countryCode:', countryCode, filtered);
  return filtered.length ? filtered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
