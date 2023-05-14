import './index.css'

const SalaryFilterItem = props => {
  const {salaryRangeDetails, onChangeSalary} = props
  const {label, salaryRangeId} = salaryRangeDetails
  const changeSalary = () => onChangeSalary(salaryRangeId)
  return (
    <li className="list-element">
      <input
        className="radio"
        type="radio"
        value={salaryRangeId}
        id={salaryRangeId}
        name="salaryRange"
        onClick={changeSalary}
      />
      <label className="label-element" htmlFor={salaryRangeId}>
        {label}
      </label>
    </li>
  )
}

export default SalaryFilterItem
