import './index.css'

const EmploymentTypeFilterItem = props => {
  const {employmentTypeDetails, onChangeEmploymentType} = props
  const {label, employmentTypeId} = employmentTypeDetails
  const changeEmploymentType = event => onChangeEmploymentType(event)
  return (
    <li className="list-element">
      <input
        className="check-box"
        type="checkbox"
        id={employmentTypeId}
        onClick={changeEmploymentType}
        value={employmentTypeId}
      />
      <label className="label-element" htmlFor={employmentTypeId}>
        {label}
      </label>
    </li>
  )
}

export default EmploymentTypeFilterItem
