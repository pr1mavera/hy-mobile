<template>
  <div class="serviceCard">
    <div class="box" v-for="item in data">
      <div class="iconContainer">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-duihao1"></use>
        </svg>
      </div>
      <div class="content">
        <h5>{{item.title}}</h5>
        <p>{{item.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: {
    data: Array,
  },
};
</script>

<style lang="less">
.serviceCard{
  .box{
    .iconContainer{
      width: 23px;
      min-width: 23px;
      max-width: 23px;
      svg{
        vertical-align: baseline;
      }
      .icon {
        width: 1em; height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
      }
    }
    margin-top: 15px;
    border: 1px solid #45a9ff;
    border-radius: 4px;
    padding: 14px 25px 14px 16px;
    display: flex;
    justify-content: space-between;
    .icon{
      width: 20px;
      min-width: 20px;
      max-width: 20px;
      flex-flow: 0;
    }
    .content{
      flex-grow: 1;
      h5{
        font-size: 14px;
        color: #2b313c;
        margin-bottom: 5px;
      }
      p{
        font-size: 14px;
        color: #9098a8;
      }
    }
  }
}
</style>

