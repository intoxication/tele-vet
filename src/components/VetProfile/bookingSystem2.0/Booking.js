import ReactCardFlip from 'react-card-flip';
import DateFnsUtils from "@date-io/date-fns";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import React from "react";

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false ,
            selectedDate: "",
            selectedWeekday: []
            // mon: props.key1.monday,
            // tue: props.week.tuesday,
            // wed: props.week.wednesday,
            // thu: props.week.thursday,
            // fri: props.week.friday,
            // sat: props.week.saturday,
            // sun: props.week.sunday
        };
        // this.handleClick = this.handleClick.bind(this);
    }


    handleClick= (e) => {
        // e.preventDefault();
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
        this.setState({selectedDate: e})
        if ((String(e).substring(0,3)) === "Mon") {this.setState({selectedWeekday: this.props.key1[1]})}
        if ((String(e).substring(0,3)) === "Tue") {this.setState({selectedWeekday: this.props.key1[2]})}
        if ((String(e).substring(0,3)) === "Wed") {this.setState({selectedWeekday: this.props.key1[3]})}
        if ((String(e).substring(0,3)) === "Thu") {this.setState({selectedWeekday: this.props.key1[4]})}
        if ((String(e).substring(0,3)) === "Fri") {this.setState({selectedWeekday: this.props.key1[5]})}
        if ((String(e).substring(0,3)) === "Sat") {this.setState({selectedWeekday: this.props.key1[6]})}
        if ((String(e).substring(0,3)) === "Sun") {this.setState({selectedWeekday: this.props.key1[7]})}
        // console.log(this.props.key1)
    }

    handleTimeSelection(e, item){
        // e.preventDefault();
        // console.log(this.selectedDate + item)
        //Here you must pass props.key0 and props.key2
    }

    render() {
        return (
            <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker style={{textAlign: 'center'}}
                        autoOk
                        // orientation="landscape"
                        variant="static"
                        openTo="date"
                        value={this.selectedDate}
                        onChange={(e) => {this.handleClick(e)}}
                    />
                </MuiPickersUtilsProvider>

                <div className="timeMenu">
                    <button className="timeMenu" onClick={this.handleClick}>Return</button>
                    <ul className="timeMenu">
                        {this.state.selectedWeekday.map(item => (
                            <button className="timeMenu" onClick={(e,item) => this.handleTimeSelection(e, item)}>{item}</button>
                            //https://dev.to/skptricks/create-simple-popup-example-in-react-application-5g7f
                        ))}
                    </ul>
                </div>
            </ReactCardFlip>
        )
    }
}

export default Booking