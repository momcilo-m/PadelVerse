import { Repository } from "typeorm";
export declare class QueryFeature {
    private repo;
    private queryObject;
    query: Promise<any>;
    constructor(repo: Repository<any>, queryObject: Record<string, any>);
    execute(): this;
    advanceFilter(el: any, value: any): {
        [x: number]: any;
    };
    filter(): {
        [x: string]: any;
    };
    sort(): {};
    limit(): number;
    paginate(): number;
}
