//allow user to list all products
const list = async (signal) => {
  console.log("listing the products")
  try {
    let response = await fetch('/api/products/', {
      method: 'GET',
      signal: signal,
    })
    return await response.json()
  } catch(err) {
    console.log(err)
  }
}


export {
  list
}
