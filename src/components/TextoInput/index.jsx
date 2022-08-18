export const TextoInput =({onChange, value, type})=>{
    return(
        <input 
        className="text-input"
        onChange={onChange}
        value={value}
        type={type} 
        placeholder="Type your search"
        />
    )
}