class ApiFeature {
    constructor(query,queryString){
        this.query = query;
        this.queryString = queryString;
    }
    search(){
        const  keyword = this.queryString.keyword ?
        {name:{
            $regex:this.queryString.keyword,
            $options: "i",
        }}:{}

        //console.log(keyword)

        this.query = this.query.find({...keyword})
        return this;
    }
    filter(){
        let queryStrCopy = {...this.queryString};
        //console.log(queryStrCopy);
        const excludeQueries = ["keyword","page","limit"];
        excludeQueries.map(key => delete queryStrCopy[key]) 
        //console.log(queryStrCopy);
       
        let queryStr = JSON.stringify(queryStrCopy);
        //console.log(queryStr);

        queryStr = queryStr.replace(/\b(gt|lt|gte|lte)\b/g,key=>`$${key}`)

        

        this.query = this.query.find(JSON.parse(queryStr))
        //console.log(this.query);
        return this
    }
    pagination(resultPerPage){
        //console.log(this.queryStr)
        const currentPage = Number(this.queryString.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this
    }
}

module.exports = ApiFeature