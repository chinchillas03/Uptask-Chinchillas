import type {Request, Response} from 'express'
import Project from '../models/Project'

export class ProjectController{
    static createProject = async (Request, Response) =>{
        const project = new Project(Request.body)
        try {
            await project.save()
            Response.send('Proyecto creado correctamente')
        } catch (error) {
            console.log(error)
        }
    }
    static getAllProject = async (Request, Response) =>{
        try {
            const projects = await Project.find({})
            Response.json(projects)
        } catch (error) {
            console.log(error)
        }
        Response.send('Todos los proyectos')
    }
    static getProjectById = async (Request, Response) =>{
        const {id} = Request.params
        try {
            const project = await Project.findById(id).populate('tasks')
            if(!project){
                const error = new Error('Proyecto no encontrado')
                return Response.status(404).json({error: error.message})
            }
            Response.json(project)
        } catch (error) {
            console.log(error)
        }
        Response.send('Todos los proyectos')
    }
    static updateProject = async (Request, Response) =>{
        const {id} = Request.params
        try {
            const project = await Project.findById(id)
            if(!project){
                const error = new Error('Proyecto no encontrado')
                return Response.status(404).json({error: error.message})
            }
            project.projectName = Request.body.projectName
            project.clientName = Request.body.clientName
            project.description = Request.body.description
            await project.save()
            Response.send('Proyecto actualizado')
        } catch (error) {
            console.log(error)
        }
        Response.send('Todos los proyectos')
    }
    static deleteProject = async (Request, Response) =>{
        const {id} = Request.params
        try {
            const project = await Project.findByIdAndDelete(id)
            if(!project){
                const error = new Error('Proyecto no encontrado')
                return Response.status(404).json({error: error.message})
            }
            Response.send('Proyecto eliminado')
        } catch (error) {
            console.log(error)
        }
        Response.send('Todos los proyectos')
    }
}