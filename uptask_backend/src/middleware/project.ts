import type {Request, Response, NextFunction} from 'express'
import Project, { IProject } from '../models/Project';

declare global{
    namespace Express{
        interface Request{
            project: IProject
        }
    }
}

export async function projectExists(Request, Response, NextFunction) {
    try {
        const {projectId} = Request.params;
        const project = await Project.findById(projectId);
        if(!project){
            const error = new Error('Proyecto no encontrado')
            return Response.status(404).json({error: error.message})
        }
        Request.project = project
        NextFunction()
    } catch (error) {
        Response.status(500).json({error: 'Hubo un error'})
    }
}