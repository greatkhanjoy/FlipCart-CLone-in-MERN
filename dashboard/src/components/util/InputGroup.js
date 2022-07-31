const InputGroup = (props) => {
  return (
    <div>
      <label htmlFor={props.id} className="sr-only">
        {props.label}
      </label>
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        required={props.isRequired}
        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${props.className}`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export default InputGroup
