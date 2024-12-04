

const FetchGrid = ({categoria}) => {
    const doncentes = [1,2,3,4,5]
  return (
    <div key={categoria}>
        <h3>{categoria}</h3>
            
        {doncentes.map(
                (docente) =>
                    (<p key={docente}>{docente}</p>)
        )}
    </div>
  )
}

export default FetchGrid