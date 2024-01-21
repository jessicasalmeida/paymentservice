import { Get, Route } from "tsoa";
interface PingResponse {
    message: string;
}

@Route("ping")
export default class pingController {
    @Get("/")
    public async getMessage(): Promise<PingResponse> {
        return {
            message: "hello",
        };
    }

}