import { MdTimer } from "react-icons/md";
import React from 'react';

export default class Timer extends React.Component {
    constructor(props) {
        super(props);
        const totalSeconds= this.convertToSeconds(this.props.starttime);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes =Math.floor(totalSeconds % 3600 / 60);
        const seconds=totalSeconds%60;
        this.state = {
            isRunning: false,
            hours,
            minutes,
            seconds,
        };
        this.timerId = null;
    }

    componentWillUnmount() {
        this.clearTimeout();
    }

    convertToSeconds = (timer) => {
        if (!timer || !timer.includes(':')) {
            return 0; 
        }
        const [hours, minutes ,seconds] = timer.split(':').map(Number);
        return (hours || 0) * 3600 + (minutes || 0) * 60 +(seconds || 0);
    };

    countdown = () => {
        const { hours, minutes,seconds} = this.state;
        if (hours === 0 && minutes === 0 && seconds===0) {
            alert("Provide Valid Time");
            return;
        }
        this.setState({ isRunning: true });
        this.timerId = setInterval(() => {
            this.setState((prevState) => {
                let { hours, minutes,seconds } = prevState;
                if(seconds>0){
                    return {seconds:seconds-1}
                }
                else if(minutes > 0) {
                    minutes -= 1;
                    seconds = 59;
                } else if (hours > 0) {
                    hours -= 1;
                    minutes = 59;
                    seconds = 59;
                } else {
                    this.clearTimeout();
                    alert("Time is over");
                    return { isRunning: false }; 
                }
                return { hours, minutes, seconds };    
            });
        }, 1000);
    };

    clearTimeout = () => {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        this.setState({ isRunning: false });
    };
    render(){
        
        const {hours,minutes,seconds,isRunning}=this.state;
        const {starttime}=this.props;
        return(
            
            <div>
                <div className="wrapper_timer">
                <MdTimer className="timer_icon"/>
               <span className="timer_digit">{hours.toString().padStart(2,'0')}:
                {minutes.toString().padStart(2,'0')}:
                {seconds.toString().padStart(2,'0')}
                </span>
                </div>
                
                <button className='starttimer_btn'
                onClick={this.countdown}
                disabled={isRunning}> Start</button>

                <button className='stoptimer_btn' onClick={this.clearTimeout}>Stop</button>
            </div>
        )
        
    }
}
