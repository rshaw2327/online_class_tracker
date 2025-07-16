class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  dateFilter(field = "dateAndTime") {
    const { startDate, endDate } = this.queryStr;
    if (startDate || endDate) {
      const dateQuery = {};
      if (startDate) {
        dateQuery.$gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        dateQuery.$lte = end;
      }
      this.query = this.query.find({ [field]: dateQuery });
    }
    return this;
  }
}

module.exports = ApiFeatures;
