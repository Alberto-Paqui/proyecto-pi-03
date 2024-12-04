import { useState } from "react"
import { AddCategory } from "../components/AddCategory";
import FetchGrid from "../components/FetchGrid";

export const FetchTeacher = () => {

    const [categorias, setCategorias] = useState(["aritmetica", "algebra"])

    //console.log(categorias);

    const onAddCategoria = (newCategoria) =>{
      //console.log(valor);
      if(categorias.includes(newCategoria)) return;

      setCategorias([newCategoria, ...categorias])
      //setCategorias( [ valor, ...categorias])

    }

  return (

    <>
      <h1>FetchTeacher</h1>

      <AddCategory 
        onNewCategoria ={ (event) => onAddCategoria(event)}
      />
      
      { categorias.map( (categoria) => (
        <FetchGrid 
          key={categoria} 
          categoria = {categoria} />
        ))
      }
    </>
  )
}
