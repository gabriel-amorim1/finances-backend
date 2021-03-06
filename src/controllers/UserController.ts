import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { UserRequestGetAllInterface } from '../interfaces/UserInterface';
import UserService from '../services/UserService';
import { getAllUserSchema } from '../utils/user/validators';

export const create = async (req: Request, res: Response): Promise<Response> => {
    const userService = container.resolve(UserService);
    const response = await userService.create(req.body);

    return res.status(201).json(response);
};

export const findById = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const userService = container.resolve(UserService);
    const response = await userService.findById(id);

    return res.status(200).json(response);
};

export const getAll = async (req: Request, res: Response): Promise<Response> => {
    const query = (await getAllUserSchema.validate(req.query, {
        stripUnknown: true,
    })) as UserRequestGetAllInterface;

    const userService = container.resolve(UserService);
    const response = await userService.getAll(query);

    return res.status(200).json(response);
};

export const update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const userUpdate = req.body;

    const userService = container.resolve(UserService);
    const response = await userService.update(id, userUpdate);

    return res.status(200).json(response);
};

export const remove = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const userService = container.resolve(UserService);
    const response = await userService.remove(id);

    return res.status(204).json(response);
};
