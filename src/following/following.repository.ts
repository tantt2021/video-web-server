import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Following } from './entities/following.entity';
const mysql = require('mysql2/promise');


interface FollowingType{
    userId:string,
    followId:string,

}
@Injectable()
export class FollowingRepository {
  constructor(
    @InjectRepository(Following)
    private readonly followingRepository: Repository<Following>,
  ) {}

  // 查询关注数据
  async getFollowing(query:FollowingType){
    let {userId} = query;
    
    const connection = await mysql.createConnection({
        host: '1.12.240.146',
        user: 'tantt',
        password: '!Tan402010',
        database: 'videoWeb'
    });
      
    const [rows, fields] = await connection.execute(
        `SELECT u.id,u.description,u.uname,u.avatar
        FROM user u
        right JOIN following f ON u.id = f.followId  
        WHERE f.userId = '${userId}';`
    );
      
    return rows;
}
// 添加关注信息
async handleFollowing(query:FollowingType){
    let data = new Following();
    data.userId = query.userId;
    data.followId = query.followId;
    const followRecord = await this.followingRepository.findOne({
        where:{userId:query.userId,followId:query.followId}
    })
    if(followRecord){
        // 已经关注了
        await this.followingRepository.remove(followRecord);
        return {msg:"已取消关注"};
    }else{
        const newFollowRecord = this.followingRepository.create({
            userId:query.userId,
            followId:query.followId
        });
        await this.followingRepository.save(newFollowRecord);
        return {msg:"已关注"};
    }
}

// 查询是否已经关注
async isFollowing(query:FollowingType){
    let {userId,followId} = query;
    return await this.followingRepository.findOne({
        where:{userId,followId}
    });  //没关注是null
}
}
