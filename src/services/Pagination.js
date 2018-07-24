import _ from 'lodash'

export const paginate = (arrayToPaginate, page=1, limit=8 )=>{

    page = Number.parseInt(page)
    limit = Number.parseInt(limit)
    const offset = (page - 1) * limit

    return {
        docs : _.drop(arrayToPaginate, offset).slice(0, limit),
        total: arrayToPaginate.length,
        limit: limit ,
        page: page,
        pages: Math.ceil(arrayToPaginate.length / limit)
    }
}
