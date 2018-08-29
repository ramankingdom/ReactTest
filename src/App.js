import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { GetTodoList, CreateTodo } from './Actions'

export class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTodo: ''
    } 
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getTodoList()
  }
  handleChange(e) {
    this.setState({
      newTodo: e.target.value
    });
  }
  
  addTodo() {
    if(this.state.newTodo) {
      this.props.createTodo(this.state.newTodo).then(()=>{
        this.setState({
          newTodo: ''
        });
      })
    }
    else{
      alert('Please enter a todo item!')
    }
  }
  render() {
    const { todos=[], history } = this.props;
    return (
      <div className="todo-container">
      <h1>TO-DO:</h1>
      <input
      className="new-todo"
      placeholder="Enter a todo Item"
      value={this.state.newTodo}
      onChange={(e)=> this.handleChange(e) }
      autoFocus={true}
      /><br/><br/>
      <button onClick={()=> { this.addTodo() }} > Add a new todo </button>
      <table>
      <tbody>
      { todos.map((todo, index)=>{
        return (<tr key={index} onClick={()=>{history.push(`/todo/${todo.id}`)}}>
        <td>
        <span>{todo.title}</span> 
        <button>Complete</button>
        <span>X</span>
        </td>
        </tr>)
      })
    }
    </tbody>
    </table>
    </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    todos: state.todos.list
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getTodoList:GetTodoList,
    createTodo: CreateTodo
  }, dispatch)
  )

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);