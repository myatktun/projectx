import { getData } from "../helpers/helpers"
import { Request, Response } from "express"

export const getBooks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { totalResults, totalPages, page, limit, data } = await getData(req)

        if (data.length) {
            return res.status(200).send({
                total: totalResults,
                total_pages: totalPages,
                page: page,
                limit_per_page: limit,
                results_in_page: data.length,
                results: data,
            })
        }
        return res.status(404).send({
            total: totalResults,
            msg: `No results for "${req.query.search}"`,
        })
    } catch (error) {
        console.log(error)
        return res.status(404).send({ msg: "Something went wrong" })
    }
}
