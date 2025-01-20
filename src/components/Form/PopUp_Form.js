import React, { Component } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export default class PopUp_Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            description:'',
            work:'',
            optionVal:'',
            starttime:'',
        }
    }
    handleChange =(e) => {
        const {name,value}=e.target;
        this.setState({ [name]: value });
    }
    componentDidMount(){
        if(this.props.editTask){
            this.setState({
                title:this.props.editTask.title,
                description:this.props.editTask.description,
                work: this.props.editTask.work,
                optionVal: this.props.editTask.optionVal,
                starttime: this.props.editTask.starttime,
            })
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.editTask !== this.props.editTask && this.props.editTask) {
            this.setState({
                title: this.props.editTask.title,
                description: this.props.editTask.description,
                work: this.props.editTask.work,
                optionVal: this.props.editTask.optionVal,
                starttime: this.props.editTask.starttime,
            });
        }
    }
    
    handleFormSubmit = (e) => {
        e.preventDefault();
        const { title, description, work,optionVal, starttime } = this.state;
        const formData = {
            title,
            description,
            work,
            optionVal,
            starttime,
           
        };
        
        if (this.props.editTask) {
           
            axios.patch(`http://localhost:3000/tasks/${this.props.editTask.id}`,formData)
                .then((response) => {
                    this.props.onSaveEdit(response.data);
                    this.props.onClose();
                })
                .catch((error) => console.error(error));
        } else {

            axios.post('http://localhost:3000/tasks',formData)
                .then((response) => {
                    this.props.updateList(response.data);
                    this.props.onClose();
                })
                .catch((error) => console.error(error));
        }
    };
    
    
    handleOption = (e) => {
        this.setState({optionVal: e.target.value });
    }
    render(){

        const {title,description,optionVal,starttime}=this.state;
        const {onClose}= this.props;
        const notify=()=>toast("Data Added Successfully!")
        const alertFillForm=()=>toast("Fill all the Fields before Saving")
        return(
            <div className='form_body'>
                <form onSubmit={this.handleFormSubmit}>
                    <button className='close_button' onClick={onClose}>
                        &times;
                    </button>
                    <label>Enter Title</label>
                    <br/>
                    <input type='text'
                        className='title'
                        name="title"
                        placeholder='Enter Title'
                        value={this.state.title} 
                        onChange={this.handleChange}/>
                    <br />
                    <label>Enter Description</label>
                    <br/>
                    <textarea width={800} height={500}
                        className='desc'
                        placeholder='Enter Description'
                        name='description'
                        value={description}
                        onChange={this.handleChange} />
                    <br />
                    <label>Work Type</label>
                    <div className="radio-group">
                    <input type="radio" 
                            className='r1_bn'
                            name="work" 
                            value="Personal" 
                            onChange={e=>this.setState({work:e.target.value})}/>Personal
                    <input type="radio" 
                            className='r2_btn'
                            name="work" 
                            value="Professional" 
                            onChange={e=>this.setState({work:e.target.value})}/>Professional
                    </div>        
                    <br/>
                    <br/>
                    <label>Status </label>
                    <select className='selection' value={optionVal} onChange={this.handleOption}>
                        <option value="" disabled></option>
                        <option name="In Progress">In Progress</option>
                        <option name="Completed">Completed</option>
                        <option name="To Do">To Do</option>
                    </select>
                    <br/>
                    <br/>
                    <hr/>
                    <label>If you want to Set Timer for Task (Optional)</label>
                    <br/>
                    <br />
                    <label>Enter Time You want to spend in doing task:-</label>
                    <input type="time" name="starttime"
                        className='start_time'
                        value={starttime} min="00:00" max="24:00"
                        onChange={this.handleChange}/>
                    <br/>    
                    <hr/>   
                    <button type='submit' 
                        value="Save" 
                        className='save'>
                        Save</button>
                    <button type="button" value="Cancel" 
                        className='cancel' 
                        onClick={this.props.onClose}>Cancel</button>
                </form>
                <ToastContainer/>
            </div>
        )
    }
}



