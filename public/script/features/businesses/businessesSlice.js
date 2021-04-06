const initialState = [];

export default function businessesReducer(state = initialState, action)
{
    switch (action.type)
    {
        case 'businesses/changed':
            return action.payload;

        default:
            return state
    }
}