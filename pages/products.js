import useSWR from 'swr'

const fetcher = async () => {
  const res = await fetch('http://localhost:3000/api/products')
  const data = await res.json()
  return data
}



const Products = () => {

  const {data, error} = useSWR('products', fetcher);

  if(error) return <h1>Error occurred</h1>
  if(!data) return <h1>Loading...</h1>

     
  return (
    <div>
      {
        data.map((e, key) => {
          return(
            <h1 key={key}>{e.email}</h1>
          )
        })
      }
    </div>
  )
}

Products.layout = 'L1'

export default Products
