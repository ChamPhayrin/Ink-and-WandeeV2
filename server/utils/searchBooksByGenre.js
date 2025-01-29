const axios = require('axios')

const searchBooksByGenre = async (genre) => {
  const options = {
    method: 'GET',
    url: `https://www.googleapis.com/books/v1/volumes?q=subject:"${genre}"`,
    headers: {
      'Content-Type': "application/json"
    }
  }
  return axios.request(options)
  .then((res) => {
    let products = [];
    const books = res.data.items
    for(book of books) { 
      products.push({
        id: book.id,
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        author: book.volumeInfo.authors,
        publish_date: book.volumeInfo.publishedDate,
        cover_img: `${book.volumeInfo && book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail}&fife=w800` || 'No image available',
        retail_price: (book.saleInfo && book.saleInfo.retailPrice && book.saleInfo.retailPrice.amount) || '12.99',
        genre: book.volumeInfo.categories,
        rating: book.volumeInfo.averageRating || 'No rating available.'
      })
    }
    return products
  })
  .catch(error => console.error(error))

}

module.exports = searchBooksByGenre