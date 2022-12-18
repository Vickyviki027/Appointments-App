import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

const initialAppointmentList = []

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentList: initialAppointmentList,
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onClickStarred = () => {
    const {appointmentList} = this.state
    const starredAppointment = appointmentList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )

    this.setState({appointmentList: starredAppointment})
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    const date = event.target.value
    console.log(date)
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    this.setState({date: formattedDate})
  }

  render() {
    const {title, date, appointmentList} = this.state
    return (
      <div className="bg-container">
        <div className="sub-bg-container">
          <div className="user-input-container">
            <div className="user-input-left-container">
              <h1 className="appointment-heading">Add Appointments</h1>
              <form className="input-form" onSubmit={this.onAddAppointment}>
                <label htmlFor="title" className="label-text">
                  TITLE
                </label>
                <input
                  type="text"
                  className="title-input"
                  placeholder="Title"
                  id="title"
                  value={title}
                  onChange={this.onChangeTitle}
                />
                <label htmlFor="date" className="label-text">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  className="date-input"
                  onChange={this.onChangeDate}
                  value={date}
                />
                <button className="add-button" type="submit">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointments-img"
            />
          </div>
          <div className="appointment-bottom-sub-container">
            <h1 className="appointments-sub-heading">Appointments</h1>
            <button
              className="starred-button"
              onClick={this.onClickStarred}
              type="button"
            >
              Starred
            </button>
          </div>
          <div className="appointment-bottom-container">
            <ul className="appointment-items">
              {appointmentList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  toggleIsStarred={this.toggleIsStarred}
                  key={eachAppointment.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
