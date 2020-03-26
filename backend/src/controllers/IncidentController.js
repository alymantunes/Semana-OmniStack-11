const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { title, description, value } = request.body;

        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })

        return response.json({ id });
    },

    async index(request, response) {
        const ong_id = request.headers.authorization;
    
        const incident = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .where('ong_id', ong_id)
            .select('incidents.*', 'ongs.name');

        return response.json(incident);
    },

    async indexall(request, response) {
        const { page = 1 } = request.query;

        const incident = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select('*');

        const [count] = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .count();

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incident);
    },

    async delete(request, response) {
        const ong_id = request.headers.authorization;
        const { id } = request.params;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (!incident || incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.' })
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }

}