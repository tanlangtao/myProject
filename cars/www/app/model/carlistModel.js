import { fetchCarServer } from "./utils/carlistUtil.js";
import fp from "lodash/fp";
export default {

    "namespace":"carlist",
    "state":{
        "nowfilters":[
        ],
        "cars":[],
        // 分页
        "pagination":{
            // 当前的页
            "page":1,
            // 默认是一页显示10条
            "pagesize":8,
            // 一共所少条
            "total":0
        },
        // 排序
        "sorter":{
            // 默认按id值排序
            "sortby":"id",
            // 默认升序
            "sortdirection":"ascend"
        }
    },
    "reducers":{
        changeCars(state,action){
            return fp.set("cars",action.cars,state);
        },
        // 添加过滤器条件
        addFilter(state,{key,value}){
            var nowfilters = fp.clone(state.nowfilters);
            nowfilters.push({key,value});
            return fp.set("nowfilters",nowfilters,state)
        },
        // 改变过滤器条件
        changeFilter(state,{key,value}){
            return fp.set("nowfilters",fp.map(item=>item.key == key ? fp.set("value",value,item) : item,state.nowfilters),state);
        },
        // 删除项目
        removeFilterSync(state,{key}){
            return fp.set("nowfilters",
                    fp.filter(item=>item.key != key,state.nowfilters)
                ,state)
        },
        // 改变Pagination项目
        changePagination(state,{
            page = state.pagination.page ,
            pagesize = state.pagination.pagesize,
            total = state.pagination.total
        }){

            return fp.set("pagination",{page,pagesize,total},state)
        },
        // 改变排序
        changeSorter(state,{
            sortby = state.sorter.sortby ,
            sortdirection = state.sorter.sortdirection
        }){
            return fp.set("sorter",{sortby,sortdirection},state)
        }
    },
    "effects":{
        *init(action,{call,put,select}){

            yield call(fetchCarServer,select,put);
        },
        *addOrchangeFilter({key,value},{call,put,select}){
            // 获取当前的carlist 中数据的。
            var {nowfilters} = yield select((state=>state.carlist));
            // 做一个标记
            var isFlag = false; //默认nowfilters是是没有数据

            for (var i = 0; i < nowfilters.length; i++) {
                if(nowfilters[i].key == key){
                    isFlag = true;
                }
            };
            //  如果是true ，此时您传过来的key在过滤器中已经存在
            if(isFlag){
                yield put({"type":"changeFilter",key,value})
            }else{
                yield put({"type":"addFilter",key,value})
            }
            // 页码回到第一页
            yield put({"type":"changePagination","page":1})
            // 请求后台的数据
            yield call(fetchCarServer,select,put);
        },
        *removeFilter({key},{call,put,select}){
            // brand没有的时候，series 一定不存在。
            if( key == "brand"){
                 yield put({"type":"removeFilterSync","key":"series"});
            };
             yield put({"type":"removeFilterSync",key})
             // 页码回到第一页
             yield put({"type":"changePagination","page":1})
             // 请求后台的数据
            yield call(fetchCarServer,select,put);
        },
        // 异步发送改变分页
        *changePage({page,pagesize},{call,put,select}){
            var {pagination} = yield select((state=>state.carlist));
            if(pagination.pagesize != pagesize ){
                 page  = 1;
            }
            yield put({"type":"changePagination",page,pagesize});
            yield call(fetchCarServer,select,put);
        },
        // 异步发送改变分页
        *changeSort({sortby,sortdirection},{call,put,select}){
            var {sorter} = yield select((state=>state.carlist));
            if(sorter.sortby != sortby || sorter.sortdirection != sortdirection){
                // 只要发生了重新排序问题
                yield put({"type":"changePagination","page":1});
                // 改变
                yield put({"type":"changeSorter",sortby,sortdirection});
                // 拉取新的数据【发送异步】分页信息的新数据
                yield call(fetchCarServer,select,put);
            }

        }
    }
}


