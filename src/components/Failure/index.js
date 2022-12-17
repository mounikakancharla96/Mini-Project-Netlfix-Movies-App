import './index.css'

const Failure = props => {
  const {retry} = props
  const onTryAgain = () => {
    retry()
  }
  return (
    <div className="failure-card">
      <img
        src="https://res.cloudinary.com/ddq78brtl/image/upload/v1671251170/Group_1_htazwq.png"
        alt="failure view"
        className="popular-failure"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button onClick={onTryAgain} className="retry-btn" type="button">
        Try Again
      </button>
    </div>
  )
}

export default Failure
