const initialState = {
    isDocuments: false,
    documentsPath: '',
    songs: [],
    songsCopy: []
}
// Remove the import statement for Action

export default function appReducer(state = initialState, action : any) {
    switch (action.type) {
        case 'SET_DOCUMENTS':
            return {
                ...state,
                isDocuments: action.payload
            }
        case 'SET_SONGS':
            return {
                ...state,
                songs: action.payload,
                songsCopy: action.extra
            }
        case 'SET_DOCUMENTS_PATH':
            return {
                ...state,
                isDocuments: true,
                documentsPath: action.payload
            }
        default:
            return state
    }
}
