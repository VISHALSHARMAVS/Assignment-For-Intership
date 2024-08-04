/* eslint-disable react/prop-types */


function InputBox({onChange,label,placeholder,type}) {
    return (<>
    <div className="text-sm font-medium text-left py-2">{label}</div>
    <input onChange={onChange} type={type} placeholder={placeholder} className="w-full px-2 py-1 border " />
    </>
    )
  }
  
  export default InputBox