import { useState } from "react"


export const AddCategory = ({onNewCategoria}) => {

  const [inputValor, setInputValor] = useState("")

  const handleOnChange = ({target})=>{
    setInputValor("paqui:....")
    //console.log(target.value);
    setInputValor(target.value)
    
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(inputValor.trim().length <= 1)
      return;

    onNewCategoria(inputValor.trim())
    //ajusteCategorias((categorias) => [ inputValor, ...categorias])
    setInputValor("")

  }

  return (
    <form onSubmit={ onSubmit }>
      <input 
        type="text"
        placeholder="Buscar cursos"
        value={ inputValor }
        onChange={ handleOnChange } 
    />
    </form>
  )
}
