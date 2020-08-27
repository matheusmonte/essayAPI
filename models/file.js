const shortId = require('shortid');

module.exports = class File{
    constructor(title, authorId, physicalLocation, status) {
        this.fileId = shortId.generate();
        this.title = title;
        this.authorId = authorId;
        this.physicalLocation = physicalLocation;
        this.status = status;
        this.createdDate = new Date();
    }

    getInstance(){
        return this;
    }
}