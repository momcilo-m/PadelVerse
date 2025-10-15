import { LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not, Repository } from "typeorm";

export class QueryFeature {
    private repo: Repository<any>;
    private queryObject: Record<string, any>;
    public query: Promise<any>

    constructor(repo: Repository<any>, queryObject: Record<string, any>) {
        this.repo = repo
        this.queryObject = queryObject
    }

    execute() {

        const filter = this.filter();
        const sort = this.sort();
        const limit = this.limit();
        const page = this.paginate()

        const skip = (page - 1) * limit;

        this.query = this.repo.find({
            where: { ...filter },
            order: { ...sort },
            skip: skip,
            take: limit
        })

        return this;
    }

    advanceFilter(el, value) {
        const operator = el.split("[")[1]?.split("]")[0];
        const element = el.split("[")[0];

        switch (operator) {
            case "ne":
                return { [element]: Not(value) };

            case "gt":
                return { [element]: MoreThan(value) };

            case "gte":
                return { [element]: MoreThanOrEqual(value) };

            case "lt":
                return { [element]: LessThan(value) };

            case "lte":
                return { [element]: LessThanOrEqual(value) };

            default:
                return { [element]: value };

        }
    }

    filter() {

        const filteredQuery = { ...this.queryObject }
        const keyword = ['page', 'sort', 'limit', 'fields', 'id']
        keyword.forEach(el => delete filteredQuery[el])


        Object.keys(filteredQuery).forEach((key) => {
            const filter = this.advanceFilter(key, filteredQuery[key]);
            const element = Object.keys(filter)[0];
            filteredQuery[element] = filter[element];
            if (element !== key) delete filteredQuery[key];
        })

        return filteredQuery;
    }

    sort() {
        const query = { ...this.queryObject };

        if (query.sort === undefined)
            return {};

        let sortQuery = {};

        query.sort.split(",").forEach(el => {
            if (el.startsWith('-')) {
                sortQuery[el.slice(1)] = "DSC";
            } else {
                sortQuery[el] = "ASC";
            }
        })
        return sortQuery;
    }

    limit() {
        let query = { ...this.queryObject }

        if (query.limit == null || query.limit > 20)
            return 10;

        return +this.queryObject.limit;
    }

    paginate() {

        let query = { ...this.queryObject }

        if (query.page == null)
            return 1;

        return +this.queryObject.page;
    }
}