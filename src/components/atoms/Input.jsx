function Input({name, label, onChange, min, max, value, type = 'text', required = "{false}"}) {

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input name={name} type={type} min={min} max={max} value={value} onChange={onChange} required={required} />
        </div>
    )
};

export default Input;