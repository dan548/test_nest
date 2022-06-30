import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "./dto";
import { UserEntity } from "./user.entity";
import { validate } from "class-validator";
import { UserResponse } from "./user.interface";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) {}

    async findAll(): Promise<UserEntity[]> {
      return await this.userRepository.find();
    }
    
    async findById(id: string): Promise<UserResponse>{
      const user = await this.userRepository.findOneBy({uuid: id});
    
      if (!user) {
        const errors = {User: ' not found'};
        throw new HttpException({errors}, 401);
      }
    
      return this.buildUserResponse(user);
    }
    
    async findByEmail(email: string): Promise<UserEntity>{
      const user = await this.userRepository.findOneBy({email: email});
    
      if (!user) {
        const errors = {User: ' not found'};
        throw new HttpException({errors}, 401);
      }
    
      return user;
    }

    async create(dto: CreateUserDto): Promise<UserResponse> {
      // check uniqueness of username/email
      const {username, email, password} = dto;
      const qb = await this.userRepository
        .createQueryBuilder('user')
        .where('user.username = :username', { username })
        .orWhere('user.email = :email', { email });
          
      const user = await qb.getOne();
          
      if (user) {
        const errors = {username: 'Username and email must be unique.'};
        throw new HttpException({message: 'Input data validation failed', errors}, HttpStatus.BAD_REQUEST);
          
      }
          
      // create new user
      let newUser = new UserEntity();
      newUser.username = username;
      newUser.email = email;
      newUser.password = password;
          
      const errors = await validate(newUser);
      if (errors.length > 0) {
        const _errors = {username: 'User input is not valid.'};
        throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);
      } else {
        const savedUser = await this.userRepository.save(newUser);
        return this.buildUserResponse(savedUser);
      }    
    }
    
    async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
      let toUpdate = await this.userRepository.findOneBy({uuid: id});
      delete toUpdate.password;
    
      let updated = Object.assign(toUpdate, dto);
      return await this.userRepository.save(updated);
    }
    
    async delete(id: string): Promise<DeleteResult> {
      return await this.userRepository.delete({ uuid: id });
    }
    
    private buildUserResponse(user: UserEntity): UserResponse {
      const userResponse = {
          uuid: user.uuid,
          username: user.username,
          email: user.email
      };

      return {user: userResponse}
    }
    
}