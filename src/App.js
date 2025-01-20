import './App.css';
import './components/Form/PopUp_Form.css';
import React from 'react'
import { FaSearch } from 'react-icons/fa';
import PopUp_Form from './components/Form/PopUp_Form';
import { TodoData } from './components/CRUD/Get_all';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data:'',
      showForm:false,
      isEditing:false,
      editTask:null,
      listdata:[],
      searchWord:'',
      work:'',
      selectedstatus:[],
    }
  }
  componentDidMount(){
        axios.get("http://localhost:3000/tasks")
        .then(response=>{
            console.log(response.data);
            this.setState({listdata:response.data,isLoading:false})
        })
        .catch(error=>{
            console.log(error)
            this.setState({isLoading:false,error})
        })
    }
    handleDelete=(id)=>{
      axios.delete(`http://localhost:3000/tasks/${id}`)
      .then(()=>{
          this.setState((prevState)=>({
              listdata:prevState.listdata.filter((task)=>task.id!==id)
          }))
      }).catch(error=>{
        console.log(error)
        this.setState("Error in Deleteing item",error)
      })
      }
      handleEdit=(id)=>{
        const taskToEdit=this.state.listdata.find((task)=>task.id===id)
        console.log("Task to Edit",taskToEdit)
        this.setState({isEditing:true,editTask:taskToEdit});
      }
      handleSaveEdit = (updatedTask) =>{
        this.setState((prevState) => ({
            listdata: prevState.listdata.map((task)=>
                task.id === updatedTask.id ? updatedTask:task
            ),
            isEditing: false,
            editTask: null,
        }));
    };
    handleCheckBoxStatus = (e) => {
      const { value, checked } = e.target;
      this.setState((prevState) => {
        const updatedStatus = checked
          ? [...prevState.selectedstatus, value] // Add the selected value
          : prevState.selectedstatus.filter((status) => status !== value); // Remove the deselected value
        console.log("UpdatedStatus",updatedStatus)
        return { selectedstatus: updatedStatus };
      });
    };
    
        
  handleClick=(()=>{
    this.setState((prevState)=> ({ showForm: !prevState.showForm }));  
  })
  handleChange=((e)=>{
    this.setState({searchWord:e.target.value})
  })
  updateList=((newTask)=>{
    this.setState((prevState)=>({listdata:[...prevState.listdata,newTask]}))
  })
  render(){
    const {showForm,listdata,searchWord,isEditing,editTask,work,selectedstatus}=this.state;

    const filterData = listdata.filter((task) => {
      const matchSearch = task && task.title.toLowerCase().includes(searchWord.toLowerCase());
      const matchWork = work ? task.work === work : true;
      const matchStatus = selectedstatus.length === 0 || selectedstatus.includes(task.optionVal);
    
      return matchSearch && matchWork && matchStatus;
    });

console.log("Filtered Data:", filterData);
    
    return (
      <div className="App">
        <div className='container'>
          <div className='left_side'>
            <hr/>
            <label className='choice'>Enter Your Choice:</label>
            <label className='personal_r1'>Personal  </label>

            <input type="radio" name="work" value="Personal" 
            className='rr1'
              onChange={e=>this.setState({work:e.target.value})}/>
              <span class="check"></span>  
              
              
            <label className='professional_r2'>Professional </label> 
            <input type="radio" name="work"  value="Professional" 
            className='rr2'
              onChange={e=>this.setState({work:e.target.value})}/>
              <span class="check"></span>  
              
            
            <hr/>
            <label className='filter'>Filter Based on Status:</label>

            <input type='checkbox' name='progress' value="In Progress" 
              onChange={this.handleCheckBoxStatus}/>
              <label>In Progress</label>
            <input type='checkbox' name='completed' value="Completed" 
              onChange={this.handleCheckBoxStatus}/>
              <label>Completed</label>
            <input type='checkbox' name='todo' value="To Do" 
              onChange={this.handleCheckBoxStatus}/>
              <label>To Do</label>
              
            
          </div>
          <div className='right_side'>
              <div className='input_wrapper'>
              <FaSearch className='search_icon'/>
                <input type="text"
                placeholder="Type to search..."
                value={searchWord}
                name="search"
                onChange={this.handleChange}/>

                {!showForm && (
                <button type='submit' className='addtask_btn' 
                onClick={this.handleClick}>+ New Task</button>
                )}
                
                {showForm && (
                  <div className='popup_container'>
                    <div className='popup_main_div'>
                        <PopUp_Form onClose={this.handleClick}
                                    updateList={this.updateList}/>
                    </div>  
                  </div>
                )}
              </div>
              {isEditing && (
                   <div className="popup_container">
                    <div className="popup_main_div">
                    <PopUp_Form
                        editTask={editTask}
                        onClose={() => this.setState({isEditing: false, editTask: null })}
                        onSaveEdit={this.handleSaveEdit}/>
                </div>
                </div>
              )}
                <div>
                  <TodoData listdata={filterData} 
                  handleDelete={this.handleDelete}
                  handleEdit={this.handleEdit}/>  
                </div>
                
            </div>
            
        </div>
      </div>
    );

  }

}
export default App;
