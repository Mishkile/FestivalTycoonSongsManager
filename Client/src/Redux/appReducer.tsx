const initialState = {
    isDocuments: false,
    documentsPath: '',
    songs: []
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
                songs: action.payload
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
