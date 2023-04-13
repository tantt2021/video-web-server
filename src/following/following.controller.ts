import { Controller, Query,Post } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FansService } from 'src/fans/fans.service';

interface resType{
    msg?:string
}

@Controller('following')
export class FollowingController {
    constructor(
        private followingService:FollowingService,
        private fansService:FansService
    ){}
    // 操作关注
    @Post("handleFollow")
    async handleFollow(@Query() query){
        let {userId,followId} = query;
        console.log("接收到的操作关注消息：",query);
        let followRes:resType = await this.followingService.handleFollowing(query);
        if(followRes.msg === '已关注'){
            this.fansService.addFans({userId:followId,fansId:userId});
            return {msg:"已添加关注记录和粉丝记录"};
        }else{
            this.fansService.delFans({userId:followId,fansId:userId});
            return {msg:"已删除关注记录和粉丝记录"};

        }
    }
    // 获取关注列表
    @Post("getFollowing")
    getFollowing(@Query() query):any{
        console.log("用户请求返回关注信息",query);
        return this.followingService.getFollowing(query);
    }
    
}
