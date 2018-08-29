import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { GetTodoList, CreateTodo, UpdateTodo, CompleteTodo, DeleteTodo } from './Actions'

export class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todo: {},
      prevState: {}
    }  
    this.complete = this.complete.bind(this)     
  }
  componentDidMount() {
    this.props.getTodoList(this.props.match.params.topicId,true)
  }

  componentWillReceiveProps (next) {
    this.setState({
      todo: next.todo,
      prevState: next.todo
    })
  }
  complete(flag, status) {
    const todo = {...this.state.todo}
    if(flag) { 
      todo['completed'] = true;
    }
    if(this.state.todo.title) {
      this.props.updateTodo(todo).then(()=>{
        this.setState({
          todo,
          prevState: todo
        })
        if(status == 'save') this.navigate()
      })
    }
    else {
       alert('Please enter a todo item!')
    }
  }
  handleChange(e, field) {
    const todo = {...this.state.todo}
    todo[field] = e.target.value;
    this.setState({
      todo
    })
  }
  delete() {
    this.props.deleteTodo(this.state.todo.id).then(()=>{
      this.navigate()
    })
  }
  cancel() {
    this.setState({ todo: this.state.prevState })
  }
  navigate() {
    this.props.history.push('/')
  }
  render() {
    const styles = {};
    if(this.state.todo.completed) { styles.disabled = true; }
    const { history } = this.props
    return(<div>
      <p onClick={()=> this.navigate() }>Back to Search Results </p>
      Task:  <input type="text" value={this.state.todo.title} onChange={(e)=> this.handleChange(e,'title')} /> <button {...styles}  onClick={()=>this.complete(true)}>Complete</button> <br/>
      Description: <input type="text" onChange={(e)=> this.handleChange(e,'description')}  value={this.state.todo.description}/> <br/>
      <button onClick={(e)=>{this.complete(false, 'save')}}>Save</button>
      <button onClick={(e)=>{this.cancel()}}>Cancel</button>
      <button onClick={(e)=>{this.delete()}}>Delete</button>
      </div>)
  }
}


function mapStateToProps(state, ownProps) {
  return {
    todo: state.todos.todo
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getTodoList:GetTodoList,
    updateTodo: UpdateTodo,
    completeTodo: CompleteTodo,
    deleteTodo:DeleteTodo,
  }, dispatch)
  )

export default connect(mapStateToProps, mapDispatchToProps)(TodoItem);