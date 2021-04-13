export default class Group {
    constructor(groupList) {
        this.groupList = groupList;
    }
    async getGroup(req, res) {
        const group = await this.groupList.findOne();
        res.status(200).json(group);
    }
    async getGroups(req, res) {
        const groups = await this.groupList.findAll();
        res.status(200).json(groups);
    }
    async createGroup(req, res) {
        const group = await this.groupList.create(req.body);
        res.status(200).json(group[0]);
    }

    async updateGroup(req, res) {
        const group = await this.groupList.update(req.body, {
            where: { id: req.body.id }
        });
        res.status(200).json(group[0]);
    }

    async deleteGroup(req, res) {
        await this.groupList.destroy({
            where: { id: req.params.id }
        });
        res.status(201).json({});
    }
}
