import { Repository } from "typeorm";
export declare class QueryFeature {
    private repo;
    private queryObject;
    query: Promise<any>;
    constructor(repo: Repository<any>, queryObject: Record<string, any>);
    filter(): this;
    sort(): void;
    limit(): void;
    paginate(): void;
}
