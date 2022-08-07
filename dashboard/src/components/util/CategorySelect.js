const CategorySelect = ({ categories, onChange, loading, value }) => {
  return (
    <select
      disabled={loading}
      className="w-full border-gray-100 rounded-md"
      required
      value={value}
      onChange={onChange}
    >
      <option disabled value={'DEFAULT'}>
        Select Category{' '}
      </option>
      {categories &&
        categories.map((category) => (
          <>
            <option key={category._id} value={category._id}>
              {' '}
              {category.name}{' '}
            </option>
            {category.children &&
              category.children.map((child) => (
                <>
                  <option key={child._id} value={child._id}>
                    {'--'}
                    {child.name}{' '}
                  </option>
                  {child.children &&
                    child.children.map((grandChild) => (
                      <>
                        <option key={grandChild._id} value={grandChild._id}>
                          {'----'}
                          {grandChild.name}{' '}
                        </option>
                        {grandChild.children &&
                          grandChild.children.map((greatGrandChild) => (
                            <option
                              key={greatGrandChild._id}
                              value={greatGrandChild._id}
                            >
                              {'--------'}
                              {greatGrandChild.name}{' '}
                            </option>
                          ))}
                      </>
                    ))}
                </>
              ))}
          </>
        ))}
    </select>
  )
}

export default CategorySelect
