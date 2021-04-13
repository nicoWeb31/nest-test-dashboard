import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/role/role.entity';
import { RoleService } from 'src/role/role.service';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private authService: AuthService,
        private roleService: RoleService,
        private userService: UserService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const access = this.reflector.get<string>(
            'access',
            context.getHandler(),
        );
        console.log(access);
        if (!access) {
            return true;
        }

        //get request
        const req = context.switchToHttp().getRequest();
        const userId = await this.authService.userId(req);
        const user: User = await this.userService.findOne({ id: userId }, [
            'role',
        ]);
        console.log("🚀 ~ file: permission.guard.ts ~ line 34 ~ PermissionGuard ~ canActivate ~ user", user)
        const role : Role= await this.roleService.findOne({ id: user.role.id }, [
            'permissions',
        ]);

        if(req.method === 'GET') {
            return role.permission.some(p=>(p.name === `view_${access}`) || (p.name === `edit_${access}`))//return true if exist
        }

        return role.permission.some(p=>p.name === `edit_${access}`)//return true if exist
     }
}
