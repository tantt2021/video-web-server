import { Injectable, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Following } from '../following/entities/following.entity';
import { Repository } from 'typeorm';
const mysql = require('mysql2/promise');

interface FollowingType{
  userId:string,
  followId:string,

}
@Injectable()
export class FollowingService {
  constructor(
    @InjectRepository(Following)
    private readonly followingRepository: Repository<Following>
  ) {}

  // 操作关注
  async handleFollowing(@Query() query): Promise<object> { 
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

  // 获取关注列表
  async getFollowing(@Query() query): Promise<object> {
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

  // 是否已关注
  // 查询是否已经关注
  async isFollowing(query:FollowingType){
    let {userId,followId} = query;
    return await this.followingRepository.findOne({
        where:{userId,followId}
    });  //没关注是null
  }

}
