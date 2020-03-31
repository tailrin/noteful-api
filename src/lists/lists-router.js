const path = require('path')
const express = require('express')
const xss = require('xss')
const ListsService = require('./lists-service.js')

const listsRouter = express.Router()
const jsonParser = express.json()

const serializeList = list => ({
    id: list.id,
    listname: xss(list.listname)
})

listsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        ListsService.getAllLists(knexInstance)
            .then(lists => {
                res.json(lists.map(serializeList))
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { listname } = req.body
        const newList = { listname }

        for (const [key, value] of Object.entries(newList)){
            if (value == null){
                return res.status(400).json({
                    error: {message: `Missing ${key} in request body`}
                })
            }
        }
        newList.listname = listname;

        ListsService.insertList(
            req.app.get('db'),
            newList
        )

        .then(list => {
            res
            .status(201)
            .json(serializeList(list))
        })
        .catch(next)
    })

    module.exports = listsRouter