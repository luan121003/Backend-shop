import { UserRepository } from './user.repository';
import { User } from './model/user.schema';
import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor(private readonly repository: UserRepository) {}

    create(user: CreateUserDto) {
        
        user.password = bcrypt.hashSync(user.password, 10)
       return this.repository.create(user)
    }

    getAll() {
        return this.repository.findAll();
    }

    getOne(id: string) {
        return this.repository.findOne(id);
      }
}