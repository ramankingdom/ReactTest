import * as TodoActions from '../constants/todoConstants';
const initialState = {
    list: [],
    todo: {}
};

const todo = (state =initialState , action) => {

    switch (action.type) {

        case 'TODO_LIST':
            {
                return {
                    ...state,
                    list: action.list
                }
            }
        case 'TODO_ITEM' : {
            return {
                ...state,
                todo: action.todo
            }
        }


        default:
            {
                return state;
            }
    }
}

export default todo;