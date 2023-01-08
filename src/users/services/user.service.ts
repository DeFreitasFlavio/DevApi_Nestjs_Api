import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createUserDto } from "../dto/user.dto";
import { User } from "../user.entity";
const bcrypt = require("bcrypt");	

@Injectable()
export class UsersServices {
	
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}
	
	createUser(createUserDto: createUserDto): Promise<User> {
		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(createUserDto.password, salt);
		const user = new User();
		user.username = createUserDto.username;
		user.password = hash;
		user.email = createUserDto.email;
		user.role = createUserDto.role;
		return this.userRepository.save(user);
	}

	async findByEmail(email: string): Promise<User | undefined> {
		return this.userRepository.findOne({ where: { email } });
	}

	async findById(id: string): Promise<User | undefined> {
		return this.userRepository.findOne({
			where: { id },
			relations: ["projectUser"]
		});
	}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username }});
  }
	
	getUserById(id: string) {
		return this.userRepository.findOne({
			where: { id }
		});
	}
	
	getUsers() {
		return this.userRepository.find();
	}

}
