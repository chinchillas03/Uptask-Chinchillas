import type {Request, Response, NextFunction} from 'express'
import Task, { ITask } from '../models/Task';

declare global{
    namespace Express{
        interface Request{
            task: ITask
        }
    }
}

export async function taskExists(Request, Response, NextFunction) {
    try {
        const {taskId} = Request.params;
        const task = await Task.findById(taskId);
        if(!task){
            const error = new Error('Tarea no encontrada')
            return Response.status(404).json({error: error.message})
        }
        Request.task = task
        NextFunction()
    } catch (error) {
        Response.status(500).json({error: 'Hubo un error'})
    }
}

export function taskBelongsToProject(Request, Response, NextFunction) {
    try {
        if(Request.task.project.toString() !== Request.project.id.toString()){
            const error = new Error('Accion no valida')
            return Response.status(400).json({error: error.message})
        }
        NextFunction()
    } catch (error) {
        Response.status(500).json({error: 'Hubo un error'})
    }
}