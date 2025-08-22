import { Repository } from "typeorm";

export class QueryFeature
{
    private repo:Repository<any>;
    private queryObject:Record<string,any>;
    public query: Promise<any>

    constructor(repo:Repository<any>,queryObject:Record<string,any>)
    {
        this.repo = repo
        this.queryObject = queryObject
    }

    filter()
    {
        const filteredQuery = this.queryObject
        const keyword = ['page','sort','limit','fields','id']
        keyword.forEach(el=>delete filteredQuery[el])

        this.query = this.repo.find({where:filteredQuery})
        return this;
    }

    sort()
    {

    }

    limit()
    {

    }

    paginate()
    {

    }
}