import { CanActivate, ExecutionContext, UnauthorizedException, mixin } from "@nestjs/common";
import { Observable } from "rxjs";


export const AuthorizeGuard =(allowedRoles: string[]) => {
    class RolesGuardMixin implements CanActivate {
        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const request = context.switchToHttp().getRequest();
            if(!request.currentUser) return false;
            const result = request?.currentUser?.roles.map((role: string) => allowedRoles.includes(role)).find((val:boolean) => val === true);
            if (result) return true;
            throw new UnauthorizedException('Xin lỗi, bạn không có quyền truy cập này')
        }
    }
    const guard = mixin(RolesGuardMixin);
    return guard;
}