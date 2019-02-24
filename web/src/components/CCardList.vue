<template>
  <q-infinite-scroll :handler="loadContentsMore">
    <q-card :class="{ 'custom-content-card': true, 'isModifying': content.isModifying }" :key="index" v-for="(content, index) in reversedContents" :color="content.isModifying ? 'amber-2' : ''">
      <q-item class="q-pa-none">
        <q-item-main>
          <q-input class="q-title" type="textarea" v-model="content.title" hide-underline :readonly="!content.isModifying" />
          <h4 class="q-subtitle">{{ content.issueName }}{{ content.author ? ' | 작성자:' + content.author.name : '' }}{{ content.date ? ' | ' + $timeSince(content.date) : '' }}</h4>
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
        <q-item-side right class="q-body-1" @click.native="loadCommentsMore(content)">댓글 {{ content.numComments }}개</q-item-side>
      </q-item>

      <hr class="custom-hr q-hr q-my-lg">
      <q-btn v-if="content.isModifying" class="full-width" color='negative' label="수정 끝내기" @click="onModifyContent(content)" />
      <q-btn-group v-if="!content.isModifying" flat class="row full-width">
        <q-btn class="col" flat dense :color="content.isLike ? 'secondary' : ''" @click.native="toggleLike(content)" label="좋아요" icon="thumb_up" />
        <q-btn class="col" flat dense @click.native="loadCommentsMore(content)" label="댓글" icon="comment" />
        <q-btn class="col" flat dense @click.native="onClickShare(content)" label="공유" icon="share" />
      </q-btn-group>
      <hr v-if="content.showComments && !content.isModifying" class="custom-hr q-hr q-my-lg">
      <q-list v-if="content.showComments && !content.isModifying" class="custom-comment">
        <q-btn v-if="content.hasMoreComments" flat icon="more_horiz" color="grey-8" class="q-pa-none full-width" @click="loadCommentsMore(content)">더보기</q-btn>
        <q-spinner-dots class="q-mx-auto custom-loading-comments" slot="message" :size="50"></q-spinner-dots>
        <div :key="n" v-for="(comment, n) in content.comments">
          <q-chat-message v-if="comment.author.email !== userInfo['email']" :name="comment.author.name" :avatar="comment.author.avatar" :text="comment.body" bg-color="grey-4" :stamp="'&nbsp;&nbsp;' + $timeSince(comment.date)" />
          <q-chat-message v-if="comment.author.email === userInfo['email']" name="나" :text="comment.body" bg-color="teal-2" :stamp="'&nbsp;&nbsp;' + $timeSince(comment.date)" sent />
        </div>
        <q-item class="q-pa-none">
          <q-item-main>
            <q-input type="textarea" v-model="content.newCommentBody" :before="[{icon: 'sms'}]" :after="[{icon: (content.newCommentBody) ? 'send' : ''}]" placeholder="댓글을 입력하세요." @keyup.enter.exact="createComment(content)" @submit.prevent />
          </q-item-main>
          <!-- <q-item-side right>
            <q-icon color="primary" name="send" @click="createComment(content)" />
          </q-item-side> -->
        </q-item>
      </q-list>
    </q-card>
    <q-spinner-dots v-if="!contents.length || hasMoreContents" class="q-mx-auto custom-loading-cards" slot="message" :size="40"></q-spinner-dots>
  </q-infinite-scroll>
</template>

<script>
export default {
  // name: 'ComponentName',
  created () {
    this.marked = require('marked')
    this.$gql(this.dbHandler.onCreatePost).subscribe({
      next: (data) => {
        this.contents.push(Object.values(data.value.data)[0])
      }
    })
  },
  props: ['dbHandler'],
  computed: {
    reversedContents: function () {
      return this.contents.slice().reverse()
    },
    userInfo: {
      get () {
        return this.$store.state.showcase.userInfo
      }
    }
  },
  methods: {
    loadContentsMore: async function (index, done) {
      // this.$q.notify({
      //   title: '제목',
      //   message: index + '번째 추가 로딩중입니다..',
      //   color: 'positive'
      // })
      this.hasMoreContents = true
      try {
        const result = await this.$gql(this.dbHandler.listPosts)
        // console.log('result: ', result)
        this.contents = Object.values(result.data)[0].items
      } catch (e) {
        console.error('error on loadContentsMore():', e)
        this.$q.notify({
          color: 'negative',
          message: '로그인이 필요한 서비스입니다.'
        })
      }
      this.hasMoreContents = false
    },
    onDeleteContent: function (content) {
      this.$q.dialog({
        title: '삭제 확인',
        message: '삭제하시겠습니까?',
        color: 'negative',
        ok: true,
        cancel: true,
        preventClose: true
      }).then(async () => {
        try {
          const deleteContent = await this.$gql(this.dbHandler.deletePost, {
            input: {
              id: content.id
            }
          })
          console.log('deleteContent:', deleteContent, content.id)
          this.$q.notify({
            color: 'positive',
            message: '컨텐츠를 삭제하였어요.'
          })
          let index = this.contents.indexOf(content)
          // console.log(content, this.contents)
          this.contents.splice(index, 1)
          // console.log(content, this.contents)
        } catch (e) {
          console.error('Error on deleteContent:', e)
          this.$q.notify({
            color: 'negative',
            message: '컨텐츠를 삭제하지 못했어요.'
          })
        }
      })
    },
    onModifyContent: async function (content) {
      this.$set(content, 'isModifying', !content.isModifying)
      if (!content.isModifying) {
        if (content.tempBody === content.body) {
          this.$set(content, 'isModifying', !content.isModifying)
          return
        }
        try {
          const result = await this.$gql(this.dbHandler.updatePost, {
            input: {
              id: content.id,
              body: content.body
            }
          })
          this.$q.notify({
            color: 'positive',
            message: '컨텐츠를 수정했어요.'
          })
          console.log('result: ', result)
        } catch (e) {
          this.$q.notify({
            color: 'negative',
            message: '컨텐츠 수정하지 못했어요.'
          })
        }
      } else {
        content.tempBody = content.body
      }
      // content.isModifying = !content.isModifying
      // console.log(content)
    },
    toggleLike: async function (content) {
      this.$set(content, 'isLike', !content.isLike)
      try {
        if (!content.isLike) {
          content.numLikes -= 1
          const result = await this.$gql(this.dbHandler.updatePost, {
            input: {
              id: content.id,
              numLikes: content.numLikes
            }
          })
          console.log('toggleLike(): ', result)
        } else {
          content.numLikes += 1
        }
      } catch (e) {
        this.$q.notify({
          color: 'negative',
          message: '좋아요 누르는데 오류가 있어요.'
        })
      }
    },
    loadCommentsMore: async function (content) {
      this.$set(content, 'isLoadingComments', true)
      this.$set(content, 'showComments', !content.showComments)
      if (content.showComments && !content.comments) {
        try {
          content.comments = []

          const result = await this.$gql(this.dbHandler.listComments)
          console.log('comments: ', result)
          let comment = Object.values(result.data)[0].items
          for (let i in comment) {
            comment[i].body = [comment[i].body]
            content.comments.push(comment[i])
          }
        } catch (e) {
          this.$q.notify({
            color: 'negative',
            message: '댓글을 불러오지 못했어요.'
          })
        }
      }
      this.$set(content, 'isLoadingComments', false)
    },
    onClickShare: function (content) {
      this.$q.actionSheet({
        title: '공유하기',
        grid: true,
        dismissLabel: '취소',
        actions: [
          {
            label: '카카오톡',
            avatar: '/statics/kakao_logo.png',
            handler () {
              console.log('share with Kakao...')
            }
          },
          {
            label: '페이스북',
            avatar: '/statics/facebook_logo.png',
            handler () {
              console.log('share with Facebook...')
            }
          },
          {
            label: '구글',
            avatar: '/statics/google_logo.png',
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
    createComment: async function (content) {
      const body = content.newCommentBody.split('\n')
      // console.log(body)
      if (!content.comments) {
        content.comments = []
      }
      const date = new Date().toISOString()
      try {
        for (let i in body) {
          if (!body[i]) continue
          const newComment = {
            id: content.id,
            date: date,
            author: this.userInfo,
            body: body[i],
            postId: content.id
          }
          console.log('newComment: ', newComment)
          content.comments.push()
          await this.$gql(this.dbHandler.createComment, {
            input: newComment
          })

          body.pop()
        }
        content.newCommentBody = []
        content.numComments += 1
      } catch (e) {
        this.$q.notify({
          color: 'negative',
          message: '댓글을 등록하지 못했어요.'
        })
      }
    }
  },
  data () {
    return {
      contents: []
    }
  }
}
</script>

<style lang="scss">
.custom-content-card {
  &.isModifying {
    .q-input-target {
      // color: white !important;
    }
    .q-subtitle,
    p {
      // color: #aaa;
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
    h1 {
      font-size: 1.4em;
      margin: 0.2em 0 0.5em 0;
    }
    h2 {
      font-size: 1.2em;
      margin: 0.1em 0 0.4em 0;
    }
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
</style>
