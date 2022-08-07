const SelectField = ({ items, value, loading, onChange }) => {
  return (
    <select
      className="w-full border-gray-100 rounded-md"
      required
      disabled={loading}
      value={value}
      onChange={onChange}
    >
      <option disabled value={'DEFAULT'}>
        Select Brand{' '}
      </option>
      {items &&
        items.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
    </select>
  )
}

export default SelectField
