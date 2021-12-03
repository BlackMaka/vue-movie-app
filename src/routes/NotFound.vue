<template>
  <div class="not-fount">
    <div class="status">
      404
    </div>
    <div class="message">
      Page Not Found!
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.not-fount{
  line-height: 1.2;
  text-align: center;
  font-family: "Oswald", sans-serif;
  padding: 80px 20px;
  .status{
    font-size: 60px;
    color: $primary;
  }
  .message{
    font-size: 50px;
  }
}
</style>