import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/post/post.validation";
import PostService from "@/resources/post/post.service";

class PostController implements Controller {
    public path = "/posts";
    public router = Router();
public PostService=new PostService();
    constructor() {
        this.initialiseRoutes();
    }
    public initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
    }
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try{
            const {title,body}=req.body;
            const post=await this.PostService.create(title,body);
            res.status(200).json({post})
        }
        catch(error){
            next(new HttpException(400,"cannot create post"));
        }
    };
}

export default PostController;