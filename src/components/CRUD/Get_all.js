import axios from 'axios';
import React from 'react';
import './Get_all.css'
import delete_1 from './delete_1.png';
import update from './square.png';
import Timer from './Timer.js';
import { SketchPicker } from 'react-color';

export class TodoData extends React.Component{

    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            colors:{},
            showPickerId:null,
        }
    }
    handleChange=(color,id)=>{
        this.setState((prevState)=>({
            colors:{...prevState.colors,[id]:color.hex
            }
        }))

    }
    pickerToggle=(id)=>{
        this.setState((prevState)=>({
            showPickerId:prevState.showPickerId===id?null:id
        }))
    }
    render(){
        
        const {isLoading,currentColor,showPickerId,colors}=this.state;
        const {listdata}=this.props;
        // const appStyle={
        //     backgroundColor:currentColor ||"lightgreen"
        
        // }
        if (isLoading) {
            return <p>Loading...</p>;
          }
        return(
            
            <div>
                    <ul className='ul_main'>
                    {listdata.length>0? 
                    listdata.map((item)=>(
                        
                        <li key={item.id} className='listitem'style={{backgroundColor: colors[item.id] || 'azure' }}>
                            <div>
                        <div
                            style={{

                                display:'inline-block',
                                width:'26px',
                                height:'26px',
                                backgroundColor:colors[item.id] || 'yellow',
                                cursor:'pointer',
                                border:'1px solid black',
                                marginLeft:'50rem',
                                borderRadius:'14px'
                            
                            }}
                            onClick={()=>this.pickerToggle(item.id)}
                            ></div>
                    </div>
                    
                            {showPickerId === item.id &&(
                        <div style={{ marginLeft:'42rem',position: 'absolute', zIndex: 2}}>
                            <SketchPicker styles={{marginLeft:'100px'}}
                            color={colors[item.id] || 'white'}
                            onChangeComplete={(color)=>this.handleChange(color,item.id)}/>
                    </div>
                    )}
                            <li>
                            <label>Title: </label>{item.title}</li>
                            <li>
                            <label>Description: </label>{item.description}</li>
                            <li>
                            <label>Work Type: </label>{item.work}</li>
                            <li styles={{color:"green"}}>
                            <label>Status : </label>
                            <span style={{color:item.optionVal==="Completed"
                                ?"Green" 
                                :item.optionVal==="In Progress"?"blue"
                                :"Red" }}> {item.optionVal} </span></li>
                            <li >
                            <label>Time Period: </label>{item.starttime ? item.starttime: 
                                <span> Not Defined</span> }</li>
                            <img src={update} alt="update"className='update' 
                            onClick={()=>this.props.handleEdit(item.id)}/>
                            <img src={delete_1} alt="delete" className='delete' 
                            onClick={()=>this.props.handleDelete(item.id)}/>
                            {item.starttime ? (<Timer starttime={item.starttime} className="display_time"/>):null}
                        </li>    
                    )):(
                        <div>No data Found</div>
                    )}    
                    </ul>
                    
                    
            </div>
        )
    }
}