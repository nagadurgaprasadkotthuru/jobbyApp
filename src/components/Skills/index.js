import './index.css'

const Skills = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skill-list-element">
      <img className="skill-image" alt={name} src={imageUrl} />
      <p className="skill-name">{name}</p>
    </li>
  )
}

export default Skills
