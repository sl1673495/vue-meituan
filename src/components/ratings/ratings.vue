<template>
  <div
    class="ratings"
    id="ratingList"
    ref="ratingList"
  >
    <div
      class="rating-header"
      v-if="Object.keys(info).length"
    >
      <div class="shop-score">
        <div class="score">{{info.comment_score}}</div>
        <div class="title">商家评价</div>
        <div class="desc">高于周边商家34.2%</div>
      </div>
      <div class="other-score">
        <div class="item">
          <span class="title">服务态度</span>
          <div class="star-wrapper">
            <star
              :score="info.quality_score"
              :size="24"
              showNumber
            ></star>
          </div>
        </div>
        <div class="item">
          <span class="title">菜品评价</span>
          <div class="star-wrapper">
            <star
              :score="info.food_score"
              :size="24"
              showNumber
            ></star>
          </div>
        </div>
        <div class="item">
          <span class="title">送达时间</span>
          <span class="time">{{info.avg_ship_time}}分钟</span>
        </div>
      </div>
    </div>
    <ul
      class="rating-content"
      v-if="comments.length"
    >
      <li
        :key="item.user_id"
        class="rating-item"
        v-for="item in comments"
      >
        <div class="avatar">
          <img
            :src="item.user_pic_url ? item.user_pic_url : path + '/static/meituan/default-avatar.png'"
            width="100%"
          />
        </div>
        <div class="content">
          <div class="name">{{item.user_name}}</div>
          <div class="score">
            <star
              :score="item.order_comment_score"
              :size="24"
            ></star>
            <span class="desc">{{item.ship_time}}分钟送达</span>
          </div>
          <div class="comment">{{item.comment}}</div>
          <div
            class="praise"
            v-if="item.praise_food_tip"
          >
            <i class="iconfont icon-dianzan"></i>
            {{item.praise_food_tip}}
          </div>
          <div
            class="labels"
            v-if="item.comment_labels.length"
          >
            <i class="iconfont icon-biaoqian"></i>
            {{getLabelStr(item.comment_labels)}}
          </div>
          <div
            class="reply"
            v-if="item.poi_reply_contents"
          >商家回复： {{item.poi_reply_contents}}</div>
          <span class="time">{{_getDateStr(item.comment_time)}}</span>
        </div>
      </li>
    </ul>
    <div class="loading-wrapper">
      <loading
        :title="'正在加载...'"
        v-if="hasMore"
      ></loading>
      <span
        class="no-more"
        v-else
      >没有更多了</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Star from "@/base/star/star"
import { getRatings } from "@/common/api/rating"
import { getDateStr } from "@/common/js/util"
import Loading from "@/base/loading/loading"
import { path } from "common/js/config"

export default {
  created() {
    this.getRatings(this.currentPage)
    this.path = path
  },
  mounted() {
    this._listenEvent()
  },
  data() {
    return {
      currentPage: 1,
      info: {},
      comments: [],
      loading: false,
      hasMore: true
    }
  },
  methods: {
    getRatings(page) {
      getRatings(page).then(
        res => {
          this.loading = false
          this.info = res.data.data
          if (page === 1) {
            this.comments = res.data.data.comments
          } else {
            this.comments = this.comments.concat(res.data.data.comments)
          }
        },
        err => {
          this.hasMore = false
        }
      )
    },
    getLabelStr(labels) {
      const arr = labels.map(label => {
        return label.content
      })
      return arr.join(" ，")
    },
    _scrollToEnd(dom) {
      dom.addEventListener("scroll", e => {
        const scrollHeight = dom.scrollHeight
        const seeHeight = dom.offsetHeight
        const scrollTop = dom.scrollTop
        if (scrollTop + seeHeight >= scrollHeight - 50) {
          if (!this.loading) {
            this.loading = true
            this.getRatings(++this.currentPage)
          }
        }
      })
    },
    _listenEvent() {
      const ratingList = this.$refs.ratingList
      this._scrollToEnd(ratingList)
    },
    _getDateStr(time) {
      return getDateStr(time)
    }
  },
  components: {
    Star,
    Loading
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.ratings {
  height: 100%;

  .rating-header {
    display: flex;
    padding: 1rem 2rem;
    border-bottom: 0.8rem solid $color-split-grey;

    .shop-score {
      flex: 0 0 auto;
      padding-right: 1rem;
      border-right: 1px solid $color-border-grey;

      .score {
        color: $color-text-dark-orange;
        font-weight: 700;
        font-size: 2.3rem;
        margin-bottom: 0.3rem;
      }

      .title {
        color: $color-text-dark-grey;
        font-size: $font-size-small;
        margin-bottom: 0.3rem;
      }

      .desc {
        color: $color-text-grey;
        font-size: $font-size-small-s;
      }
    }

    .other-score {
      padding-left: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .item {
        display: flex;
        align-items: center;

        .title {
          color: $color-text-dark-grey;
          margin-right: 1rem;
        }

        .time {
          color: $color-text-dark-grey;
        }
      }
    }
  }

  .rating-content {
    .rating-item {
      display: flex;
      padding: 1rem;
      border-1px($color-split-grey);

      .avatar {
        flex: 0 0 2.7rem;
        padding-right: 1rem;

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: 0.5rem;
        }

        .time {
          position: absolute;
          right: 0;
          top: 0;
          color: $color-text-grey;
          font-size: $font-size-small-s;
        }

        .score {
          display: flex;
          margin-bottom: 0.5rem;

          .desc {
            color: $color-text-grey;
            font-size: $font-size-small-s;
            margin-left: 0.3rem;
          }
        }

        .comment {
          line-height: 1.4;
          margin-bottom: 0.5rem;
        }

        .praise {
          color: $color-text-dark-grey;
          font-size: $font-size-small;
          margin-bottom: 0.5rem;
        }

        .labels {
          color: $color-text-dark-grey;
          font-size: $font-size-small;
        }

        .reply {
          padding: 0.5rem;
          margin: 0.5rem 0;
          background: $color-split-grey;
          color: $color-text-dark-grey;
          font-size: $font-size-small;
          line-height: 1.2rem;
        }
      }
    }
  }

  .loading-wrapper {
    padding: 1rem 0;
    text-align: center;

    .no-more {
      color: $color-text-dark-grey;
    }
  }
}
</style>
