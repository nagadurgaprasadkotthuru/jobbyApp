import SalaryFilterItem from '../SalaryFilterItem'
import EmploymentTypeFilterItem from '../EmploymentTypeFilterItem'

import './index.css'

const FilterGroups = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    onChangeEmploymentType,
    onChangeSalary,
  } = props
  return (
    <div className="filter-groups-bg-container">
      <hr className="horizontal-line" />
      <h1 className="employment-types-heading">Type of Employment</h1>
      <ul className="employment-types-list-container">
        {employmentTypesList.map(eachItem => (
          <EmploymentTypeFilterItem
            employmentTypeDetails={eachItem}
            key={eachItem.employmentTypeId}
            onChangeEmploymentType={onChangeEmploymentType}
          />
        ))}
      </ul>
      <hr className="horizontal-line" />
      <h1 className="employment-types-heading">Salary Range</h1>
      <ul className="employment-types-list-container">
        {salaryRangesList.map(eachItem => (
          <SalaryFilterItem
            salaryRangeDetails={eachItem}
            key={eachItem.salaryRangeId}
            onChangeSalary={onChangeSalary}
          />
        ))}
      </ul>
    </div>
  )
}

export default FilterGroups
