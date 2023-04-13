import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fans } from './entities/fans.entity';
import { User } from 'src/user/entities/user.entity';
import { connect } from 'http2';
const mysql = require('mysql2/promise');

interface FansType{
    userId:string,
    fansId:string,
}

@Injectable()
export class FansService {
    constructor(
        @InjectRepository(Fans)
        private readonly fans: Repository<Fans>,
        @InjectRepository(User)
        private readonly user: Repository<User>,
    ){}

    // 查询粉丝数据
    async getFans(query:FansType){
        let {userId} = query;

        // 连接数据库，使用sql语句查询
        const connection = await mysql.createConnection({
            host: '1.12.240.146',
            user: 'tantt',
            password: '!Tan402010',
            database: 'videoWeb'
        });
        const [rows,fields] = await connection.execute(
            `SELECT u.id,u.description,u.uname,u.avatar
            from user u
            right join fans f on u.id = f.fansId
            where f.userId = '${userId}';`
        )
        return rows;
    }

    // 新增粉丝
    async addFans(query:FansType){
        let data = new Fans();
        data.userId = query.userId;
        data.fansId = query.fansId;
        return await this.fans.save(data);
    }

    // 删除粉丝
    async delFans(query:FansType){
        const fansRecord = await this.fans.findOne({
            where:{userId:query.userId,fansId:query.fansId}
        })
        await this.fans.remove(fansRecord);
    }
}
