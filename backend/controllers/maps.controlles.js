const {getAddressCoordinates,getDistanceTimeService, getAddressSuggestions} = require("../services/maps.service.js");
const {validationResult} = require("express-validator");
const getCoordinates = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {address} = req.query;
    try {
        const coordinates = await getAddressCoordinates(address);
        res.status(200).json({coordinates});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

const getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {origin, destination} = req.query;
    
    try {
        const distanceTime = await getDistanceTimeService(origin, destination);
        res.status(200).json({distanceTime});
    } catch (error) {
        console.log("iternernal error", error);
        res.status(500).json({error: error.message});
    }
};


const getSuggestions = async (req, res, next) => {
    const {input} = req.query;
    try {
        const suggestions = await getAddressSuggestions(input);
        res.status(200).json({suggestions});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = {
    getCoordinates,
    getDistanceTime,
    getSuggestions
};