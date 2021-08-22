import React from 'react';
import axios from 'axios';

class ContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mail: '',
      subject: '',
      message: ''
    }
  }

  handleSubmit(e){
    e.preventDefault();
    axios({
      method: "POST",
      url:"http://localhost:3002/send",
      data:  this.state
    }).then((response)=>{
      if (response.data.status === 'success') {
        alert("Message sent.");
        this.resetForm()
      } else if (response.data.status === 'fail') {
        alert("Message failed to send.")
      }
    })
  }

  resetForm(){
    this.setState({name: '', mail: '',subject: '', message: ''})
  }

  render() {
    return(
      <div>
        <h3><u>Contact Us</u></h3><br></br>
        <form id="contact-form" onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="form-group col-10 mx-auto">
              <label htmlFor="name" className="float-left">Name</label>
              <input type="text" className="form-control" placeholder="Enter your name" id="name" value={this.state.name} onChange={this.onNameChange.bind(this)} />
          </div>
          <div className="form-group col-10 mx-auto">
              <label htmlFor="mail" className="float-left">Email address</label>
              <input type="email" className="form-control" placeholder="Enter your email" id="mail" aria-describedby="emailContact" value={this.state.mail} onChange={this.onEmailChange.bind(this)} />
          </div>
          <div className="form-group col-10 mx-auto">
              <label htmlFor="subject" className="float-left">Subject</label>
              <input type="text" className="form-control" placeholder="Enter the subject" id="subject" value={this.state.subject} onChange={this.onSubjectChange.bind(this)} />
          </div>
          <div className="form-group col-10 mx-auto">
              <label htmlFor="message" className="float-left">Message</label>
              <textarea className="form-control" rows="4" placeholder="Enter your message" id="message" value={this.state.message} onChange={this.onMessageChange.bind(this)} />
          </div>
          <button type="submit" className="btn btn-outline-primary">Submit</button>
        </form>
      </div>
    );
  }

  onNameChange(event) {
	  this.setState({name: event.target.value})
  }

  onEmailChange(event) {
	  this.setState({mail: event.target.value})
  }

  onSubjectChange(event) {
	  this.setState({subject: event.target.value})
  }

  onMessageChange(event) {
	  this.setState({message: event.target.value})
  }
}

export default ContactForm