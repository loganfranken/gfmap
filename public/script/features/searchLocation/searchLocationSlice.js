const initialState = {
    lat: null,
    lon: null,
    locationQuery: ''
}

export default function searchLocationReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'searchLocation/queryChanged':
            return {
                ...state,
                locationQuery: action.payload
            }

        case 'searchLocation/coordinatesChanged':
            return {
                ...state,
                lat: action.payload.lat,
                lon: action.payload.lon
            }

        default:
            return state
    }
}