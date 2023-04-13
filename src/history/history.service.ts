import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
const mysql = require("mysql2/promise");

interface Query{
    id?:string,
    userId?:string,
    videoId:string,
}
@Injectable()
export class HistoryService {
    constructor(@InjectRepository(History) private readonly history:Repository<History>){}


    async getHistorys(query:Query){
        let {userId} = query;
        const connection = await mysql.createConnection({
            host: '1.12.240.146',
            user: 'tantt',
            password: '!Tan402010',
            database: 'videoWeb'
        });
        const [rows] = await connection.execute(
            `select v.id as videoId,v.authorId,v.author,v.title,v.cover,h.watchedAt,h.id
            from video v
            right join history h on v.id  = h.videoId 
            where h.userId = '${userId}'
            ORDER BY h.watchedAt DESC;`
        );
          
        return rows;
    }

    // 添加历史记录
    async addHistory(query:Query){
        let {userId,videoId} = query;
        const data = new History();
        data.userId = userId;
        data.videoId = videoId;
        return this.history.save(data);
    }

    // 删除历史记录
    async delHistory(query:Query){
        let {id,userId} = query;
        if(id!==undefined)
            return this.history.delete({id});
        else
            return this.history.delete({userId});
    }
}
