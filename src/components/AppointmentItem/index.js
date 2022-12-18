// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleIsStarred} = props
  const {id, title, date, isStarred} = eachAppointment

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-list-item">
      <div className="top-container">
        <p className="title">{title}</p>
        <button
          className="star-button"
          testid="star"
          type="button"
          onClick={onClickStar}
        >
          <img src={starImage} className="star-img" alt="star" />
        </button>
      </div>
      <p className="date-and-time">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
