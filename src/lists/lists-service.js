const ListsService = {
    getAllLists(knex) {
        return knex.select('*').from('noteful_lists')
    },

    insertList(knex, newList){
        return knex
            .insert(newList)
            .into('noteful_lists')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    getListById(knex, id){
        return knex
            .from('noteful_lists')
            .select('*')
            .where('id', id)
            .first()
    },

    deleteList(knex, id){
        return knex('noteful_lists')
            .where({id})
            .delete()
    },

    updateList(knex, id, newListInfo){
        return knex('noteful_lists')
            .where({id})
            .update(newNoteFields)
    }
}

module.exports = ListsService