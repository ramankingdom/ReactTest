import { get, post, patch, put , deleteTodo } from '../Services';

const GetTodoList = (id, flag) => (dispatch, getState) => {
        return get('https://practiceapi.devmountain.com/api/tasks').then(res => {
        	let data = res.data;
        	if(flag) {
        		data = data.find((todo)=>todo.id==id)
        		dispatch({
		           	type: 'TODO_ITEM',
		           	todo: data
	           })
        	}
        	else{
        		dispatch({
		           	type: 'TODO_LIST',
		           	list: data
	           })
        	}	           
        })
}

const CreateTodo = (title)=> (dispatch) => {
	return post('https://practiceapi.devmountain.com/api/tasks', { title }).then((res)=>{
		dispatch({
           	type: 'TODO_LIST',
           	list: res.data
        })
	})
}


const UpdateTodo = (task)=> (dispatch) => {
	return patch('https://practiceapi.devmountain.com/api/tasks/'+task.id, { ...task }).then((res)=>{
		dispatch({
           	type: 'TODO_LIST',
           	todo: res.data.find((todo)=>todo.id==task.id)
        })
	})
}


const CompleteTodo = (id)=> (dispatch) => {
	return put('https://practiceapi.devmountain.com/api/tasks/'+id).then((res)=>{
		dispatch({
           	type: 'TODO_LIST',
           	todo: res.data.find((todo)=>todo.id==id)
        })
	})
}

const DeleteTodo = (id)=> (dispatch) => {
	return deleteTodo('https://practiceapi.devmountain.com/api/tasks/'+id)
}



export { GetTodoList, CreateTodo, UpdateTodo, CompleteTodo, DeleteTodo }