import { Restful, GetMapping } from "ts-express-restful";

@Restful("/index")
export default class IndexController { 

    @GetMapping("/")
    async index() { 
        return "index";
    }
}