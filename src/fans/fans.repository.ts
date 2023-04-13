import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Fans } from "./entities/fans.entity";

interface FansType{
    userId:string,
    fansId:string,
}

@Injectable()
export class FansRepository{
    constructor(
        @InjectRepository(Fans)
        private readonly fansRepository:Repository<Fans>
    ){}

    // 添加记录
    async addFans(query:FansType){
        let data = new Fans();
        data.userId = query.userId;
        data.fansId = query.fansId;
        const newFollowRecord = this.fansRepository.create({
            userId:query.userId,
            fansId:query.fansId
        });
        await this.fansRepository.save(newFollowRecord);
    }
    // 删除记录
    async delFans(query:FansType){
        const fansRecord = await this.fansRepository.findOne({
            where:{userId:query.userId,fansId:query.fansId}
        })
        await this.fansRepository.remove(fansRecord);
    }
    // async handleFans(query:FansType){
    //     let data = new Fans();
    //     data.userId = query.userId;
    //     data.fansId = query.fansId;
    //     const followRecord = await this.fansRepository.findOne({
    //         where:{userId:query.userId,fansId:query.fansId}
    //     })
    //     if(followRecord){
    //         // 已经关注了
    //         await this.fansRepository.remove(followRecord);
    //         return {msg:"已取消关注"};
    //     }else{
    //         const newFollowRecord = this.fansRepository.create({
    //             userId:query.userId,
    //             fansId:query.fansId
    //         });
    //         await this.fansRepository.save(newFollowRecord);
    //         return {msg:"已关注"};
    //     }
    // }
}