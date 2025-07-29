const axios = require("axios");
const riderModel = require("../models/rider.model.js");

module.exports.getAddressCoordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${address}&key=${apiKey}`;
    // https://maps.gomaps.pro/maps/api/geocode/json?key=your api key from gomaps.pro
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const data = response.data;
            if (data.status === 'OK') {
                const location = data.results[0].geometry.location;
                return {
                    lat: location.lat,
                    lng: location.lng,
                };
            } else {
                throw new Error('Invalid address');
            }
        }
    } catch (error) {
        throw new Error('Error fetching coordinates from Google Maps API');
    }
};

module.exports.getDistanceTimeService = async (origin, destination) => {

    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${apiKey}`;
//    https://maps.gomaps.pro/maps/api/distancematrix/json?destinations=New York&origins=New Jercy&key=your api key from gomaps.pro
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const data = response.data;
            if (data.status === 'OK') {
                if(data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                    throw new Error('No results found');
                }
                const distance = data.rows[0].elements[0].distance.text
                const duration = data.rows[0].elements[0].duration.text
                console.log(distance,duration)
                return {
                    distance,
                    duration,
                };
            } else {
                throw new Error('Invalid origin or destination');
            }
        }
    } catch (error) {    
        throw new Error('Error fetching distance and duration from Google Maps API');
    }
};


module.exports.getAddressSuggestions = async (input) => {

    if (!input) {
        throw new Error('Query is required');
    }

    const apiKey = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${input}&key=${apiKey}`;
//    https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=New York&key=your api key from gomaps.pro
    try {
        const response = await axios.get(url);
        if (response.status === 200) {
            const data = response.data;
            if (data.status === 'OK') {
                const suggestions = data.predictions
                .map((prediction) => ({
                    prediction
                }));
                return suggestions;
            } else {
                throw new Error('Invalid address');
            }
        }
    } catch (error) {
        throw new Error('Error fetching suggestions from Google Maps API');
    }
};


module.exports.getRiderInTheRadiusService = async (latitude, longitude, radius) => {
    if (!latitude || !longitude) {
        throw new Error('Latitude and longitude are required');
    }
    const riders = await riderModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [
                    [longitude, latitude],
                    radius / 6371
                ]
            }
        }
    });
    return riders;
};