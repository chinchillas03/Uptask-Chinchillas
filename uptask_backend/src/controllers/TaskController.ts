import type { Response, Request } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController{
    static createTask = async (Request, Response) =>{
        try {
            const task = new Task(Request.body)
            task.project = Request.project.id
            Request.project.tasks.push(task.id)
            await Promise.allSettled([task.save(), Request.project.save()])
            Response.send('Tarea creada correctamente')
        } catch (error) {
            Response.status(500).json({error: 'Hubo un error'})
        }
    }
    static getProjectTask = async (Request, Response) =>{
        try {
            const tasks = await Task.find({project: Request.project.id}).populate('project')
            Response.json(tasks)
        } catch (error) {
            Response.status(500).json({error: 'Hubo un error'})
        }
    }
    static getTaskById = async (Request, Response) =>{
        try {
            Response.json(Request.task)
        } catch (error) {
            Response.status(500).json({error: 'Hubo un error'})
        }
    }
    static updateTask = async (Request, Response) =>{
        try {
            Request.task.name = Request.body.name
            Request.task.description = Request.body.description
            await Request.task.save()
            Response.send('Tarea actualizada correctamente')
        } catch (error) {
            Response.status(500).json({error: 'Hubo un error'})
        }
    }
    static deleteTask = async (Request, Response) =>{
        try {
            Request.project.tasks = Request.project.tasks.filter(task => task.toString() !== Request.task.id.toString())
            await Promise.allSettled([Request.task.deleteOne(), Request.project.save()])
            Response.send('Tarea eliminada correctamente')
        } catch (error) {
            Response.status(500).json({error: 'Hubo un error'})
        }
    }
    static updateStatusTask = async (Request, Response) =>{
        try {
            const {status} = Request.body
            Request.task.status = status
            await Request.task.save()
            Response.send('Tarea actualizada')
        } catch (error) {
            Response.status(500).json({error: 'Hubo un error'})
        }
    }
}   