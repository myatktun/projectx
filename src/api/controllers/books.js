import queryDB from '../helpers/helpers.js'

export const getBooks = async (req, res) => {
  try {
    const { result, page, limit } = await queryDB(req)
    const { total, data: books, latest } = result[0]

    if (books.length) {
      const totalBooks = total[0].total
      const totalPages = Math.ceil(totalBooks / limit)
      return res.status(200).send({
        total: totalBooks, total_pages: totalPages,
        page: page, limit_per_page: limit,
        results_in_page: books.length, results: books,
        latest: latest
      })
    }
    res.status(404).send({ total: 0, results_in_page: 0, msg: 'No books found' })

  } catch (error) {
    res.status(404).send({ msg: 'Something went wrong' })
    console.log(error)
  }
}

export const getSingleBook = async (req, res) => {
  try {
    const { result } = await queryDB(req)
    if (result.length) {
      return res.status(200).send({ results: result })
    }
    res.status(404).send({ msg: 'Book not found' })
  } catch (error) {
    res.status(404).send({ msg: 'Something went wrong' })
    console.log(error)
  }
}

export const getAuthors = async (req, res) => {
  try {
    const { result, page, limit } = await queryDB(req)

    const { total, data: authors } = result[0]
    if (authors.length) {
      const totalAuthors = total[0].total
      const totalPages = Math.ceil(totalAuthors / limit)
      return res.status(200).send({
        total: totalAuthors, total_pages: totalPages,
        page: page, limit_per_page: limit,
        results_in_page: authors.length, results: authors,
      })
    }
    res.status(404).send({ total: 0, results_in_page: 0, msg: 'No authors found' })

  } catch (error) {
    res.status(404).send({ msg: 'Something went wrong' })
    console.log(error)
  }
}

export const getCategories = async (req, res) => {
  try {
    const { result, page, limit } = await queryDB(req)

    const { total, data: categories } = result[0]
    if (categories.length) {
      const totalCategories = total[0].total
      const totalPages = Math.ceil(totalCategories / limit)
      return res.status(200).send({
        total: totalCategories, total_pages: totalPages,
        page: page, limit_per_page: limit,
        results_in_page: categories.length, results: categories,
      })
    }
    res.status(404).send({ total: 0, results_in_page: 0, msg: 'No categories found' })

  } catch (error) {
    res.status(404).send({ msg: 'Something went wrong' })
    console.log(error)
  }
}
