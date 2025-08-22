"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFeature = void 0;
class QueryFeature {
    repo;
    queryObject;
    query;
    constructor(repo, queryObject) {
        this.repo = repo;
        this.queryObject = queryObject;
    }
    filter() {
        const filteredQuery = this.queryObject;
        const keyword = ['page', 'sort', 'limit', 'fields', 'id'];
        keyword.forEach(el => delete filteredQuery[el]);
        this.query = this.repo.find({ where: filteredQuery });
        return this;
    }
    sort() {
    }
    limit() {
    }
    paginate() {
    }
}
exports.QueryFeature = QueryFeature;
//# sourceMappingURL=QueryFeature.js.map