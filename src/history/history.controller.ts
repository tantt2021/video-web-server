import { Controller, Post, Query,Get } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
    constructor(private historyService:HistoryService){}


    // 
    @Post("getAll")
    getHistorys(@Query() query):any{
        console.log("用户尝试获取历史播放记录，参数:",query);
        return this.historyService.getHistorys(query);
        
    }
    // 添加历史记录
    @Post("addHistory")
    addHistory(@Query() query):any{
        console.log("用户添加一条历史记录,具体信息:",+query);
        return this.historyService.addHistory(query);
        
    }
    // 删除历史记录
    @Post("delHistory")
    delHistory(@Query() query):any{
        console.log("用户删除历史记录,",query);
        return this.historyService.delHistory(query);
    }
}
