import React, { Component } from "react";
import Calendar from 'react-calendar';
import "./Display.css";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

export default class Display extends Component {
  constructor(props) {
    super(props);
      this.state = {
        value: null,
        enterNotes: false,
        notes: [],
        title: "",
        description: "",
        finalDate: "",
        required: true,
        ErrorMessage: "",
        editItem: ""
      };
  };

  onChange = (value) => {
    this.setState({
      value: value
    }, ()=> {
      let value= this.state.value.toString();
      let finalDate = value.slice(4,15);
      this.setState ({
        finalDate: finalDate,
        enterNotes: true
      });
    });
  };

  saveNote = async (item) => {
    if (item.title === "") {
      this.setState({
        ErrorMessage: "Title is Required."
      });
      setTimeout(function(){
        this.setState({ErrorMessage: ""});
      }.bind(this),1000);
    } else {
      await this.setState({
        notes: [...this.state.notes, item]
      }, ()=> {
        this.setState({
          value: null,
          title: "",
          description: "",
          enterNotes: false,
          finalDate: "",
          editItem: ""
        });
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
      });
    }  
  }; 

  titleChangeHandler = event => {
    let title = event.target.value;
    this.setState({ title: title });
  }

  descriptionChangeHandler = event => {
    let desc = event.target.value;
    this.setState({ description: desc });
  }

  async componentDidMount(){
    if (localStorage.getItem("notes")) {
      this.setState({
        notes: JSON.parse(localStorage.getItem("notes"))
      });
    } 
  }

  deleteEvent = (item) => {
    let arr = this.state.notes.filter(x => x !== item);
    this.setState({
      notes: arr 
    }, ()=> {
      localStorage.setItem("notes", JSON.stringify(this.state.notes));
    });
  };

  editEvent = (item) => {
    this.setState({
      editItem: item
    });
  };

  cancel = () => {
    this.setState({
      editItem: ""
    });
  }

  editNote = async (item) => {
    if (item.title === "") {
      this.setState({
        ErrorMessage: "Title is Required."
      });
      setTimeout(function(){
        this.setState({ErrorMessage: ""});
      }.bind(this),1000);
    } else {
      let arr = this.state.notes.filter(x => x !== this.state.editItem);
      this.setState({
        notes: arr 
      }, ()=> {
        localStorage.setItem("notes", JSON.stringify(this.state.notes));
        this.setState({
          notes: [...this.state.notes, item]
        }, ()=> {
          this.setState({
            value: null,
            title: "",
            description: "",
            enterNotes: false,
            finalDate: "",
            editItem: ""
          });
          localStorage.setItem("notes", JSON.stringify(this.state.notes));
        });
      });
    }
  };

  render() {
    let notes = this.state.notes.length ? (
      this.state.notes.map((note,i) => {
        return(
          <div key={i}>
            <Notes 
              key={i}
              Note={note}
              deleteEvent={this.deleteEvent} 
              editEvent={this.editEvent}
            ></Notes>
          </div>);
      })
  ) : (null);
    return (
      <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          {this.state.editItem === "" ? <Calendar
            calendarType= {"Hebrew"}
            onChange= {this.onChange}
            value={this.state.value}
           /> : null}
          {this.state.value ?  <TextField
                  type="text"
                  name="Date"
                  label="Date"
                  variant="outlined"
                  required={this.state.required}
                  value={this.state.finalDate}
                  readOnly= {true}
                  style={{width: "100%", marginTop:"10px"}}
                /> : null}
          { this.state.enterNotes ?  <div>
                <TextField
                  type="text"
                  name="Title"
                  label="Title"
                  variant="outlined"
                  required={this.state.required}
                  value={this.state.title}
                  onChange={this.titleChangeHandler}
                  style={{width: "100%", marginTop:"10px"}}
                />
                <TextField
                  type="text"
                  label="Description"
                  variant= "outlined"
                  multiline
                  style={{ width: "100%", marginTop:"10px"}}
                  onChange={this.descriptionChangeHandler}
                />
                <Button type="submit" onClick={()=> {this.saveNote({title: this.state.title, description: this.state.description, date: this.state.finalDate})}} variant="contained" style={{width:"30%", marginTop:"15px", backgroundColor:"red", color:"white", fontSize:"13px"}}>
                  Save
                </Button>
          </div> : null}
          {this.state.editItem ? <div>
                <TextField
                  type="text"
                  name="Date"
                  label="Date"
                  variant="outlined"
                  required={this.state.required}
                  value={this.state.editItem.date}
                  readOnly= {true}
                  style={{width: "100%", marginTop:"10px"}}
                /> 
                <TextField
                  type="text"
                  name="Title"
                  label="Title"
                  variant="outlined"
                  required={this.state.required}
                  defaultValue={this.state.editItem.title}
                  onChange={this.titleChangeHandler}
                  style={{width: "100%", marginTop:"10px"}}
                />
                <TextField
                  type="text"
                  label="Description"
                  variant= "outlined"
                  multiline
                  defaultValue={this.state.editItem.description}
                  style={{ width: "100%", marginTop:"10px"}}
                  onChange={this.descriptionChangeHandler}
                />
                <Button type="submit" onClick={()=> {this.editNote({title: this.state.title !== "" ? this.state.title : this.state.editItem.title, description: this.state.description !== "" ? this.state.description : this.state.editItem.description, date: this.state.editItem.date})}} variant="contained" style={{width:"30%", marginTop:"15px", marginLeft: "-10px", backgroundColor:"red", color:"white", fontSize:"13px"}}>
                  Save
                </Button>
                <Button type="submit" onClick={this.cancel} variant="contained" style={{width:"30%", marginLeft:"10px", marginTop:"15px", fontSize:"13px"}}>
                  Cancel
                </Button></div> : null}
          {this.state.ErrorMessage !== "" ? <div className="alert alert-danger" style={{marginTop:"10px"}}>{this.state.ErrorMessage}</div> : null}
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
          {notes}
        </div>
      </div>
    );
  }
}

class Notes extends Component {
  deleteEvent = (item) => {
    this.props.deleteEvent(item);
  };

  editEvent = (item) => {
    this.props.editEvent(item);
  }

  render() {
    let item = this.props.Note;
    return (
      <div className="col-md-6 col-lg-6 col-sm-6 col-xs-6">
          <div className="card">
            <div className="contained">
              <div className="row">
                <div className="col-md-10 col-lg-10 col-sm-10 col-xs-10">
                  <h4 style={{fontFamily: 'Titillium Web', fontSize:"15px", textAlign:"left"}}>
                    <b>{item.title}</b>
                  </h4>
                </div>
                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1" style={{textAlign:"right"}}>
                  <i className="fas fa-edit" onClick={() => this.editEvent(item)}style={{cursor:"pointer", marginTop:"10px"}}></i>
                </div>
                <div className="col-md-1 col-lg-1 col-sm-1 col-xs-1" style={{textAlign:"right"}}>
                  <i className="fa fa-trash" onClick={() => this.deleteEvent(item)} style={{cursor:"pointer", marginTop:"10px"}}></i>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                  <h6 className="title">
                    <p style={{display: item.description ? "block" : "none", textAlign: "left", fontSize:"12px"}}>{item.description}</p>
                  </h6>
                </div>
                <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12" style={{textAlign:"right"}}>
                  <span className="label label-danger">Event Date: {item.date}</span>
                </div>
              </div>
            </div>
          </div>  
      </div>
    );
  }
}
