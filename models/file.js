module.exports = class File{
    constructor(title, authorId, teacherId, physicalLocation) {
        this.title = title;
        this.authorId = authorId;
        this.teacherId = teacherId;
        this.physicalLocation = physicalLocation;
        this.createdDate = new Date();
    }
}