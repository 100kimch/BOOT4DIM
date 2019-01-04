<template>
  <q-infinite-scroll :handler="loadContentsMore">
    <q-card :class="{ 'custom-content-card': true, 'isModifying': content.isModifying }" :key="index" v-for="(content, index) in contents" :color="content.isModifying ? 'dark' : ''">
      <q-item class="q-pa-none">
        <q-item-main>
          <q-input class="q-title" type="textarea" v-model="content.title" hide-underline :readonly="!content.isModifying" />
          <h4 class="q-subtitle">{{ content.numIssue + '번째 이슈' }} | {{ content.contributor.label }} | {{ $timeSince(content.date) }}</h4>
        </q-item-main>
        <q-item-side right>
          <q-btn icon="more_vert" dense round flat>
            <q-popover>
              <q-list seperator link>
                <q-item v-close-overlay @click.native="onDeleteContent(content)">
                  <q-item-side right icon="delete" />
                  <q-item-main>삭제</q-item-main>
                </q-item>
                <q-item v-close-overlay @click.native="onModifyContent(content)">
                  <q-item-side right icon="edit" />
                  <q-item-main>수정</q-item-main>
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
        </q-item-side>
      </q-item>

      <hr class="custom-hr q-hr q-my-lg">
      <q-input v-if="content.isModifying" class="custom-body q-body-1" type="textarea" v-model="content.body" hide-underline />
      <div v-if="!content.isModifying" class="custom-body" v-html="marked(content.body, { sanitize: true })"></div>
      <q-item>
        <q-item-side left class="q-body-1" icon="thumb_up"> {{ content.numLikes }}명이 이 글을 좋아합니다.</q-item-side>
        <q-item-main></q-item-main>
        <q-item-side right class="q-body-1" @click.native="onClickComment(content)">댓글 {{ content.numComments }}개</q-item-side>
      </q-item>

      <hr class="custom-hr q-hr q-my-lg">
      <q-btn v-if="content.isModifying" class="full-width" color='negative' label="수정 끝내기" @click="content.isModifying = false" />
      <q-btn-group v-if="!content.isModifying" flat class="row full-width">
        <q-btn class="col" flat dense :color="content.isLike ? 'secondary' : ''" @click.native="onClickLike(content)" label="좋아요" icon="thumb_up" />
        <q-btn class="col" flat dense @click.native="onClickComment(content)" label="댓글" icon="comment" />
        <q-btn class="col" flat dense @click.native="onClickShare(content)" label="공유" icon="share" />
      </q-btn-group>
      <hr v-if="content.showComments && !content.isModifying" class="custom-hr q-hr q-my-lg">
      <q-list v-if="content.showComments && !content.isModifying" class="custom-comment">
        <q-btn flat icon="more_horiz" color="grey-8" class="q-pa-none full-width" @click="loadCommentsMore(content)">더보기</q-btn>
        <div :key="n" v-for="(comment, n) in content.comments">
          <q-chat-message v-if="comment.writer.email !== $loginInfo['email']" :name="comment.writer.label" :avatar="comment.writer.avatar" :text="comment.body" bg-color="grey-4" :stamp="'&nbsp;&nbsp;' + $timeSince(comment.date)" />
          <q-chat-message v-if="comment.writer.email === $loginInfo['email']" name="나" :text="comment.body" bg-color="teal-2" :stamp="'&nbsp;&nbsp;' + $timeSince(comment.date)" sent />
        </div>
        <q-item class="q-pa-none">
          <q-item-main>
            <q-input type="textarea" v-model="content.newCommentBody" :before="[{icon: 'sms'}]" :after="[{icon: (content.newCommentBody) ? 'send' : ''}]" placeholder="댓글을 입력하세요." @keyup.enter.exact="addComment(content)" @submit.prevent />
          </q-item-main>
          <!-- <q-item-side right>
            <q-icon color="primary" name="send" @click="addComment(content)" />
          </q-item-side> -->
        </q-item>
      </q-list>
    </q-card>
    <q-spinner-dots class="q-mx-auto" slot="message" :size="40"></q-spinner-dots>
  </q-infinite-scroll>
</template>

<script>
export default {
  // name: 'ComponentName',
  created () {
    this.marked = require('marked')
  },
  props: ['contents'],
  methods: {
    loadContentsMore: function (index, done) {
      this.$q.notify({
        title: '제목',
        message: index + '번째 추가 로딩중입니다..',
        color: 'positive'
      })
      // setTimeout(() => {
      //   // http request
      //   // sample codes below:
      //   let sample = Object.create(this.contents[0])
      //   sample.date = new Date()
      //   // console.log(sample, sample === this.contents[0])
      //   this.contents.push(sample)
      //   this.contents.push(sample)
      //   done()
      // }, 10000)
    },
    onDeleteContent: function (content) {
      this.$q.dialog({
        title: '삭제 확인',
        message: '삭제하시겠습니까?',
        color: 'negative',
        ok: true,
        cancel: true,
        preventClose: true
      }).then(() => {
        let index = this.contents.indexOf(content)
        // console.log(this.contents)
        this.contents.splice(index, 1)
        // console.log(this.contents)
      })
    },
    onModifyContent: function (content) {
      // edit
      content.isModifying = !content.isModifying
      console.log(content)
    },
    onClickLike: function (content) {
      // request Like
      if (content.isLike) {
        content.isLike = false
        content.numLikes -= 1
      } else {
        content.isLike = true
        content.numLikes += 1
      }
    },
    onClickComment: function (content) {
      if (content.showComments) {
        content.showComments = false
      } else {
        content.showComments = true
      }
    },
    onClickShare: function (content) {
      this.$q.actionSheet({
        title: '공유하기',
        grid: true,
        dismissLabel: '취소',
        actions: [
          {
            label: '카카오톡',
            avatar: '~assets/kakao_logo.png',
            handler () {
              console.log('share with Kakao...')
            }
          },
          {
            label: '페이스북',
            avatar: '~assets/facebook_logo.png',
            handler () {
              console.log('share with Facebook...')
            }
          },
          {
            label: '구글',
            avatar: '~assets/google_logo.png',
            handler () {
              console.log('share with Google...')
            }
          }
        ]
      }).catch(() => {
        this.$q.notify({
          color: 'negative',
          message: '취소되었습니다.'
        })
      })
    },
    addComment: function (content) {
      let body = content.newCommentBody.split('\n')
      body.pop()
      // console.log(body)
      content.comments.push({
        id: new Date(),
        writer: this.$loginInfo,
        body: body
      })
      content.newCommentBody = ''
      content.numComments += 1
    },
    loadCommentsMore: function (content) {
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
.custom-content-card {
  &.isModifying {
    .q-input-target {
      color: white !important;
    }
    .q-subtitle,
    p {
      color: #aaa;
    }
  }
  padding: 1em;
  .q-title {
    line-height: 120%;
    padding: 0;
    margin: 0;
    margin-bottom: 0.5em;
  }
  h4 {
    line-height: 100%;
    font-size: 0.8em;
    color: #666;
    margin: 0;
  }
  .custom-body {
    min-height: 7em;
    margin-bottom: 0.5rem;
  }
  .custom-hr {
    margin: 0.5rem 0;
  }
}
.custom-comment {
  img {
    width: 2.3rem;
    height: 2.3rem;
  }
  .q-message-name {
    font-size: 0.8rem;
  }
  .q-message-text {
    min-height: 1rem;
    padding: 0.5rem;
  }
  .q-message-text-content {
    div {
      display: inline-block !important;
    }
  }
  i {
    width: 2.3rem;
    margin-right: 0.5rem;
  }
}
.q-spinner {
  width: 4rem;
  margin: 0.5rem calc(50% - 2rem);
}
</style>
