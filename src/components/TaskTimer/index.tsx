import {Component} from 'react';
import './style.css';


interface TaskTimerInterface {
    timeSeconds: number,
    onTimerExpire: () => void
}


export default class TaskTimer extends Component<TaskTimerInterface> {

    x = 1;


    state = {
        time_left: this.props.timeSeconds,
    }



    private timeFormatter = (timeSeconds: number) => {
        const prependOptionalZero = (value: number) => {
            if (value < 10) {
                return '0' + value.toString()
            }
            return value.toString()
        }
        const seconds = timeSeconds % 60;
        const minutes = Math.round((timeSeconds - seconds) / 60)
        return `${prependOptionalZero(minutes)}:${prependOptionalZero(seconds)}`
    }

    
    componentDidMount() {
        setInterval(() => {
          const state = this.state;
          if (state.time_left > 0) {
            this.setState({ time_left: state.time_left - 1 });
          }
          else {
            this.props.onTimerExpire()
          }
          
        }, 1000);
    }
    
    render() {
        return (
            <div className='TaskTimer'>
                {this.timeFormatter(this.state.time_left)}
            </div>
        );
    }

}

