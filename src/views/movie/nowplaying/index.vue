<template>
  <div class="movie_body">
    <ul 
    v-infinite-scroll="getMovies"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="40">
      <li v-for="item in movielist" :key="item._id"> 
        <div class="pic_show"><img :src="item.imgurl" /></div>
        <div class="info_list">
          <h2>{{item.title}}</h2>
          <p>观众评 <span class="grade">{{item.ratings}}</span></p>
          <p>主演: {{item.stars}}</p>
          <p>{{item.description}}</p>
        </div>
        <div class="btn_mall">
          购票
        </div>
      </li>
      <!-- <li>
        <div class="pic_show"><img src="/images/movie_2.jpg" /></div>
        <div class="info_list">
          <h2>毒液：致命守护者</h2>
          <p>观众评 <span class="grade">9.3</span></p>
          <p>主演: 汤姆·哈迪,米歇尔·威廉姆斯,里兹·阿迈德</p>
          <p>今天56家影院放映443场</p>
        </div>
        <div class="btn_mall">
          购票
        </div>
      </li>
      <li>
        <div class="pic_show"><img src="/images/movie_1.jpg" /></div>
        <div class="info_list">
          <h2>无名之辈</h2>
          <p>观众评 <span class="grade">9.2</span></p>
          <p>主演: 陈建斌,任素汐,潘斌龙</p>
          <p>今天55家影院放映607场</p>
        </div>
        <div class="btn_mall">
          购票
        </div>
      </li>
      <li>
        <div class="pic_show"><img src="/images/movie_2.jpg" /></div>
        <div class="info_list">
          <h2>毒液：致命守护者</h2>
          <p>观众评 <span class="grade">9.3</span></p>
          <p>主演: 汤姆·哈迪,米歇尔·威廉姆斯,里兹·阿迈德</p>
          <p>今天56家影院放映443场</p>
        </div>
        <div class="btn_mall">
          购票
        </div>
      </li>
      <li>
        <div class="pic_show"><img src="/images/movie_1.jpg" /></div>
        <div class="info_list">
          <h2>无名之辈</h2>
          <p>观众评 <span class="grade">9.2</span></p>
          <p>主演: 陈建斌,任素汐,潘斌龙</p>
          <p>今天55家影院放映607场</p>
        </div>
        <div class="btn_mall">
          购票
        </div>
      </li>
      <li>
        <div class="pic_show"><img src="/images/movie_2.jpg" /></div>
        <div class="info_list">
          <h2>毒液：致命守护者</h2>
          <p>观众评 <span class="grade">9.3</span></p>
          <p>主演: 汤姆·哈迪,米歇尔·威廉姆斯,里兹·阿迈德</p>
          <p>今天56家影院放映443场</p>
        </div>
        <div class="btn_mall">
          购票
        </div>
      </li>
      <li>
        <div class="pic_show"><img src="/images/movie_1.jpg" /></div>
        <div class="info_list">
          <h2>无名之辈</h2>
          <p>观众评 <span class="grade">9.2</span></p>
          <p>主演: 陈建斌,任素汐,潘斌龙</p>
          <p>今天55家影院放映607场</p>
        </div>
        <div class="btn_mall">
          购票
        </div>
      </li>
      <li>
        <div class="pic_show"><img src="/images/movie_2.jpg" /></div>
        <div class="info_list">
          <h2>毒液：致命守护者</h2>
          <p>观众评 <span class="grade">9.3</span></p>
          <p>主演: 汤姆·哈迪,米歇尔·威廉姆斯,里兹·阿迈德</p>
          <p>今天56家影院放映443场</p>
        </div>
        <div class="btn_mall">
          购票
        </div>
      </li> -->
    </ul>
    <div v-if="showloading" class="loading">加载中...</div>
    <div v-if="showmore" class="showmore">没有更多数据了...</div> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      pagesize: 5,
      movielist : [],
      loading: false,
      showloading: false,
      showmore: false,
      base_url: 'http://localhost:8888/'
    };
  },
  computed: {},
  watch: {},
  methods: {
    getMovies() {
      this.loading = true    // 这个说的是如果上拉每次加载的时候要保证数据加载完成之后才打开开关
      this.showloading = true;
      const start = (this.page-1) * this.pagesize   // 从第几条开始
      const end  = this.pagesize      // 查询多少条
      this.$http.get(`${this._URL.movie}?start=${start}&end=${end}`).then(res => {
        this.showloading = false   //不管有没有数据都得关闭loading
        console.log(res)
        const list = res.list
        list.forEach(item => {
          item.imgurl = this.base_url + item.imgurl
        })
        this.movielist = this.movielist.concat(list)
        // this.movielist.push(...list)
        if(list.length < this.pagesize) {   //判断是不是已经没有数据了
          this.showmore = true  //只有在所有数据请求完之后才显示没有更多数据了
        } else {
          this.page = this.page + 1   // 还有数据page+1
          this.loading = false   //开关打开
        }
      })
    }
  },
  created() {
    // this.getMovies()
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  components: {},
};
</script>

<style scoped>
.loading{
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: url("../../../assets/ajax-loader.gif") no-repeat 10px center;
  background-size: 22px 22px;
}
.showmore{
   height: 40px;
  text-align: center;
  line-height: 40px;
  color: red;
}
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>
